import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 90)
      : "수영장 (Sooyoung Archive)";

    const category = searchParams.get("category") || "Devlog";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#09090b",
            backgroundImage:
              "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2px, transparent 0)",
            backgroundSize: "50px 50px",
            padding: "60px 80px",
            color: "#ffffff",
            fontFamily: "sans-serif",
          }}
        >
          {/* Header Brand Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                fontSize: "24px",
              }}
            >
              🏊‍♂️
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "26px",
                  fontWeight: "bold",
                  color: "#ffffff",
                  letterSpacing: "-0.5px",
                }}
              >
                수영장
              </span>
              <span
                style={{
                  fontSize: "14px",
                  color: "#a1a1aa",
                }}
              >
                Sooyoung Archive
              </span>
            </div>
            <div
              style={{
                marginLeft: "16px",
                padding: "6px 16px",
                borderRadius: "9999px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                fontSize: "14px",
                fontWeight: "600",
                color: "#10b981",
                border: "1px solid rgba(16, 185, 129, 0.3)",
              }}
            >
              {category}
            </div>
          </div>

          {/* Title Area */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              maxWidth: "1040px",
            }}
          >
            <div
              style={{
                fontSize: (title?.length || 0) > 35 ? "44px" : "56px",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.3,
                letterSpacing: "-1px",
                wordBreak: "keep-all",
              }}
            >
              {title}
            </div>
          </div>

          {/* Footer Info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              borderTop: "1px solid rgba(255, 255, 255, 0.12)",
              paddingTop: "24px",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                color: "#a1a1aa",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>1인 개발자 수영의 프로젝트 & 개발일지</span>
            </div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#10b981",
                letterSpacing: "-0.5px",
              }}
            >
              sooyoung.pe.kr
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response(`Failed to generate OG image`, { status: 500 });
  }
}
