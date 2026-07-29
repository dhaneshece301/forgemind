"use client";

import { Grid } from "@react-three/drei";

export function ViewerGrid() {
  return (
    <>
      <Grid
        position={[0, -0.01, 0]}
        args={[1000, 1000]}
        cellSize={10}
        cellThickness={1}
        cellColor="#334155"
        sectionSize={100}
        sectionThickness={1.5}
        sectionColor="#475569"
        fadeDistance={2000}
        fadeStrength={1}
      />
      {/* XYZ axes: Red = X, Green = Y, Blue = Z */}
      <axesHelper args={[200]} />
    </>
  );
}
