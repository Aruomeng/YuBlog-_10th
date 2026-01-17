import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  email: string;
}

export function WelcomeEmail({ email }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>欢迎加入 YuBlog 订阅！</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <div style={logo}>Y</div>
            <Heading style={heading}>欢迎加入 YuBlog！ 🎉</Heading>
          </Section>

          <Hr style={hr} />

          {/* Content */}
          <Section style={content}>
            <Text style={text}>你好！</Text>
            <Text style={text}>
              感谢你订阅 YuBlog 的更新通知。每当有新文章发布时，你将第一时间收到通知。
            </Text>
            <Text style={text}>
              作为第十代个人博客，这里融合了最新的 Web 技术和 AI 能力，我将分享：
            </Text>
            <ul style={list}>
              <li style={listItem}>🚀 前沿技术探索</li>
              <li style={listItem}>💡 开发经验与最佳实践</li>
              <li style={listItem}>🤖 AI 与 LLM 应用</li>
              <li style={listItem}>🎨 现代 Web 设计趋势</li>
            </ul>
          </Section>

          <Section style={buttonSection}>
            <Link href={process.env.NEXT_PUBLIC_SITE_URL || "https://yourblog.com"} style={button}>
              访问博客 →
            </Link>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              此邮件发送至 {email}
            </Text>
            <Text style={footerText}>
              如果你不想再收到这些邮件，可以{" "}
              <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?email=${email}`} style={link}>
                取消订阅
              </Link>
            </Text>
            <Text style={footerText}>
              © 2024 YuBlog. 用 ❤️ 构建.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#0a0a0a",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "560px",
};

const header = {
  textAlign: "center" as const,
  marginBottom: "24px",
};

const logo = {
  width: "48px",
  height: "48px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #a855f7, #ec4899)",
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "16px",
  lineHeight: "48px",
  textAlign: "center" as const,
};

const heading = {
  color: "#ffffff",
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0",
  padding: "0",
};

const hr = {
  borderColor: "#27272a",
  margin: "24px 0",
};

const content = {
  marginBottom: "24px",
};

const text = {
  color: "#a1a1aa",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px 0",
};

const list = {
  color: "#a1a1aa",
  fontSize: "16px",
  lineHeight: "28px",
  margin: "16px 0",
  paddingLeft: "20px",
};

const listItem = {
  margin: "8px 0",
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#a855f7",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  padding: "12px 24px",
  display: "inline-block",
};

const footer = {
  textAlign: "center" as const,
};

const footerText = {
  color: "#52525b",
  fontSize: "12px",
  lineHeight: "20px",
  margin: "0 0 8px 0",
};

const link = {
  color: "#a855f7",
  textDecoration: "underline",
};

export default WelcomeEmail;
