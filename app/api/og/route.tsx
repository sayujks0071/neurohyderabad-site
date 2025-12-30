import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

// export const runtime = "edge"; // Commented out to use Node.js runtime

const DEFAULT_BRAND = "#0FA3B1"; // Brand teal accent
const TEXT = "#0B1220";
const SUBTEXT = "#334155";
const WHITE = "#ffffff";
const BORDER = "#E2E8F0";
const PRECISION_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="44" fill="#0B2E4E" />
  <path d="M86 24 C46 24 46 90 86 112 C126 134 126 198 86 198" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round" fill="none" />
  <path d="M114 24 C154 24 154 90 114 112 C74 134 74 198 114 198" stroke="#FFFFFF" stroke-width="20" stroke-linecap="round" fill="none" />
  <line x1="86" y1="112" x2="114" y2="112" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" />
</svg>`;

const LOGO_DATA_URL = `data:image/svg+xml;base64,${Buffer.from(PRECISION_ICON_SVG).toString('base64')}`;

let interLoaded: Promise<void> | null = null;
let inter600: ArrayBuffer | null = null;
let inter800: ArrayBuffer | null = null;

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
  for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function parseBool(v: string | null, defaultVal = true): boolean {
  if (v == null) return defaultVal;
  const s = v.toLowerCase();
  return !(s === "0" || s === "false" || s === "no" || s === "off");
}

function computeTitleSize(title: string): number {
  const l = title.length;
  if (l > 100) return 40;
  if (l > 85) return 48;
  if (l > 70) return 54;
  if (l > 56) return 60;
  return 64;
}

async function loadInterFonts() {
  if (interLoaded) return interLoaded;
  interLoaded = (async () => {
    try {
      const cssRes = await fetch(
        "https://fonts.googleapis.com/css2?family=Inter:wght@600;800&display=swap",
        {
          headers: {
            // Ensure woff2 URLs are returned
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115 Safari/537.36",
          },
        }
      );
      const css = await cssRes.text();
      const w600 = css.match(
        /@font-face{[\s\S]*?font-weight:\s*600;[\s\S]*?src:\s*url\((https:[^)]+\.woff2)\)/m
      );
      const w800 = css.match(
        /@font-face{[\s\S]*?font-weight:\s*800;[\s\S]*?src:\s*url\((https:[^)]+\.woff2)\)/m
      );
      if (w600?.[1]) {
        const f600 = await fetch(w600[1]);
        inter600 = await f600.arrayBuffer();
      }
      if (w800?.[1]) {
        const f800 = await fetch(w800[1]);
        inter800 = await f800.arrayBuffer();
      }
    } catch {
      // Fallback to system fonts if fetch fails
      inter600 = null;
      inter800 = null;
    }
  })();
  return interLoaded;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Dr Sayuj Krishnan";
  const subtitle =
    searchParams.get("subtitle") || "Neurosurgeon • Hyderabad, India";
  const BRAND = normalizeBrand(searchParams.get("brand"));
  const showLogo = parseBool(searchParams.get("logo"), true);
  const domain = searchParams.get("domain") || "drsayuj.info";

  // Load fonts (best effort)
  await loadInterFonts();

  const titleSize = computeTitleSize(title);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          background: WHITE,
          padding: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: `1px solid ${BORDER}`,
            borderRadius: "16px",
            flex: 1,
            background: WHITE,
            overflow: "hidden",
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
            {showLogo && (
              <div
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "36px",
                  background: "#0B2E4E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `4px solid ${BRAND}`,
                  boxShadow: "0 18px 36px rgba(11, 46, 78, 0.22)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={LOGO_DATA_URL}
                  alt="Dr Sayuj brand icon"
                  width={120}
                  height={120}
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}
            {/* Titles */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div
                style={{
                  fontSize: titleSize,
                  lineHeight: 1.1,
                  fontWeight: 800,
                  color: TEXT,
                  fontFamily:
                    "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, Apple Color Emoji, Segoe UI Emoji",
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
                    "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, Apple Color Emoji, Segoe UI Emoji",
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
                  "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, Apple Color Emoji, Segoe UI Emoji",
              }}
            >
              {domain}
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
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts:
        inter600 && inter800
          ? [
              { name: "Inter", data: inter800, weight: 800, style: "normal" },
              { name: "Inter", data: inter600, weight: 600, style: "normal" },
            ]
          : [],
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}
