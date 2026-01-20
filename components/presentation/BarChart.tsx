"use client";

import { motion } from 'framer-motion';

interface BarChartData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarChartData[];
  maxValue?: number;
  height?: number;
  showValues?: boolean;
}

export default function BarChart({ data, maxValue, height = 200, showValues = true }: BarChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value));
  const defaultColor = '#E0E0E0';

  return (
    <div className="w-full space-y-4">
      <div className="relative" style={{ height: `${height}px` }}>
        {data.map((item, index) => {
          const percentage = (item.value / max) * 100;
          return (
            <div key={index} className="absolute bottom-0 left-0 right-0 flex items-end gap-2" style={{ height: `${height}px` }}>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${percentage}%` }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                className="flex-1 bg-[#E0E0E0]/20 border border-[#E0E0E0]/30 hover:bg-[#E0E0E0]/30 transition-all relative group"
                style={{ 
                  backgroundColor: item.color ? `${item.color}20` : undefined,
                  borderColor: item.color ? `${item.color}30` : undefined
                }}
              >
                {showValues && (
                  <div className="absolute -top-6 left-0 right-0 text-center">
                    <span className="font-mono text-xs text-[#E0E0E0] opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.value}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-[#E0E0E0]/10 to-transparent" />
              </motion.div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 mt-8">
        {data.map((item, index) => (
          <div key={index} className="flex-1 text-center">
            <div className="font-mono text-xs text-[#E0E0E0]/60 mb-1">{item.label}</div>
            {showValues && (
              <div className="font-mono text-sm text-[#E0E0E0]">{item.value}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}








