import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { useRouter } from 'next/navigation';

export default function GalleryCarousel() {
  const { t, language } = useI18n();
  const router = useRouter();
  
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
      id: 'unicapinvest',
      type: 'project',
      title: language === 'ru' ? 'UniCap Invest' : 'UniCap Invest',
      category: language === 'ru' ? 'Брендинг и ESG проекты' : 'Branding & ESG Projects',
      description: language === 'ru'
        ? 'Работа над брендингом, альдентикой, проектным портфелем, инициализация и полная комплексная разработка ESG проектов и стартапов'
        : 'Work on branding, identity, project portfolio, initialization and full comprehensive development of ESG projects and startups',
      image: '/images/unicapinvest-placeholder.jpg',
      technologies: ['Branding', 'ESG', 'Startups', 'Portfolio Development']
    },
    {
      id: 'done-co-il',
      type: 'project',
      title: language === 'ru' ? 'Done.co.il' : 'Done.co.il',
      category: language === 'ru' ? 'Брендинг и разработка' : 'Branding & Development',
      description: language === 'ru'
        ? 'Работа над брендингом, рекламными кампаниями, техническими видео, работа над разработкой приложения'
        : 'Work on branding, advertising campaigns, technical videos, application development',
      image: '/images/done-co-il-placeholder.jpg',
      technologies: ['Branding', 'Advertising', 'Video Production', 'App Development']
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
    }, 5000);

    return () => clearInterval(interval);
  }, [goToNext, isPaused, playingVideo]);

  const currentItem = carouselItems[currentIndex];

  const handleItemClick = useCallback(() => {
    // Определяем тип элемента и открываем галерею
    if (currentItem.type === 'photo' || currentItem.type === 'design') {
      router.push(`/gallery#${currentItem.id}`);
    } else if (currentItem.type === 'project') {
      router.push(`/gallery#${currentItem.id}`);
    } else if (currentItem.type === 'video') {
      router.push(`/gallery#${currentItem.id}`);
    }
  }, [currentItem, router]);

  const handleVideoPlay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayingVideo(currentItem.id);
  }, [currentItem.id]);

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
        {/* Фиксированный размер экрана предпоказа */}
        <div 
          className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px] overflow-hidden rounded-sm border border-white/10 bg-black/20 backdrop-blur-sm cursor-pointer"
          onClick={handleItemClick}
        >
          {/* Коллаж фото для Fashion и Architecture */}
          {(currentItem.type === 'photo' || currentItem.type === 'design') && currentItem.images && (
            <div className="grid grid-cols-2 gap-1 p-2 h-full">
              {currentItem.images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`${currentItem.title} ${index + 1}`}
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
              <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-between bg-black/40">
                <div>
                  <div className="font-mono text-[10px] text-[#E0E0E0]/40 tracking-[0.4em] mb-4 uppercase">
                    ─── {language === 'ru' ? 'Проект' : 'Project'} ───
                  </div>
                  <h3 className="font-mono text-xl md:text-3xl text-[#E0E0E0] mb-4 uppercase tracking-tighter">
                    {currentItem.title}
                  </h3>
                  <div className="font-mono text-xs text-[#E0E0E0]/60 mb-6 uppercase tracking-widest">
                    {currentItem.category}
                  </div>
                </div>
                <div>
                  <p className="font-mono text-xs md:text-sm text-[#E0E0E0]/80 leading-relaxed mb-4">
                    {currentItem.description}
                  </p>
                  {currentItem.solution && (
                    <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed mb-6">
                      <span className="font-semibold">{language === 'ru' ? 'Решение: ' : 'Solution: '}</span>
                      {currentItem.solution}
                    </p>
                  )}
                  {currentItem.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {currentItem.technologies.map((tech, i) => (
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

          {/* Видео карточка с обложкой и кнопкой плей */}
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
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="font-mono text-[10px] tracking-[0.4em] mb-2 text-white/40 uppercase">
                      ─── {language === 'ru' ? 'Видео' : 'Video'} ───
                    </div>
                    <h3 className="font-mono text-xl md:text-3xl mb-2 uppercase tracking-tighter text-white">
                      {currentItem.title}
                    </h3>
                    <div className="font-mono text-xs mb-2 text-white/60 uppercase tracking-widest">
                      {currentItem.category}
                    </div>
                    <p className="font-mono text-xs md:text-sm max-w-md leading-relaxed text-white/80">
                      {currentItem.description}
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Кнопки навигации - всегда видимы, фиксированное положение */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/60 border border-white/20 text-white hover:bg-white/20 transition-all backdrop-blur-md rounded-full z-10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/60 border border-white/20 text-white hover:bg-white/20 transition-all backdrop-blur-md rounded-full z-10"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Индикаторы */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {carouselItems.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(i);
                setPlayingVideo(null);
              }}
              className={`h-1 transition-all duration-300 ${i === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
