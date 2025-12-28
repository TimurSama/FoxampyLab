"use client";

import { motion } from 'framer-motion';
import { 
  Layers, 
  Code, 
  Palette, 
  TrendingUp, 
  FileText, 
  Film,
  Rocket,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import FanMenu from '@/components/layout/FanMenu';
import { useLocale } from '@/contexts/LocaleContext';

export default function ServicesPage() {
  const { t } = useLocale();

  const services = [
    {
      id: 'ecosystems',
      icon: <Layers size={40} />,
      title: t('services.ecosystems'),
      subtitle: t('services.ecosystemsSubtitle'),
      description: t('services.ecosystemsDesc'),
      features: String(t('services.ecosystemsFeatures')).split(','),
      price: t('services.ecosystemsPrice')
    },
    {
      id: 'web-app',
      icon: <Code size={40} />,
      title: t('services.webapp'),
      subtitle: t('services.webappSubtitle'),
      description: t('services.webappDesc'),
      features: String(t('services.webappFeatures')).split(','),
      price: t('services.webappPrice')
    },
    {
      id: 'blockchain',
      icon: <Rocket size={40} />,
      title: t('services.blockchain'),
      subtitle: t('services.blockchainSubtitle'),
      description: t('services.blockchainDesc'),
      features: String(t('services.blockchainFeatures')).split(','),
      price: t('services.blockchainPrice')
    },
    {
      id: 'design',
      icon: <Palette size={40} />,
      title: t('services.design'),
      subtitle: t('services.designSubtitle'),
      description: t('services.designDesc'),
      features: String(t('services.designFeatures')).split(','),
      price: t('services.designPrice')
    },
    {
      id: 'marketing',
      icon: <TrendingUp size={40} />,
      title: t('services.marketing'),
      subtitle: t('services.marketingSubtitle'),
      description: t('services.marketingDesc'),
      features: String(t('services.marketingFeatures')).split(','),
      price: t('services.marketingPrice')
    },
    {
      id: 'documents',
      icon: <FileText size={40} />,
      title: t('services.documents'),
      subtitle: t('services.documentsSubtitle'),
      description: t('services.documentsDesc'),
      features: String(t('services.documentsFeatures')).split(','),
      price: t('services.documentsPrice')
    },
    {
      id: 'video',
      icon: <Film size={40} />,
      title: t('services.video'),
      subtitle: t('services.videoSubtitle'),
      description: t('services.videoDesc'),
      features: String(t('services.videoFeatures')).split(','),
      price: t('services.videoPrice')
    }
  ];
  return (
    <div className="relative min-h-screen bg-ink-deep">
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
              <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-6">
                ─── {t('services.title')} ───
              </div>
              
              <h1 className="text-4xl md:text-6xl font-mono text-engrave-fresco tracking-tight mb-6">
                {t('services.subtitle')}
              </h1>
              
              <p className="font-mono text-sm text-stone-slate max-w-2xl mx-auto leading-relaxed">
                {t('services.description')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="px-4">
          <div className="max-w-6xl mx-auto space-y-6">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group border border-stone-anthracite/30 bg-ink-chrome/20 
                         hover:border-engrave-line/20 transition-all"
              >
                <div className="p-6 md:p-8 grid md:grid-cols-[auto,1fr,auto] gap-6 items-start">
                  {/* Icon */}
                  <div className="text-stone-slate group-hover:text-engrave-line transition-colors">
                    {service.icon}
                  </div>
                  
                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <h2 className="font-mono text-xl text-engrave-fresco">
                        {service.title}
                      </h2>
                      <span className="font-mono text-[9px] text-stone-slate tracking-widest">
                        {service.subtitle}
                      </span>
                    </div>
                    
                    <p className="font-mono text-sm text-stone-slate leading-relaxed mb-4 max-w-2xl">
                      {service.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      {service.features.map((feature, j) => (
                        <span 
                          key={j}
                          className="flex items-center gap-1.5 font-mono text-[10px] text-engrave-dim"
                        >
                          <CheckCircle size={10} />
                          {feature.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="text-right">
                    <div className="font-mono text-lg text-engrave-fresco mb-2">
                      {service.price}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="font-mono text-[10px] text-engrave-line flex items-center gap-1
                               hover:text-engrave-fresco transition-colors"
                    >
                      {t('services.more')} <ArrowRight size={10} />
                    </motion.button>
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
                {t('services.notFound')}
              </h2>
              <p className="font-mono text-sm text-stone-slate mb-6">
                {t('services.notFoundDesc')}
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-engrave-fresco text-ink-deep font-mono text-sm tracking-widest"
                >
                  {t('common.contact')}
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <FanMenu />
    </div>
  );
}

