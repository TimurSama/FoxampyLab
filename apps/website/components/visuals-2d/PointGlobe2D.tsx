"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

/**
 * 2D SVG версия глобуса из точек (вместо Three.js)
 */

interface PointGlobe2DProps {
  size?: number;
  pointCount?: number;
  className?: string;
}

export function PointGlobe2D({ 
  size = 400, 
  pointCount = 150,
  className = "" 
}: PointGlobe2DProps) {
  const points = useMemo(() => {
    const pts: { x: number; y: number; z: number; size: number }[] = [];
    
    // Фибonacci sphere algorithm для равномерного распределения
    const phi = Math.PI * (3 - Math.sqrt(5));
    
    for (let i = 0; i < pointCount; i++) {
      const y = 1 - (i / (pointCount - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      
      pts.push({
        x: x * (size / 2 - 20),
        y: y * (size / 2 - 20),
        z: z,
        size: Math.random() * 2 + 1,
      });
    }
    
    return pts;
  }, [pointCount, size]);

  const center = size / 2;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* SVG глобус */}
      <svg 
        width={size} 
        height={size} 
        className="absolute inset-0"
        style={{ transform: "rotateX(20deg)" }}
      >
        <defs>
          <radialGradient id="globe-glow">
            <stop offset="0%" stopColor="rgba(100,100,110,0.3)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Фоновое свечение */}
        <circle
          cx={center}
          cy={center}
          r={size / 2 - 10}
          fill="url(#globe-glow)"
        />

        {/* Меридианы */}
        {[0, 30, 60, 90, 120, 150].map((deg, i) => (
          <motion.ellipse
            key={`meridian-${i}`}
            cx={center}
            cy={center}
            rx={(size / 2 - 20) * Math.sin((deg * Math.PI) / 180)}
            ry={size / 2 - 20}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
            style={{ transformOrigin: "center" }}
          />
        ))}

        {/* Параллели */}
        {[0.3, 0.6, 0.9].map((scale, i) => (
          <ellipse
            key={`parallel-${i}`}
            cx={center}
            cy={center}
            rx={(size / 2 - 20) * scale}
            ry={(size / 2 - 20) * scale * 0.3}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        ))}

        {/* Точки */}
        {points.map((pt, i) => {
          // Простая проекция
          const projectedX = center + pt.x;
          const projectedY = center + pt.y;
          const opacity = (pt.z + 1) / 2 * 0.8 + 0.2;
          
          return (
            <motion.circle
              key={i}
              cx={projectedX}
              cy={projectedY}
              r={pt.size}
              fill="white"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [opacity * 0.5, opacity, opacity * 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3,
              }}
            />
          );
        })}

        {/* Соединения между близкими точками */}
        {points.slice(0, 30).map((pt1, i) => {
          return points.slice(i + 1, i + 5).map((pt2, j) => {
            const dist = Math.sqrt(
              Math.pow(pt1.x - pt2.x, 2) + 
              Math.pow(pt1.y - pt2.y, 2)
            );
            
            if (dist > 60) return null;
            
            return (
              <line
                key={`line-${i}-${j}`}
                x1={center + pt1.x}
                y1={center + pt1.y}
                x2={center + pt2.x}
                y2={center + pt2.y}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.5"
              />
            );
          });
        })}
      </svg>

      {/* Вращающееся кольцо */}
      <motion.div
        className="absolute inset-0 rounded-full border border-white/10"
        style={{ margin: 10 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
