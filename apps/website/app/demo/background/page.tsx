"use client";

import { useState } from 'react';

// Простой CSS фон для демо
const backgroundStyles = {
  smart: 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0f0f1e 50%, #000000 100%)',
  webgl: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f1e 100%)',
  css: 'radial-gradient(ellipse at top, #1a1a2e 0%, #000000 70%)',
};

export default function BackgroundDemo() {
  const [variant, setVariant] = useState<'smart' | 'webgl' | 'css'>('smart');

  return (
    <div 
      className="relative w-full h-screen overflow-hidden transition-all duration-700"
      style={{ background: backgroundStyles[variant] }}
    >
      {/* Выбор варианта фона */}
      <div className="absolute top-4 left-4 z-50 flex gap-2">
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
          CSS
        </button>
      </div>

      {/* Информация о текущем варианте */}
      <div className="absolute top-4 right-4 z-50 font-mono text-xs text-[#E0E0E0]/60 max-w-xs text-right">
        {variant === 'smart' && 'Автоматический выбор фона'}
        {variant === 'webgl' && 'WebGL визуализации'}
        {variant === 'css' && 'CSS градиенты'}
      </div>

      {/* Контент поверх фона */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-mono text-[#E0E0E0] leading-tight mb-6">
            Background Demo
          </h1>
          <p className="text-lg md:text-xl font-mono text-[#E0E0E0]/80 leading-relaxed mb-8">
            Выберите вариант фона
          </p>
          <div className="font-mono text-xs text-[#E0E0E0]/60">
            Current: {variant}
          </div>
        </div>
      </div>

      {/* Декоративные углы */}
      <div className="fixed top-4 left-4 w-8 h-8 border-t border-l border-[#E0E0E0]/20 pointer-events-none z-20" />
      <div className="fixed top-4 right-4 w-8 h-8 border-t border-r border-[#E0E0E0]/20 pointer-events-none z-20" />
      <div className="fixed bottom-4 left-4 w-8 h-8 border-b border-l border-[#E0E0E0]/20 pointer-events-none z-20" />
      <div className="fixed bottom-4 right-4 w-8 h-8 border-b border-r border-[#E0E0E0]/20 pointer-events-none z-20" />
    </div>
  );
}
