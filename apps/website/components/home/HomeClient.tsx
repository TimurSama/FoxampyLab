"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveSphere from '@/components/visuals/InteractiveSphere';
import PointGlobe from '@/components/visuals/PointGlobe';
import TerrainGrid from '@/components/visuals/TerrainGrid';
import WireframeBubbles from '@/components/visuals/WireframeBubbles';
import MethodologyLayers from '@/components/visuals/MethodologyLayers';
import BootSequence from '@/components/boot/BootSequence';
import { useI18n } from '@/lib/i18n/context';

interface HomeClientProps {
  children: React.ReactNode;
}

export default function HomeClient({ children }: HomeClientProps) {
  const { t } = useI18n();
  const [isBooting, setIsBooting] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Быстрая заставка - 0.8 секунды вместо 2.5
    const timer = setTimeout(() => setIsBooting(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Обёртка для children с интерактивными элементами
  return (
    <div ref={containerRef} className="relative w-full">
      {/* Boot sequence overlay - поверх всего контента */}
      <AnimatePresence>
        {isBooting && <BootSequence />}
      </AnimatePresence>

      {/* Основной контент - всегда видимый для SEO */}
      <div className={isBooting ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        {children}
      </div>
    </div>
  );
}

// Экспортируем компоненты для интерактивных визуализаций
export { InteractiveSphere, PointGlobe, TerrainGrid, WireframeBubbles, MethodologyLayers };
