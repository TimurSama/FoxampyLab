"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface InkBlobProps {
  className?: string;
}

export default function InkBlob({ className = '' }: InkBlobProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const animate = () => {
      const paths = svg.querySelectorAll('path');
      paths.forEach((path, i) => {
        const d = path.getAttribute('d');
        if (!d) return;

        // Simple morphing animation
        const morph = Math.sin(Date.now() / 2000 + i) * 20;
        // This is a simplified version - in production you'd use proper morphing
      });
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.svg
      ref={svgRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="inkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#1a0033" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <motion.path
        d="M200,200 Q250,150 300,200 T400,200 Q350,250 300,200 T200,200 Q150,150 100,200 T0,200 Q50,250 100,200 T200,200"
        fill="url(#inkGradient)"
        animate={{
          d: [
            "M200,200 Q250,150 300,200 T400,200 Q350,250 300,200 T200,200 Q150,150 100,200 T0,200 Q50,250 100,200 T200,200",
            "M200,200 Q280,120 300,200 T400,200 Q320,280 300,200 T200,200 Q120,280 100,200 T0,200 Q80,120 100,200 T200,200",
            "M200,200 Q250,150 300,200 T400,200 Q350,250 300,200 T200,200 Q150,150 100,200 T0,200 Q50,250 100,200 T200,200",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  );
}
