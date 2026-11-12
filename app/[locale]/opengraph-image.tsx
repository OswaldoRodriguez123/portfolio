import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Oswaldo Rodríguez — AI and Full-stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0f0f10",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#fafafa",
            lineHeight: 1.05,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 36,
            color: "#a1a1aa",
            lineHeight: 1.3,
          }}
        >
          AI and Full-stack Engineer
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 24,
            color: "#52525b",
            letterSpacing: "0.02em",
          }}
        >
          Santiago, Chile
        </div>
      </div>
    ),
    size,
  );
}
