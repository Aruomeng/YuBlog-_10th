import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // 获取参数
  const title = searchParams.get("title") || "YuBlog";
  const description = searchParams.get("description") || "第十代个人博客";
  const date = searchParams.get("date") || "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Logo */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 60,
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #a855f7, #ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Y
          </div>
          <span
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "white",
            }}
          >
            YuBlog
          </span>
        </div>

        {/* Date badge */}
        {date && (
          <div
            style={{
              position: "absolute",
              top: 60,
              right: 60,
              display: "flex",
              alignItems: "center",
              padding: "12px 24px",
              borderRadius: 9999,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              fontSize: 16,
              color: "#a1a1aa",
            }}
          >
            {date}
          </div>
        )}

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "900px",
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontWeight: "bold",
              color: "white",
              lineHeight: 1.2,
              margin: 0,
              background: "linear-gradient(to right, #ffffff, #a1a1aa)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              style={{
                fontSize: 24,
                color: "#71717a",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
