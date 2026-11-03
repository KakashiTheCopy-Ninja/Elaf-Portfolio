// Shared mutable state read every frame by the 3D scene (no React re-renders).
export const sceneState = { section: 0, scrollY: 0 };
export const pointer = { x: 0, y: 0, active: false };
