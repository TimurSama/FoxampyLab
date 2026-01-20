"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from 'lucide-react';
import Header from '@/components/layout/Header';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/context';

// Список референсов из папки reference
const references = [
  { id: 1, name: 'image_2026-01-09_14-29-03.png', path: '/reference/image_2026-01-09_14-29-03.png' },
  { id: 2, name: 'photo_1_2025-12-26_22-48-11.jpg', path: '/reference/photo_1_2025-12-26_22-48-11.jpg' },
  { id: 3, name: 'photo_1_2025-12-26_22-48-34.jpg', path: '/reference/photo_1_2025-12-26_22-48-34.jpg' },
  { id: 4, name: 'photo_2_2025-12-26_22-48-11.jpg', path: '/reference/photo_2_2025-12-26_22-48-11.jpg' },
  { id: 5, name: 'photo_2_2025-12-26_22-48-34.jpg', path: '/reference/photo_2_2025-12-26_22-48-34.jpg' },
  { id: 6, name: 'photo_3_2025-12-26_22-48-11.jpg', path: '/reference/photo_3_2025-12-26_22-48-11.jpg' },
  { id: 7, name: 'photo_3_2025-12-26_22-48-34.jpg', path: '/reference/photo_3_2025-12-26_22-48-34.jpg' },
  { id: 8, name: 'photo_5_2025-12-26_22-48-11.jpg', path: '/reference/photo_5_2025-12-26_22-48-11.jpg' },
  { id: 9, name: 'photo_5_2025-12-26_22-48-34.jpg', path: '/reference/photo_5_2025-12-26_22-48-34.jpg' },
  { id: 10, name: 'photo_6_2025-12-26_22-48-34.jpg', path: '/reference/photo_6_2025-12-26_22-48-34.jpg' },
  { id: 11, name: 'photo_7_2025-12-26_22-48-34.jpg', path: '/reference/photo_7_2025-12-26_22-48-34.jpg' },
  { id: 12, name: 'photo_8_2025-12-26_22-48-11.jpg', path: '/reference/photo_8_2025-12-26_22-48-11.jpg' },
  { id: 13, name: 'photo_8_2025-12-26_22-48-34.jpg', path: '/reference/photo_8_2025-12-26_22-48-34.jpg' },
  { id: 14, name: 'photo_9_2025-12-26_22-48-34.jpg', path: '/reference/photo_9_2025-12-26_22-48-34.jpg' },
  { id: 15, name: 'главная.jpg', path: '/reference/главная.jpg' },
  { id: 16, name: 'междисциплинарный подход.jpg', path: '/reference/междисциплинарный подход.jpg' },
  { id: 17, name: 'методология и глубина2.jpg', path: '/reference/методология и глубина2.jpg' },
];

