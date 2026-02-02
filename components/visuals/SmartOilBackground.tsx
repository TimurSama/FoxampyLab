"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import OilCSSBackground from '@/components/visuals/OilCSSBackground';

// Динамический импорт WebGL версии
const InteractiveOilBackgroundWithCanvas = dynamic(
  () => import('@/components/visuals/InteractiveOilBackgroundWrapper'),
  { 
    ssr: false,
    loading: () => <OilCSSBackground />
  }
);

// Проверка поддержки WebGL
const checkWebGLSupport = () => {
  if (typeof window === 'undefined') return false;
  
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
};

// Проверка мобильного устройства
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export default function SmartOilBackground() {
  const [useWebGL, setUseWebGL] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Определяем, какую версию использовать
    const hasWebGL = checkWebGLSupport();
    const isMobile = isMobileDevice();
    
    // Используем WebGL только на десктопе с поддержкой
    setUseWebGL(hasWebGL && !isMobile);
  }, []);

  // SSR fallback
  if (!isClient) {
    return <OilCSSBackground />;
  }

  // Выбираем версию в зависимости от возможностей устройства
  return useWebGL ? <InteractiveOilBackgroundWithCanvas /> : <OilCSSBackground />;
}