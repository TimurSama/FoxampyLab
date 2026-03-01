"use client";

import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';

// Динамический импорт Three.js компонентов (чтобы не грузить при SSR)
import dynamic from 'next/dynamic';

const InteractiveOilBackground = dynamic(
  () => import('@/components/visuals/InteractiveOilBackground'),
  { ssr: false }
);

const SmartOilBackground = dynamic(
  () => import('@/components/visuals/SmartOilBackground'),
  { ssr: false }
);

const OilCSSBackground = dynamic(
  () => import('@/components/visuals/OilCSSBackground'),
  { ssr: false }
);

// Альтернативный CSS фон
const NoirPixelBackground = dynamic(
  () => import('@/components/backgrounds/NoirPixelBackground'),
  { ssr: false }
);

export default function BackgroundDemo() {
  const [variant, setVariant] = useState<'smart' | 'webgl' | 'css' | 'noir'>('smart');

  return (
    <div className="relative w-full h-screen bg-[#030303] overflow-hidden">
      {/* Выбор варианта фона */}
      <div className="absolute top-4 left-4 z-50 flex flex-wrap gap-2">
        <button
          onClick={() => setVariant('smart')}
          className={`px-4 py-2 font-mono text-xs transition-all ${
            variant === 'smart' 
              ? 'bg-[#E0E0E0] text-[#030303]' 
              : 'border border-[#E0E0E0]/40 text-[#E0E0E0] hover:border-[#E0E0E0]'
          }`}
        >
          Smart (Auto)
        </button>
        <button
          onClick={() => setVariant('webgl')}
          className={`px-4 py-2 font-mono text-xs transition-all ${
            variant === 'webgl' 
              ? 'bg-[#E0E0E0] text-[#030303]' 
              : 'border border-[#E0E0E0]/40 text-[#E0E0E0] hover:border-[#E0E0E0]'
          }`}
        >
          WebGL
        </button>
        <button
          onClick={() => setVariant('css')}
          className={`px-4 py-2 font-mono text-xs transition-all ${
            variant === 'css' 
              ? 'bg-[#E0E0E0] text-[#030303]' 
              : 'border border-[#E0E0E0]/40 text-[#E0E0E0] hover:border-[#E0E0E0]'
          }`}
        >
          CSS Oil
        </button>
        <button
          onClick={() => setVariant('noir')}
          className={`px-4 py-2 font-mono text-xs transition-all ${
            variant === 'noir' 
              ? 'bg-[#E0E0E0] text-[#030303]' 
              : 'border border-[#E0E0E0]/40 text-[#E0E0E0] hover:border-[#E0E0E0]'
          }`}
        >
          Noir Pixel
        </button>
      </div>

      {/* Информация о текущем варианте */}
      <div className="absolute top-4 right-4 z-50 font-mono text-xs text-[#E0E0E0]/60 max-w-xs text-right">
        {variant === 'smart' && 'Автоматический выбор (WebGL на десктопе, CSS на мобильных)'}
        {variant === 'webgl' && 'WebGL с шейдерами (высокая производительность)'}
        {variant === 'css' && 'CSS анимации (максимальная совместимость)'}
        {variant === 'noir' && 'Noir Pixel — CSS-only 60fps на всех устройствах'}
      </div>

      {/* Контент поверх фона */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-mono text-[#E0E0E0] leading-tight mb-6">
            Интерактивные Фоны
          </h1>
          <p className="text-lg md:text-xl font-mono text-[#E0E0E0]/80 leading-relaxed mb-8">
            Выберите вариант для предпросмотра
          </p>
          <div className="font-mono text-xs text-[#E0E0E0]/60">
            Current: {variant}
          </div>
        </div>
      </div>

      {/* Выбранный вариант фона */}
      {variant === 'smart' && <SmartOilBackground />}
      
      {variant === 'webgl' && (
        <div className="absolute inset-0">
          <Canvas
            camera={{ position: [0, 0, 1], fov: 75 }}
            gl={{
              alpha: false,
              antialias: true,
              powerPreference: "high-performance"
            }}
            dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
            performance={{ min: 0.5, max: 1 }}
          >
            <Suspense fallback={null}>
              <InteractiveOilBackground />
            </Suspense>
          </Canvas>
        </div>
      )}
      
      {variant === 'css' && <OilCSSBackground />}
      
      {variant === 'noir' && <NoirPixelBackground variant="film" intensity="medium" />}

      {/* Декоративные углы */}
      <div className="fixed top-4 left-4 w-8 h-8 border-t border-l border-[#E0E0E0]/20 pointer-events-none z-20" />
      <div className="fixed top-4 right-4 w-8 h-8 border-t border-r border-[#E0E0E0]/20 pointer-events-none z-20" />
      <div className="fixed bottom-4 left-4 w-8 h-8 border-b border-l border-[#E0E0E0]/20 pointer-events-none z-20" />
      <div className="fixed bottom-4 right-4 w-8 h-8 border-b border-r border-[#E0E0E0]/20 pointer-events-none z-20" />
    </div>
  );
}
