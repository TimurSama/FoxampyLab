"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, BarChart3, Bot, Users, Shield, Zap, Coins, Building2, Target, BookOpen } from 'lucide-react';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import ProgressBar from '@/components/presentation/ProgressBar';
import StatCard from '@/components/presentation/StatCard';
import BarChart from '@/components/presentation/BarChart';
import PieChart from '@/components/presentation/PieChart';
import Timeline from '@/components/presentation/Timeline';
import FeatureGrid from '@/components/presentation/FeatureGrid';
import { getIntroductionSlides, getWhitepaperSections } from './slides';

export default function TradePlusPresentation() {
  const { t, language } = useI18n();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showIntroduction, setShowIntroduction] = useState(true);

  // Финансовые данные проекта
  const totalBudget = 140000; // $140K
  const totalInvested = 35000; // $35K

  const introductionSlides = getIntroductionSlides(language);
  const whitepaperSections = getWhitepaperSections(language);

  const roadmapItems = [
    {
      period: 'Q1 2024',
      title: language === 'ru' ? 'MVP Development' : 'MVP Development',
      description: language === 'ru'
        ? 'Базовая торговая платформа, интеграция бирж'
        : 'Basic trading platform, exchange integration',
      status: 'completed' as const,
      budget: {
        allocated: 40000,
        spent: 40000,
        breakdown: [
          { category: language === 'ru' ? 'Разработка платформы' : 'Platform Development', amount: 20000, description: language === 'ru' ? 'Базовый функционал' : 'Basic functionality' },
          { category: language === 'ru' ? 'Интеграция бирж' : 'Exchange Integration', amount: 15000, description: language === 'ru' ? 'API подключения' : 'API connections' },
          { category: language === 'ru' ? 'Тестирование' : 'Testing', amount: 5000, description: language === 'ru' ? 'QA и багфиксы' : 'QA & bug fixes' },
        ]
      }
    },
    {
      period: 'Q2-Q3 2024',
      title: language === 'ru' ? 'Beta Launch' : 'Beta Launch',
      description: language === 'ru'
        ? 'Алгоритмический трейдинг, социальный трейдинг'
        : 'Algorithmic trading, social trading',
      status: 'completed' as const,
      budget: {
        allocated: 50000,
        spent: 0,
        breakdown: [
          { category: language === 'ru' ? 'Алгоритмический трейдинг' : 'Algorithmic Trading', amount: 25000, description: language === 'ru' ? 'Боты и стратегии' : 'Bots & strategies' },
          { category: language === 'ru' ? 'Социальный трейдинг' : 'Social Trading', amount: 15000, description: language === 'ru' ? 'Копирование сделок' : 'Copy trading' },
          { category: language === 'ru' ? 'Бета тестирование' : 'Beta Testing', amount: 10000, description: language === 'ru' ? 'Пользовательское тестирование' : 'User testing' },
        ]
      }
    },
    {
      period: 'Q4 2024',
      title: language === 'ru' ? 'Public Launch' : 'Public Launch',
      description: language === 'ru'
        ? 'Маркетплейс, DAO запуск, мобильные приложения'
        : 'Marketplace, DAO launch, mobile apps',
      status: 'current' as const,
      budget: {
        allocated: 30000,
        spent: 0,
        breakdown: [
          { category: language === 'ru' ? 'Маркетплейс' : 'Marketplace', amount: 12000, description: language === 'ru' ? 'Стратегии и индикаторы' : 'Strategies & indicators' },
          { category: language === 'ru' ? 'DAO запуск' : 'DAO Launch', amount: 10000, description: language === 'ru' ? 'Голосование и управление' : 'Voting & governance' },
          { category: language === 'ru' ? 'Мобильные приложения' : 'Mobile Apps', amount: 8000, description: language === 'ru' ? 'iOS и Android' : 'iOS & Android' },
        ]
      }
    },
    {
      period: '2025',
      title: language === 'ru' ? 'Expansion' : 'Expansion',
      description: language === 'ru'
        ? 'Институциональные функции, расширение на новые рынки'
        : 'Institutional features, expansion to new markets',
      status: 'upcoming' as const,
      budget: {
        allocated: 20000,
        spent: 0,
        breakdown: [
          { category: language === 'ru' ? 'Институциональные функции' : 'Institutional Features', amount: 10000, description: language === 'ru' ? 'Расширенные возможности' : 'Extended capabilities' },
          { category: language === 'ru' ? 'Расширение рынков' : 'Market Expansion', amount: 7000, description: language === 'ru' ? 'Новые регионы' : 'New regions' },
          { category: language === 'ru' ? 'Маркетинг' : 'Marketing', amount: 3000, description: language === 'ru' ? 'Продвижение' : 'Promotion' },
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
    <div className="relative min-h-screen bg-transparent text-[#E0E0E0]">
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
                className={`font-mono text-sm px-4 py-2 border transition-all ${showIntroduction
                    ? 'border-[#E0E0E0] bg-[#E0E0E0]/10 text-[#E0E0E0]'
                    : 'border-[#E0E0E0]/20 text-[#E0E0E0]/60 hover:border-[#E0E0E0]/40'
                  }`}
              >
                {t('presentation.introduction')}
              </button>
              <button
                onClick={goToWhitepaper}
                className={`font-mono text-sm px-4 py-2 border transition-all ${!showIntroduction
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
              <div className="bg-glass-matte p-8 md:p-12 min-h-[600px] flex flex-col rounded-sm">
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
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-[#E0E0E0]' : 'bg-[#E0E0E0]/20'
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
                  className="bg-glass-matte p-8 md:p-12 rounded-sm"
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

