"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Globe, TrendingUp, Users, Zap, Shield, Database, Coins, Building2, Target } from 'lucide-react';
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

export default function CivilizationProtocolPresentation() {
  const { t, language } = useI18n();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showIntroduction, setShowIntroduction] = useState(true);
  
  const whitepaperSections = getWhitepaperSections(language);
  
  // Данные для визуализаций
  const investmentTiers = [
    { label: language === 'ru' ? 'Seed' : 'Seed', value: 30000, color: '#E0E0E0', min: 10000, max: 50000, roi: '15-20%' },
    { label: language === 'ru' ? 'Strategic' : 'Strategic', value: 125000, color: '#B0B0B0', min: 50000, max: 200000, roi: '18-25%' },
    { label: language === 'ru' ? 'Infrastructure' : 'Infrastructure', value: 350000, color: '#808080', min: 200000, max: 500000, roi: '20-30%' },
    { label: language === 'ru' ? 'Institutional' : 'Institutional', value: 750000, color: '#505050', min: 500000, max: 1000000, roi: '25-35%' },
  ];
  
  const fundAllocation = [
    { label: language === 'ru' ? 'Разработка платформы' : 'Platform Development', value: 40, amount: 460000, color: '#E0E0E0' },
    { label: language === 'ru' ? 'Блокчейн интеграция' : 'Blockchain Integration', value: 25, amount: 287000, color: '#B0B0B0' },
    { label: language === 'ru' ? 'Маркетинг и SMM' : 'Marketing & SMM', value: 15, amount: 172000, color: '#808080' },
    { label: language === 'ru' ? 'Работа с инвесторами' : 'Investor Relations', value: 10, amount: 115000, color: '#505050' },
    { label: language === 'ru' ? 'Операционные расходы' : 'Operating Expenses', value: 10, amount: 115000, color: '#303030' },
  ];
  
  const tokenDistribution = [
    { label: language === 'ru' ? 'Сообщество' : 'Community', value: 40 },
    { label: language === 'ru' ? 'Команда' : 'Team', value: 25 },
    { label: language === 'ru' ? 'Инвесторы' : 'Investors', value: 20 },
    { label: language === 'ru' ? 'Резерв' : 'Reserve', value: 10 },
    { label: language === 'ru' ? 'Ликвидность' : 'Liquidity', value: 5 },
  ];
  
  // Финансовые данные проекта
  const totalBudget = 1150000; // $1.15M
  const totalInvested = 250000; // $250K
  
  const roadmapItems = [
    { 
      period: language === 'ru' ? '2023-2024' : '2023-2024', 
      title: language === 'ru' ? 'Концепция и исследования' : 'Concept & Research', 
      description: language === 'ru' 
        ? 'Разработка концепции платформы, исследование рынков, проработка WhitePaper, заключение партнерств с международными корпорациями, фондами, банками, гос. департаментами Узбекистана'
        : 'Platform concept development, market research, WhitePaper development, partnerships with international corporations, funds, banks, Uzbekistan government departments', 
      status: 'completed' as const,
      budget: {
        allocated: 200000,
        spent: 200000,
        breakdown: [
          { category: language === 'ru' ? 'Разработка концепции' : 'Concept Development', amount: 60000, description: language === 'ru' ? 'Проектирование системы' : 'System design' },
          { category: language === 'ru' ? 'Исследование рынков' : 'Market Research', amount: 50000, description: language === 'ru' ? 'Анализ конкурентов и рынка' : 'Competitor & market analysis' },
          { category: language === 'ru' ? 'WhitePaper' : 'WhitePaper', amount: 40000, description: language === 'ru' ? 'Документация проекта' : 'Project documentation' },
          { category: language === 'ru' ? 'Партнерства' : 'Partnerships', amount: 50000, description: language === 'ru' ? 'Международные корпорации, фонды, банки' : 'International corporations, funds, banks' },
        ]
      }
    },
    { 
      period: language === 'ru' ? '2024-2025' : '2024-2025', 
      title: language === 'ru' ? 'Разработка альфа-версии' : 'Alpha Development', 
      description: language === 'ru'
        ? 'Разработка альфа-версии приложения экосистемы, разработка блокчейн-инфраструктуры (смарт-контракты, токеномика), подготовка к маркетингу, работа с инвесторами и фондами, начало SMM'
        : 'Alpha version of ecosystem application development, blockchain infrastructure development (smart contracts, tokenomics), marketing preparation, work with investors and funds, SMM start', 
      status: 'current' as const,
      budget: {
        allocated: 460000,
        spent: 50000,
        breakdown: [
          { category: language === 'ru' ? 'Разработка приложения' : 'Application Development', amount: 184000, description: language === 'ru' ? 'Альфа-версия экосистемы' : 'Alpha version of ecosystem' },
          { category: language === 'ru' ? 'Блокчейн инфраструктура' : 'Blockchain Infrastructure', amount: 115000, description: language === 'ru' ? 'Смарт-контракты, токеномика' : 'Smart contracts, tokenomics' },
          { category: language === 'ru' ? 'Подготовка к маркетингу' : 'Marketing Preparation', amount: 69000, description: language === 'ru' ? 'Стратегия и материалы' : 'Strategy & materials' },
          { category: language === 'ru' ? 'Работа с инвесторами' : 'Investor Relations', amount: 46000, description: language === 'ru' ? 'Фонды и инвесторы' : 'Funds & investors' },
          { category: language === 'ru' ? 'SMM и сообщество' : 'SMM & Community', amount: 46000, description: language === 'ru' ? 'Начало продвижения' : 'Promotion start' },
        ]
      }
    },
    { 
      period: language === 'ru' ? '2025-2026' : '2025-2026', 
      title: language === 'ru' ? 'Интеграция и запуск' : 'Integration & Launch', 
      description: language === 'ru'
        ? 'Интеграция блокчейна в платформу, запуск токена VOD, интеграция IoT-датчиков, запуск DAO'
        : 'Blockchain integration into platform, VOD token launch, IoT sensor integration, DAO launch', 
      status: 'upcoming' as const,
      budget: {
        allocated: 287000,
        spent: 0,
        breakdown: [
          { category: language === 'ru' ? 'Интеграция блокчейна' : 'Blockchain Integration', amount: 143500, description: language === 'ru' ? 'Интеграция в платформу' : 'Platform integration' },
          { category: language === 'ru' ? 'Запуск токена VOD' : 'VOD Token Launch', amount: 57400, description: language === 'ru' ? 'Токенизация и листинг' : 'Tokenization & listing' },
          { category: language === 'ru' ? 'IoT интеграция' : 'IoT Integration', amount: 57400, description: language === 'ru' ? 'Датчики и мониторинг' : 'Sensors & monitoring' },
          { category: language === 'ru' ? 'Запуск DAO' : 'DAO Launch', amount: 28700, description: language === 'ru' ? 'Голосование и управление' : 'Voting & governance' },
        ]
      }
    },
    { 
      period: language === 'ru' ? '2026+' : '2026+', 
      title: language === 'ru' ? 'Масштабирование' : 'Scaling', 
      description: language === 'ru'
        ? 'Расширение сети датчиков, глобальное масштабирование, интеграция с международными организациями'
        : 'Sensor network expansion, global scaling, integration with international organizations', 
      status: 'upcoming' as const,
      budget: {
        allocated: 203000,
        spent: 0,
        breakdown: [
          { category: language === 'ru' ? 'Расширение сети' : 'Network Expansion', amount: 101500, description: language === 'ru' ? 'Дополнительные датчики' : 'Additional sensors' },
          { category: language === 'ru' ? 'Глобальное масштабирование' : 'Global Scaling', amount: 60900, description: language === 'ru' ? 'Международная экспансия' : 'International expansion' },
          { category: language === 'ru' ? 'Международные партнерства' : 'International Partnerships', amount: 40600, description: language === 'ru' ? 'ООН, UN-Water' : 'UN, UN-Water' },
        ]
      }
    },
  ];
  
  const introductionSlides = getIntroductionSlides(language);

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
    setActiveSection(null);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#E0E0E0]">
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.05); }
        }
        @keyframes wave {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-10px) translateY(-5px); }
        }
      `}</style>
      <Header />
      
      <main className="relative z-10 pt-20 md:pt-24 pb-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Навигация */}
          <div className="mb-8 flex items-center justify-between">
            <Link 
              href="/projects/civilization-protocol"
              className="font-mono text-sm text-[#E0E0E0]/60 hover:text-[#E0E0E0] transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              {t('presentation.back')} {language === 'ru' ? 'к проекту' : 'to project'}
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

          {/* Краткое введение */}
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
                        {(introductionSlides[currentSlide].content as string[]).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-[#E0E0E0]/40 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-lg leading-relaxed">{introductionSlides[currentSlide].content as string}</p>
                    )}
                    
                    {/* Визуальные элементы для конкретных слайдов */}
                    {currentSlide === 4 && (
                      <div className="mt-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h3 className="font-mono text-sm text-[#E0E0E0]/60 uppercase tracking-wider mb-4">
                              {language === 'ru' ? 'Распределение токенов' : 'Token Distribution'}
                            </h3>
                            <PieChart data={tokenDistribution} size={180} />
                          </div>
                          <div className="space-y-4">
                            <h3 className="font-mono text-sm text-[#E0E0E0]/60 uppercase tracking-wider mb-4">
                              {language === 'ru' ? 'Общее предложение' : 'Total Supply'}
                            </h3>
                            <div className="border border-[#E0E0E0]/20 bg-[#050505]/50 p-6">
                              <div className="text-3xl font-mono font-light text-[#E0E0E0] mb-2">1B</div>
                              <div className="font-mono text-xs text-[#E0E0E0]/60 uppercase tracking-wider mb-4">VOD Tokens</div>
                              <div className="space-y-2 pt-4 border-t border-[#E0E0E0]/10">
                                <div className="flex justify-between text-xs">
                                  <span className="text-[#E0E0E0]/60">{language === 'ru' ? 'Тип:' : 'Type:'}</span>
                                  <span className="text-[#E0E0E0]">{language === 'ru' ? 'Utility + Governance' : 'Utility + Governance'}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-[#E0E0E0]/60">{language === 'ru' ? 'Функции:' : 'Functions:'}</span>
                                  <span className="text-[#E0E0E0]">{language === 'ru' ? 'DAO, Staking, Investment' : 'DAO, Staking, Investment'}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#E0E0E0]/10">
                          {tokenDistribution.map((item, idx) => (
                            <div key={idx} className="text-center p-3 border border-[#E0E0E0]/10 bg-[#050505]/30">
                              <div className="font-mono text-lg text-[#E0E0E0]">{item.value}%</div>
                              <div className="font-mono text-xs text-[#E0E0E0]/60 mt-1">{item.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
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
                    
                    {currentSlide === 1 && (
                      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 border border-[#E0E0E0]/20 bg-[#050505]/50">
                          <div className="text-3xl font-mono font-light text-[#E0E0E0] mb-2">$500B</div>
                          <div className="font-mono text-xs text-[#E0E0E0]/60">{language === 'ru' ? 'Ежегодные потери' : 'Annual Losses'}</div>
                        </div>
                        <div className="text-center p-4 border border-[#E0E0E0]/20 bg-[#050505]/50">
                          <div className="text-3xl font-mono font-light text-[#E0E0E0] mb-2">40%</div>
                          <div className="font-mono text-xs text-[#E0E0E0]/60">{language === 'ru' ? 'Рост спроса к 2030' : 'Demand Growth by 2030'}</div>
                        </div>
                        <div className="text-center p-4 border border-[#E0E0E0]/20 bg-[#050505]/50">
                          <div className="text-3xl font-mono font-light text-[#E0E0E0] mb-2">60%</div>
                          <div className="font-mono text-xs text-[#E0E0E0]/60">{language === 'ru' ? 'Без мониторинга' : 'Without Monitoring'}</div>
                        </div>
                        <div className="text-center p-4 border border-[#E0E0E0]/20 bg-[#050505]/50">
                          <div className="text-3xl font-mono font-light text-[#E0E0E0] mb-2">2/3</div>
                          <div className="font-mono text-xs text-[#E0E0E0]/60">{language === 'ru' ? 'Населения планеты' : 'World Population'}</div>
                        </div>
                      </div>
                    )}
                    
                    {currentSlide === 2 && (
                      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatCard icon={Globe} value="IoT" label={language === 'ru' ? 'Мониторинг в реальном времени' : 'Real-time Monitoring'} />
                        <StatCard icon={Users} value="DAO" label={language === 'ru' ? 'Децентрализованное управление' : 'Decentralized Governance'} />
                        <StatCard icon={Coins} value="VOD" label={language === 'ru' ? 'Токеномика' : 'Token Economy'} />
                      </div>
                    )}
                    
                    {currentSlide === 3 && (
                      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          {introductionSlides[3].content && Array.isArray(introductionSlides[3].content) && 
                            (introductionSlides[3].content as string[]).slice(0, 3).map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3 p-3 border border-[#E0E0E0]/10 bg-[#050505]/30">
                                <div className="w-6 h-6 rounded-full border border-[#E0E0E0]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="font-mono text-xs text-[#E0E0E0]/60">{idx + 1}</span>
                                </div>
                                <span className="font-mono text-sm text-[#E0E0E0]/90">{item}</span>
                              </div>
                            ))
                          }
                        </div>
                        <div className="space-y-3">
                          {introductionSlides[3].content && Array.isArray(introductionSlides[3].content) && 
                            (introductionSlides[3].content as string[]).slice(3).map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3 p-3 border border-[#E0E0E0]/10 bg-[#050505]/30">
                                <div className="w-6 h-6 rounded-full border border-[#E0E0E0]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="font-mono text-xs text-[#E0E0E0]/60">{idx + 4}</span>
                                </div>
                                <span className="font-mono text-sm text-[#E0E0E0]/90">{item}</span>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    )}
                    
                    {currentSlide === 5 && (
                      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="font-mono text-sm text-[#E0E0E0]/60 uppercase tracking-wider mb-4">
                            {language === 'ru' ? 'Заинтересованные стороны' : 'Stakeholders'}
                          </h3>
                          <div className="space-y-2">
                            {introductionSlides[5].content && Array.isArray(introductionSlides[5].content) && 
                              (introductionSlides[5].content as string[]).map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 border border-[#E0E0E0]/10 bg-[#050505]/30">
                                  <div className="w-2 h-2 rounded-full bg-[#E0E0E0]/60" />
                                  <span className="font-mono text-sm text-[#E0E0E0]/90">{item}</span>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="font-mono text-sm text-[#E0E0E0]/60 uppercase tracking-wider mb-4">
                            {language === 'ru' ? 'Партнерства' : 'Partnerships'}
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 border border-[#E0E0E0]/20 bg-[#050505]/50 text-center">
                              <div className="font-mono text-xs text-[#E0E0E0]/60 mb-1">{language === 'ru' ? 'Международные' : 'International'}</div>
                              <div className="font-mono text-lg text-[#E0E0E0]">15+</div>
                            </div>
                            <div className="p-4 border border-[#E0E0E0]/20 bg-[#050505]/50 text-center">
                              <div className="font-mono text-xs text-[#E0E0E0]/60 mb-1">{language === 'ru' ? 'Государственные' : 'Government'}</div>
                              <div className="font-mono text-lg text-[#E0E0E0]">5+</div>
                            </div>
                            <div className="p-4 border border-[#E0E0E0]/20 bg-[#050505]/50 text-center">
                              <div className="font-mono text-xs text-[#E0E0E0]/60 mb-1">{language === 'ru' ? 'Фонды' : 'Funds'}</div>
                              <div className="font-mono text-lg text-[#E0E0E0]">8+</div>
                            </div>
                            <div className="p-4 border border-[#E0E0E0]/20 bg-[#050505]/50 text-center">
                              <div className="font-mono text-xs text-[#E0E0E0]/60 mb-1">{language === 'ru' ? 'Банки' : 'Banks'}</div>
                              <div className="font-mono text-lg text-[#E0E0E0]">6+</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {currentSlide === 6 && (
                      <div className="mt-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-mono text-sm text-[#E0E0E0]/60 uppercase tracking-wider mb-4">
                              {language === 'ru' ? 'Уровни инвестиций' : 'Investment Tiers'}
                            </h3>
                            <div className="space-y-3">
                              {investmentTiers.map((tier, idx) => (
                                <div key={idx} className="border border-[#E0E0E0]/20 bg-[#050505]/50 p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-mono text-sm text-[#E0E0E0]">{tier.label}</span>
                                    <span className="font-mono text-xs text-[#E0E0E0]/60">ROI: {tier.roi}</span>
                                  </div>
                                  <div className="font-mono text-xs text-[#E0E0E0]/60 mb-2">
                                    ${(tier.min / 1000).toFixed(0)}K - ${(tier.max / 1000).toFixed(0)}K
                                  </div>
                                  <div className="h-1 bg-[#050505] border border-[#E0E0E0]/20 overflow-hidden">
                                    <div 
                                      className="h-full transition-all"
                                      style={{ 
                                        width: `${((tier.value - tier.min) / (tier.max - tier.min)) * 100}%`,
                                        backgroundColor: tier.color 
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-mono text-sm text-[#E0E0E0]/60 uppercase tracking-wider mb-4">
                              {language === 'ru' ? 'Распределение средств' : 'Fund Allocation'}
                            </h3>
                            <PieChart data={fundAllocation.map(item => ({ label: item.label, value: item.value }))} size={200} />
                            <div className="mt-4 space-y-2">
                              {fundAllocation.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between text-xs">
                                  <span className="text-[#E0E0E0]/80">{item.label}</span>
                                  <span className="text-[#E0E0E0]">${(item.amount / 1000).toFixed(0)}K ({item.value}%)</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#E0E0E0]/10">
                          <div className="text-center p-4 border border-[#E0E0E0]/20 bg-[#050505]/50">
                            <div className="font-mono text-xs text-[#E0E0E0]/60 uppercase tracking-wider mb-2">
                              {language === 'ru' ? 'Общий бюджет' : 'Total Budget'}
                            </div>
                            <div className="text-2xl font-mono font-light text-[#E0E0E0]">$1.15M</div>
                          </div>
                          <div className="text-center p-4 border border-[#E0E0E0]/20 bg-[#050505]/50">
                            <div className="font-mono text-xs text-[#E0E0E0]/60 uppercase tracking-wider mb-2">
                              {language === 'ru' ? 'Инвестировано' : 'Invested'}
                            </div>
                            <div className="text-2xl font-mono font-light text-[#E0E0E0]">$250K</div>
                            <div className="text-xs font-mono text-[#E0E0E0]/60 mt-1">22%</div>
                          </div>
                          <div className="text-center p-4 border border-[#E0E0E0]/20 bg-[#050505]/50">
                            <div className="font-mono text-xs text-[#E0E0E0]/60 uppercase tracking-wider mb-2">
                              {language === 'ru' ? 'Необходимо' : 'Required'}
                            </div>
                            <div className="text-2xl font-mono font-light text-[#E0E0E0]">$900K</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Навигация слайдов */}
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

          {/* Вайтпейпер */}
          {!showIntroduction && (
            <div className="space-y-6">
              {whitepaperSections.map((section, idx) => (
                <div
                  key={section.id}
                  className="border border-[#E0E0E0]/20 bg-[#050505]/50 backdrop-blur-sm p-8 md:p-12 relative overflow-hidden"
                >
                  {/* Уникальный визуальный стиль для Civilization Protocol - водные волны */}
                  <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
                    <div className="w-full h-full border border-[#E0E0E0]/10 rounded-full" style={{
                      background: 'radial-gradient(circle, transparent 20%, rgba(224,224,224,0.05) 20%, rgba(224,224,224,0.05) 80%, transparent 80%, transparent)',
                      backgroundSize: '20px 20px',
                      animation: 'pulse 4s ease-in-out infinite'
                    }} />
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-mono font-light tracking-tight text-[#E0E0E0] mb-6 relative z-10">
                    {section.title}
                  </h2>
                  <div className="prose prose-invert max-w-none relative z-10">
                    <p className="text-[#E0E0E0]/90 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                    
                    {/* Визуализации для конкретных секций */}
                    {section.id === 'tokenomics' && (
                      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="font-mono text-sm text-[#E0E0E0]/60 uppercase tracking-wider">
                            {language === 'ru' ? 'Фазы развития токена' : 'Token Development Phases'}
                          </h3>
                          <div className="space-y-3">
                            {[
                              { phase: language === 'ru' ? 'Phase I' : 'Phase I', title: language === 'ru' ? 'Participation & Access' : 'Participation & Access' },
                              { phase: language === 'ru' ? 'Phase II' : 'Phase II', title: language === 'ru' ? 'Staking & Governance' : 'Staking & Governance' },
                              { phase: language === 'ru' ? 'Phase III' : 'Phase III', title: language === 'ru' ? 'Data Anchoring' : 'Data Anchoring' },
                              { phase: language === 'ru' ? 'Phase IV' : 'Phase IV', title: language === 'ru' ? 'Resource-Linked Logic' : 'Resource-Linked Logic' },
                            ].map((item, i) => (
                              <div key={i} className="flex items-center gap-4 p-3 border border-[#E0E0E0]/10 bg-[#050505]/30">
                                <div className="w-12 h-12 rounded-full border border-[#E0E0E0]/30 flex items-center justify-center flex-shrink-0">
                                  <span className="font-mono text-xs text-[#E0E0E0]">{item.phase}</span>
                                </div>
                                <span className="font-mono text-sm text-[#E0E0E0]/90">{item.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="font-mono text-sm text-[#E0E0E0]/60 uppercase tracking-wider">
                            {language === 'ru' ? 'Распределение токенов' : 'Token Distribution'}
                          </h3>
                          <PieChart data={tokenDistribution} size={200} />
                        </div>
                      </div>
                    )}
                    
                    {section.id === 'investment' && (
                      <div className="mt-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 border border-[#E0E0E0]/20 bg-[#050505]/50 text-center">
                            <div className="font-mono text-xs text-[#E0E0E0]/60 uppercase tracking-wider mb-2">
                              {language === 'ru' ? 'Проекты' : 'Projects'}
                            </div>
                            <div className="text-3xl font-mono font-light text-[#E0E0E0] mb-1">3</div>
                            <div className="font-mono text-xs text-[#E0E0E0]/60">{language === 'ru' ? 'Активных' : 'Active'}</div>
                          </div>
                          <div className="p-4 border border-[#E0E0E0]/20 bg-[#050505]/50 text-center">
                            <div className="font-mono text-xs text-[#E0E0E0]/60 uppercase tracking-wider mb-2">
                              {language === 'ru' ? 'Общая стоимость' : 'Total Value'}
                            </div>
                            <div className="text-3xl font-mono font-light text-[#E0E0E0] mb-1">$25.9M</div>
                            <div className="font-mono text-xs text-[#E0E0E0]/60">{language === 'ru' ? 'Инфраструктура' : 'Infrastructure'}</div>
                          </div>
                          <div className="p-4 border border-[#E0E0E0]/20 bg-[#050505]/50 text-center">
                            <div className="font-mono text-xs text-[#E0E0E0]/60 uppercase tracking-wider mb-2">
                              {language === 'ru' ? 'Средний IRR' : 'Avg IRR'}
                            </div>
                            <div className="text-3xl font-mono font-light text-[#E0E0E0] mb-1">18%</div>
                            <div className="font-mono text-xs text-[#E0E0E0]/60">{language === 'ru' ? 'Доходность' : 'Returns'}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-mono text-sm text-[#E0E0E0]/60 uppercase tracking-wider mb-4">
                              {language === 'ru' ? 'Примеры проектов' : 'Example Projects'}
                            </h3>
                            <div className="space-y-3">
                              {[
                                { name: language === 'ru' ? 'Pumping Station No. 2' : 'Pumping Station No. 2', value: '$7.76M', irr: '17%' },
                                { name: language === 'ru' ? 'Korovulbozor Station' : 'Korovulbozor Station', value: '$6.19M', irr: '15%' },
                                { name: language === 'ru' ? 'Kuyumazar Station' : 'Kuyumazar Station', value: '$11.97M', irr: '22%' },
                              ].map((project, i) => (
                                <div key={i} className="flex items-center justify-between p-3 border border-[#E0E0E0]/10 bg-[#050505]/30">
                                  <div>
                                    <div className="font-mono text-sm text-[#E0E0E0]">{project.name}</div>
                                    <div className="font-mono text-xs text-[#E0E0E0]/60">{project.value}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-mono text-sm text-[#E0E0E0]">{project.irr}</div>
                                    <div className="font-mono text-xs text-[#E0E0E0]/60">IRR</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-mono text-sm text-[#E0E0E0]/60 uppercase tracking-wider mb-4">
                              {language === 'ru' ? 'Распределение средств' : 'Fund Allocation'}
                            </h3>
                            <PieChart data={fundAllocation.map(item => ({ label: item.label, value: item.value }))} size={200} />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {section.id === 'financials' && (
                      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-mono text-sm text-[#E0E0E0]/60 uppercase tracking-wider mb-4">
                            {language === 'ru' ? 'Источники дохода' : 'Revenue Sources'}
                          </h3>
                          <div className="space-y-3">
                            {[
                              { source: language === 'ru' ? 'Комиссии с проектов' : 'Project Commissions', value: '40%' },
                              { source: language === 'ru' ? 'Стейкинг и токеномика' : 'Staking & Tokenomics', value: '30%' },
                              { source: language === 'ru' ? 'Премиум подписки' : 'Premium Subscriptions', value: '15%' },
                              { source: language === 'ru' ? 'Лицензирование' : 'Licensing', value: '10%' },
                              { source: language === 'ru' ? 'Консалтинг' : 'Consulting', value: '5%' },
                            ].map((item, i) => (
                              <div key={i} className="flex items-center justify-between p-3 border border-[#E0E0E0]/10 bg-[#050505]/30">
                                <span className="font-mono text-sm text-[#E0E0E0]/90">{item.source}</span>
                                <span className="font-mono text-sm text-[#E0E0E0]">{item.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-mono text-sm text-[#E0E0E0]/60 uppercase tracking-wider mb-4">
                            {language === 'ru' ? 'Прогноз роста' : 'Growth Forecast'}
                          </h3>
                          <div className="space-y-4">
                            {[
                              { period: language === 'ru' ? 'Q1 2025' : 'Q1 2025', milestone: language === 'ru' ? 'Завершение Phase 2, запуск DAO' : 'Phase 2 Complete, DAO Launch' },
                              { period: language === 'ru' ? 'Q2 2025' : 'Q2 2025', milestone: language === 'ru' ? '100+ водных объектов' : '100+ Water Objects' },
                              { period: language === 'ru' ? 'Q3-Q4 2025' : 'Q3-Q4 2025', milestone: language === 'ru' ? 'Расширение на 5+ стран' : 'Expansion to 5+ Countries' },
                              { period: '2026', milestone: language === 'ru' ? 'Глобальное масштабирование' : 'Global Scaling' },
                            ].map((item, i) => (
                              <div key={i} className="flex items-start gap-4 p-3 border border-[#E0E0E0]/10 bg-[#050505]/30">
                                <div className="w-8 h-8 rounded-full border border-[#E0E0E0]/30 flex items-center justify-center flex-shrink-0">
                                  <span className="font-mono text-xs text-[#E0E0E0]">{i + 1}</span>
                                </div>
                                <div className="flex-1">
                                  <div className="font-mono text-sm text-[#E0E0E0] mb-1">{item.period}</div>
                                  <div className="font-mono text-xs text-[#E0E0E0]/60">{item.milestone}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
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

