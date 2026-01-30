"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Users,
  Code,
  Palette,
  Cpu,
  Globe,
  Rocket,
  Heart,
  Zap,
  Coffee,
  Star,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import { useI18n } from '@/lib/i18n/context';

export default function JoinPage() {
  const { t } = useI18n();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: 'blockchain',
      title: t('join.roles.blockchain.title'),
      subtitle: t('join.roles.blockchain.subtitle'),
      description: t('join.roles.blockchain.description'),
      icon: <Cpu size={24} />,
      skills: t('join.roles.blockchain.skills', { returnObjects: true }) as string[],
      requirements: t('join.roles.blockchain.requirements', { returnObjects: true }) as string[],
      openPositions: 2,
      type: t('join.type')
    },
    {
      id: 'ai',
      title: t('join.roles.ai.title'),
      subtitle: t('join.roles.ai.subtitle'),
      description: t('join.roles.ai.description'),
      icon: <Zap size={24} />,
      skills: t('join.roles.ai.skills', { returnObjects: true }) as string[],
      requirements: t('join.roles.ai.requirements', { returnObjects: true }) as string[],
      openPositions: 1,
      type: t('join.type')
    },
    {
      id: 'automation',
      title: t('join.roles.automation.title'),
      subtitle: t('join.roles.automation.subtitle'),
      description: t('join.roles.automation.description'),
      icon: <Code size={24} />,
      skills: t('join.roles.automation.skills', { returnObjects: true }) as string[],
      requirements: t('join.roles.automation.requirements', { returnObjects: true }) as string[],
      openPositions: 2,
      type: t('join.type')
    },
    {
      id: 'designer',
      title: t('join.roles.designer.title'),
      subtitle: t('join.roles.designer.subtitle'),
      description: t('join.roles.designer.description'),
      icon: <Palette size={24} />,
      skills: t('join.roles.designer.skills', { returnObjects: true }) as string[],
      requirements: t('join.roles.designer.requirements', { returnObjects: true }) as string[],
      openPositions: 1,
      type: t('join.type')
    },
    {
      id: 'marketing',
      title: t('join.roles.marketing.title'),
      subtitle: t('join.roles.marketing.subtitle'),
      description: t('join.roles.marketing.description'),
      icon: <Globe size={24} />,
      skills: t('join.roles.marketing.skills', { returnObjects: true }) as string[],
      requirements: t('join.roles.marketing.requirements', { returnObjects: true }) as string[],
      openPositions: 1,
      type: t('join.type')
    }
  ];

  const benefits = [
    { icon: <Globe size={20} />, title: t('join.benefits.remote.title'), desc: t('join.benefits.remote.desc') },
    { icon: <Rocket size={20} />, title: t('join.benefits.tech.title'), desc: t('join.benefits.tech.desc') },
    { icon: <Heart size={20} />, title: t('join.benefits.equity.title'), desc: t('join.benefits.equity.desc') },
    { icon: <Coffee size={20} />, title: t('join.benefits.flexible.title'), desc: t('join.benefits.flexible.desc') },
    { icon: <Zap size={20} />, title: t('join.benefits.growth.title'), desc: t('join.benefits.growth.desc') },
    { icon: <Star size={20} />, title: t('join.benefits.unique.title'), desc: t('join.benefits.unique.desc') },
  ];

  const valData = [
    { title: t('join.values.explore.title'), desc: t('join.values.explore.desc') },
    { title: t('join.values.create.title'), desc: t('join.values.create.desc') },
    { title: t('join.values.share.title'), desc: t('join.values.share.desc') },
    { title: t('join.values.grow.title'), desc: t('join.values.grow.desc') },
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

              <h1 className="text-4xl md:text-6xl font-mono text-engrave-fresco tracking-tight mb-6 uppercase">
                {t('join.title')}
                <br />
                <span className="text-chrome">{t('join.subtitle')}</span>
              </h1>

              <p className="font-mono text-sm text-stone-slate max-w-2xl mx-auto leading-relaxed mb-8">
                {t('join.description')}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 text-stone-slate font-mono text-[10px]">
                {benefits.slice(0, 4).map((benefit, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <CheckCircle size={12} className="text-engrave-line" />
                    {benefit.title}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {valData.map((value, i) => (
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
              ─── {t('join.weAreHiring')} ───
            </div>

            <div className="grid md:grid-cols-1 gap-4">
              {roles.map((role, i) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
                  className={`p-6 border cursor-pointer transition-all ${selectedRole === role.id
                      ? 'border-engrave-line/50 bg-ink-chrome/50'
                      : 'border-stone-anthracite/30 bg-ink-chrome/20 hover:border-engrave-line/20'
                    }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`transition-colors ${selectedRole === role.id ? 'text-engrave-line' : 'text-stone-slate'
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
                        {role.openPositions} {t('join.positions')}
                      </span>
                      <span className="font-mono text-[8px] text-stone-slate">
                        {role.type}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  {selectedRole === role.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <p className="font-mono text-[11px] text-stone-slate leading-relaxed mb-4">
                        {role.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-mono text-[10px] text-engrave-line mb-3 uppercase tracking-widest">Skills</h4>
                          <div className="flex flex-wrap gap-2">
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
                        </div>
                        <div>
                          <h4 className="font-mono text-[10px] text-engrave-line mb-3 uppercase tracking-widest">Requirements</h4>
                          <ul className="space-y-1">
                            {role.requirements.map((req, j) => (
                              <li key={j} className="font-mono text-[9px] text-stone-slate flex items-center gap-2">
                                <span className="w-1 h-1 bg-engrave-line rounded-full" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-stone-anthracite/30">
                        <a
                          href="https://t.me/timursama"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full py-3 bg-engrave-fresco text-ink-deep font-mono text-sm tracking-widest
                                           hover:bg-engrave-line transition-colors text-center"
                        >
                          {t('join.apply')}
                        </a>
                        <p className="text-center font-mono text-[9px] text-stone-slate mt-2 opacity-50">
                          {t('join.cta')}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Expand indicator */}
                  <motion.div
                    animate={{ rotate: selectedRole === role.id ? 90 : 0 }}
                    className="flex items-center justify-end mt-2"
                  >
                    <ArrowRight size={14} className="text-stone-slate" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-3"
                >
                  <div className="text-engrave-line opacity-50">
                    {benefit.icon}
                  </div>
                  <h3 className="font-mono text-sm text-engrave-fresco uppercase tracking-wider">
                    {benefit.title}
                  </h3>
                  <p className="font-mono text-[10px] text-stone-slate leading-relaxed">
                    {benefit.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
