"use client";

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import InkFluid1 from '@/components/backgrounds/InkFluid1';

export default function InkFluidBackgroundCanvas() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{
          alpha: false,
          antialias: true,
          powerPreference: "high-performance"
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
        performance={{ min: 0.5, max: 1 }}
      >
        <Suspense fallback={null}>
          <InkFluid1 />
        </Suspense>
      </Canvas>
    </div>
  );
}