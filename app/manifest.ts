import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Elaf Muneeb | AI Automation Expert",
    short_name: "Elaf Muneeb",
    description: "AI automation agents built on n8n and Python.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f4ef",
    theme_color: "#c8f23a",
    icons: [{ src: "/icon", sizes: "32x32", type: "image/png" }, { src: "/apple-icon", sizes: "180x180", type: "image/png" }],
  };
}
