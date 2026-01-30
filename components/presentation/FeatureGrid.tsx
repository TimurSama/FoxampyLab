"use client";

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
}

export default function FeatureGrid({ features, columns = 3 }: FeatureGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="border border-[#E0E0E0]/20 bg-[#050505]/50 p-6 hover:border-[#E0E0E0]/40 hover:bg-[#E0E0E0]/5 transition-all group"
        >
          <div className="mb-4">
            <div className="w-12 h-12 border border-[#E0E0E0]/20 flex items-center justify-center group-hover:border-[#E0E0E0] transition-colors">
              <feature.icon size={24} className="text-[#E0E0E0] group-hover:text-[#FFFFFF] transition-colors" />
            </div>
          </div>
          <h3 className="font-mono text-base text-[#E0E0E0] mb-2 group-hover:text-[#FFFFFF] transition-colors">
            {feature.title}
          </h3>
          <p className="font-mono text-xs text-[#E0E0E0]/60 leading-relaxed">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}











