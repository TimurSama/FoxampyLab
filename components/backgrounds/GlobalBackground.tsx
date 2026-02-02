"use client";

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import LiquidMercury from './LiquidMercury';

export default function GlobalBackground() {
    return (
        <div className="fixed inset-0 z-[-1]" style={{ pointerEvents: 'auto' }}>
            <Canvas
                camera={{ position: [0, 0, 1] }}
                dpr={[1, 2]}
                gl={{
                    alpha: true,
                    antialias: false,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: false
                }}
            >
                <Suspense fallback={null}>
                    <LiquidMercury />
                </Suspense>
            </Canvas>
        </div>
    );
}
