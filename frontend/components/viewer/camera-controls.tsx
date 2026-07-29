"use client";

import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";

export function CameraControls() {
  return (
    <>
      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2 + 0.1} // Allow looking slightly below the grid
        minDistance={100}
        maxDistance={2000}
        dampingFactor={0.05}
        enableDamping
      />
      <Environment preset="city" />
      <ContactShadows 
        position={[0, 0, 0]} 
        opacity={0.4} 
        scale={1000} 
        blur={2} 
        far={100} 
      />
    </>
  );
}
