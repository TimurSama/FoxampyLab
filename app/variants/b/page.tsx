"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/layout/Header';

export default function VariantB() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      <div className="fixed inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />
      
      <Header />
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-[10px] text-[#00ffff] tracking-[0.5em] mb-6">
            ─── FRACTALIX v2 ───
          </div>
          <h1 className="text-5xl font-mono text-[#00ffff] mb-8 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
            ТЁМНАЯ ТЕМА С НЕОНОМ
          </h1>
          <p className="font-mono text-[#888] mb-12 leading-relaxed">
            Киберпанк эстетика с неоновыми акцентами, динамичными анимациями и частицами.
            Глубокий чёрный фон создаёт контраст с яркими неоновыми элементами.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 border border-[#00ffff]/30 bg-[#001a1a]/50">
              <h3 className="font-mono text-sm text-[#00ffff] mb-3">ОСОБЕННОСТИ</h3>
              <ul className="space-y-2 font-mono text-[10px] text-[#888]">
                <li>• Неоновые акценты</li>
                <li>• Динамичные анимации</li>
                <li>• Частицы и эффекты</li>
                <li>• Киберпанк стиль</li>
              </ul>
            </div>
            <div className="p-6 border border-[#00ffff]/30 bg-[#001a1a]/50">
              <h3 className="font-mono text-sm text-[#00ffff] mb-3">ВИЗУАЛЫ</h3>
              <ul className="space-y-2 font-mono text-[10px] text-[#888]">
                <li>• Матричный дождь</li>
                <li>• Глитч эффекты</li>
                <li>• Неоновые линии</li>
                <li>• Частицы</li>
              </ul>
            </div>
          </div>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0,255,255,0.5)' }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-[#00ffff] text-[#0a0a0a] font-mono text-sm tracking-widest"
            >
              ВЕРНУТЬСЯ НА ГЛАВНУЮ
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}

