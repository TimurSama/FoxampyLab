"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * 2D CSS-анимация сферы вместо Three.js
 * Легкая, быстрая, мобильная
 */

interface AnimatedSphereProps {
  size?: number;
  className?: string;
}

export function AnimatedSphere({ size = 300, className = "" }: AnimatedSphereProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.body.getBoundingClientRect();
      setMousePos({
        x: (e.clientX / rect.width - 0.5) * 20,
        y: (e.clientY / rect.height - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Фоновое свечение */}
      <div 
        className="absolute inset-0 rounded-full opacity-30 blur-3xl"
        style={{
          background: `radial-gradient(circle at ${50 + mousePos.x}% ${50 + mousePos.y}%, rgba(60,60,70,0.8) 0%, transparent 70%)`,
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
        }}
      />

      {/* Внешнее кольцо */}
      <motion.div
        className="absolute inset-0 rounded-full border border-white/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {/* Точки на кольце */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              top: `${50 - 50 * Math.cos((deg * Math.PI) / 180)}%`,
              left: `${50 + 50 * Math.sin((deg * Math.PI) / 180)}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </motion.div>

      {/* Среднее кольцо (наклоненное) */}
      <motion.div
        className="absolute inset-4 rounded-full border border-white/15"
        style={{ transform: "rotateX(60deg)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Внутреннее кольцо */}
      <motion.div
        className="absolute inset-8 rounded-full border border-white/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Главная сфера */}
      <div 
        className="absolute inset-12 rounded-full overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${30 + mousePos.x}% ${30 + mousePos.y}%, rgba(80,80,90,0.9) 0%, rgba(20,20,25,1) 50%, rgba(5,5,5,1) 100%)`,
          boxShadow: `
            inset 0 0 60px rgba(0,0,0,0.8),
            inset 20px 20px 40px rgba(255,255,255,0.03),
            0 0 80px rgba(0,0,0,0.5)
          `,
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
        }}
      >
        {/* Wireframe overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <circle cx="50%" cy="50%" r="48%" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="50%" cy="50%" r="35%" fill="none" stroke="white" strokeWidth="0.3" strokeDasharray="3,3" />
          <circle cx="50%" cy="50%" r="20%" fill="none" stroke="white" strokeWidth="0.3" />
        </svg>

        {/* Пульсирующий центр */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            background: [
              "radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 50%)",
              "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 60%)",
              "radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Плавающие элементы */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white/20"
          style={{
            top: "50%",
            left: "50%",
          }}
          animate={{
            x: [0, Math.cos((i * Math.PI) / 2) * 80, 0],
            y: [0, Math.sin((i * Math.PI) / 2) * 80, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}

      {/* Глитч-эффект */}
      <motion.div
        className="absolute inset-0 rounded-full border border-white/5"
        animate={{
          opacity: [0, 0.3, 0, 0.1, 0],
          x: [0, -2, 2, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 5,
          times: [0, 0.2, 0.4, 0.6, 1],
        }}
      />
    </div>
  );
}
