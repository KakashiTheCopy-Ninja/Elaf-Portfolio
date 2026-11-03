import { ImageResponse } from "next/og";

export const alt = "Elaf Muneeb | AI Automation Expert";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f4f4ef", color: "#0d0e10", padding: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, letterSpacing: 4 }}>
          <div style={{ width: 28, height: 28, background: "#c8f23a", border: "3px solid #0d0e10", borderRadius: 6 }} />
          ELAF/MUNEEB
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>I build AI agents</div>
          <div style={{ display: "flex", marginTop: 12 }}>
            <div style={{ fontSize: 104, fontWeight: 800, letterSpacing: -4, lineHeight: 1, background: "#c8f23a", padding: "0 20px", borderRadius: 14 }}>that run your busy work.</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, color: "#5b5e66" }}>
          <span>Elaf Muneeb, AI Automation Expert</span>
          <span>n8n · Python · AI agents</span>
        </div>
      </div>
    ),
    size,
  );
}
