"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

// True only when a hardware-accelerated WebGL context is available.
function hasGpu() {
  try {
    const gl = document.createElement("canvas").getContext("webgl");
    if (!gl) return false;
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const name = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return !/swiftshader|llvmpipe|software/i.test(name);
  } catch {
    return false;
  }
}

// Mount the WebGL scene after first paint so text and layout load first.
export default function SceneLayer() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => {
      if (hasGpu()) setReady(true);
    }, 600);
    return () => window.clearTimeout(id);
  }, []);
  return ready ? <Scene /> : null;
}
