"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight, Hexagon, Layers, Eye } from 'lucide-react';

interface VariantProps {
  variant: {
    id: number;
    name: string;
    version: string;
    description: string;
    path: string;
    features: string[];
    status: string;
  };
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  mousePos: { x: number; y: number };
}

export default function VariantPortal({ 
  variant, 
  index, 
  isActive, 
  onHover, 
  onLeave,
  mousePos 
}: VariantProps) {
  
  const icons = [
    <Hexagon key="hex" size={24} strokeWidth={1} />,
    <Layers key="layers" size={24} strokeWidth={1} />,
    <Eye key="eye" size={24} strokeWidth={1} />
  ];

  const handleClick = () => {
    // Open variant in new tab or navigate
    // For now, alert the path since variants need to be running separately
    window.open(`http://localhost:${3001 + index}`, '_blank');
  };

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + index * 0.15, duration: 0.6 }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      className="group relative text-left w-full touch-target"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-ink-chrome rounded-sm opacity-80 group-hover:opacity-100 transition-opacity" />
      
      {/* Animated border */}
      <motion.div 
        className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `linear-gradient(${135 + mousePos.x * 30}deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)`,
        }}
      />
      
      {/* Border */}
      <div className="absolute inset-0 rounded-sm border border-stone-anthracite/30 group-hover:border-engrave-line/30 transition-colors" />

      {/* Content */}
      <div className="relative p-5 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-stone-graphite group-hover:text-engrave-line/80 transition-colors">
              {icons[index]}
            </div>
            <div>
              <div className="font-mono text-[10px] text-stone-graphite tracking-widest">
                {variant.version}
              </div>
              <div className="font-mono text-lg md:text-xl tracking-wider text-engrave-fresco group-hover:text-white transition-colors">
                {variant.name}
              </div>
            </div>
          </div>
          
          <div className={`
            font-mono text-[8px] px-2 py-1 rounded-sm border
            ${variant.status === 'ACTIVE' 
              ? 'text-green-400/70 border-green-400/30 bg-green-400/5' 
              : variant.status === 'STABLE'
              ? 'text-blue-400/70 border-blue-400/30 bg-blue-400/5'
              : 'text-yellow-400/70 border-yellow-400/30 bg-yellow-400/5'
            }
          `}>
            {variant.status}
          </div>
        </div>

        {/* Description */}
        <p className="font-mono text-xs text-stone-graphite mb-4 leading-relaxed">
          {variant.description}
        </p>

        {/* Features */}
        <div className="space-y-1.5 mb-6">
          {variant.features.map((feature, i) => (
            <div 
              key={i}
              className="flex items-center gap-2 font-mono text-[10px] text-stone-anthracite"
            >
              <span className="w-1 h-px bg-stone-graphite" />
              <span className="group-hover:text-stone-graphite transition-colors">{feature}</span>
            </div>
          ))}
        </div>

        {/* Action */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-anthracite/20">
          <span className="font-mono text-[10px] text-stone-graphite tracking-widest">
            ENTER INTERFACE
          </span>
          <motion.div
            initial={false}
            animate={{ x: isActive ? 4 : 0, opacity: isActive ? 1 : 0.5 }}
            className="text-engrave-line/60 group-hover:text-engrave-line transition-colors"
          >
            <ArrowUpRight size={16} />
          </motion.div>
        </div>
      </div>

      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-stone-anthracite/30 group-hover:border-engrave-line/40 transition-colors" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-stone-anthracite/30 group-hover:border-engrave-line/40 transition-colors" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-stone-anthracite/30 group-hover:border-engrave-line/40 transition-colors" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-stone-anthracite/30 group-hover:border-engrave-line/40 transition-colors" />

      {/* Hover glow effect */}
      <motion.div
        initial={false}
        animate={{ 
          opacity: isActive ? 0.15 : 0,
          scale: isActive ? 1 : 0.8
        }}
        className="absolute inset-0 rounded-sm bg-gradient-to-t from-white/10 to-transparent pointer-events-none"
      />
    </motion.button>
  );
}

