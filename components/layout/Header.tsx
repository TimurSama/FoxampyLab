"use client";

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Activity, Radio } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: '55.7558', lon: '37.6173' });
  const { scrollY } = useScroll();
  
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 10]);

  useEffect(() => {
    // Get user's approximate location (optional)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude.toFixed(4),
            lon: position.coords.longitude.toFixed(4)
          });
        },
        () => {
          // Use default Moscow coordinates if denied
        }
      );
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogoHover = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ opacity: headerOpacity }}
          className="fixed top-0 left-0 right-0 z-50 safe-top"
        >
          <motion.div 
            className="mx-4 md:mx-8 mt-4 border border-stone-anthracite/30 bg-ink-deep/80 backdrop-blur-xl"
            style={{ backdropFilter: `blur(${headerBlur}px)` }}
          >
            {/* Main header row */}
            <div className="px-4 md:px-6 py-3 flex items-center justify-between">
              {/* Logo */}
              <Link href="/">
                <motion.div 
                  className="flex items-center gap-3 cursor-pointer group"
                  onMouseEnter={handleLogoHover}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative">
                    <motion.span 
                      className={`font-mono text-sm md:text-base tracking-[0.2em] text-engrave-fresco transition-all ${isGlitching ? 'glitch-text' : ''}`}
                    >
                      ◈ FRACTALIX.LAB
                    </motion.span>
                    {isGlitching && (
                      <>
                        <span className="absolute inset-0 font-mono text-sm md:text-base tracking-[0.2em] text-red-500/50 translate-x-[2px]">
                          ◈ FRACTALIX.LAB
                        </span>
                        <span className="absolute inset-0 font-mono text-sm md:text-base tracking-[0.2em] text-blue-500/50 -translate-x-[2px]">
                          ◈ FRACTALIX.LAB
                        </span>
                      </>
                    )}
                  </div>
                </motion.div>
              </Link>

              {/* Status indicator */}
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 border border-green-500/20 bg-green-500/5">
                  <motion.div 
                    className="w-2 h-2 bg-green-500 rounded-full"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="font-mono text-[10px] text-green-500/80 tracking-widest">
                    ONLINE
                  </span>
                </div>
              </div>

              {/* Window controls (decorative) */}
              <div className="flex items-center gap-2">
                <button className="w-3 h-3 rounded-full border border-stone-graphite/50 hover:bg-stone-graphite/30 transition-colors" />
                <button className="w-3 h-3 rounded-full border border-stone-graphite/50 hover:bg-stone-graphite/30 transition-colors" />
                <button className="w-3 h-3 rounded-full border border-stone-graphite/50 hover:bg-engrave-line/20 transition-colors" />
              </div>
            </div>

            {/* Sub-header with system info */}
            <div className="px-4 md:px-6 py-2 border-t border-stone-anthracite/20 flex items-center justify-between">
              <div className="flex items-center gap-4 md:gap-6 font-mono text-[8px] md:text-[9px] text-stone-graphite tracking-widest">
                <span className="flex items-center gap-1">
                  <Activity size={10} className="text-engrave-dim" />
                  v3.0.1
                </span>
                <span className="hidden sm:inline">PROTOCOL_ACTIVE</span>
                <span className="hidden md:flex items-center gap-1">
                  <Radio size={10} className="text-engrave-dim" />
                  LAT:{coordinates.lat} LON:{coordinates.lon}
                </span>
              </div>
              
              <div className="font-mono text-[8px] md:text-[9px] text-stone-graphite tracking-widest">
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  SIGNAL_STRONG
                </motion.span>
              </div>
            </div>
          </motion.div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

