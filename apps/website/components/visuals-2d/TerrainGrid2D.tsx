"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

/**
 * 2D CSS Grid версия terrain (вместо Three.js)
 * Использует CSS transforms + grid
 */

interface TerrainGrid2DProps {
  cols?: number;
  rows?: number;
  className?: string;
}

export function TerrainGrid2D({ cols = 20, rows = 15, className = "" }: TerrainGrid2DProps) {
  // Генерируем высоты для ячеек
  const cells = useMemo(() => {
    const c: { height: number; delay: number }[] = [];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Perlin-like noise (simplified)
        const noise = 
          Math.sin(col * 0.3) * Math.cos(row * 0.3) * 0.5 +
          Math.sin(col * 0.1 + row * 0.1) * 0.3 +
          Math.random() * 0.2;
        
        c.push({
          height: Math.max(0.1, noise + 0.5),
          delay: (row + col) * 0.05,
        });
      }
    }
    
    return c;
  }, [cols, rows]);

  return (
    <div className={`relative ${className}`} style={{ perspective: "1000px" }}>
      {/* Грид */}
      <motion.div
        className="grid gap-0.5"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          transform: "rotateX(60deg) rotateZ(-10deg)",
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {cells.map((cell, i) => (
          <motion.div
            key={i}
            className="relative bg-gradient-to-t from-white/10 to-transparent border border-white/5"
            style={{
              aspectRatio: "1",
            }}
            initial={{ scaleY: 0 }}
            animate={{ 
              scaleY: cell.height,
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              scaleY: {
                duration: 0.5,
                delay: cell.delay,
              },
              opacity: {
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: cell.delay,
              },
            }}
          >
            {/* Верхняя грань */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5"
              style={{
                transform: "translateZ(1px)",
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Пульсирующие линии */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={i}
            x1="0%"
            y1={`${20 + i * 15}%`}
            x2="100%"
            y2={`${20 + i * 15}%`}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            strokeDasharray="5,10"
            animate={{
              strokeDashoffset: [0, -30],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
