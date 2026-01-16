"use client";

import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Регистрируем плагин GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ZAxisControllerProps {
  sections: number; // Количество секций
  depth: number; // Глубина пролета (в единицах Three.js)
}

export default function ZAxisController({ sections, depth }: ZAxisControllerProps) {
  const { camera } = useThree();
  const initialZ = useRef(camera.position.z);

  useEffect(() => {
    // Сохраняем начальную позицию камеры
    initialZ.current = camera.position.z;

    // Создаем ScrollTrigger для управления Z-осью
    const scrollTrigger = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1, // Плавная синхронизация со скроллом
      onUpdate: (self) => {
        // Вычисляем новую позицию Z на основе прогресса скролла
        const progress = self.progress;
        const newZ = initialZ.current - (progress * depth);
        
        // Плавно перемещаем камеру
        gsap.to(camera.position, {
          z: newZ,
          duration: 0.1,
          ease: 'none',
        });
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [camera, depth, sections]);

  return null;
}

