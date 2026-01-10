"use client";

import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { useI18n } from '@/lib/i18n/context';
import { ExternalLink, TrendingUp, Calendar, Users, Target } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  url: string;
  progress: number;
  targetAmount: number;
  investedAmount: number;
  status: 'active' | 'pilot' | 'beta' | 'planning';
  category: string;
  categoryEn: string;
}

const projects: Project[] = [
  {
    id: 'civilization-protocol',
    name: 'Civilization Protocol',
    nameEn: 'Civilization Protocol',
    description: 'Децентрализованная кибер-физическая платформа для управления водными ресурсами через блокчейн. VODeco (Value of Data – Water Ecosystem) включает двойную токеномику (VODeco + VOD), DAO-управление, мониторинг через IoT и AI, токенизацию водных ресурсов и инвестиционные проекты. Глобальный маркетплейс инициатив, охватывающий воду, экологию, энергетику, медицину и науку. Phase 2.',
    descriptionEn: 'Decentralized cyber-physical platform for water resource management through blockchain. VODeco (Value of Data – Water Ecosystem) includes dual tokenomics (VODeco + VOD), DAO governance, IoT and AI monitoring, water resource tokenization, and investment projects. Global marketplace for initiatives covering water, ecology, energy, medicine, and science. Phase 2.',
    url: 'https://civilization-protocol.vercel.app/',
    progress: 22,
    targetAmount: 1150000,
    investedAmount: 250000,
    status: 'active',
    category: 'Блокчейн / Экосистема',
    categoryEn: 'Blockchain / Ecosystem',
  },
  {
    id: 'tradeplus',
    name: 'TradePlus',
    nameEn: 'TradePlus',
    description: 'Продвинутая платформа для торговли и инвестиций с интеграцией множественных криптовалютных бирж, инструментами технического и фундаментального анализа, автоматизацией торговых стратегий и управлением портфелем. Поддержка алгоритмической торговли и социального трейдинга.',
    descriptionEn: 'Advanced trading and investment platform with multi-exchange cryptocurrency integration, technical and fundamental analysis tools, trading strategy automation, and portfolio management. Support for algorithmic trading and social trading.',
    url: 'https://github.com/TimurSama/TradePlus',
    progress: 25,
    targetAmount: 140000,
    investedAmount: 35000,
    status: 'active',
    category: 'Финтех / Трейдинг',
    categoryEn: 'Fintech / Trading',
  },
  {
    id: 'dogymorbios',
    name: 'Dogymorbios',
    nameEn: 'Dogymorbios',
    description: 'Платформенная экосистема и социальная сеть для собак и их владельцев. Объединяет интерактивную карту прогулок с GPS-трекингом, социальную ленту, маркетплейс товаров и услуг, внутреннюю валюту BoneCoin и децентрализованное управление через DAO. Включает умный дейтинг для собак, систему тренировок, журнал здоровья, групповые чаты, задания с геймификацией и базу знаний. Единая платформа для безопасных прогулок, ухода, обучения и общения.',
    descriptionEn: 'Platform ecosystem and social network for dogs and their owners. Combines interactive walking map with GPS tracking, social feed, marketplace for goods and services, internal BoneCoin currency, and decentralized governance through DAO. Includes smart dating for dogs, training system, health journal, group chats, gamified quests, and knowledge base. Unified platform for safe walks, care, training, and communication.',
    url: 'https://github.com/TimurSama/dogymorbios',
    progress: 13,
    targetAmount: 315000,
    investedAmount: 42000,
    status: 'pilot',
    category: 'Социальная сеть / Экосистема',
    categoryEn: 'Social Network / Ecosystem',
  },
  {
    id: 'nexusvita',
    name: 'NexusVita',
    nameEn: 'NexusVita',
    description: 'Платформа интеграции жизненных данных и сервисов в единую экосистему здоровья и благополучия. Обеспечивает связность между медицинскими приложениями, фитнес-трекерами, wellness-сервисами и системами здравоохранения через унифицированные API и стандарты обмена данными.',
    descriptionEn: 'Platform for integrating life data and services into a unified health and wellness ecosystem. Ensures connectivity between medical applications, fitness trackers, wellness services, and healthcare systems through unified APIs and data exchange standards.',
    url: 'https://github.com/TimurSama/NexusVita',
    progress: 19,
    targetAmount: 287000,
    investedAmount: 55000,
    status: 'active',
    category: 'Здоровье / Интеграция',
    categoryEn: 'Health / Integration',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, language } = useI18n();
  // По умолчанию используем английский, для русского показываем русские версии
  
  const statusLabels = {
    active: t('hub.statusActive'),
    pilot: t('hub.statusPilot'),
    beta: t('hub.statusBeta'),
    planning: t('hub.statusPlanning'),
  };

  const statusColors = {
    active: 'border-engrave-line/50 bg-engrave-line/5',
    pilot: 'border-chrome/50 bg-chrome/5',
    beta: 'border-engrave-dim/50 bg-engrave-dim/5',
    planning: 'border-stone-anthracite/50 bg-stone-anthracite/10',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border border-stone-anthracite/30 bg-ink-chrome/30 hover:bg-ink-chrome/50 transition-all group"
    >
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="inline-block px-3 py-1 mb-3 border border-stone-anthracite/30 bg-ink-deep/50">
              <span className="font-mono text-[10px] text-stone-slate tracking-wider">
                {language !== 'en' ? project.category : project.categoryEn}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-mono text-engrave-fresco mb-2 group-hover:text-engrave-line transition-colors">
              {language !== 'en' ? project.name : project.nameEn}
            </h3>
            <p className="font-mono text-sm text-stone-slate leading-relaxed">
              {language !== 'en' ? project.description : project.descriptionEn}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-stone-slate">{t('hub.progress')}</span>
            <span className="font-mono text-xs text-engrave-fresco">{project.progress}%</span>
          </div>
          <div className="h-2 bg-ink-deep border border-stone-anthracite/30 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
              className="h-full bg-gradient-to-r from-engrave-dim via-engrave-line to-chrome"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Target size={14} className="text-engrave-dim" />
              <span className="font-mono text-[10px] text-stone-slate uppercase tracking-wider">
                {t('hub.investment')}
              </span>
            </div>
            <p className="font-mono text-sm text-engrave-fresco">
              {project.targetAmount >= 1000000 
                ? `$${(project.targetAmount / 1000000).toFixed(1)}M`
                : `$${(project.targetAmount / 1000).toFixed(0)}K`}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="text-engrave-dim" />
              <span className="font-mono text-[10px] text-stone-slate uppercase tracking-wider">
                {t('hub.invested')}
              </span>
            </div>
            <p className="font-mono text-sm text-engrave-fresco">
              {project.investedAmount >= 1000000 
                ? `$${(project.investedAmount / 1000000).toFixed(1)}M`
                : `$${(project.investedAmount / 1000).toFixed(0)}K`}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-engrave-dim" />
              <span className="font-mono text-[10px] text-stone-slate uppercase tracking-wider">
                {t('hub.status')}
              </span>
            </div>
            <span className={`inline-block px-2 py-1 border font-mono text-[10px] tracking-wider ${
              statusColors[project.status]
            } text-engrave-fresco`}>
              {statusLabels[project.status]}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-stone-anthracite/20">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-stone-anthracite/30 bg-ink-deep/50
                     hover:border-engrave-line/50 hover:bg-engrave-line/10 transition-all
                     font-mono text-xs text-engrave-fresco tracking-wider group/link"
          >
            {t('hub.viewProject')}
            <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function HubPage() {
  const { t } = useI18n();

  return (
    <div className="relative min-h-screen bg-ink-deep">
      <div className="fixed inset-0 wireframe-grid pointer-events-none" aria-hidden="true" />
      
      <Header />
      
      <main id="main-content" className="relative z-10">
        {/* Hero Section */}
        <section className="px-4 pt-32 pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6 mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-stone-anthracite/30 mb-4">
                <Users size={14} className="text-engrave-dim" />
                <span className="font-mono text-[10px] text-stone-slate tracking-widest">
                  {t('hub.openForInvestment')}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono text-engrave-fresco tracking-tight leading-tight">
                {t('hub.title')}
              </h1>
              
              <p className="font-mono text-sm md:text-base text-stone-slate leading-relaxed max-w-2xl mx-auto">
                {t('hub.subtitle')}
              </p>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

