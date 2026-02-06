"use client";

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { usePerformance } from '@/lib/context/PerformanceContext';
import LiquidMercury from './LiquidMercury';
import OilCSSBackground from '@/components/visuals/OilCSSBackground';

export default function GlobalBackground() {
    const { shouldDisableWebGL, isLoading } = usePerformance();
    
    // Показываем CSS fallback пока определяем производительность или если WebGL отключен
    if (isLoading || shouldDisableWebGL) {
        return <OilCSSBackground />;
    }
    
    return (
        <div className="fixed inset-0" style={{ pointerEvents: 'auto', zIndex: -2 }}>
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
                onCreated={({ gl }) => {
                    // Обработка потери WebGL контекста
                    const canvas = gl.domElement;
                    canvas.addEventListener('webglcontextlost', (e) => {
                        e.preventDefault();
                        // Переключимся на CSS fallback
                        window.location.reload();
                    });
                }}
            >
                <Suspense fallback={<OilCSSBackground />}>
                    <LiquidMercury />
                </Suspense>
            </Canvas>
        </div>
    );
}
