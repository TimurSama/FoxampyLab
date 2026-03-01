"use client";

import { useState } from 'react';
import NoirPixelBackground from '@/components/backgrounds/NoirPixelBackground';

export default function BackgroundDemo() {
  const [variant, setVariant] = useState<'film' | 'rain' | 'static' | 'fog'>('film');

  return (
    <div className="relative w-full h-screen bg-[#030303] overflow-hidden">
      {/* Выбор варианта фона */}
      <div className="absolute top-4 left-4 z-50 flex gap-2">
        <button
          onClick={() => setVariant('film')}
          className={`px-4 py-2 font-mono text-xs transition-all ${
            variant === 'film' 
              ? 'bg-[#E0E0E0] text-[#030303]' 
              : 'border border-[#E0E0E0]/40 text-[#E0E0E0] hover:border-[#E0E0E0]'
          }`}
        >
          Film
        </button>
        <button
          onClick={() => setVariant('rain')}
          className={`px-4 py-2 font-mono text-xs transition-all ${
            variant === 'rain' 
              ? 'bg-[#E0E0E0] text-[#030303]' 
              : 'border border-[#E0E0E0]/40 text-[#E0E0E0] hover:border-[#E0E0E0]'
          }`}
        >
          Rain
        </button>
        <button
          onClick={() => setVariant('static')}
          className={`px-4 py-2 font-mono text-xs transition-all ${
            variant === 'static' 
              ? 'bg-[#E0E0E0] text-[#030303]' 
              : 'border border-[#E0E0E0]/40 text-[#E0E0E0] hover:border-[#E0E0E0]'
          }`}
        >
          Static
        </button>
        <button
          onClick={() => setVariant('fog')}
          className={`px-4 py-2 font-mono text-xs transition-all ${
            variant === 'fog' 
              ? 'bg-[#E0E0E0] text-[#030303]' 
              : 'border border-[#E0E0E0]/40 text-[#E0E0E0] hover:border-[#E0E0E0]'
          }`}
        >
          Fog
        </button>
      </div>

      {/* Информация о текущем варианте */}
      <div className="absolute top-4 right-4 z-50 font-mono text-xs text-[#E0E0E0]/60">
        Noir Pixel Background — {variant} variant
      </div>

      {/* Контент поверх фона */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-mono text-[#E0E0E0] leading-tight mb-6">
            Noir Pixel Background
          </h1>
          <p className="text-lg md:text-xl font-mono text-[#E0E0E0]/80 leading-relaxed mb-8">
            CSS-only фон с эффектом старой пленки
          </p>
          <div className="font-mono text-xs text-[#E0E0E0]/60">
            60fps на всех устройствах • Zero WebGL
          </div>
        </div>
      </div>

      {/* Фон */}
      <NoirPixelBackground variant={variant} intensity="medium" />

      {/* Декоративные углы */}
      <div className="fixed top-4 left-4 w-8 h-8 border-t border-l border-[#E0E0E0]/20 pointer-events-none z-20" />
      <div className="fixed top-4 right-4 w-8 h-8 border-t border-r border-[#E0E0E0]/20 pointer-events-none z-20" />
      <div className="fixed bottom-4 left-4 w-8 h-8 border-b border-l border-[#E0E0E0]/20 pointer-events-none z-20" />
      <div className="fixed bottom-4 right-4 w-8 h-8 border-b border-r border-[#E0E0E0]/20 pointer-events-none z-20" />
    </div>
  );
}
