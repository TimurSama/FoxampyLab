"use client";

import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { Play, Image as ImageIcon, Palette, Layers, Film, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';

export default function GalleryPage() {
  const { t } = useI18n();

  const gallerySections = [
    {
      id: 'apps',
      title: t('gallery.apps.title'),
      accent: t('gallery.apps.accent'),
      icon: <Layers size={18} />,
      description: t('gallery.apps.description'),
      placeholders: ['Civilization UI', 'TradePlus Deck', 'NexusVita Flow'],
    },
    {
      id: 'fashion',
      title: t('gallery.fashion.title'),
      accent: t('gallery.fashion.accent'),
      icon: <Palette size={18} />,
      description: t('gallery.fashion.description'),
      placeholders: ['Wearable 01', 'Wearable 02', 'Wearable 03'],
    },
    {
      id: 'architecture',
      title: t('gallery.architecture.title'),
      accent: t('gallery.architecture.accent'),
      icon: <ImageIcon size={18} />,
      description: t('gallery.architecture.description'),
      placeholders: ['Param Grid', 'Light Shell', 'Kinetic Hall'],
    },
    {
      id: 'video',
      title: t('gallery.video.title'),
      accent: t('gallery.video.accent'),
      icon: <Film size={18} />,
      description: t('gallery.video.description'),
      placeholders: ['Motion Reel', 'CGI Scene', 'Product Film'],
    },
    {
      id: 'research',
      title: t('gallery.research.title'),
      accent: t('gallery.research.accent'),
      icon: <Sparkles size={18} />,
      description: t('gallery.research.description'),
      placeholders: ['Material Scan', 'Sensor Map', 'AI Study'],
    },
  ];
  return (
    <div className="relative min-h-screen bg-[#050505]">
      <div className="fixed inset-0 wireframe-grid pointer-events-none" aria-hidden="true" />

      <Header />

      <main className="relative z-10 pt-32 pb-24">
        {/* Hero */}
        <section className="px-4 mb-16">
          <div className="max-w-6xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-[10px] text-[#E0E0E0]/60 tracking-[0.5em]"
            >
              ─── {t('gallery.tagline')} ───
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-mono text-[#E0E0E0]"
            >
              {t('gallery.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-sm md:text-base text-[#E0E0E0]/80 max-w-3xl mx-auto leading-relaxed"
            >
              {t('gallery.description')}
            </motion.p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-[#E0E0E0] text-[#050505] font-mono text-sm tracking-widest inline-flex items-center gap-2"
              >
                {t('gallery.ctaButton')}
                <Play size={14} />
              </motion.button>
            </Link>
          </div>
        </section>

        {/* Sections */}
        <section className="px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            {gallerySections.map((block, i) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-[#E0E0E0]/20 bg-[#050505]/50 p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-[#E0E0E0]">{block.icon}</div>
                  <div className="font-mono text-xs text-[#E0E0E0]/60 tracking-[0.25em] uppercase">
                    {block.accent}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="max-w-2xl">
                    <h3 className="font-mono text-xl text-[#E0E0E0] mb-3">{block.title}</h3>
                    <p className="font-mono text-sm text-[#E0E0E0]/80 leading-relaxed">
                      {block.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 min-w-[220px]">
                    {block.placeholders.map((item) => (
                      <div
                        key={item}
                        className="h-28 border border-[#E0E0E0]/20 bg-[#050505]/70 flex items-center justify-center font-mono text-[10px] text-[#E0E0E0]/60 uppercase tracking-wider"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}




