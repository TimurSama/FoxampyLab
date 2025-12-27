"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/layout/Header';

export default function VariantE() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <Header />
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="font-mono text-[10px] text-[#00ff00] tracking-[0.5em] mb-6"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ─── MATRIX CORE ───
          </motion.div>
          <h1 className="text-5xl font-mono text-[#00ff00] mb-8 drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">
            КИБЕРПАНК ЭСТЕТИКА
          </h1>
          <p className="font-mono text-[#00ff00]/80 mb-12 leading-relaxed">
            Матричный дождь, глитч-эффекты и терминальный интерфейс создают атмосферу
            киберпанка. Зелёные символы на чёрном фоне — классика жанра.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 border border-[#00ff00]/30 bg-black/50">
              <h3 className="font-mono text-sm text-[#00ff00] mb-3">ОСОБЕННОСТИ</h3>
              <ul className="space-y-2 font-mono text-[10px] text-[#00ff00]/70">
                <li>• Матричный дождь</li>
                <li>• Глитч эффекты</li>
                <li>• Терминальный интерфейс</li>
                <li>• Киберпанк стиль</li>
              </ul>
            </div>
            <div className="p-6 border border-[#00ff00]/30 bg-black/50">
              <h3 className="font-mono text-sm text-[#00ff00] mb-3">ЭФФЕКТЫ</h3>
              <ul className="space-y-2 font-mono text-[10px] text-[#00ff00]/70">
                <li>• Падающие символы</li>
                <li>• Глитч текста</li>
                <li>• Терминальные команды</li>
                <li>• ASCII арт</li>
              </ul>
            </div>
          </div>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0,255,0,0.5)' }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-[#00ff00] text-black font-mono text-sm tracking-widest"
            >
              ВЕРНУТЬСЯ НА ГЛАВНУЮ
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}

