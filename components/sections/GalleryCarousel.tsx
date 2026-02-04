import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Code, Layers, Lightbulb, Globe, Zap, Sparkles, Database, Cloud, Shield, Smartphone, Monitor } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function GalleryCarousel() {
  const { t, language } = useI18n();
  const router = useRouter();
  
  // Реальные данные из галереи с фото и видео с переводами
  const carouselItems = useMemo(() => [
    // 1. Fashion - 4 фото коллаж
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
    // 2. Architecture - 4 фото коллаж
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
    // 3. Apps & Ecosystems - 4 карточки
    {
      id: 'apps-ecosystems',
      type: 'cards',
      title: language === 'ru' ? 'Приложения и Экосистемы' : 'Apps & Ecosystems',
      description: language === 'ru'
        ? 'Комплексная разработка цифровых продуктов и экосистем'
        : 'Comprehensive digital products and ecosystems development',
      cards: [
        {
          icon: 'smartphone',
          title: language === 'ru' ? 'Мобильные приложения' : 'Mobile Apps',
          desc: language === 'ru' ? 'iOS, Android, Cross-platform решения' : 'iOS, Android, Cross-platform solutions'
        },
        {
          icon: 'monitor',
          title: language === 'ru' ? 'Веб-платформы' : 'Web Platforms',
          desc: language === 'ru' ? 'SPA, PWA, Enterprise системы' : 'SPA, PWA, Enterprise systems'
        },
        {
          icon: 'cloud',
          title: language === 'ru' ? 'Облачные сервисы' : 'Cloud Services',
          desc: language === 'ru' ? 'Масштабируемая инфраструктура' : 'Scalable infrastructure'
        },
        {
          icon: 'layers',
          title: language === 'ru' ? 'Интеграции' : 'Integrations',
          desc: language === 'ru' ? 'API, микросервисы, IoT' : 'API, microservices, IoT'
        }
      ]
    },
    // 4. R&D - 3 карточки
    {
      id: 'research-development',
      type: 'cards-3',
      title: language === 'ru' ? 'Исследования и R&D' : 'Research & Development',
      description: language === 'ru'
        ? 'Инновационные технологические исследования и разработки'
        : 'Innovative technological research and development',
      cards: [
        {
          icon: 'lightbulb',
          title: language === 'ru' ? 'AI & ML' : 'AI & ML',
          desc: language === 'ru' ? 'Машинное обучение, нейросети, автоматизация процессов' : 'Machine learning, neural networks, process automation'
        },
        {
          icon: 'shield',
          title: language === 'ru' ? 'Blockchain' : 'Blockchain',
          desc: language === 'ru' ? 'Web3, смарт-контракты, DeFi протоколы' : 'Web3, smart contracts, DeFi protocols'
        },
        {
          icon: 'zap',
          title: language === 'ru' ? 'Emerging Tech' : 'Emerging Tech',
          desc: language === 'ru' ? 'AR/VR, IoT, квантовые вычисления' : 'AR/VR, IoT, quantum computing'
        }
      ]
    },
    // 5. UniCap Invest - проект с 2 изображениями
    {
      id: 'unicapinvest',
      type: 'project-images',
      title: language === 'ru' ? 'UniCap Invest' : 'UniCap Invest',
      category: language === 'ru' ? 'Брендинг и ESG проекты' : 'Branding & ESG Projects',
      description: language === 'ru'
        ? 'Работа над брендингом, альдентикой, проектным портфелем, инициализация и полная комплексная разработка ESG проектов и стартапов'
        : 'Work on branding, identity, project portfolio, initialization and full comprehensive development of ESG projects and startups',
      images: ['/images/unicap1.png', '/images/unicap2.png'],
      technologies: ['Branding', 'ESG', 'Startups', 'Portfolio Development']
    },
    // 6. Done.co.il - проект с 2 изображениями
    {
      id: 'done-co-il',
      type: 'project-images',
      title: language === 'ru' ? 'Done.co.il' : 'Done.co.il',
      category: language === 'ru' ? 'Брендинг и разработка' : 'Branding & Development',
      description: language === 'ru'
        ? 'Работа над брендингом, рекламными кампаниями, техническими видео, работа над разработкой приложения'
        : 'Work on branding, advertising campaigns, technical videos, application development',
      images: ['/images/done1.png', '/images/done2.png'],
      technologies: ['Branding', 'Advertising', 'Video Production', 'App Development']
    },
    // 7. Video Production - объединенный блок
    {
      id: 'video-production',
      type: 'video',
      title: language === 'ru' ? 'Видеопродакшн' : 'Video Production',
      category: language === 'ru' ? 'CGI & Реклама' : 'CGI & Advertising',
      description: language === 'ru'
        ? 'CGI 3D кино, рекламные ролики, шоурилсы с биоморфным синтезом и динамичными эффектами'
        : 'CGI 3D cinema, advertising clips, showreels with biomorphic synthesis and dynamic effects',
      videoSrc: '/media/need-for-speed-underground-2-remaster-2022.mp4',
      previewImage: '/images/video.png'
    }
  ], [t, language]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
    setPlayingVideo(null);
  }, [carouselItems.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    setPlayingVideo(null);
  }, [carouselItems.length]);

  useEffect(() => {
    if (isPaused || playingVideo) return;

    const interval = setInterval(() => {
      goToNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [goToNext, isPaused, playingVideo]);

  const currentItem = carouselItems[currentIndex];

  const handleItemClick = useCallback(() => {
    router.push(`/gallery#${currentItem.id}`);
  }, [currentItem, router]);

  const handleVideoPlay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayingVideo(currentItem.id);
  }, [currentItem.id]);

  const getIcon = (iconName: string, size: number = 24) => {
    const iconProps = { size, className: "text-[#E0E0E0]" };
    switch (iconName) {
      case 'smartphone': return <Smartphone {...iconProps} />;
      case 'monitor': return <Monitor {...iconProps} />;
      case 'cloud': return <Cloud {...iconProps} />;
      case 'layers': return <Layers {...iconProps} />;
      case 'lightbulb': return <Lightbulb {...iconProps} />;
      case 'shield': return <Shield {...iconProps} />;
      case 'zap': return <Zap {...iconProps} />;
      case 'database': return <Database {...iconProps} />;
      case 'globe': return <Globe {...iconProps} />;
      case 'code': return <Code {...iconProps} />;
      default: return <Sparkles {...iconProps} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="relative w-full max-w-5xl mx-auto mt-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Основная карусель */}
      <div className="relative group">
        {/* Контейнер карусели */}
        <div 
          className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[520px] overflow-hidden rounded-sm border border-white/10 bg-black/40 backdrop-blur-sm cursor-pointer"
          onClick={handleItemClick}
        >
          {/* Коллаж фото для Fashion и Architecture */}
          {(currentItem.type === 'photo' || currentItem.type === 'design') && currentItem.images && (
            <div className="grid grid-cols-2 gap-1 p-1 h-full">
              {currentItem.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`${currentItem.title} ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              ))}
              {/* Overlay с названием */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="font-mono text-lg md:text-xl text-white uppercase tracking-tight">
                  {currentItem.title}
                </h3>
                <p className="font-mono text-xs text-white/70 mt-1">
                  {currentItem.description}
                </p>
              </div>
            </div>
          )}

          {/* 4 карточки для Apps & Ecosystems */}
          {currentItem.type === 'cards' && currentItem.cards && (
            <div className="h-full flex flex-col p-4 md:p-6">
              <div className="mb-4">
                <div className="font-mono text-[10px] text-[#E0E0E0]/40 tracking-[0.4em] mb-2 uppercase">
                  ─── {language === 'ru' ? 'Направление' : 'Direction'} ───
                </div>
                <h3 className="font-mono text-xl md:text-2xl text-[#E0E0E0] uppercase tracking-tight">
                  {currentItem.title}
                </h3>
                <p className="font-mono text-xs text-[#E0E0E0]/60 mt-1">
                  {currentItem.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {currentItem.cards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 border border-white/10 p-4 flex flex-col justify-center hover:bg-white/10 transition-all"
                  >
                    <div className="mb-3">{getIcon(card.icon, 28)}</div>
                    <h4 className="font-mono text-sm text-[#E0E0E0] uppercase tracking-tight mb-1">
                      {card.title}
                    </h4>
                    <p className="font-mono text-[10px] text-[#E0E0E0]/60 leading-relaxed">
                      {card.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* 3 карточки для R&D */}
          {currentItem.type === 'cards-3' && currentItem.cards && (
            <div className="h-full flex flex-col p-4 md:p-6">
              <div className="mb-4">
                <div className="font-mono text-[10px] text-[#E0E0E0]/40 tracking-[0.4em] mb-2 uppercase">
                  ─── {language === 'ru' ? 'Исследования' : 'Research'} ───
                </div>
                <h3 className="font-mono text-xl md:text-2xl text-[#E0E0E0] uppercase tracking-tight">
                  {currentItem.title}
                </h3>
                <p className="font-mono text-xs text-[#E0E0E0]/60 mt-1">
                  {currentItem.description}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 flex-1">
                {currentItem.cards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 border border-white/10 p-4 flex flex-col justify-center hover:bg-white/10 transition-all"
                  >
                    <div className="mb-3">{getIcon(card.icon, 32)}</div>
                    <h4 className="font-mono text-sm text-[#E0E0E0] uppercase tracking-tight mb-2">
                      {card.title}
                    </h4>
                    <p className="font-mono text-[10px] text-[#E0E0E0]/60 leading-relaxed">
                      {card.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Проект с 2 изображениями */}
          {currentItem.type === 'project-images' && currentItem.images && (
            <div className="flex flex-col md:flex-row h-full">
              {/* Изображения слева */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full grid grid-cols-2 gap-1 p-1">
                {currentItem.images.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.15 }}
                    className="relative overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`${currentItem.title} ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </div>
              {/* Описание справа */}
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-center bg-black/40">
                <div className="font-mono text-[10px] text-[#E0E0E0]/40 tracking-[0.4em] mb-3 uppercase">
                  ─── {language === 'ru' ? 'Проект' : 'Project'} ───
                </div>
                <h3 className="font-mono text-xl md:text-2xl text-[#E0E0E0] mb-2 uppercase tracking-tight">
                  {currentItem.title}
                </h3>
                <div className="font-mono text-xs text-[#E0E0E0]/60 mb-4 uppercase tracking-widest">
                  {currentItem.category}
                </div>
                <p className="font-mono text-xs text-[#E0E0E0]/80 leading-relaxed mb-4">
                  {currentItem.description}
                </p>
                {currentItem.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {currentItem.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="font-mono text-[9px] text-[#E0E0E0]/60 border border-white/10 px-2 py-1 uppercase tracking-widest"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Видео карточка */}
          {currentItem.type === 'video' && (
            <div className="relative h-full">
              {playingVideo === currentItem.id ? (
                <video
                  src={currentItem.videoSrc}
                  autoPlay
                  controls
                  className="w-full h-full object-cover"
                  onEnded={() => setPlayingVideo(null)}
                />
              ) : (
                <>
                  <img
                    src={currentItem.previewImage}
                    alt={currentItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button
                      onClick={handleVideoPlay}
                      className="w-20 h-20 md:w-24 md:h-24 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:scale-110"
                    >
                      <Play size={32} className="text-white ml-1" fill="white" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="font-mono text-[10px] tracking-[0.4em] mb-2 text-white/40 uppercase">
                      ─── {language === 'ru' ? 'Видео' : 'Video'} ───
                    </div>
                    <h3 className="font-mono text-xl md:text-2xl mb-2 uppercase tracking-tight text-white">
                      {currentItem.title}
                    </h3>
                    <div className="font-mono text-xs mb-2 text-white/60 uppercase tracking-widest">
                      {currentItem.category}
                    </div>
                    <p className="font-mono text-xs max-w-md leading-relaxed text-white/80">
                      {currentItem.description}
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Кнопки навигации */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-3 bg-black/60 border border-white/20 text-white hover:bg-white/20 transition-all backdrop-blur-md rounded-full z-10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-black/60 border border-white/20 text-white hover:bg-white/20 transition-all backdrop-blur-md rounded-full z-10"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Индикаторы */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {carouselItems.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(i);
                setPlayingVideo(null);
              }}
              className={`h-1 transition-all duration-300 ${i === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
