"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { CameraControls } from "./camera-controls";
import { ViewerGrid } from "./grid";
import { ParametricModel } from "./parametric-model";
import { DimensionLabels } from "./dimension-labels";

interface ViewerSceneProps {
  designData: {
    geometry_type?: string;
    dimensions: {
      length_mm: number;
      width_mm: number;
      height_mm: number;
      radius_mm?: number;
      total_volume_cm3?: number;
    };
    material_recommendations?: Array<{ material: string }>;
  };
}

export function ViewerScene({ designData }: ViewerSceneProps) {
  const { geometry_type = "box", dimensions, material_recommendations } = designData;
  const materialName = material_recommendations?.[0]?.material;

  // Auto-calculate a reasonable camera position based on part size
  const maxDim = Math.max(dimensions.length_mm, dimensions.width_mm, dimensions.height_mm);
  const camDistance = maxDim * 2;

  return (
    <div className="w-full h-[700px] min-h-[700px] rounded-lg border border-slate-800 bg-slate-950/50 overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
        <div className="bg-slate-900/80 border border-slate-800 rounded px-3 py-2 backdrop-blur-md">
          <h3 className="text-sm font-semibold text-slate-200">Parametric Preview</h3>
          <p className="text-xs text-slate-400 mt-1">Geometry: {geometry_type.toUpperCase()}</p>
          {materialName && <p className="text-xs text-slate-400">Material: {materialName}</p>}
        </div>
      </div>

      <Canvas
        camera={{ position: [camDistance, camDistance * 0.7, camDistance], fov: 45 }}
        shadows
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[1000, 1000, 500]} intensity={1} castShadow />
          
          <ViewerGrid />
          <ParametricModel 
            geometryType={geometry_type} 
            dimensions={dimensions} 
            materialName={materialName}
          />
          <DimensionLabels 
            dimensions={dimensions} 
            geometryType={geometry_type} 
          />
          <CameraControls />
        </Suspense>
      </Canvas>
    </div>
  );
}
