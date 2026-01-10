"use client";

import { motion } from 'framer-motion';
import { 
  Rocket, 
  TrendingUp, 
  Users, 
  Calendar,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import Header from '@/components/layout/Header';
import { useI18n } from '@/lib/i18n/context';

export default function VenturesPage() {
  const { t } = useI18n();

  const ventures = [
    {
      id: 'project-1',
      name: 'DeFi Protocol',
      category: 'BLOCKCHAIN',
      stage: 'LIVE',
      description: 'Decentralized protocol for yield farming and liquidity mining.',
      metrics: { tvl: '$2.4M', users: '12K+', apy: '45%' },
      raised: '$500K',
      seeking: false
    },
    {
      id: 'project-2',
      name: 'NFT Marketplace',
      category: 'WEB3',
      stage: 'LIVE',
      description: 'Marketplace for digital art with focus on generative art.',
      metrics: { volume: '$1.2M', artists: '500+', nfts: '15K' },
      raised: '$300K',
      seeking: false
    },
    {
      id: 'project-3',
      name: 'Metaverse Hub',
      category: 'METAVERSE',
      stage: 'BETA',
      description: 'Social platform for virtual events and networking.',
      metrics: { users: '5K', events: '200+', partners: '20' },
      raised: '$150K',
      seeking: true
    },
    {
      id: 'project-4',
      name: 'AI Assistant',
      category: 'AI',
      stage: 'DEVELOPMENT',
      description: 'AI assistant for business process automation.',
      metrics: { accuracy: '94%', integrations: '15', beta: '50' },
      raised: 'Seeking',
      seeking: true
    },
  ];
  return (
    <div className="relative min-h-screen bg-ink-deep">
      <div className="fixed inset-0 wireframe-grid pointer-events-none" />
      
      <Header />
      
      <main className="relative z-10 pt-32 pb-24">
        {/* Hero */}
        <section className="px-4 mb-16">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-6">
                ─── {t('ventures.title')} ───
              </div>
              
              <h1 className="text-4xl md:text-6xl font-mono text-engrave-fresco tracking-tight mb-6">
                {t('ventures.title')}
                <br />
                {t('ventures.subtitle')}
              </h1>
              
              <p className="font-mono text-sm text-stone-slate max-w-2xl mx-auto leading-relaxed">
                {t('ventures.description')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-4 mb-16">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '4', label: t('ventures.stats.active') },
              { value: '$950K', label: t('ventures.stats.raised') },
              { value: '17K+', label: t('ventures.stats.users') },
              { value: '2', label: t('ventures.stats.seeking') },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-4 border border-stone-anthracite/20"
              >
                <div className="font-mono text-2xl text-engrave-fresco mb-1">
                  {stat.value}
                </div>
                <div className="font-mono text-[9px] text-stone-slate tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section className="px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            {ventures.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group border border-stone-anthracite/30 bg-ink-chrome/20 
                         hover:border-engrave-line/20 transition-all"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-mono text-lg text-engrave-fresco mb-1">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] text-stone-slate">
                          {project.category}
                        </span>
                        <span className={`font-mono text-[8px] px-2 py-0.5 border ${
                          project.stage === 'LIVE' 
                            ? 'text-engrave-line border-engrave-line/30' 
                            : project.stage === 'BETA'
                            ? 'text-engrave-mid border-engrave-mid/30'
                            : 'text-stone-slate border-stone-anthracite/30'
                        }`}>
                          {t(`ventures.stages.${project.stage.toLowerCase()}`)}
                        </span>
                      </div>
                    </div>
                    {project.seeking && (
                      <span className="font-mono text-[8px] px-2 py-1 bg-engrave-line/10 
                                     text-engrave-line border border-engrave-line/30">
                        {t('ventures.seeking')}
                      </span>
                    )}
                  </div>
                  
                  {/* Description */}
                  <p className="font-mono text-[11px] text-stone-slate leading-relaxed mb-4">
                    {project.description}
                  </p>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="text-center p-2 bg-ink-deep/50">
                        <div className="font-mono text-sm text-engrave-fresco">
                          {value}
                        </div>
                        <div className="font-mono text-[8px] text-stone-slate uppercase">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-stone-anthracite/20">
                    <div className="font-mono text-xs text-stone-slate">
                      {t('ventures.raised')}: <span className="text-engrave-line">{project.raised}</span>
                    </div>
                    <button className="font-mono text-[10px] text-engrave-line flex items-center gap-1
                                     hover:text-engrave-fresco transition-colors">
                      {t('common.more')} <ArrowRight size={10} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 mt-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 border border-stone-anthracite/30"
            >
              <h2 className="font-mono text-2xl text-engrave-fresco mb-4">
                {t('ventures.becomeInvestor.title')}
              </h2>
              <p className="font-mono text-sm text-stone-slate mb-6 max-w-xl mx-auto">
                {t('ventures.becomeInvestor.description')}
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-engrave-fresco text-ink-deep font-mono text-sm tracking-widest"
              >
                {t('ventures.becomeInvestor.button')}
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

