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
import { useLocale } from '@/contexts/LocaleContext';

export default function JoinPage() {
  const { t } = useLocale();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [formStep, setFormStep] = useState(0);

  const roles = [
    {
      id: 'dev',
      icon: <Code size={28} />,
      title: t('join.roles.dev.title'),
      subtitle: t('join.roles.dev.subtitle'),
      skills: ['React/Next.js', 'Node.js', 'Solidity', 'Three.js', 'Python'],
      description: t('join.roles.dev.desc'),
      openPositions: 3,
      type: t('join.roles.dev.type')
    },
    {
      id: 'design',
      icon: <Palette size={28} />,
      title: t('join.roles.design.title'),
      subtitle: t('join.roles.design.subtitle'),
      skills: ['UI/UX', 'Motion Design', '3D', 'Branding', 'Figma'],
      description: t('join.roles.design.desc'),
      openPositions: 2,
      type: t('join.roles.design.type')
    },
    {
      id: 'research',
      icon: <Cpu size={28} />,
      title: t('join.roles.research.title'),
      subtitle: t('join.roles.research.subtitle'),
      skills: ['AI/ML', 'Blockchain', 'Data Science', 'Academic Writing'],
      description: t('join.roles.research.desc'),
      openPositions: 2,
      type: t('join.roles.research.type')
    },
    {
      id: 'marketing',
      icon: <TrendingUp size={28} />,
      title: t('join.roles.marketing.title'),
      subtitle: t('join.roles.marketing.subtitle'),
      skills: ['SMM', 'Content', 'Analytics', 'Community', 'PR'],
      description: t('join.roles.marketing.desc'),
      openPositions: 1,
      type: t('join.roles.marketing.type')
    }
  ];

  const benefits = [
    { icon: <Globe size={20} />, title: t('join.benefitsList.remoteFirst.title'), desc: t('join.benefitsList.remoteFirst.desc') },
    { icon: <Rocket size={20} />, title: t('join.benefitsList.cuttingEdge.title'), desc: t('join.benefitsList.cuttingEdge.desc') },
    { icon: <Heart size={20} />, title: t('join.benefitsList.equity.title'), desc: t('join.benefitsList.equity.desc') },
    { icon: <Coffee size={20} />, title: t('join.benefitsList.flexible.title'), desc: t('join.benefitsList.flexible.desc') },
    { icon: <Zap size={20} />, title: t('join.benefitsList.growth.title'), desc: t('join.benefitsList.growth.desc') },
    { icon: <Star size={20} />, title: t('join.benefitsList.projects.title'), desc: t('join.benefitsList.projects.desc') },
  ];

  const values = [
    {
      title: t('join.values.explore.title'),
      desc: t('join.values.explore.desc')
    },
    {
      title: t('join.values.create.title'),
      desc: t('join.values.create.desc')
    },
    {
      title: t('join.values.share.title'),
      desc: t('join.values.share.desc')
    },
    {
      title: t('join.values.grow.title'),
      desc: t('join.values.grow.desc')
    }
  ];

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
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-engrave-line/30 bg-engrave-line/5 mb-6">
                <Users size={14} className="text-engrave-line" />
                <span className="font-mono text-[10px] text-engrave-line tracking-widest">
                  {t('join.weAreHiring')}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-mono text-engrave-fresco tracking-tight mb-6">
                {t('join.title')}
                <br />
                <span className="text-chrome">{t('join.subtitle')}</span>
              </h1>
              
              <p className="font-mono text-sm text-stone-slate max-w-2xl mx-auto leading-relaxed mb-8">
                {t('join.description')}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 text-stone-slate font-mono text-[10px]">
                <span className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-engrave-line" />
                  {t('join.benefits.remote')}
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-engrave-line" />
                  {t('join.benefits.flexible')}
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-engrave-line" />
                  {t('join.benefits.equity')}
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-engrave-line" />
                  {t('join.benefits.interesting')}
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-8 text-center">
              ─── {t('join.values.title')} ───
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
                  <p className="font-mono text-[11px] text-stone-slate leading-relaxed">
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
            <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-8">
              ─── {t('join.roles.title')} ───
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
                        selectedRole === role.id ? 'text-engrave-line' : 'text-stone-slate'
                      }`}>
                        {role.icon}
                      </div>
                      <div>
                        <h3 className="font-mono text-base text-engrave-fresco">
                          {role.title}
                        </h3>
                        <div className="font-mono text-[10px] text-stone-slate">
                          {role.subtitle}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="font-mono text-[8px] px-2 py-1 border border-engrave-line/30 text-engrave-line bg-engrave-line/5">
                        {role.openPositions} {t('join.roles.dev.open')}
                      </span>
                      <span className="font-mono text-[8px] text-stone-slate">
                        {role.type}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-mono text-[11px] text-stone-slate leading-relaxed mb-4">
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
                    <ArrowRight size={14} className="text-stone-slate" />
                  </motion.div>

                  {/* Expanded content */}
                  {selectedRole === role.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-stone-anthracite/30"
                    >
                      <button                       className="w-full py-3 bg-engrave-fresco text-ink-deep font-mono text-sm tracking-widest
                                       hover:bg-engrave-line transition-colors">
                        {t('join.apply')}
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
            <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-8 text-center">
              ─── {t('join.benefitsList.title')} ───
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
                  <div className="text-stone-slate mb-2 flex justify-center">
                    {benefit.icon}
                  </div>
                  <div className="font-mono text-xs text-engrave-fresco mb-1">
                    {benefit.title}
                  </div>
                  <div className="font-mono text-[9px] text-stone-slate">
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
              className="p-8 md:p-12 border border-stone-anthracite/30 bg-ink-chrome/20 text-center"
            >
              <Heart size={32} className="text-engrave-dim mx-auto mb-4" />
              <h2 className="font-mono text-2xl md:text-3xl text-engrave-fresco mb-4">
                {t('join.enthusiasts.title')}
              </h2>
              <p className="font-mono text-sm text-stone-slate max-w-xl mx-auto mb-6">
                {t('join.enthusiasts.description')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 border border-stone-anthracite/50 text-engrave-line font-mono text-sm tracking-widest
                           hover:border-engrave-line/30 transition-colors"
                >
                  {t('join.enthusiasts.button')}
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
                {t('join.questions.title')}
              </h2>
              <p className="font-mono text-sm text-stone-slate mb-6">
                {t('join.questions.description')} <span className="text-engrave-line">{t('join.questions.email')}</span>
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
