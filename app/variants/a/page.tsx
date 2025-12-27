"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/layout/Header';

export default function VariantA() {
  return (
    <div className="min-h-screen bg-ink-deep">
      <Header />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-6">
            ─── FRACTALIX v1 ───
          </div>
          <h1 className="text-5xl font-mono text-engrave-fresco mb-8">
            МИНИМАЛИСТИЧНЫЙ ДИЗАЙН
          </h1>
          <p className="font-mono text-stone-slate mb-12 leading-relaxed">
            Это текущая версия сайта с акцентом на типографику, геометрические формы и 3D визуалы.
            Монохромная палитра создаёт чистый, футуристический образ.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 border border-stone-anthracite/30">
              <h3 className="font-mono text-sm text-engrave-fresco mb-3">ОСОБЕННОСТИ</h3>
              <ul className="space-y-2 font-mono text-[10px] text-stone-slate">
                <li>• Минималистичный интерфейс</li>
                <li>• Геометрические формы</li>
                <li>• 3D визуализации</li>
                <li>• Монохромная палитра</li>
              </ul>
            </div>
            <div className="p-6 border border-stone-anthracite/30">
              <h3 className="font-mono text-sm text-engrave-fresco mb-3">ТЕХНОЛОГИИ</h3>
              <ul className="space-y-2 font-mono text-[10px] text-stone-slate">
                <li>• Next.js 14</li>
                <li>• Three.js</li>
                <li>• Framer Motion</li>
                <li>• Tailwind CSS</li>
              </ul>
            </div>
          </div>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-engrave-fresco text-ink-deep font-mono text-sm tracking-widest"
            >
              ВЕРНУТЬСЯ НА ГЛАВНУЮ
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}

