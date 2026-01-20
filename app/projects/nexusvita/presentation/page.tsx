"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Activity, Users, Brain, Shield, Zap, Coins, Building2, Target, BookOpen } from 'lucide-react';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import Timeline from '@/components/presentation/Timeline';
import { getIntroductionSlides, getWhitepaperSections } from './slides';

export default function NexusVitaPresentation() {
  const { t, language } = useI18n();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showIntroduction, setShowIntroduction] = useState(true);
  
  // Финансовые данные проекта
  const totalBudget = 287000; // $287K
  const totalInvested = 55000; // $55K
  
  const introductionSlides = getIntroductionSlides(language);
  const whitepaperSections = getWhitepaperSections(language);
  
  const roadmapItems = [
    { 
      period: 'Q1 2025',
      title: language === 'ru' ? 'MVP Launch' : 'MVP Launch', 
      description: language === 'ru' 
        ? 'Профили, базовая карта здоровья, маркетплейс'
        : 'Profiles, basic health map, marketplace', 
      status: 'current' as const,
      budget: {
        allocated: 115000,
        spent: 55000,
        breakdown: [
          { category: language === 'ru' ? 'Разработка платформы' : 'Platform Development', amount: 50000, description: language === 'ru' ? 'Базовый функционал' : 'Basic functionality' },
          { category: language === 'ru' ? 'Профили и карта здоровья' : 'Profiles & Health Map', amount: 40000, description: language === 'ru' ? 'Личностный профиль' : 'Personal profile' },
          { category: language === 'ru' ? 'Маркетплейс (бета)' : 'Marketplace (Beta)', amount: 25000, description: language === 'ru' ? 'Базовый функционал' : 'Basic functionality' },
        ]
      }
    },
    { 
      period: 'Q2 2025', 
      title: language === 'ru' ? 'AI и Социальная сеть' : 'AI and Social Network', 
      description: language === 'ru'
        ? 'AI-анализ, социальная сеть здоровья, система челленджей'
        : 'AI analysis, health social network, challenge system', 
      status: 'upcoming' as const,
      budget: {
        allocated: 80000,
        spent: 0,
        breakdown: [
          { category: language === 'ru' ? 'AI-анализ' : 'AI Analysis', amount: 35000, description: language === 'ru' ? 'AI-ассистент и рекомендации' : 'AI assistant & recommendations' },
          { category: language === 'ru' ? 'Социальная сеть' : 'Social Network', amount: 30000, description: language === 'ru' ? 'Сообщество и поддержка' : 'Community & support' },
          { category: language === 'ru' ? 'Система челленджей' : 'Challenge System', amount: 15000, description: language === 'ru' ? 'Челленджи и программы' : 'Challenges & programs' },
        ]
      }
    },
    { 
      period: 'Q3 2025', 
      title: language === 'ru' ? 'DAO и Токеномика' : 'DAO and Tokenomics', 
      description: language === 'ru'
        ? 'DAO запуск, токеномика и стейкинг, расширенные программы'
        : 'DAO launch, tokenomics and staking, extended programs', 
      status: 'upcoming' as const,
      budget: {
        allocated: 60000,
        spent: 0,
        breakdown: [
          { category: language === 'ru' ? 'DAO запуск' : 'DAO Launch', amount: 25000, description: language === 'ru' ? 'Голосование и управление' : 'Voting & governance' },
          { category: language === 'ru' ? 'Токеномика' : 'Tokenomics', amount: 20000, description: language === 'ru' ? 'Токены и стейкинг' : 'Tokens & staking' },
          { category: language === 'ru' ? 'Расширенные программы' : 'Extended Programs', amount: 15000, description: language === 'ru' ? 'Новые функции' : 'New features' },
        ]
      }
    },
    { 
      period: 'Q4 2025', 
      title: language === 'ru' ? 'Корпоративные и Городские программы' : 'Corporate and City Programs', 
      description: language === 'ru'
        ? 'Корпоративные программы wellbeing, городские программы, мобильные приложения'
        : 'Corporate wellbeing programs, city programs, mobile apps', 
      status: 'upcoming' as const,
      budget: {
        allocated: 32000,
        spent: 0,
        breakdown: [
          { category: language === 'ru' ? 'Корпоративные программы' : 'Corporate Programs', amount: 15000, description: language === 'ru' ? 'Wellbeing программы' : 'Wellbeing programs' },
          { category: language === 'ru' ? 'Городские программы' : 'City Programs', amount: 10000, description: language === 'ru' ? 'Муниципальные программы' : 'Municipal programs' },
          { category: language === 'ru' ? 'Мобильные приложения' : 'Mobile Apps', amount: 7000, description: language === 'ru' ? 'iOS и Android' : 'iOS & Android' },
        ]
      }
    },
  ];

  const nextSlide = () => {
    if (showIntroduction && currentSlide < introductionSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (showIntroduction && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToWhitepaper = () => {
    setShowIntroduction(false);
    setCurrentSlide(0);
  };

  const goToIntroduction = () => {
    setShowIntroduction(true);
    setCurrentSlide(0);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#E0E0E0]">
      <Header />
      
      <main className="relative z-10 pt-20 md:pt-24 pb-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <Link 
              href="/hub"
              className="font-mono text-sm text-[#E0E0E0]/60 hover:text-[#E0E0E0] transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              {t('presentation.back')} {language === 'ru' ? 'к HUB' : 'to HUB'}
            </Link>
            
            <div className="flex gap-4">
              <button
                onClick={goToIntroduction}
                className={`font-mono text-sm px-4 py-2 border transition-all ${
                  showIntroduction
                    ? 'border-[#E0E0E0] bg-[#E0E0E0]/10 text-[#E0E0E0]'
                    : 'border-[#E0E0E0]/20 text-[#E0E0E0]/60 hover:border-[#E0E0E0]/40'
                }`}
              >
                {t('presentation.introduction')}
              </button>
              <button
                onClick={goToWhitepaper}
                className={`font-mono text-sm px-4 py-2 border transition-all ${
                  !showIntroduction
                    ? 'border-[#E0E0E0] bg-[#E0E0E0]/10 text-[#E0E0E0]'
                    : 'border-[#E0E0E0]/20 text-[#E0E0E0]/60 hover:border-[#E0E0E0]/40'
                }`}
              >
                {t('presentation.whitepaper')}
              </button>
            </div>
          </div>

          {showIntroduction && (
            <div className="relative">
              <div className="border border-[#E0E0E0]/20 bg-[#050505]/50 backdrop-blur-sm p-8 md:p-12 min-h-[600px] flex flex-col">
                <div className="flex-1">
                  <div className="mb-8">
                    <h1 className="text-4xl md:text-6xl font-mono font-light tracking-tight text-[#E0E0E0] mb-4">
                      {introductionSlides[currentSlide].title}
                    </h1>
                    {introductionSlides[currentSlide].subtitle && (
                      <p className="font-mono text-lg text-[#E0E0E0]/80">
                        {introductionSlides[currentSlide].subtitle}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4 text-[#E0E0E0]/90">
                    {Array.isArray(introductionSlides[currentSlide].content) ? (
                      <ul className="space-y-3">
                        {introductionSlides[currentSlide].content.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-[#E0E0E0]/40 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-lg leading-relaxed">{introductionSlides[currentSlide].content}</p>
                    )}
                    
                    {/* Визуализация дорожной карты для слайда 8 */}
                    {currentSlide === 7 && (
                      <div className="mt-8">
                        <Timeline 
                          items={roadmapItems} 
                          totalBudget={totalBudget}
                          totalInvested={totalInvested}
                          showBudget={true}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-8 border-t border-[#E0E0E0]/10">
                  <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="font-mono text-sm px-6 py-3 border border-[#E0E0E0]/20 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#E0E0E0]/40 transition-all flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {t('presentation.prev')}
                  </button>

                  <div className="flex gap-2">
                    {introductionSlides.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentSlide ? 'bg-[#E0E0E0]' : 'bg-[#E0E0E0]/20'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {currentSlide === introductionSlides.length - 1 ? (
                      <button
                        onClick={goToWhitepaper}
                        className="font-mono text-sm px-6 py-3 border border-[#E0E0E0] bg-[#E0E0E0]/10 hover:bg-[#E0E0E0]/20 transition-all flex items-center gap-2"
                      >
                        {t('presentation.whitepaper')}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={nextSlide}
                        className="font-mono text-sm px-6 py-3 border border-[#E0E0E0]/20 hover:border-[#E0E0E0]/40 transition-all flex items-center gap-2"
                      >
                        {t('presentation.next')}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!showIntroduction && (
            <div className="space-y-6">
              {whitepaperSections.map((section) => (
                <div
                  key={section.id}
                  className="border border-[#E0E0E0]/20 bg-[#050505]/50 backdrop-blur-sm p-8 md:p-12"
                >
                  <h2 className="text-3xl md:text-4xl font-mono font-light tracking-tight text-[#E0E0E0] mb-6">
                    {section.title}
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-[#E0E0E0]/90 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

