import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Code, Layers, Lightbulb, Globe, Zap, Sparkles, Database, Cloud, Shield, Smartphone, Monitor } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { useRouter } from 'next/navigation';

export default function GalleryCarousel() {
  const { t, language } = useI18n();
  const router = useRouter();
  
  // Реальные данные из галереи с фото и видео с переводами
  const carouselItems = useMemo(() => [
    // 1. Fashion - 4 фото коллаж
    {
      id: 'fashion-collage',
      type: 'photo',
      title: language === 'ru' ? 'Мода' : 'Fashion',
      description: language === 'ru' 
        ? 'Дизайнерский модельный ряд Средняя Азия 2023'
        : 'Designer collection Central Asia 2023',
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
      title: language === 'ru' ? 'Архитектура и среды' : 'Architecture',
      description: language === 'ru'
        ? 'Работы Берлинской команды архитекторов-дизайнеров'
        : 'Facade morphology, algorithm-interiors, light scenarios.',
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
        ? 'UI/UX-кинематография: живые прототипы, сложные дашборды, 3D-интеракции'
        : 'UI/UX cinematography: live prototypes, complex dashboards, 3D interactions',
      cards: [
        {
          icon: 'smartphone',
          title: language === 'ru' ? 'Мобильные' : 'Mobile',
          desc: language === 'ru' ? 'iOS, Android, Cross-platform' : 'iOS, Android, Cross-platform'
        },
        {
          icon: 'monitor',
          title: language === 'ru' ? 'Веб' : 'Web',
          desc: language === 'ru' ? 'SPA, PWA, Enterprise' : 'SPA, PWA, Enterprise'
        },
        {
          icon: 'cloud',
          title: language === 'ru' ? 'Облако' : 'Cloud',
          desc: language === 'ru' ? 'Масштабируемость' : 'Scalable infra'
        },
        {
          icon: 'layers',
          title: language === 'ru' ? 'API' : 'API',
          desc: language === 'ru' ? 'Интеграции, IoT' : 'Integrations, IoT'
        }
      ]
    },
    // 4. R&D - 3 карточки
    {
      id: 'research-development',
      type: 'cards-3',
      title: language === 'ru' ? 'Исследования и R&D' : 'Research & Development',
      description: language === 'ru'
        ? 'Инновационные технологические исследования'
        : 'Innovative technological research',
      cards: [
        {
          icon: 'lightbulb',
          title: 'AI & ML',
          desc: language === 'ru' ? 'Нейросети, автоматизация' : 'Neural networks, automation'
        },
        {
          icon: 'shield',
          title: 'Blockchain',
          desc: language === 'ru' ? 'Web3, DeFi' : 'Web3, DeFi'
        },
        {
          icon: 'zap',
          title: language === 'ru' ? 'Emerging' : 'Emerging',
          desc: language === 'ru' ? 'AR/VR, IoT' : 'AR/VR, IoT'
        }
      ]
    },
    // 5. UniCap Invest - проект с 2 изображениями (фото сверху)
    {
      id: 'unicapinvest',
      type: 'project-vertical',
      title: 'UniCap Invest',
      category: language === 'ru' ? 'Брендинг и ESG' : 'Branding & ESG',
      description: language === 'ru'
        ? 'Брендинг, айдентика, проектный портфель, разработка ESG проектов и стартапов'
        : 'Branding, identity, portfolio, ESG projects and startups development',
      images: ['/images/unicap1.png', '/images/unicap2.png'],
      technologies: ['Branding', 'ESG', 'Startups']
    },
    // 6. Done.co.il - проект с 2 изображениями (фото сверху)
    {
      id: 'done-co-il',
      type: 'project-vertical',
      title: 'Done.co.il',
      category: language === 'ru' ? 'Брендинг и разработка' : 'Branding & Development',
      description: language === 'ru'
        ? 'Брендинг, рекламные кампании, технические видео, разработка приложения'
        : 'Branding, advertising campaigns, technical videos, app development',
      images: ['/images/done1.png', '/images/done2.png'],
      technologies: ['Branding', 'Video', 'App']
    },
    // 7. Video Production
    {
      id: 'video-production',
      type: 'video',
      title: language === 'ru' ? 'Видеопродакшн' : 'Video Production',
      category: language === 'ru' ? 'CGI & Реклама' : 'CGI & Advertising',
      description: language === 'ru'
        ? 'CGI 3D кино, рекламные ролики, шоурилы'
        : 'CGI 3D cinema, advertising clips, showreels',
      videoSrc: '/media/need-for-speed-underground-2-remaster-2022.mp4',
      previewImage: '/images/video.png'
    }
  ], [language]);

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

  const getIcon = (iconName: string, size: number = 20) => {
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
      className="relative w-full max-w-5xl mx-auto mt-1"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Основная карусель */}
      <div className="relative group">
        {/* Контейнер карусели */}
        <div 
          className="relative w-full h-[360px] sm:h-[400px] md:h-[440px] lg:h-[480px] overflow-hidden rounded-sm border border-white/10 bg-black/40 backdrop-blur-sm cursor-pointer"
          onClick={handleItemClick}
        >
          {/* Коллаж фото для Fashion и Architecture - фото помещаются полностью */}
          {(currentItem.type === 'photo' || currentItem.type === 'design') && currentItem.images && (
            <div className="grid grid-cols-2 gap-1 p-2 h-full">
              {currentItem.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.08 }}
                  className="relative overflow-hidden bg-black/20"
                >
                  <img
                    src={image}
                    alt={`${currentItem.title} ${index + 1}`}
                    className="w-full h-full object-contain hover:scale-102 transition-transform duration-500"
                  />
                </motion.div>
              ))}
              {/* Overlay с названием */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="font-mono text-sm sm:text-base md:text-lg text-white uppercase tracking-tight">
                  {currentItem.title}
                </h3>
                <p className="font-mono text-[10px] sm:text-xs text-white/70 mt-0.5 line-clamp-2">
                  {currentItem.description}
                </p>
              </div>
            </div>
          )}

          {/* 4 карточки для Apps & Ecosystems */}
          {currentItem.type === 'cards' && currentItem.cards && (
            <div className="h-full flex flex-col p-3 sm:p-4 md:p-5">
              <div className="mb-3">
                <div className="font-mono text-[9px] sm:text-[10px] text-[#E0E0E0]/40 tracking-[0.3em] mb-1 uppercase">
                  ─── {language === 'ru' ? 'Направление' : 'Direction'} ───
                </div>
                <h3 className="font-mono text-base sm:text-lg md:text-xl text-[#E0E0E0] uppercase tracking-tight">
                  {currentItem.title}
                </h3>
                <p className="font-mono text-[10px] sm:text-xs text-[#E0E0E0]/60 mt-0.5 line-clamp-1">
                  {currentItem.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 flex-1">
                {currentItem.cards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white/5 border border-white/10 p-3 flex flex-col justify-center hover:bg-white/10 transition-all"
                  >
                    <div className="mb-2">{getIcon(card.icon, 22)}</div>
                    <h4 className="font-mono text-xs sm:text-sm text-[#E0E0E0] uppercase tracking-tight mb-0.5">
                      {card.title}
                    </h4>
                    <p className="font-mono text-[9px] sm:text-[10px] text-[#E0E0E0]/60 line-clamp-2">
                      {card.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* 3 карточки для R&D */}
          {currentItem.type === 'cards-3' && currentItem.cards && (
            <div className="h-full flex flex-col p-3 sm:p-4 md:p-5">
              <div className="mb-3">
                <div className="font-mono text-[9px] sm:text-[10px] text-[#E0E0E0]/40 tracking-[0.3em] mb-1 uppercase">
                  ─── {language === 'ru' ? 'Исследования' : 'Research'} ───
                </div>
                <h3 className="font-mono text-base sm:text-lg md:text-xl text-[#E0E0E0] uppercase tracking-tight">
                  {currentItem.title}
                </h3>
                <p className="font-mono text-[10px] sm:text-xs text-[#E0E0E0]/60 mt-0.5">
                  {currentItem.description}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 flex-1">
                {currentItem.cards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white/5 border border-white/10 p-3 flex flex-col justify-center hover:bg-white/10 transition-all"
                  >
                    <div className="mb-2">{getIcon(card.icon, 24)}</div>
                    <h4 className="font-mono text-xs sm:text-sm text-[#E0E0E0] uppercase tracking-tight mb-1">
                      {card.title}
                    </h4>
                    <p className="font-mono text-[9px] sm:text-[10px] text-[#E0E0E0]/60 line-clamp-2">
                      {card.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Проект с вертикальной компоновкой (фото сверху, текст снизу) */}
          {currentItem.type === 'project-vertical' && currentItem.images && (
            <div className="flex flex-col h-full">
              {/* Изображения сверху */}
              <div className="h-[60%] grid grid-cols-2 gap-1 p-1">
                {currentItem.images.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative overflow-hidden bg-black/20"
                  >
                    <img
                      src={img}
                      alt={`${currentItem.title} ${i + 1}`}
                      className="w-full h-full object-contain hover:scale-102 transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </div>
              {/* Описание снизу */}
              <div className="h-[40%] p-4 sm:p-5 flex flex-col justify-center bg-black/50">
                <div className="font-mono text-[9px] sm:text-[10px] text-[#E0E0E0]/40 tracking-[0.3em] mb-2 uppercase">
                  ─── {language === 'ru' ? 'Проект' : 'Project'} ───
                </div>
                <h3 className="font-mono text-lg sm:text-xl md:text-2xl text-[#E0E0E0] mb-1 uppercase tracking-tight">
                  {currentItem.title}
                </h3>
                <div className="font-mono text-[10px] sm:text-xs text-[#E0E0E0]/60 mb-2 uppercase tracking-wider">
                  {currentItem.category}
                </div>
                <p className="font-mono text-[10px] sm:text-xs text-[#E0E0E0]/80 leading-relaxed mb-3 line-clamp-2">
                  {currentItem.description}
                </p>
                {currentItem.technologies && (
                  <div className="flex flex-wrap gap-1.5">
                    {currentItem.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="font-mono text-[8px] sm:text-[9px] text-[#E0E0E0]/60 border border-white/10 px-1.5 py-0.5 uppercase tracking-wider"
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
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:scale-110"
                    >
                      <Play size={28} className="text-white ml-1" fill="white" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-black/90 to-transparent">
                    <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] mb-1 text-white/40 uppercase">
                      ─── {language === 'ru' ? 'Видео' : 'Video'} ───
                    </div>
                    <h3 className="font-mono text-base sm:text-lg md:text-xl mb-1 uppercase tracking-tight text-white">
                      {currentItem.title}
                    </h3>
                    <div className="font-mono text-[10px] sm:text-xs mb-1 text-white/60 uppercase tracking-wider">
                      {currentItem.category}
                    </div>
                    <p className="font-mono text-[10px] sm:text-xs max-w-md leading-relaxed text-white/80 line-clamp-2">
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
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/60 border border-white/20 text-white hover:bg-white/20 transition-all backdrop-blur-md rounded-full z-10"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/60 border border-white/20 text-white hover:bg-white/20 transition-all backdrop-blur-md rounded-full z-10"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Индикаторы */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {carouselItems.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(i);
                setPlayingVideo(null);
              }}
              className={`h-1 transition-all duration-300 ${i === currentIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
