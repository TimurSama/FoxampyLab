"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/layout/Header';

export default function VariantC() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] relative">
      <Header />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-[10px] text-[#aaa] tracking-[0.5em] mb-6">
            ─── FRACTALIX v3 ───
          </div>
          <h1 className="text-5xl font-mono text-white mb-8">
            ЭКСПЕРИМЕНТАЛЬНЫЙ ИНТЕРФЕЙС
          </h1>
          <p className="font-mono text-[#888] mb-12 leading-relaxed">
            Фокус на интерактивности и экспериментах. Кастомный курсор, необычные переходы,
            интерактивные элементы, которые реагируют на каждое действие пользователя.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 border border-[#444] bg-[#222]">
              <h3 className="font-mono text-sm text-white mb-3">ОСОБЕННОСТИ</h3>
              <ul className="space-y-2 font-mono text-[10px] text-[#888]">
                <li>• Кастомный курсор</li>
                <li>• Интерактивные элементы</li>
                <li>• Экспериментальные переходы</li>
                <li>• Необычная навигация</li>
              </ul>
            </div>
            <div className="p-6 border border-[#444] bg-[#222]">
              <h3 className="font-mono text-sm text-white mb-3">ИНТЕРАКТИВ</h3>
              <ul className="space-y-2 font-mono text-[10px] text-[#888]">
                <li>• Реакция на курсор</li>
                <li>• Динамичные эффекты</li>
                <li>• Игровые механики</li>
                <li>• Микро-анимации</li>
              </ul>
            </div>
          </div>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-[#1a1a1a] font-mono text-sm tracking-widest"
            >
              ВЕРНУТЬСЯ НА ГЛАВНУЮ
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}

