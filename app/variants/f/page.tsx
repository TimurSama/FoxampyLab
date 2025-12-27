"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/layout/Header';

export default function VariantF() {
  return (
    <div className="min-h-screen bg-black relative">
      <Header />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-[10px] text-white tracking-[0.5em] mb-6">
            ─── VOID ESSENCE ───
          </div>
          <h1 className="text-5xl font-mono text-white mb-8">
            ГЛУБОКИЙ ЧЁРНЫЙ
          </h1>
          <p className="font-mono text-[#666] mb-12 leading-relaxed">
            Максимальный минимализм. Глубокий чёрный фон с минимальными белыми акцентами.
            Фокус на контенте без отвлекающих элементов.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 border border-white/10 bg-black">
              <h3 className="font-mono text-sm text-white mb-3">ОСОБЕННОСТИ</h3>
              <ul className="space-y-2 font-mono text-[10px] text-[#666]">
                <li>• Максимальный контраст</li>
                <li>• Минимализм</li>
                <li>• Фокус на контенте</li>
                <li>• Чистота форм</li>
              </ul>
            </div>
            <div className="p-6 border border-white/10 bg-black">
              <h3 className="font-mono text-sm text-white mb-3">ПОДХОД</h3>
              <ul className="space-y-2 font-mono text-[10px] text-[#666]">
                <li>• Чёрный фон</li>
                <li>• Белые акценты</li>
                <li>• Минимум элементов</li>
                <li>• Типографика</li>
              </ul>
            </div>
          </div>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-black font-mono text-sm tracking-widest"
            >
              ВЕРНУТЬСЯ НА ГЛАВНУЮ
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}

