"use client";

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface PieChartData {
  label: string;
  value: number;
  color?: string;
}

interface PieChartProps {
  data: PieChartData[];
  size?: number;
  showLabels?: boolean;
  showLegend?: boolean;
}

export default function PieChart({ data, size = 200, showLabels = true, showLegend = true }: PieChartProps) {
  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);
  
  const segments = useMemo(() => {
    let currentAngle = -90;
    return data.map((item, index) => {
      const percentage = (item.value / total) * 100;
      const angle = (item.value / total) * 360;
      const startAngle = currentAngle;
      currentAngle += angle;
      
      const x1 = 50 + 50 * Math.cos((startAngle * Math.PI) / 180);
      const y1 = 50 + 50 * Math.sin((startAngle * Math.PI) / 180);
      const x2 = 50 + 50 * Math.cos((currentAngle * Math.PI) / 180);
      const y2 = 50 + 50 * Math.sin((currentAngle * Math.PI) / 180);
      const largeArc = angle > 180 ? 1 : 0;
      
      const path = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`;
      
      return {
        ...item,
        path,
        percentage,
        angle: startAngle + angle / 2,
        labelX: 50 + 35 * Math.cos(((startAngle + angle / 2) * Math.PI) / 180),
        labelY: 50 + 35 * Math.sin(((startAngle + angle / 2) * Math.PI) / 180),
      };
    });
  }, [data, total]);

  const defaultColors = ['#E0E0E0', '#B0B0B0', '#808080', '#505050', '#303030'];

  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-8">
      <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
        <svg width={size} height={size} viewBox="0 0 100 100" className="transform -rotate-90">
          {segments.map((segment, index) => (
            <motion.path
              key={index}
              d={segment.path}
              fill={segment.color || defaultColors[index % defaultColors.length]}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: index * 0.1 }}
            />
          ))}
          {showLabels && segments.map((segment, index) => (
            segment.percentage > 5 && (
              <text
                key={`label-${index}`}
                x={segment.labelX}
                y={segment.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-mono text-[8px] fill-[#050505]"
                transform={`rotate(${segment.angle + 90} ${segment.labelX} ${segment.labelY})`}
              >
                {segment.percentage.toFixed(0)}%
              </text>
            )
          ))}
        </svg>
      </div>
      
      {showLegend && (
        <div className="flex-1 space-y-3">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-3">
              <div 
                className="w-4 h-4 border border-[#E0E0E0]/20"
                style={{ backgroundColor: segment.color || defaultColors[index % defaultColors.length] }}
              />
              <div className="flex-1">
                <div className="font-mono text-sm text-[#E0E0E0]">{segment.label}</div>
                <div className="font-mono text-xs text-[#E0E0E0]/60">{segment.value} ({segment.percentage.toFixed(1)}%)</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}











