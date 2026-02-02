"use client";

import { useEffect, useState } from 'react';

export default function OilCSSBackground() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Многослойные градиенты для эффекта жидкости */}
      <div 
        className="absolute inset-0 opacity-40 transition-all duration-700 ease-out"
        style={{
          background: `
            radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, 
              rgba(20, 20, 25, 0.8) 0%, 
              rgba(10, 10, 15, 0.6) 25%, 
              rgba(5, 5, 8, 0.4) 50%, 
              transparent 70%
            ),
            radial-gradient(circle at ${100 - mousePos.x}% ${100 - mousePos.y}%, 
              rgba(30, 30, 35, 0.6) 0%, 
              rgba(15, 15, 20, 0.4) 30%, 
              transparent 60%
            ),
            radial-gradient(circle at ${mousePos.x * 0.8}% ${mousePos.y * 1.2}%, 
              rgba(40, 40, 45, 0.5) 0%, 
              transparent 50%
            )
          `,
          filter: 'blur(40px)',
          transform: `scale(1.2) translate(${(mousePos.x - 50) * 0.02}px, ${(mousePos.y - 50) * 0.02}px)`
        }}
      />
      
      {/* Анимированные волны */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(45deg, 
                transparent 30%, 
                rgba(25, 25, 30, 0.3) 50%, 
                transparent 70%
              )
            `,
            animation: 'oilWave1 15s ease-in-out infinite',
            transformOrigin: 'center'
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(-45deg, 
                transparent 40%, 
                rgba(35, 35, 40, 0.2) 60%, 
                transparent 80%
              )
            `,
            animation: 'oilWave2 20s ease-in-out infinite reverse',
            transformOrigin: 'center'
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(90deg, 
                transparent 20%, 
                rgba(45, 45, 50, 0.15) 50%, 
                transparent 80%
              )
            `,
            animation: 'oilWave3 25s ease-in-out infinite',
            transformOrigin: 'center'
          }}
        />
      </div>

      {/* Металлические блики */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, 
              rgba(200, 200, 210, 0.4) 0%, 
              rgba(150, 150, 160, 0.2) 10%, 
              transparent 30%
            ),
            radial-gradient(circle at ${100 - mousePos.x * 0.7}% ${mousePos.y * 1.3}%, 
              rgba(180, 180, 190, 0.3) 0%, 
              transparent 20%
            )
          `,
          filter: 'blur(2px)',
          mixBlendMode: 'screen'
        }}
      />

      {/* Добавляем CSS анимации */}
      <style jsx>{`
        @keyframes oilWave1 {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); }
          25% { transform: translateX(-50px) translateY(-30px) scale(1.1); }
          50% { transform: translateX(30px) translateY(50px) scale(0.95); }
          75% { transform: translateX(40px) translateY(-20px) scale(1.05); }
        }

        @keyframes oilWave2 {
          0%, 100% { transform: translateX(0) translateY(0) scale(1) rotate(0deg); }
          33% { transform: translateX(60px) translateY(-40px) scale(1.15) rotate(120deg); }
          66% { transform: translateX(-30px) translateY(60px) scale(0.9) rotate(240deg); }
        }

        @keyframes oilWave3 {
          0%, 100% { transform: translateX(0) translateY(0) scaleY(1); }
          20% { transform: translateX(-80px) translateY(20px) scaleY(1.2); }
          40% { transform: translateX(40px) translateY(-60px) scaleY(0.8); }
          60% { transform: translateX(60px) translateY(40px) scaleY(1.1); }
          80% { transform: translateX(-40px) translateY(-40px) scaleY(0.95); }
        }
      `}</style>
    </div>
  );
}