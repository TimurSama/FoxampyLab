"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * 2D CSS-версия жидкого фона (вместо WebGL)
 * Использует CSS gradients + backdrop-filter
 */

interface InkFluid2DProps {
  variant?: "dark" | "oil" | "chrome";
  intensity?: "low" | "medium" | "high";
}

export function InkFluid2D({ variant = "dark", intensity = "medium" }: InkFluid2DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Мобильная оптимизация - отключаем сложные эффекты
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile && containerRef.current) {
      containerRef.current.style.animation = "none";
    }
  }, []);

  const variants = {
    dark: {
      bg: "from-[#030303] via-[#0a0a0a] to-[#030303]",
      blob1: "from-gray-800/20 to-transparent",
      blob2: "from-gray-700/10 to-transparent",
      blob3: "from-black/40 to-transparent",
    },
    oil: {
      bg: "from-[#050505] via-[#0d0d0f] to-[#050505]",
      blob1: "from-gray-700/30 via-gray-800/10 to-transparent",
      blob2: "from-gray-600/20 to-transparent",
      blob3: "from-black/50 to-transparent",
    },
    chrome: {
      bg: "from-[#080808] via-[#121215] to-[#080808]",
      blob1: "from-gray-600/20 to-transparent",
      blob2: "from-gray-500/15 to-transparent",
      blob3: "from-gray-900/40 to-transparent",
    },
  };

  const intensities = {
    low: { blur: "blur-3xl", scale: 0.8 },
    medium: { blur: "blur-2xl", scale: 1 },
    high: { blur: "blur-xl", scale: 1.2 },
  };

  const v = variants[variant];
  const int = intensities[intensity];

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 -z-10 bg-gradient-to-br ${v.bg} overflow-hidden`}
    >
      {/* Основные blob-ы */}
      <motion.div
        className={`absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full bg-gradient-radial ${v.blob1} ${int.blur}`}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, -50, 50, 0],
          scale: [int.scale, int.scale * 1.1, int.scale * 0.9, int.scale],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={`absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial ${v.blob2} ${int.blur}`}
        animate={{
          x: [0, -80, 30, 0],
          y: [0, 80, -30, 0],
          scale: [int.scale, int.scale * 0.9, int.scale * 1.1, int.scale],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      <motion.div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-radial ${v.blob3} ${int.blur}`}
        animate={{
          scale: [int.scale, int.scale * 1.2, int.scale],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Дополнительные пятна для текстуры */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-white/5 blur-2xl"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      {/* Scanlines overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.03) 2px,
            rgba(255,255,255,0.03) 4px
          )`,
        }}
      />

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)`,
        }}
      />

      {/* Noise texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
