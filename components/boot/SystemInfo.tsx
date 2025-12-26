"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SystemInfo() {
  const [time, setTime] = useState('--:--:--');
  const [date, setDate] = useState('----.--.--');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('ru-RU', { hour12: false }));
      setDate(now.toLocaleDateString('ru-RU').split('.').reverse().join('.'));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex items-center gap-4 md:gap-6 font-mono text-[10px] text-stone-graphite"
    >
      <div className="hidden md:flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-engrave-line/40 rounded-full animate-pulse" />
        <span>SYS.ONLINE</span>
      </div>
      
      <div className="flex items-center gap-2 border-l border-stone-anthracite/30 pl-4 md:pl-6">
        <span className="text-stone-anthracite">DATE:</span>
        <span className="text-engrave-line/60">{date}</span>
      </div>
      
      <div className="flex items-center gap-2 border-l border-stone-anthracite/30 pl-4 md:pl-6">
        <span className="text-stone-anthracite">TIME:</span>
        <span className="text-engrave-line/60 tabular-nums">{time}</span>
      </div>
    </motion.div>
  );
}

