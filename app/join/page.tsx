"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Users, 
  Code, 
  Palette, 
  TrendingUp, 
  Cpu,
  Globe,
  Rocket,
  Heart,
  Zap,
  Coffee,
  Star,
  ArrowRight,
  CheckCircle,
  MessageCircle
} from 'lucide-react';
import Header from '@/components/layout/Header';
import FanMenu from '@/components/layout/FanMenu';

const roles = [
  {
    id: 'dev',
    icon: <Code size={28} />,
    title: 'Developers',
    subtitle: 'Разработчики',
    skills: ['React/Next.js', 'Node.js', 'Solidity', 'Three.js', 'Python'],
    description: 'Frontend, Backend, Blockchain, AI/ML разработчики для работы над передовыми проектами.',
    openPositions: 3,
    type: 'FULL-TIME / REMOTE'
  },
  {
    id: 'design',
    icon: <Palette size={28} />,
    title: 'Designers',
    subtitle: 'Дизайнеры',
    skills: ['UI/UX', 'Motion Design', '3D', 'Branding', 'Figma'],
    description: 'UI/UX дизайнеры, моушн-дизайнеры и 3D-художники для создания уникальных визуальных решений.',
    openPositions: 2,
    type: 'FULL-TIME / REMOTE'
  },
  {
    id: 'research',
    icon: <Cpu size={28} />,
    title: 'Researchers',
    subtitle: 'Исследователи',
    skills: ['AI/ML', 'Blockchain', 'Data Science', 'Academic Writing'],
    description: 'Исследователи для работы в R&D направлении. Публикации, эксперименты, инновации.',
    openPositions: 2,
    type: 'PART-TIME / REMOTE'
  },
  {
    id: 'marketing',
    icon: <TrendingUp size={28} />,
    title: 'Growth',
    subtitle: 'Маркетинг и рост',
    skills: ['SMM', 'Content', 'Analytics', 'Community', 'PR'],
    description: 'Маркетологи, контент-менеджеры, community менеджеры для развития проектов.',
    openPositions: 1,
    type: 'FULL-TIME / REMOTE'
  }
];

const benefits = [
  { icon: <Globe size={20} />, title: 'Remote-first', desc: 'Работай откуда угодно' },
  { icon: <Rocket size={20} />, title: 'Cutting-edge', desc: 'Передовые технологии' },
  { icon: <Heart size={20} />, title: 'Equity', desc: 'Долевое участие' },
  { icon: <Coffee size={20} />, title: 'Гибкий график', desc: 'Work-life balance' },
  { icon: <Zap size={20} />, title: 'Быстрый рост', desc: 'Карьерное развитие' },
  { icon: <Star size={20} />, title: 'Интересные проекты', desc: 'Web3, AI, Metaverse' },
];

const values = [
  {
    title: 'ИССЛЕДУЙ',
    desc: 'Мы поощряем эксперименты и не боимся ошибок. Каждый провал — это шаг к открытию.'
  },
  {
    title: 'СОЗДАВАЙ',
    desc: 'Не просто выполняй задачи — создавай что-то значимое. Каждый проект должен менять мир к лучшему.'
  },
  {
    title: 'ДЕЛИСЬ',
    desc: 'Знания умножаются, когда ими делишься. Мы верим в open source, публикации и менторство.'
  },
  {
    title: 'РАСТИ',
    desc: 'Постоянное обучение — наш приоритет. Курсы, конференции, внутренние воркшопы.'
  }
];

