"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SectionTransitionProps {
  children: React.ReactNode;
  isActive: boolean;
  transitionType?: 'liquid' | 'mist' | 'blockchain' | 'auto';
  direction?: 'up' | 'down';
}

export default function SectionTransition({
  children,
  isActive,
  transitionType = 'auto',
  direction = 'down'
}: SectionTransitionProps) {
  const [currentType, setCurrentType] = useState<'liquid' | 'mist' | 'blockchain'>('liquid');
  const [transitionIndex, setTransitionIndex] = useState(0);
  const [hasBeenActive, setHasBeenActive] = useState(false);

  // Автоматическое переключение типов анимации
  useEffect(() => {
    if (transitionType === 'auto') {
      const types: ('liquid' | 'mist' | 'blockchain')[] = ['liquid', 'mist', 'blockchain'];
      setCurrentType(types[transitionIndex % types.length]);
    } else {
      setCurrentType(transitionType);
    }
  }, [transitionType, transitionIndex]);

  // Обновление индекса при смене секции
  useEffect(() => {
    if (isActive && !hasBeenActive) {
      setHasBeenActive(true);
    }
    if (isActive) {
      setTransitionIndex(prev => prev + 1);
    }
  }, [isActive, hasBeenActive]);

  // Варианты анимации для разных типов
  const liquidVariants = {
    hidden: {
      opacity: 0,
      scale: 1.1,
      filter: 'blur(20px)',
      clipPath: direction === 'down' 
        ? 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
        : 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: 'blur(20px)',
      clipPath: direction === 'down'
        ? 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
        : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    }
  };

  const mistVariants = {
    hidden: {
      opacity: 0,
      y: direction === 'down' ? -50 : 50,
      filter: 'blur(30px) brightness(0.5)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px) brightness(1)',
    },
    exit: {
      opacity: 0,
      y: direction === 'down' ? 50 : -50,
      filter: 'blur(30px) brightness(0.5)',
    }
  };

  const blockchainVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      filter: 'contrast(0) brightness(0)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'contrast(1) brightness(1)',
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      filter: 'contrast(0) brightness(0)',
    }
  };

  const getVariants = () => {
    switch (currentType) {
      case 'liquid':
        return liquidVariants;
      case 'mist':
        return mistVariants;
      case 'blockchain':
        return blockchainVariants;
      default:
        return liquidVariants;
    }
  };

  const getTransition = () => {
    switch (currentType) {
      case 'liquid':
        return {
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          clipPath: { duration: 1.0, ease: [0.4, 0, 0.2, 1] }
        };
      case 'mist':
        return {
          duration: 1.0,
          ease: [0.25, 0.46, 0.45, 0.94],
          filter: { duration: 0.8 }
        };
      case 'blockchain':
        return {
          duration: 1.0,
          ease: [0.43, 0.13, 0.23, 0.96],
          filter: { duration: 0.9 }
        };
      default:
        return { duration: 1.0 };
    }
  };

  // Для первой загрузки активной секции используем мгновенное появление
  const isInitialActive = !hasBeenActive && isActive;
  
  return (
    <motion.div
      key={`section-${transitionIndex}`}
      initial={isInitialActive ? "visible" : (isActive ? "visible" : "hidden")}
      animate={isActive ? "visible" : "hidden"}
      variants={getVariants()}
      transition={isInitialActive ? { duration: 0 } : getTransition()}
      className={`w-full h-full`}
      style={{ 
        willChange: 'opacity, transform, filter, clip-path',
        position: 'fixed',
        inset: 0,
        zIndex: isActive ? 20 : 0,
        pointerEvents: isActive ? 'auto' : 'none',
        visibility: isActive ? 'visible' : 'hidden'
      }}
    >
      {/* Blockchain эффект - пиксельные линии */}
      {currentType === 'blockchain' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
            <defs>
              <pattern id={`blockchain-grid-${transitionIndex}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" className="text-engrave-fresco/20" />
                <line x1="0" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="0.5" className="text-engrave-fresco/10" />
                <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-engrave-fresco/10" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#blockchain-grid-${transitionIndex})`} />
          </svg>
        </div>
      )}
      
      {/* Основной контент */}
      <div className="relative w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
