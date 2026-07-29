"use client";

import { useRef } from "react";
import { Mesh } from "three";

interface ParametricModelProps {
  geometryType: string;
  dimensions: {
    length_mm: number;
    width_mm: number;
    height_mm: number;
    radius_mm?: number;
  };
  materialName?: string;
}

export function ParametricModel({ geometryType, dimensions, materialName }: ParametricModelProps) {
  const meshRef = useRef<Mesh>(null);
  
  const { length_mm, width_mm, height_mm, radius_mm } = dimensions;
  
  // Default to a shiny metallic material for engineering parts
  const materialProps = {
    color: "#94a3b8", // Slate 400
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
  };

  // Center the geometry so its base is on the grid (y = 0)
  const posY = height_mm / 2;

  const renderGeometry = () => {
    switch (geometryType?.toLowerCase()) {
      case "cylinder": {
        const r = radius_mm || (length_mm / 2);
        return <cylinderGeometry args={[r, r, height_mm, 64]} />;
      }
      case "sphere": {
        const r = radius_mm || (length_mm / 2);
        return <sphereGeometry args={[r, 64, 64]} />;
      }
      case "plate":
        // Plates are just thin boxes
        return <boxGeometry args={[length_mm, height_mm, width_mm]} />;
      case "box":
      default:
        return <boxGeometry args={[length_mm, height_mm, width_mm]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={[0, posY, 0]} castShadow receiveShadow>
      {renderGeometry()}
      <meshPhysicalMaterial {...materialProps} />
    </mesh>
  );
}