export default function JoinPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [formStep, setFormStep] = useState(0);

  return (
    <div className="relative min-h-screen bg-ink-deep">
      {/* Background */}
      <div className="fixed inset-0 oil-shimmer opacity-30 pointer-events-none" />
      <div className="fixed inset-0 wireframe-grid pointer-events-none" />
      
      <Header />
      
      <main className="relative z-10 pt-32 pb-24">
        {/* Hero */}
        <section className="px-4 mb-24">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-green-500/30 bg-green-500/5 mb-6">
                <Users size={14} className="text-green-400" />
                <span className="font-mono text-[10px] text-green-400 tracking-widest">
                  WE ARE HIRING
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-mono text-engrave-fresco tracking-tight mb-6">
                ПРИСОЕДИНЯЙСЯ
                <br />
                <span className="text-chrome">К ЛАБОРАТОРИИ</span>
              </h1>
              
              <p className="font-mono text-sm text-stone-graphite max-w-2xl mx-auto leading-relaxed mb-8">
                Мы ищем талантливых людей, которые хотят создавать будущее.
                Не важно, где ты находишься — важно, что ты можешь создать.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 text-stone-graphite font-mono text-[10px]">
                <span className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-green-400" />
                  100% Remote
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-green-400" />
                  Гибкий график
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-green-400" />
                  Equity опции
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-green-400" />
                  Интересные проекты
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="font-mono text-[10px] text-stone-graphite tracking-[0.5em] mb-8 text-center">
              ─── OUR VALUES ───
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 border border-stone-anthracite/30 bg-ink-chrome/20"
                >
                  <h3 className="font-mono text-lg text-engrave-fresco mb-3">
                    {value.title}
                  </h3>
                  <p className="font-mono text-[11px] text-stone-graphite leading-relaxed">
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Roles */}
        <section className="px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="font-mono text-[10px] text-stone-graphite tracking-[0.5em] mb-8">
              ─── OPEN ROLES ───
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {roles.map((role, i) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
                  className={`p-6 border cursor-pointer transition-all ${
                    selectedRole === role.id 
                      ? 'border-engrave-line/50 bg-ink-chrome/50' 
                      : 'border-stone-anthracite/30 bg-ink-chrome/20 hover:border-engrave-line/20'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`transition-colors ${
                        selectedRole === role.id ? 'text-engrave-line' : 'text-stone-graphite'
                      }`}>
                        {role.icon}
                      </div>
                      <div>
                        <h3 className="font-mono text-base text-engrave-fresco">
                          {role.title}
                        </h3>
                        <div className="font-mono text-[10px] text-stone-graphite">
                          {role.subtitle}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="font-mono text-[8px] px-2 py-1 border border-green-500/30 text-green-400 bg-green-500/5">
                        {role.openPositions} ОТКРЫТО
                      </span>
                      <span className="font-mono text-[8px] text-stone-graphite">
                        {role.type}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-mono text-[11px] text-stone-graphite leading-relaxed mb-4">
                    {role.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {role.skills.map((skill, j) => (
                      <span 
                        key={j}
                        className="font-mono text-[9px] text-engrave-dim px-2 py-1 
                                 bg-stone-anthracite/20 border border-stone-anthracite/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Expand indicator */}
                  <motion.div 
                    animate={{ rotate: selectedRole === role.id ? 90 : 0 }}
                    className="flex items-center justify-end"
                  >
                    <ArrowRight size={14} className="text-stone-graphite" />
                  </motion.div>

                  {/* Expanded content */}
                  {selectedRole === role.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-stone-anthracite/30"
                    >
                      <button className="w-full py-3 bg-engrave-fresco text-ink-deep font-mono text-sm tracking-widest
                                       hover:bg-engrave-line transition-colors">
                        ОТКЛИКНУТЬСЯ
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="font-mono text-[10px] text-stone-graphite tracking-[0.5em] mb-8 text-center">
              ─── BENEFITS ───
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="p-4 border border-stone-anthracite/30 bg-ink-chrome/20 text-center"
                >
                  <div className="text-stone-graphite mb-2 flex justify-center">
                    {benefit.icon}
                  </div>
                  <div className="font-mono text-xs text-engrave-fresco mb-1">
                    {benefit.title}
                  </div>
                  <div className="font-mono text-[9px] text-stone-graphite">
                    {benefit.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* For Enthusiasts */}
        <section className="px-4 mb-24">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 border border-purple-500/30 bg-purple-500/5 text-center"
            >
              <Heart size={32} className="text-purple-400 mx-auto mb-4" />
              <h2 className="font-mono text-2xl md:text-3xl text-engrave-fresco mb-4">
                ДЛЯ ЭНТУЗИАСТОВ
              </h2>
              <p className="font-mono text-sm text-stone-graphite max-w-xl mx-auto mb-6">
                Не нашёл подходящую позицию, но хочешь быть частью лаборатории?
                Мы всегда рады талантливым людям. Расскажи о себе и своих идеях.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 border border-purple-500/50 text-purple-400 font-mono text-sm tracking-widest
                           hover:bg-purple-500/10 transition-colors"
                >
                  ОТПРАВИТЬ PORTFOLIO
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <MessageCircle size={32} className="text-engrave-line mx-auto mb-4" />
              <h2 className="font-mono text-xl text-engrave-fresco mb-4">
                ЕСТЬ ВОПРОСЫ?
              </h2>
              <p className="font-mono text-sm text-stone-graphite mb-6">
                Напиши нам напрямую: <span className="text-engrave-line">join@fractalix.lab</span>
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <FanMenu />
      
      {/* Corner decorations */}
      <div className="fixed top-4 left-4 w-8 h-8 border-t border-l border-stone-anthracite/20 pointer-events-none" />
      <div className="fixed top-4 right-4 w-8 h-8 border-t border-r border-stone-anthracite/20 pointer-events-none" />
      <div className="fixed bottom-4 left-4 w-8 h-8 border-b border-l border-stone-anthracite/20 pointer-events-none" />
      <div className="fixed bottom-4 right-4 w-8 h-8 border-b border-r border-stone-anthracite/20 pointer-events-none" />
    </div>
  );
}

