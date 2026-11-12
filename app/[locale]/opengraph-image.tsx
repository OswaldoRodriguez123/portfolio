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
          backgroundColor: "#0F2A24",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#F1F1EA",
            lineHeight: 1.05,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 36,
            color: "rgba(241,241,234,0.8)",
            lineHeight: 1.3,
          }}
        >
          AI and full-stack engineer
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 24,
            color: "rgba(241,241,234,0.7)",
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
