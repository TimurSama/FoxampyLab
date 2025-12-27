"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/layout/Header';

export default function VariantD() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] relative">
      <div className="fixed inset-0 opacity-5" style={{
        background: `
          repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)
        `
      }} />
      
      <Header />
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-[10px] text-[#ccc] tracking-[0.5em] mb-6">
            ─── CHROME EDITION ───
          </div>
          <h1 className="text-5xl font-mono text-white mb-8" style={{
            textShadow: '0 0 20px rgba(255,255,255,0.3)',
            background: 'linear-gradient(135deg, #fff 0%, #ccc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            МЕТАЛЛИЧЕСКИЙ СТИЛЬ
          </h1>
          <p className="font-mono text-[#aaa] mb-12 leading-relaxed">
            Хром-эффекты, отражения и металлические текстуры создают премиальный образ.
            Блестящие поверхности и зеркальные эффекты добавляют глубину.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 border border-[#555] bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a]">
              <h3 className="font-mono text-sm text-white mb-3">ОСОБЕННОСТИ</h3>
              <ul className="space-y-2 font-mono text-[10px] text-[#aaa]">
                <li>• Хром-эффекты</li>
                <li>• Отражения</li>
                <li>• Металлические текстуры</li>
                <li>• Премиальный вид</li>
              </ul>
            </div>
            <div className="p-6 border border-[#555] bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a]">
              <h3 className="font-mono text-sm text-white mb-3">ЭФФЕКТЫ</h3>
              <ul className="space-y-2 font-mono text-[10px] text-[#aaa]">
                <li>• Зеркальные поверхности</li>
                <li>• Блестящие элементы</li>
                <li>• Градиенты металла</li>
                <li>• Отражения света</li>
              </ul>
            </div>
          </div>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-[#ccc] to-[#fff] text-[#1a1a1a] font-mono text-sm tracking-widest"
            >
              ВЕРНУТЬСЯ НА ГЛАВНУЮ
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}

