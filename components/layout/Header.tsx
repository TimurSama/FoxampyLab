"use client";

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Activity, Radio, Search, X, Lock, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Simple hash function for password verification
function hashPassword(pass: string): string {
  let hash = 0;
  for (let i = 0; i < pass.length; i++) {
    const char = pass.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

const ADMIN_HASH = 'a2f89c6'; // hash of 5511055

export default function Header() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: '55.7558', lon: '37.6173' });
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
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

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for admin command
    if (searchQuery.toLowerCase() === 'admin') {
      setShowPasswordModal(true);
      setSearchQuery('');
      setSearchOpen(false);
      return;
    }

    // Regular search - navigate to services or show results
    if (searchQuery.trim()) {
      // Could implement actual search here
      setSearchQuery('');
      setSearchOpen(false);
    }
  }, [searchQuery]);

  const handlePasswordSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (hashPassword(password) === ADMIN_HASH) {
      setShowPasswordModal(false);
      setPassword('');
      router.push('/admin');
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 1000);
    }
  }, [password, router]);

  return (
    <>
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
                          <span className="absolute inset-0 font-mono text-sm md:text-base tracking-[0.2em] text-stone-slate/50 translate-x-[2px]">
                            ◈ FRACTALIX.LAB
                          </span>
                          <span className="absolute inset-0 font-mono text-sm md:text-base tracking-[0.2em] text-engrave-line/50 -translate-x-[2px]">
                            ◈ FRACTALIX.LAB
                          </span>
                        </>
                      )}
                    </div>
                  </motion.div>
                </Link>

                {/* Game Mode Button */}
                <Link href="/game">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-2 md:px-3 py-1.5 border border-stone-anthracite/50 
                             hover:border-engrave-line/30 transition-colors"
                  >
                    <span className="font-mono text-[8px] md:text-[9px] text-stone-slate tracking-widest">
                      <span className="hidden sm:inline">ИГРА</span>
                      <span className="sm:hidden">GAME</span>
                    </span>
                  </motion.div>
                </Link>

                {/* Vote for Design Button */}
                <Link href="/vote">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-2 md:px-3 py-1.5 border border-stone-anthracite/50 
                             hover:border-engrave-line/30 transition-colors"
                  >
                    <BarChart3 size={12} className="text-engrave-dim" />
                    <span className="font-mono text-[8px] md:text-[9px] text-stone-slate tracking-widest">
                      <span className="hidden sm:inline">ВЫБРАТЬ ДИЗАЙН</span>
                      <span className="sm:hidden">ГОЛОС</span>
                    </span>
                  </motion.div>
                </Link>

                {/* Search + Status */}
                <div className="flex items-center gap-3">
                  {/* Status indicator */}
                  <div className="hidden md:flex items-center gap-2 px-3 py-1 border border-engrave-line/20">
                    <motion.div 
                      className="w-2 h-2 bg-engrave-line"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="font-mono text-[10px] text-engrave-dim tracking-widest">
                      ONLINE
                    </span>
                  </div>

                  {/* Search */}
                  <div className="relative">
                    {searchOpen ? (
                      <form onSubmit={handleSearchSubmit} className="flex items-center">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="поиск..."
                          autoFocus
                          className="w-32 md:w-48 px-3 py-1.5 bg-ink-chrome border border-stone-anthracite/50 
                                   font-mono text-xs text-engrave-fresco placeholder-stone-anthracite
                                   focus:border-engrave-line/30 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                          className="p-1.5 text-stone-slate hover:text-engrave-line ml-1"
                        >
                          <X size={14} />
                        </button>
                      </form>
                    ) : (
                      <button
                        onClick={() => setSearchOpen(true)}
                        className="p-2 border border-stone-anthracite/30 text-stone-slate 
                                 hover:text-engrave-line hover:border-engrave-line/20 transition-colors"
                      >
                        <Search size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Sub-header with system info */}
              <div className="px-4 md:px-6 py-2 border-t border-stone-anthracite/20 flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-6 font-mono text-[8px] md:text-[9px] text-stone-slate tracking-widest">
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
                
                <div className="font-mono text-[8px] md:text-[9px] text-stone-slate tracking-widest">
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

      {/* Admin Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-ink-deep/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowPasswordModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`bg-ink-chrome border ${passwordError ? 'border-stone-slate' : 'border-stone-anthracite/50'} p-8 max-w-sm w-full transition-colors`}
            >
              <div className="flex items-center gap-3 mb-6">
                <Lock size={24} className="text-engrave-line" />
                <div>
                  <h2 className="font-mono text-lg text-engrave-fresco tracking-wider">
                    ADMIN ACCESS
                  </h2>
                  <p className="font-mono text-[10px] text-stone-slate">
                    Введите пароль для доступа
                  </p>
                </div>
              </div>

              <form onSubmit={handlePasswordSubmit}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoFocus
                  className={`w-full px-4 py-3 bg-ink-deep border ${passwordError ? 'border-stone-slate' : 'border-stone-anthracite/50'} 
                           font-mono text-sm text-engrave-fresco
                           focus:border-engrave-line/30 focus:outline-none transition-colors mb-4`}
                />
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 py-3 border border-stone-anthracite/50 font-mono text-xs text-stone-slate
                             hover:border-engrave-line/20 transition-colors"
                  >
                    ОТМЕНА
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-engrave-fresco text-ink-deep font-mono text-xs tracking-widest"
                  >
                    ВОЙТИ
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
