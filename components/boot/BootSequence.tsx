"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const bootLines = [
  'INITIALIZING FRACTALIX.LAB...',
  'LOADING NEURAL INTERFACE...',
  'CALIBRATING VISUAL SYSTEMS...',
  'ESTABLISHING QUANTUM LINK...',
  'BOOT SEQUENCE COMPLETE',
];

export default function BootSequence() {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (currentLine >= bootLines.length) return;

    const line = bootLines[currentLine];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= line.length) {
        setDisplayedText(line.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentLine(prev => prev + 1);
          setDisplayedText('');
        }, 200);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [currentLine]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-ink-deep flex items-center justify-center"
    >
      <div className="w-full max-w-md px-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="font-mono text-2xl md:text-3xl tracking-[0.4em] text-engrave-fresco">
            FRACTALIX
          </div>
          <div className="font-mono text-xs tracking-[0.8em] text-stone-graphite mt-2">
            .LAB
          </div>
        </motion.div>

        {/* Boot text */}
        <div className="font-mono text-xs text-stone-graphite space-y-1 h-32">
          {bootLines.slice(0, currentLine).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.5, x: 0 }}
              className="flex items-center gap-2"
            >
              <span className="text-green-500/60">✓</span>
              <span>{line}</span>
            </motion.div>
          ))}
          
          {currentLine < bootLines.length && (
            <div className="flex items-center gap-2">
              <span className="text-engrave-line animate-pulse">▸</span>
              <span className="text-engrave-line">{displayedText}</span>
              <span className="animate-pulse">▌</span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-8 h-px bg-stone-anthracite overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.3, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-stone-graphite via-engrave-line to-stone-graphite"
          />
        </div>

        {/* Version info */}
        <div className="mt-4 flex justify-between font-mono text-[9px] text-stone-graphite">
          <span>BOOT v3.0.1</span>
          <span>SYS_READY</span>
        </div>
      </div>
    </motion.div>
  );
}

