import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const DEFAULT_BRAND = "#0ea5e9"; // Update to your brand color if needed
const TEXT = "#0B1220";
const SUBTEXT = "#334155";
const WHITE = "#ffffff";
const LOGO_URL = "https://www.drsayuj.com/images/logo.png";

function normalizeBrand(input: string | null): string {
  if (!input) return DEFAULT_BRAND;
  const trimmed = input.trim();
  const hex = trimmed.startsWith("#") ? trimmed.slice(1) : trimmed;
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) return `#${hex}`;
  return DEFAULT_BRAND;
}

function base64FromArrayBuffer(ab: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(ab);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  // btoa is available in Edge runtime
  return btoa(binary);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Dr. Sayuj Krishnan";
  const subtitle =
    searchParams.get("subtitle") || "Neurosurgeon • Hyderabad, India";
  const BRAND = normalizeBrand(searchParams.get("brand"));

  // Try to fetch and embed logo as data URL (graceful fallback to initials)
  let logoDataUrl: string | null = null;
  try {
    const res = await fetch(LOGO_URL, { cache: "no-store" });
    if (res.ok) {
      const ab = await res.arrayBuffer();
      const b64 = base64FromArrayBuffer(ab);
      logoDataUrl = `data:image/png;base64,${b64}`;
    }
  } catch {
    // ignore; we will use fallback
  }

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
          {/* Logo area */}
          {logoDataUrl ? (
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "9999px",
                overflow: "hidden",
                background: "#ffffff",
                border: `3px solid ${BRAND}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoDataUrl}
                alt="Dr. Sayuj Krishnan logo"
                width={120}
                height={120}
                style={{ objectFit: "contain" }}
              />
            </div>
          ) : (
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
          )}
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