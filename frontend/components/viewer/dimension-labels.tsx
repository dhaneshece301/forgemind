"use client";

import { Html } from "@react-three/drei";

interface DimensionLabelsProps {
  dimensions: {
    length_mm: number;
    width_mm: number;
    height_mm: number;
    radius_mm?: number;
  };
  geometryType: string;
}

export function DimensionLabels({ dimensions, geometryType }: DimensionLabelsProps) {
  const { length_mm, width_mm, height_mm, radius_mm } = dimensions;

  // The model is centered at (0, height/2, 0).
  
  if (geometryType === "cylinder" || geometryType === "sphere") {
    const r = radius_mm || (length_mm / 2);
    return (
      <group>
        <Html position={[r + 10, height_mm / 2, 0]} center className="pointer-events-none">
          <div className="bg-slate-900/80 text-cyan-400 text-xs px-2 py-1 rounded border border-cyan-800/50 backdrop-blur-sm whitespace-nowrap">
            H: {height_mm}mm
          </div>
        </Html>
        <Html position={[0, height_mm + 10, 0]} center className="pointer-events-none">
          <div className="bg-slate-900/80 text-cyan-400 text-xs px-2 py-1 rounded border border-cyan-800/50 backdrop-blur-sm whitespace-nowrap">
            R: {r}mm
          </div>
        </Html>
      </group>
    );
  }

  // Box / Plate
  return (
    <group>
      {/* Length (X axis) */}
      <Html position={[0, -10, width_mm / 2 + 10]} center className="pointer-events-none">
        <div className="bg-slate-900/80 text-cyan-400 text-xs px-2 py-1 rounded border border-cyan-800/50 backdrop-blur-sm whitespace-nowrap">
          L: {length_mm}mm
        </div>
      </Html>
      
      {/* Width (Z axis) */}
      <Html position={[length_mm / 2 + 10, -10, 0]} center className="pointer-events-none">
        <div className="bg-slate-900/80 text-cyan-400 text-xs px-2 py-1 rounded border border-cyan-800/50 backdrop-blur-sm whitespace-nowrap">
          W: {width_mm}mm
        </div>
      </Html>

      {/* Height (Y axis) */}
      <Html position={[length_mm / 2 + 10, height_mm / 2, width_mm / 2 + 10]} center className="pointer-events-none">
        <div className="bg-slate-900/80 text-cyan-400 text-xs px-2 py-1 rounded border border-cyan-800/50 backdrop-blur-sm whitespace-nowrap">
          H: {height_mm}mm
        </div>
      </Html>
    </group>
  );
}
