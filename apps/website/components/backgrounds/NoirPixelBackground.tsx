"use client";

/**
 * NOIR PIXEL BACKGROUND
 * 2D CSS-анимированный нуарный фон с пиксельной эстетикой
 * Легкий, быстрый, красивый на мобильных
 * 
 * Особенности:
 * - CSS-анимации (не нагружают GPU)
 * - SVG паттерны с pixel-art эффектом
 * - Интерактивность через CSS переменные
 * - Адаптивность под любые экраны
 */

import { useEffect, useRef, useState } from 'react';
import styles from './NoirPixelBackground.module.css';

interface NoirPixelBackgroundProps {
  variant?: 'film' | 'rain' | 'static' | 'fog';
  intensity?: 'low' | 'medium' | 'high';
}

export default function NoirPixelBackground({
  variant = 'film',
  intensity = 'medium',
}: NoirPixelBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Отслеживание мыши для интерактивности
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // CSS переменные для интерактивности
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--mouse-x', String(mousePos.x));
      containerRef.current.style.setProperty('--mouse-y', String(mousePos.y));
    }
  }, [mousePos]);

  const intensityClass = styles[`intensity-${intensity}`];
  const variantClass = styles[`variant-${variant}`];

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${intensityClass} ${variantClass}`}
      aria-hidden="true"
    >
      {/* Базовый градиент */}
      <div className={styles.baseGradient} />
      
      {/* Пиксельный шум (SVG) */}
      <svg className={styles.noise} width="100%" height="100%">
        <defs>
          <filter id="pixelate" x="0" y="0">
            <feFlood x="0" y="0" height="2" width="2" />
            <feComposite width="4" height="4" />
            <feTile result="a" />
            <feComposite in="SourceGraphic" in2="a" operator="in" />
            <feMorphology operator="dilate" radius="1" />
          </filter>
          
          <filter id="grain">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.8" 
              numOctaves="4" 
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.05" />
            </feComponentTransfer>
          </filter>
        </defs>
        
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Scanlines (горизонтальные линии) */}
      <div className={styles.scanlines} />

      {/* Vignette (затемнение по краям) */}
      <div className={styles.vignette} />

      {/* Варианты анимаций */}
      {variant === 'film' && <FilmGrain />}
      {variant === 'rain' && <DigitalRain />}
      {variant === 'static' && <StaticNoise />}
      {variant === 'fog' && <FogEffect />}

      {/* Движущиеся блики (интерактивные) */}
      <div 
        className={styles.lightLeak}
        style={{
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
        }}
      />

      {/* Сетка (опционально) */}
      <div className={styles.grid} />

      {/* Битые пиксели (редкие) */}
      <DeadPixels count={15} />
    </div>
  );
}

// ===== КОМПОНЕНТЫ ВАРИАНТОВ =====

function FilmGrain() {
  return (
    <div className={styles.filmGrain}>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={styles.grainParticle}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${0.5 + Math.random() * 1}s`,
          }}
        />
      ))}
    </div>
  );
}

function DigitalRain() {
  const columns = 30;
  
  return (
    <div className={styles.digitalRain}>
      {[...Array(columns)].map((_, i) => (
        <div
          key={i}
          className={styles.rainColumn}
          style={{
            left: `${(i / columns) * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        >
          {[...Array(10)].map((_, j) => (
            <span
              key={j}
              className={styles.rainChar}
              style={{
                animationDelay: `${j * 0.1}s`,
                opacity: 1 - j * 0.1,
              }}
            >
              {['░', '▒', '▓', '█', '▀', '▄', '■', '□'][Math.floor(Math.random() * 8)]}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function StaticNoise() {
  return (
    <canvas
      className={styles.staticCanvas}
      ref={(canvas) => {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
          canvas.width = window.innerWidth / 4; // Низкое разрешение для эффекта
          canvas.height = window.innerHeight / 4;
        };
        resize();
        window.addEventListener('resize', resize);

        let animationId: number;
        const animate = () => {
          const imageData = ctx.createImageData(canvas.width, canvas.height);
          const data = imageData.data;

          for (let i = 0; i < data.length; i += 4) {
            const value = Math.random() > 0.95 ? 40 : 0; // Редкие белые точки
            data[i] = value;     // R
            data[i + 1] = value; // G
            data[i + 2] = value; // B
            data[i + 3] = 15;    // Alpha (полупрозрачный)
          }

          ctx.putImageData(imageData, 0, 0);
          animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
          cancelAnimationFrame(animationId);
          window.removeEventListener('resize', resize);
        };
      }}
    />
  );
}

function FogEffect() {
  return (
    <div className={styles.fogEffect}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={styles.fogLayer}
          style={{
            animationDelay: `${i * 5}s`,
            animationDuration: `${20 + i * 5}s`,
            opacity: 0.1 + i * 0.05,
          }}
        />
      ))}
    </div>
  );
}

function DeadPixels({ count }: { count: number }) {
  return (
    <div className={styles.deadPixels}>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={styles.deadPixel}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
}
