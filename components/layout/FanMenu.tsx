"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  Home, 
  Layers, 
  Rocket, 
  FolderOpen, 
  Terminal, 
  Mail,
  X
} from 'lucide-react';
import Link from 'next/link';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  angle: number;
}

const menuItems: MenuItem[] = [
  { id: 'hub', label: 'HUB', icon: <Home size={18} />, path: '/', angle: -90 },
  { id: 'services', label: 'SERVICES', icon: <Layers size={18} />, path: '/services', angle: -60 },
  { id: 'research', label: 'R&D', icon: <Terminal size={18} />, path: '/research', angle: -30 },
  { id: 'ventures', label: 'VENTURES', icon: <Rocket size={18} />, path: '/ventures', angle: 0 },
  { id: 'join', label: 'JOIN US', icon: <FolderOpen size={18} />, path: '/join', angle: 30 },
  { id: 'contact', label: 'CONTACT', icon: <Mail size={18} />, path: '/contact', angle: 60 },
];

export default function FanMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const radius = 120; // Distance from center

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 safe-bottom">
      {/* Menu items */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2">
            {menuItems.map((item, index) => {
              // Calculate position on arc
              const angleRad = (item.angle * Math.PI) / 180;
              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;

              return (
                <motion.div
                  key={item.id}
                  initial={{ 
                    opacity: 0, 
                    x: 0, 
                    y: 0,
                    scale: 0 
                  }}
                  animate={{ 
                    opacity: 1, 
                    x: x, 
                    y: y,
                    scale: 1 
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: 0, 
                    y: 0,
                    scale: 0 
                  }}
                  transition={{ 
                    duration: 0.3,
                    delay: index * 0.05,
                    type: 'spring',
                    stiffness: 300,
                    damping: 20
                  }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <Link href={item.path}>
                    <motion.button
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => setIsOpen(false)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        relative w-14 h-14 clip-hexagon
                        flex items-center justify-center
                        border transition-all duration-300
                        ${hoveredItem === item.id 
                          ? 'bg-engrave-line/10 border-engrave-line/50 text-engrave-fresco' 
                          : 'bg-ink-chrome/90 border-stone-anthracite/50 text-stone-graphite'
                        }
                        backdrop-blur-sm
                      `}
                    >
                      {item.icon}
                      
                      {/* Tooltip */}
                      <AnimatePresence>
                        {hoveredItem === item.id && (
                          <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute -top-8 left-1/2 -translate-x-1/2 
                                     font-mono text-[9px] tracking-widest text-engrave-line
                                     whitespace-nowrap px-2 py-1 bg-ink-deep/90 border border-stone-anthracite/30"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Central button */}
      <motion.button
        onClick={toggleMenu}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative w-16 h-16 clip-hexagon
          flex flex-col items-center justify-center gap-1
          border transition-all duration-500
          ${isOpen 
            ? 'bg-engrave-line/20 border-engrave-line/50' 
            : 'bg-ink-chrome/90 border-stone-anthracite/50 hover:border-engrave-line/30'
          }
          backdrop-blur-md
        `}
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 clip-hexagon border border-engrave-line/20"
          animate={isOpen ? {} : { 
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={20} className="text-engrave-fresco" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center"
            >
              <span className="text-engrave-line text-lg">◈</span>
              <span className="font-mono text-[7px] tracking-[0.2em] text-stone-graphite">
                MENU
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-ink-deep/60 backdrop-blur-sm -z-10"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

