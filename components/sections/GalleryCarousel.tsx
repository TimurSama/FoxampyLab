import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

export default function GalleryCarousel() {
  const { t, language } = useI18n();
  
  // Реальные данные из галереи с фото и видео с переводами
  const carouselItems = useMemo(() => [
    {
      id: 'fashion-collage',
      type: 'photo',
      title: language === 'ru' ? 'Digital Fashion Week' : 'Digital Fashion Week',
      description: language === 'ru' 
        ? 'Цифровая показ коллекций в метавселенной с авангардными образами и интерактивными элементами'
        : 'Digital fashion show in the metaverse with avant-garde looks and interactive elements',
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
      title: language === 'ru' ? 'Future Architecture' : 'Future Architecture',
      description: language === 'ru'
        ? 'Архитектурные визуализации будущего города с параметрическим дизайном и инновационными решениями'
        : 'Architectural visualizations of the future city with parametric design and innovative solutions',
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
      title: t('cases.web3Bank.title'),
      category: t('cases.web3Bank.category'),
      description: t('cases.web3Bank.description'),
      solution: t('cases.web3Bank.solution'),
      image: '/images/web3-bank-placeholder.jpg',
      technologies: ['Solidity', 'Web3.js', 'Everscale', 'Ethereum', 'Smart Contracts', 'Bridge Technology']
    },
    {
      id: 'mail-services',
      type: 'project',
      title: t('cases.mailServices.title'),
      category: t('cases.mailServices.category'),
      description: t('cases.mailServices.description'),
      solution: t('cases.mailServices.solution'),
      image: '/images/mail-services-placeholder.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'WebSockets', 'REST API']
    },
    {
      id: 'cgi-cinema',
      type: 'video',
      title: language === 'ru' ? 'CGI 3D кино' : 'CGI 3D Cinema',
      category: language === 'ru' ? 'Видеопродакшн' : 'Video Production',
      description: language === 'ru'
        ? 'CGI 3D кино с динамичными эффектами, биоморфными формами и синтезом потоков'
        : 'CGI 3D cinema with dynamic effects, biomorphic forms and flow synthesis',
      videoSrc: '/media/need-for-speed-underground-2-remaster-2022.mp4',
      previewImage: '/images/cgi-cinema-placeholder.jpg'
    },
    {
      id: 'advertising-showreel',
      type: 'video',
      title: language === 'ru' ? 'Рекламный шоурилс' : 'Advertising Showreel',
      category: language === 'ru' ? 'Видеопродакшн' : 'Video Production',
      description: language === 'ru'
        ? 'Рекламный шоурилс с биоморфным синтезом, динамичными переходами и современными эффектами'
        : 'Advertising showreel with biomorphic synthesis, dynamic transitions and modern effects',
      videoSrc: '/media/ryabov.mp4',
      previewImage: '/images/advertising-showreel-placeholder.jpg'
    }
  ], [t, language]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  }, [carouselItems.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  }, [carouselItems.length]);

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
        <div className="relative aspect-video md:aspect-[16/9] overflow-hidden rounded-sm border border-white/10 bg-black/20 backdrop-blur-sm">

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
                  <div className="font-mono text-[10px] text-[#E0E0E0]/40 tracking-[0.4em] mb-4 uppercase relative" style={{ 
                    textShadow: '0 0 25px rgba(0, 0, 0, 0.85), 0 0 12px rgba(0, 0, 0, 0.8)',
                    filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.8))'
                  }}>
                    <span style={{ 
                      position: 'relative',
                      display: 'inline-block',
                      padding: '0.15em 0.3em',
                      margin: '-0.15em -0.3em',
                      background: 'rgba(0, 0, 0, 0.3)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: '3px',
                      boxShadow: 'inset 0 0 12px rgba(0, 0, 0, 0.4)'
                    }}>
                      ─── {language === 'ru' ? 'Проект' : 'Project'} ───
                    </span>
                  </div>
                  <h3 className="font-mono text-xl md:text-3xl text-[#E0E0E0] mb-4 uppercase tracking-tighter relative" style={{ 
                    textShadow: '0 0 40px rgba(0, 0, 0, 0.95), 0 0 20px rgba(0, 0, 0, 0.9), 0 4px 12px rgba(0, 0, 0, 0.8)',
                    filter: 'drop-shadow(0 0 30px rgba(0, 0, 0, 0.9))'
                  }}>
                    <span style={{ 
                      position: 'relative',
                      display: 'inline-block',
                      padding: '0.1em 0.2em',
                      margin: '-0.1em -0.2em',
                      background: 'rgba(0, 0, 0, 0.4)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '4px',
                      boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      {currentItem.title}
                    </span>
                  </h3>
                  <div className="font-mono text-xs text-[#E0E0E0]/60 mb-6 uppercase tracking-widest relative" style={{ 
                    textShadow: '0 0 25px rgba(0, 0, 0, 0.85), 0 0 12px rgba(0, 0, 0, 0.8)',
                    filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.8))'
                  }}>
                    <span style={{ 
                      position: 'relative',
                      display: 'inline-block',
                      padding: '0.1em 0.2em',
                      margin: '-0.1em -0.2em',
                      background: 'rgba(0, 0, 0, 0.3)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: '3px',
                      boxShadow: 'inset 0 0 12px rgba(0, 0, 0, 0.4)'
                    }}>
                      {currentItem.category}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-xs md:text-sm text-[#E0E0E0]/80 leading-relaxed mb-4 relative" style={{ 
                    textShadow: '0 0 30px rgba(0, 0, 0, 0.9), 0 0 15px rgba(0, 0, 0, 0.85), 0 3px 10px rgba(0, 0, 0, 0.75)',
                    filter: 'drop-shadow(0 0 25px rgba(0, 0, 0, 0.85))'
                  }}>
                    <span style={{ 
                      position: 'relative',
                      display: 'inline-block',
                      padding: '0.15em 0.25em',
                      margin: '-0.15em -0.25em',
                      background: 'rgba(0, 0, 0, 0.35)',
                      backdropFilter: 'blur(15px)',
                      borderRadius: '4px',
                      boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.4)'
                    }}>
                      {currentItem.description}
                    </span>
                  </p>
                  {currentItem.solution && (
                    <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed mb-6 relative" style={{ 
                      textShadow: '0 0 25px rgba(0, 0, 0, 0.85), 0 0 12px rgba(0, 0, 0, 0.8)',
                      filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.8))'
                    }}>
                      <span style={{ 
                        position: 'relative',
                        display: 'inline-block',
                        padding: '0.1em 0.2em',
                        margin: '-0.1em -0.2em',
                        background: 'rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: '3px',
                        boxShadow: 'inset 0 0 12px rgba(0, 0, 0, 0.4)'
                      }}>
                        <span className="font-semibold">{language === 'ru' ? 'Решение: ' : 'Solution: '}</span>
                        {currentItem.solution}
                      </span>
                    </p>
                  )}
                  {currentItem.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {currentItem.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="font-mono text-[9px] text-[#E0E0E0]/60 border border-white/10 px-3 py-1.5 uppercase tracking-widest"
                          style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)' }}
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
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center p-8">
                <div className="text-center text-white max-w-2xl">
                  <div className="font-mono text-[10px] tracking-[0.4em] mb-4 text-white/40 uppercase relative" style={{ 
                    textShadow: '0 0 25px rgba(0, 0, 0, 0.85), 0 0 12px rgba(0, 0, 0, 0.8)',
                    filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.8))'
                  }}>
                    <span style={{ 
                      position: 'relative',
                      display: 'inline-block',
                      padding: '0.15em 0.3em',
                      margin: '-0.15em -0.3em',
                      background: 'rgba(0, 0, 0, 0.3)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: '3px',
                      boxShadow: 'inset 0 0 12px rgba(0, 0, 0, 0.4)'
                    }}>
                      ─── {language === 'ru' ? 'Видео' : 'Video'} ───
                    </span>
                  </div>
                  <h3 className="font-mono text-2xl md:text-4xl mb-4 uppercase tracking-tighter relative" style={{ 
                    textShadow: '0 0 40px rgba(0, 0, 0, 0.95), 0 0 20px rgba(0, 0, 0, 0.9), 0 4px 12px rgba(0, 0, 0, 0.8)',
                    filter: 'drop-shadow(0 0 30px rgba(0, 0, 0, 0.9))'
                  }}>
                    <span style={{ 
                      position: 'relative',
                      display: 'inline-block',
                      padding: '0.1em 0.2em',
                      margin: '-0.1em -0.2em',
                      background: 'rgba(0, 0, 0, 0.4)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '4px',
                      boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)'
                    }}>
                      {currentItem.title}
                    </span>
                  </h3>
                  <div className="font-mono text-xs mb-6 text-white/60 uppercase tracking-widest relative" style={{ 
                    textShadow: '0 0 25px rgba(0, 0, 0, 0.85), 0 0 12px rgba(0, 0, 0, 0.8)',
                    filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.8))'
                  }}>
                    <span style={{ 
                      position: 'relative',
                      display: 'inline-block',
                      padding: '0.1em 0.2em',
                      margin: '-0.1em -0.2em',
                      background: 'rgba(0, 0, 0, 0.3)',
                      backdropFilter: 'blur(12px)',
                      borderRadius: '3px',
                      boxShadow: 'inset 0 0 12px rgba(0, 0, 0, 0.4)'
                    }}>
                      {currentItem.category}
                    </span>
                  </div>
                  <p className="font-mono text-xs md:text-sm max-w-md mx-auto leading-relaxed text-white/80 relative" style={{ 
                    textShadow: '0 0 30px rgba(0, 0, 0, 0.9), 0 0 15px rgba(0, 0, 0, 0.85), 0 3px 10px rgba(0, 0, 0, 0.75)',
                    filter: 'drop-shadow(0 0 25px rgba(0, 0, 0, 0.85))'
                  }}>
                    <span style={{ 
                      position: 'relative',
                      display: 'inline-block',
                      padding: '0.15em 0.25em',
                      margin: '-0.15em -0.25em',
                      background: 'rgba(0, 0, 0, 0.35)',
                      backdropFilter: 'blur(15px)',
                      borderRadius: '4px',
                      boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.4)'
                    }}>
                      {currentItem.description}
                    </span>
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
          {t('home.gallery.cta')}
          <ChevronRight size={18} />
        </a>
      </div>
    </motion.div>
  );
}