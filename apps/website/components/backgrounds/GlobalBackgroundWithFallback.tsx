"use client";

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import LiquidMercury from './LiquidMercury';
import OilCSSBackground from '@/components/visuals/OilCSSBackground';

export default function GlobalBackgroundWithFallback() {
    const [useWebGL, setUseWebGL] = useState(true);
    const [webGLLost, setWebGLLost] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        
        // Проверка поддержки WebGL
        const checkWebGL = () => {
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                return !!gl;
            } catch {
                return false;
            }
        };

        // Проверка производительности устройства
        const checkPerformance = () => {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const cores = navigator.hardwareConcurrency || 2;
            const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;
            
            // Отключаем WebGL на слабых устройствах
            return !isMobile && cores >= 4 && memory >= 4;
        };

        if (!checkWebGL() || !checkPerformance()) {
            setUseWebGL(false);
        }
    }, []);

    // Обработка потери WebGL контекста
    useEffect(() => {
        if (!useWebGL || !isClient) return;

        const handleContextLost = (e: Event) => {
            e.preventDefault();
            console.warn('WebGL context lost, switching to CSS fallback');
            setWebGLLost(true);
            setUseWebGL(false);
        };

        const handleContextRestored = () => {
            console.info('WebGL context restored');
            setWebGLLost(false);
        };

        const canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.addEventListener('webglcontextlost', handleContextLost);
            canvas.addEventListener('webglcontextrestored', handleContextRestored);
        }

        return () => {
            if (canvas) {
                canvas.removeEventListener('webglcontextlost', handleContextLost);
                canvas.removeEventListener('webglcontextrestored', handleContextRestored);
            }
        };
    }, [useWebGL, isClient]);

    if (!isClient) {
        return <OilCSSBackground />;
    }

    if (!useWebGL || webGLLost) {
        return <OilCSSBackground />;
    }

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
                    depth: false,
                    preserveDrawingBuffer: false,
                    failIfMajorPerformanceCaveat: true
                }}
                onCreated={({ gl }) => {
                    // Дополнительная проверка после создания контекста
                    if (!gl.getContext()) {
                        setUseWebGL(false);
                    }
                }}
            >
                <Suspense fallback={null}>
                    <LiquidMercury />
                </Suspense>
            </Canvas>
        </div>
    );
}
