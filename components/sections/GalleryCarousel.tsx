import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Реальные данные из галереи с фото и видео
const carouselItems = [
  {
    id: 'fashion-collage',
    type: 'photo',
    title: 'Digital Fashion Week',
    description: 'Цифровая показа коллекций в метавселенной с авангардными образами и интерактивными элементами',
    images: [
      '/gallery/photo_2026-01-30_12-27-19.jpg',
      '/gallery/photo_2026-01-30_12-27-28.jpg',
      '/gallery/photo_2026-01-30_12-27-32.jpg',
      '/gallery/photo_2026-01-30_12-27-35.jpg'
    ]
  },
  {
    id: 'architecture-collage',
    type: 'design',
    title: 'Future Architecture',
    description: 'Архитектурные визуализации будущего города с параметрическим дизайном и инновационными решениями',
    images: [
      '/architecture/image_2024-08-21_21-32-32.png',
      '/architecture/image_2024-08-21_21-32-39.png',
      '/architecture/image_2024-08-21_21-32-44.png',
      '/architecture/image_2024-08-21_21-32-49.png'
    ]
  },
  {
    id: 'web3-bank',
    type: 'project',
    title: 'Web3 Bank',
    category: 'FinTech Platform',
    description: 'Децентрализованная банковская система на блокчейне с умными контрактами и безопасными транзакциями',
    image: '/api/placeholder/800/400?text=Web3+Bank',
    technologies: ['Solidity', 'Web3.js', 'Everscale', 'Ethereum', 'Smart Contracts']
  },
  {
    id: 'mail-services',
    type: 'project',
    title: 'Mail Services',
    category: 'Communication Platform',
    description: 'Современная почтовая служба с реальным временем, шифрованием и интеграцией с другими сервисами',
    image: '/api/placeholder/800/400?text=Mail+Services',
    technologies: ['React', 'Node.js', 'MongoDB', 'WebSockets', 'REST API']
  },
  {
    id: 'cgi-cinema',
    type: 'video',
    title: 'CGI 3D Cinema',
    category: 'Video Production',
    description: 'CGI 3D кино с динамичными эффектами, биоморфными формами и синтезом потоков',
    videoSrc: '/media/need-for-speed-underground-2-remaster-2022.mp4',
    previewImage: '/api/placeholder/800/400?text=CGI+3D+Cinema'
  },
  {
    id: 'advertising-showreel',
    type: 'video',
    title: 'Advertising Showreel',
    category: 'Video Production',
    description: 'Рекламный шоурилс с биоморфным синтезом, динамичными переходами и современными эффектами',
    videoSrc: '/media/ryabov.mp4',
    previewImage: '/api/placeholder/800/400?text=Advertising+Showreel'
  }
];

export default function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [goToNext, isPaused]);

  const currentItem = carouselItems[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative w-full max-w-6xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Основная карусель */}
      <div className="relative group">
        <div className="relative aspect-video md:aspect-[16/9] overflow-hidden rounded-sm border border-white/10 bg-glass-matte">

          {/* Коллаж фото для Fashion */}
          {currentItem.type === 'photo' && currentItem.images && (
            <div className="grid grid-cols-2 gap-1 p-2 h-full">
              {currentItem.images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`Fashion ${index + 1}`}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full h-full object-cover"
                />
              ))}
            </div>
          )}

          {/* Коллаж фото для Architecture */}
          {currentItem.type === 'design' && currentItem.images && (
            <div className="grid grid-cols-2 gap-1 p-2 h-full">
              {currentItem.images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`Architecture ${index + 1}`}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full h-full object-cover"
                />
              ))}
            </div>
          )}

          {/* Проект карточка */}
          {currentItem.type === 'project' && (
            <div className="flex flex-col md:flex-row h-full">
              <div className="w-full md:w-1/2 h-1/2 md:h-full">
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[10px] text-[#E0E0E0]/40 tracking-[0.4em] mb-4 uppercase">
                    ─── Проект ───
                  </div>
                  <h3 className="font-mono text-xl md:text-3xl text-[#E0E0E0] mb-4 uppercase tracking-tighter">
                    {currentItem.title}
                  </h3>
                  <div className="font-mono text-xs text-[#E0E0E0]/60 mb-6 uppercase tracking-widest">
                    {currentItem.category}
                  </div>
                </div>
                <div>
                  <p className="font-mono text-xs md:text-sm text-[#E0E0E0]/80 leading-relaxed mb-8">
                    {currentItem.description}
                  </p>
                  {currentItem.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {currentItem.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="font-mono text-[9px] text-[#E0E0E0]/60 border border-white/10 px-3 py-1.5 uppercase tracking-widest"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Видео карточка */}
          {currentItem.type === 'video' && (
            <div className="relative h-full">
              <img
                src={currentItem.previewImage}
                alt={currentItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-8">
                <div className="text-center text-white max-w-2xl">
                  <div className="font-mono text-[10px] tracking-[0.4em] mb-4 text-white/40 uppercase">
                    ─── Видео ───
                  </div>
                  <h3 className="font-mono text-2xl md:text-4xl mb-4 uppercase tracking-tighter">
                    {currentItem.title}
                  </h3>
                  <div className="font-mono text-xs mb-6 text-white/60 uppercase tracking-widest">
                    {currentItem.category}
                  </div>
                  <p className="font-mono text-xs md:text-sm max-w-md mx-auto leading-relaxed text-white/80">
                    {currentItem.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Кнопки навигации */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/20 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10 backdrop-blur-md rounded-full"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/20 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10 backdrop-blur-md rounded-full"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Индикаторы */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {carouselItems.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1 transition-all duration-300 ${i === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
            />
          ))}
        </div>
      </div>

      {/* Кнопка перехода в галерею */}
      <div className="flex justify-center mt-12">
        <a
          href="/gallery"
          className="inline-flex items-center gap-4 px-10 py-5 bg-[#E0E0E0] text-[#050505] font-mono text-sm tracking-[0.3em] uppercase hover:bg-white transition-all transform hover:scale-105 active:scale-95"
        >
          Открыть галерею
          <ChevronRight size={18} />
        </a>
      </div>
    </motion.div>
  );
}