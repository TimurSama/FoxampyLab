"use client";

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  color?: string;
  delay?: number;
}

export default function StatCard({ icon: Icon, value, label, color = '#E0E0E0', delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="border border-[#E0E0E0]/20 bg-[#050505]/50 p-6 hover:border-[#E0E0E0]/40 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 border border-[#E0E0E0]/20" style={{ color }}>
          <Icon size={24} />
        </div>
        <div className="flex-1">
          <div className="text-3xl font-mono font-light text-[#E0E0E0] mb-1">
            {value}
          </div>
          <div className="font-mono text-xs text-[#E0E0E0]/60 uppercase tracking-wider">
            {label}
          </div>
        </div>
      </div>
    </motion.div>
  );
}











