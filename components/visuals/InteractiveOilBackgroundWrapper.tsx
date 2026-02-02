"use client";

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import InteractiveOilBackground from '@/components/visuals/InteractiveOilBackground';

export default function InteractiveOilBackgroundWrapper() {
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
          <InteractiveOilBackground />
        </Suspense>
      </Canvas>
    </div>
  );
}