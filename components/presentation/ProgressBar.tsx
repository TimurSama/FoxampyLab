"use client";

import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
  showValue?: boolean;
  animated?: boolean;
}

export default function ProgressBar({ 
  value, 
  max = 100, 
  label, 
  color = '#E0E0E0',
  showValue = true,
  animated = true
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-[#E0E0E0]/60">{label}</span>
          {showValue && (
            <span className="font-mono text-xs text-[#E0E0E0]">{value}{max !== 100 ? ` / ${max}` : '%'}</span>
          )}
        </div>
      )}
      <div className="h-2 bg-[#050505] border border-[#E0E0E0]/20 overflow-hidden relative">
        {animated ? (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full"
            style={{ backgroundColor: color }}
          />
        ) : (
          <div 
            className="h-full transition-all duration-500"
            style={{ width: `${percentage}%`, backgroundColor: color }}
          />
        )}
      </div>
    </div>
  );
}