export default function VisualPage() {
  const { t } = useI18n();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [filter, setFilter] = useState<'all' | 'jpg' | 'png'>('all');

  const filteredReferences = useMemo(() => {
    if (filter === 'all') return references;
    return references.filter(ref => ref.path.endsWith(`.${filter}`));
  }, [filter]);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setZoom(1);
  };

  const closeModal = () => {
    setSelectedIndex(null);
    setZoom(1);
  };

  const nextImage = () => {
    if (selectedIndex !== null) {
      const next = (selectedIndex + 1) % filteredReferences.length;
      setSelectedIndex(next);
      setZoom(1);
    }
  };

  const prevImage = () => {
    if (selectedIndex !== null) {
      const prev = (selectedIndex - 1 + filteredReferences.length) % filteredReferences.length;
      setSelectedIndex(prev);
      setZoom(1);
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedIndex === null) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === '+') handleZoomIn();
    if (e.key === '-') handleZoomOut();
  };

  return (
    <div 
      className="relative min-h-screen bg-[#050505] text-[#E0E0E0]"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <Header />
      
      <main className="relative z-10 pt-24 pb-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Заголовок */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="font-mono text-[10px] text-[#E0E0E0] tracking-[0.5em] mb-6">
              ─── VISUAL REFERENCE LIBRARY ───
            </div>
            <h1 className="text-3xl md:text-5xl font-mono font-light tracking-tight text-[#E0E0E0] mb-4">
              {t('visual.title')}
            </h1>
            <p className="font-mono text-sm md:text-base text-[#E0E0E0]/60 max-w-2xl mx-auto">
              {t('visual.description')}
            </p>
          </motion.div>

          {/* Фильтры */}
          <div className="flex gap-4 mb-8 justify-center">
            {(['all', 'jpg', 'png'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 border font-mono text-xs transition-all
                  ${
                    filter === f
                      ? 'border-[#E0E0E0] bg-[#E0E0E0]/10 text-[#E0E0E0]'
                      : 'border-[#E0E0E0]/20 bg-[#050505]/50 text-[#E0E0E0]/60 hover:border-[#E0E0E0]/40'
                  }`}
              >
                {f === 'all' ? t('visual.filterAll') : f === 'jpg' ? t('visual.filterJpg') : t('visual.filterPng')}
              </button>
            ))}
          </div>

          {/* Сетка референсов */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredReferences.map((ref, index) => (
              <motion.div
                key={ref.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => openModal(index)}
                className="relative aspect-square border border-[#E0E0E0]/20 bg-[#050505]/50 
                         hover:border-[#E0E0E0]/40 cursor-pointer group overflow-hidden"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={ref.path}
                    alt={ref.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="font-mono text-[9px] text-[#E0E0E0]/80 truncate">
                      {ref.name}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Модальное окно просмотра */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-7xl w-full h-full flex items-center justify-center"
            >
              {/* Изображение */}
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.div
                  style={{ scale: zoom }}
                  className="relative max-w-full max-h-full"
                >
                  <Image
                    src={filteredReferences[selectedIndex].path}
                    alt={filteredReferences[selectedIndex].name}
                    width={1200}
                    height={1200}
                    className="max-w-full max-h-[90vh] object-contain"
                    priority
                  />
                </motion.div>
              </div>

              {/* Кнопка закрытия */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-3 border border-[#E0E0E0]/20 bg-[#050505]/80 
                         hover:border-[#E0E0E0] hover:bg-[#050505] transition-all"
              >
                <X size={20} className="text-[#E0E0E0]" />
              </button>

              {/* Навигация */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 border border-[#E0E0E0]/20 
                         bg-[#050505]/80 hover:border-[#E0E0E0] hover:bg-[#050505] transition-all"
              >
                <ChevronLeft size={24} className="text-[#E0E0E0]" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 border border-[#E0E0E0]/20 
                         bg-[#050505]/80 hover:border-[#E0E0E0] hover:bg-[#050505] transition-all"
              >
                <ChevronRight size={24} className="text-[#E0E0E0]" />
              </button>

              {/* Панель управления */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomOut();
                  }}
                  className="p-2 border border-[#E0E0E0]/20 bg-[#050505]/80 
                           hover:border-[#E0E0E0] hover:bg-[#050505] transition-all"
                >
                  <ZoomOut size={18} className="text-[#E0E0E0]" />
                </button>
                
                <span className="font-mono text-xs text-[#E0E0E0]/80 px-3">
                  {Math.round(zoom * 100)}%
                </span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoomIn();
                  }}
                  className="p-2 border border-[#E0E0E0]/20 bg-[#050505]/80 
                           hover:border-[#E0E0E0] hover:bg-[#050505] transition-all"
                >
                  <ZoomIn size={18} className="text-[#E0E0E0]" />
                </button>

                <a
                  href={filteredReferences[selectedIndex].path}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 border border-[#E0E0E0]/20 bg-[#050505]/80 
                           hover:border-[#E0E0E0] hover:bg-[#050505] transition-all ml-2"
                >
                  <Download size={18} className="text-[#E0E0E0]" />
                </a>
              </div>

              {/* Информация */}
              <div className="absolute top-4 left-4 bg-[#050505]/80 border border-[#E0E0E0]/20 p-3">
                <p className="font-mono text-xs text-[#E0E0E0]">
                  {selectedIndex + 1} / {filteredReferences.length}
                </p>
                <p className="font-mono text-[10px] text-[#E0E0E0]/60 mt-1">
                  {filteredReferences[selectedIndex].name}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}




