import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// 系统提示词
const SYSTEM_PROMPT = `你是一个友好的 AI 助手，正在一个名为 YuBlog 的个人博客网站上工作。
这是一个技术博客，主要分享前端开发、AI、Next.js、React 等技术内容。

你的角色：
- 回答访客关于博客内容、技术问题的询问
- 保持友好、专业的语气
- 回答要简洁明了，适合聊天界面显示
- 如果不确定的问题，可以引导用户查看博客文章或留言

博客作者是 Yu，一个全栈开发者和 AI 爱好者。`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "消息不能为空" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI 服务未配置" },
        { status: 500 }
      );
    }

    // 初始化 Gemini
    const genAI = new GoogleGenerativeAI(apiKey);

    // 尝试不同的模型
    const modelNames = [
      "gemini-2.0-flash",
      "gemini-1.5-flash-latest", 
      "gemini-1.5-pro-latest",
      "gemini-pro",
      "gemini-3",
      "gemini-3-pro",

    ];

    let lastError: Error | null = null;

    for (const modelName of modelNames) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });

        // 构建完整的提示
        const historyText = (history || [])
          .map((msg: { role: string; content: string }) => 
            `${msg.role === "user" ? "用户" : "助手"}: ${msg.content}`
          )
          .join("\n");

        const fullPrompt = `${SYSTEM_PROMPT}

之前的对话记录：
${historyText || "（无）"}

用户最新消息: ${message}

请用简洁友好的方式回复：`;

        // 使用 generateContent 而不是 chat
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ reply: text });
      } catch (e) {
        lastError = e as Error;
        console.log(`Model ${modelName} failed, trying next...`);
        continue;
      }
    }

    // 所有模型都失败了
    console.error("All Gemini models failed:", lastError);
    return NextResponse.json(
      { error: "AI 服务暂时不可用" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "AI 回复失败，请稍后再试" },
      { status: 500 }
    );
  }
}
