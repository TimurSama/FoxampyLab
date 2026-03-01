"use client";

import { useEffect, useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import BootSequence from '@/components/boot/BootSequence';

interface HomeClientProps {
  children: React.ReactNode;
}

export default function HomeClient({ children }: HomeClientProps) {
  const [isBooting, setIsBooting] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Быстрая заставка - 0.8 секунды вместо 2.5
    const timer = setTimeout(() => setIsBooting(false), 800);
    return () => clearTimeout(timer);
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
