"use client";

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

interface KonamiCodeProps {
  onActivate: () => void;
}

export default function KonamiCode({ onActivate }: KonamiCodeProps) {
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const checkSequence = useCallback((sequence: string[]) => {
    const konamiString = KONAMI_CODE.join(',');
    const inputString = sequence.slice(-KONAMI_CODE.length).join(',');
    return inputString === konamiString;
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...inputSequence, e.code].slice(-KONAMI_CODE.length);
      setInputSequence(newSequence);
      
      if (checkSequence(newSequence)) {
        setShowEasterEgg(true);
        onActivate();
        
        // Generate particles
        const newParticles = Array.from({ length: 50 }, (_, i) => ({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight
        }));
        setParticles(newParticles);
        
        setTimeout(() => {
          setShowEasterEgg(false);
          setParticles([]);
        }, 5000);
        
        setInputSequence([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputSequence, checkSequence, onActivate]);

  // Progress indicator
  const progress = inputSequence.length > 0 
    ? inputSequence.filter((key, i) => key === KONAMI_CODE[i]).length / KONAMI_CODE.length 
    : 0;

  return (
    <>
      {/* Progress indicator (subtle) */}
      {progress > 0 && progress < 1 && (
        <div className="fixed bottom-4 right-4 z-[200]">
          <div className="w-20 h-1 bg-stone-anthracite/30 overflow-hidden">
            <motion.div 
              className="h-full bg-engrave-line/50"
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Easter egg animation */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] pointer-events-none overflow-hidden"
          >
            {/* Particles */}
            {particles.map(particle => (
              <motion.div
                key={particle.id}
                initial={{ 
                  x: particle.x, 
                  y: particle.y,
                  scale: 0,
                  opacity: 1
                }}
                animate={{ 
                  y: particle.y - 500,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 3,
                  delay: Math.random() * 0.5,
                  ease: 'easeOut'
                }}
                className="absolute text-2xl"
              >
                {['◈', '✦', '◆', '★', '●'][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}

            {/* Central message */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', damping: 15 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-ink-chrome/95 border border-engrave-line/50 px-12 py-8 text-center">
                <motion.div
                  animate={{ 
                    textShadow: [
                      '0 0 10px rgba(255,255,255,0.5)',
                      '0 0 20px rgba(255,255,255,0.8)',
                      '0 0 10px rgba(255,255,255,0.5)'
                    ]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="font-mono text-3xl text-engrave-fresco mb-4"
                >
                  ↑↑↓↓←→←→BA
                </motion.div>
                <div className="font-mono text-sm text-engrave-line tracking-widest">
                  KONAMI CODE ACTIVATED
                </div>
                <div className="font-mono text-[10px] text-stone-graphite mt-2">
                  You found an easter egg!
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

