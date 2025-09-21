import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const BRAND = "#0ea5e9"; // Update to your brand color if needed
const TEXT = "#0B1220";
const SUBTEXT = "#334155";
const WHITE = "#ffffff";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Dr. Sayuj Krishnan";
  const subtitle =
    searchParams.get("subtitle") || "Neurosurgeon • Hyderabad, India";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background: WHITE,
        }}
      >
        {/* Top brand bar */}
        <div
          style={{
            height: "10px",
            width: "100%",
            background: BRAND,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "56px 64px",
            gap: "40px",
            alignItems: "center",
            flex: 1,
          }}
        >
          {/* Logo circle */}
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "9999px",
              background: "#e6f4fb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `3px solid ${BRAND}`,
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: BRAND,
                fontFamily:
                  "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, Apple Color Emoji, Segoe UI Emoji",
              }}
            >
              SK
            </div>
          </div>
          {/* Titles */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                fontSize: 64,
                lineHeight: 1.1,
                fontWeight: 800,
                color: TEXT,
                fontFamily:
                  "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, Apple Color Emoji, Segoe UI Emoji",
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 36,
                lineHeight: 1.25,
                fontWeight: 600,
                color: SUBTEXT,
                fontFamily:
                  "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, Apple Color Emoji, Segoe UI Emoji",
              }}
            >
              {subtitle}
            </div>
          </div>
        </div>
        {/* Footer bar */}
        <div
          style={{
            margin: "0 64px 56px 64px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: SUBTEXT,
              fontWeight: 600,
              fontFamily:
                "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, Apple Color Emoji, Segoe UI Emoji",
            }}
          >
            drsayuj.com
          </div>
          <div
            style={{
              height: "10px",
              width: "200px",
              background: BRAND,
              borderRadius: "9999px",
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
