import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../src/db/schema";

const client = postgres(process.env.DATABASE_URL!, { prepare: false });
const db = drizzle(client, { schema });

async function seed() {
  console.log("🌱 开始导入种子数据...\n");

  // 1. 导入标签
  console.log("📌 导入标签...");
  const tagData = [
    { name: "Next.js", slug: "nextjs", color: "#000000" },
    { name: "AI", slug: "ai", color: "#8B5CF6" },
    { name: "设计", slug: "design", color: "#EC4899" },
    { name: "LLM", slug: "llm", color: "#10B981" },
    { name: "RAG", slug: "rag", color: "#F59E0B" },
    { name: "TypeScript", slug: "typescript", color: "#3178C6" },
    { name: "React", slug: "react", color: "#61DAFB" },
  ];

  for (const tag of tagData) {
    await db.insert(schema.tags).values(tag).onConflictDoNothing();
  }
  console.log(`  ✓ ${tagData.length} 个标签已导入\n`);

  // 2. 导入博客文章
  console.log("📝 导入博客文章...");
  const postData = [
    {
      slug: "building-10th-gen-blog",
      title: "构建第十代个人博客",
      description: "探索 Next.js 15、AI 集成和现代 Web 设计",
      content: `这是第十代个人博客的构建故事...

## 技术选型

选择了最新的技术栈：
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Drizzle ORM

## 设计理念

采用 Bento Grid 布局，灵感来自 Apple 和 Linear...

## 核心功能

1. **AI 对话** - 与博客内容对话
2. **动态统计** - 实时阅读量和点赞
3. **留言墙** - OAuth 登录留言
4. **订阅系统** - 邮件通知更新`,
      published: true,
      publishedAt: new Date("2024-01-15"),
      readTime: "8 分钟",
      viewCount: 128,
      likeCount: 42,
    },
    {
      slug: "rag-deep-dive",
      title: "RAG 技术深度解析",
      description: "如何让 AI 理解你的内容",
      content: `RAG（检索增强生成）是一种强大的技术...

## 什么是 RAG？

RAG 结合了检索和生成两种能力，让 LLM 能够访问外部知识库。

## 工作原理

1. **索引阶段** - 将文档切分并向量化
2. **检索阶段** - 根据查询找到相关文档
3. **生成阶段** - LLM 基于检索结果生成回答

## 实践经验

在博客中实现 RAG 的关键点...`,
      published: true,
      publishedAt: new Date("2024-01-10"),
      readTime: "12 分钟",
      viewCount: 89,
      likeCount: 35,
    },
    {
      slug: "nextjs-15-features",
      title: "Next.js 15 新特性速览",
      description: "探索 React 19 支持和性能改进",
      content: `Next.js 15 带来了许多令人兴奋的新特性...

## React 19 支持

- Actions 和 use() hook
- Server Components 改进

## 性能优化

- 构建速度提升 40%
- 更好的代码分割`,
      published: true,
      publishedAt: new Date("2024-01-05"),
      readTime: "6 分钟",
      viewCount: 156,
      likeCount: 28,
    },
  ];

  for (const post of postData) {
    await db.insert(schema.posts).values(post).onConflictDoNothing();
  }
  console.log(`  ✓ ${postData.length} 篇文章已导入\n`);

  // 3. 关联文章和标签
  console.log("🔗 关联文章标签...");
  const postTagRelations = [
    { postSlug: "building-10th-gen-blog", tagSlugs: ["nextjs", "ai", "design"] },
    { postSlug: "rag-deep-dive", tagSlugs: ["ai", "llm", "rag"] },
    { postSlug: "nextjs-15-features", tagSlugs: ["nextjs", "react", "typescript"] },
  ];

  for (const relation of postTagRelations) {
    const post = await db.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.slug, relation.postSlug),
    });
    if (!post) continue;

    for (const tagSlug of relation.tagSlugs) {
      const tag = await db.query.tags.findFirst({
        where: (tags, { eq }) => eq(tags.slug, tagSlug),
      });
      if (!tag) continue;

      await db
        .insert(schema.postTags)
        .values({ postId: post.id, tagId: tag.id })
        .onConflictDoNothing();
    }
  }
  console.log(`  ✓ 文章标签关联完成\n`);

  // 4. 导入项目
  console.log("🚀 导入项目...");
  const projectData = [
    {
      title: "YuBlog v10",
      description: "第十代个人博客，融合 AI、现代设计和前沿技术",
      link: "https://yublog.com",
      github: "https://github.com/Aruomeng/yublog",
      status: "in_progress",
      techStack: JSON.stringify(["Next.js 15", "TypeScript", "Tailwind CSS", "Drizzle ORM"]),
      featured: true,
      sortOrder: 1,
    },
    {
      title: "AI 助手",
      description: "基于 RAG 的智能问答系统",
      github: "https://github.com/Aruomeng/ai-assistant",
      status: "completed",
      techStack: JSON.stringify(["Python", "LangChain", "OpenAI", "Pinecone"]),
      featured: true,
      sortOrder: 2,
    },
    {
      title: "设计系统",
      description: "可复用的 React 组件库",
      github: "https://github.com/Aruomeng/design-system",
      status: "maintaining",
      techStack: JSON.stringify(["React", "Storybook", "Radix UI"]),
      featured: false,
      sortOrder: 3,
    },
  ];

  for (const project of projectData) {
    await db.insert(schema.projects).values(project).onConflictDoNothing();
  }
  console.log(`  ✓ ${projectData.length} 个项目已导入\n`);

  // 5. 导入技能
  console.log("💡 导入技能...");
  const skillData = [
    { category: "前端", name: "React", sortOrder: 1 },
    { category: "前端", name: "Next.js", sortOrder: 2 },
    { category: "前端", name: "TypeScript", sortOrder: 3 },
    { category: "前端", name: "Tailwind CSS", sortOrder: 4 },
    { category: "后端", name: "Node.js", sortOrder: 1 },
    { category: "后端", name: "Python", sortOrder: 2 },
    { category: "后端", name: "PostgreSQL", sortOrder: 3 },
    { category: "后端", name: "Redis", sortOrder: 4 },
    { category: "AI/ML", name: "OpenAI", sortOrder: 1 },
    { category: "AI/ML", name: "LangChain", sortOrder: 2 },
    { category: "AI/ML", name: "RAG", sortOrder: 3 },
    { category: "AI/ML", name: "向量数据库", sortOrder: 4 },
    { category: "工具", name: "Git", sortOrder: 1 },
    { category: "工具", name: "Docker", sortOrder: 2 },
    { category: "工具", name: "Vercel", sortOrder: 3 },
    { category: "工具", name: "Figma", sortOrder: 4 },
  ];

  for (const skill of skillData) {
    await db.insert(schema.skills).values(skill).onConflictDoNothing();
  }
  console.log(`  ✓ ${skillData.length} 个技能已导入\n`);

  // 6. 导入时间线
  console.log("📅 导入时间线...");
  const timelineData = [
    { year: "2024", title: "构建第十代个人博客", sortOrder: 1 },
    { year: "2023", title: "深入 AI/LLM 领域", sortOrder: 2 },
    { year: "2022", title: "全栈开发实践", sortOrder: 3 },
    { year: "2021", title: "开始技术博客写作", sortOrder: 4 },
  ];

  for (const event of timelineData) {
    await db.insert(schema.timelineEvents).values(event).onConflictDoNothing();
  }
  console.log(`  ✓ ${timelineData.length} 个时间线事件已导入\n`);

  // 7. 导入站点配置
  console.log("⚙️ 导入站点配置...");
  const configData = [
    { key: "siteName", value: "YuBlog", description: "站点名称" },
    { key: "siteDescription", value: "第十代个人博客", description: "站点描述" },
    { key: "authorName", value: "Yu", description: "作者名称" },
    { key: "authorTitle", value: "全栈开发者 | AI 爱好者", description: "作者头衔" },
    { key: "authorBio", value: "热衷于技术创新的开发者，专注于构建优雅的用户体验和探索前沿技术", description: "作者简介" },
    { key: "githubUrl", value: "https://github.com/Aruomeng", description: "GitHub 链接" },
  ];

  for (const config of configData) {
    await db.insert(schema.siteConfig).values(config).onConflictDoNothing();
  }
  console.log(`  ✓ ${configData.length} 个配置项已导入\n`);

  console.log("✅ 种子数据导入完成！");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ 种子数据导入失败:", err);
  process.exit(1);
});
