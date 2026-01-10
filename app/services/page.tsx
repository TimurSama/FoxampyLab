"use client";

import { useState } from 'react';
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
  CheckCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { useI18n } from '@/lib/i18n/context';
import ServicePackages from '@/components/services/ServicePackages';

export default function ServicesPage() {
  const { t } = useI18n();
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const services = [
    {
      id: 'ecosystems',
      icon: <Layers size={40} />,
      title: t('services.ecosystems'),
      description: t('services.ecosystemsDesc'),
          packages: [
            {
              id: 'starter',
              nameKey: 'services.packages.starter',
              features: [
                'services.packages.ecosystems.starter.feature1',
                'services.packages.ecosystems.starter.feature2',
                'services.packages.ecosystems.starter.feature3',
                'services.packages.ecosystems.starter.feature4',
              ],
              priceRangeKey: 'services.packages.ecosystems.starter.price',
              timelineKey: 'services.packages.ecosystems.starter.timeline',
            },
            {
              id: 'professional',
              nameKey: 'services.packages.professional',
              features: [
                'services.packages.ecosystems.professional.feature1',
                'services.packages.ecosystems.professional.feature2',
                'services.packages.ecosystems.professional.feature3',
                'services.packages.ecosystems.professional.feature4',
                'services.packages.ecosystems.professional.feature5',
              ],
              priceRangeKey: 'services.packages.ecosystems.professional.price',
              timelineKey: 'services.packages.ecosystems.professional.timeline',
            },
            {
              id: 'enterprise',
              nameKey: 'services.packages.enterprise',
              features: [
                'services.packages.ecosystems.enterprise.feature1',
                'services.packages.ecosystems.enterprise.feature2',
                'services.packages.ecosystems.enterprise.feature3',
                'services.packages.ecosystems.enterprise.feature4',
                'services.packages.ecosystems.enterprise.feature5',
                'services.packages.ecosystems.enterprise.feature6',
              ],
              priceRangeKey: 'services.packages.ecosystems.enterprise.price',
              timelineKey: 'services.packages.ecosystems.enterprise.timeline',
            },
      ],
    },
    {
      id: 'web-app',
      icon: <Code size={40} />,
      title: t('services.webapp'),
      description: t('services.webappDesc'),
      packages: [
            {
              id: 'starter',
              nameKey: 'services.packages.starter',
              features: [
                'services.packages.webapp.starter.feature1',
                'services.packages.webapp.starter.feature2',
                'services.packages.webapp.starter.feature3',
              ],
              priceRangeKey: 'services.packages.webapp.starter.price',
              timelineKey: 'services.packages.webapp.starter.timeline',
            },
            {
              id: 'professional',
              nameKey: 'services.packages.professional',
              features: [
                'services.packages.webapp.professional.feature1',
                'services.packages.webapp.professional.feature2',
                'services.packages.webapp.professional.feature3',
                'services.packages.webapp.professional.feature4',
              ],
              priceRangeKey: 'services.packages.webapp.professional.price',
              timelineKey: 'services.packages.webapp.professional.timeline',
            },
            {
              id: 'enterprise',
              nameKey: 'services.packages.enterprise',
              features: [
                'services.packages.webapp.enterprise.feature1',
                'services.packages.webapp.enterprise.feature2',
                'services.packages.webapp.enterprise.feature3',
                'services.packages.webapp.enterprise.feature4',
                'services.packages.webapp.enterprise.feature5',
              ],
              priceRangeKey: 'services.packages.webapp.enterprise.price',
              timelineKey: 'services.packages.webapp.enterprise.timeline',
            },
      ],
    },
    {
      id: 'blockchain',
      icon: <Rocket size={40} />,
      title: t('services.blockchain'),
      description: t('services.blockchainDesc'),
      packages: [
        {
          id: 'starter',
          nameKey: 'services.packages.starter',
              features: [
                'services.packages.blockchain.starter.feature1',
                'services.packages.blockchain.starter.feature2',
                'services.packages.blockchain.starter.feature3',
              ],
              priceRangeKey: 'services.packages.blockchain.starter.price',
              timelineKey: 'services.packages.blockchain.starter.timeline',
        },
        {
          id: 'professional',
          nameKey: 'services.packages.professional',
          features: [
            'services.blockchain.professional.feature1',
            'services.blockchain.professional.feature2',
            'services.blockchain.professional.feature3',
            'services.blockchain.professional.feature4',
          ],
          featuresKey: 'blockchain.professional',
          priceRangeKey: 'services.blockchain.professional.price',
          timelineKey: 'services.blockchain.professional.timeline',
        },
        {
          id: 'enterprise',
          nameKey: 'services.packages.enterprise',
          features: [
            'services.blockchain.enterprise.feature1',
            'services.blockchain.enterprise.feature2',
            'services.blockchain.enterprise.feature3',
            'services.blockchain.enterprise.feature4',
            'services.blockchain.enterprise.feature5',
          ],
          featuresKey: 'blockchain.enterprise',
          priceRangeKey: 'services.blockchain.enterprise.price',
          timelineKey: 'services.blockchain.enterprise.timeline',
        },
      ],
    },
    {
      id: 'design',
      icon: <Palette size={40} />,
      title: t('services.design'),
      description: t('services.designDesc'),
      packages: [
        {
          id: 'starter',
          nameKey: 'services.packages.starter',
              features: [
                'services.packages.design.starter.feature1',
                'services.packages.design.starter.feature2',
                'services.packages.design.starter.feature3',
              ],
              priceRangeKey: 'services.packages.design.starter.price',
              timelineKey: 'services.packages.design.starter.timeline',
        },
        {
          id: 'professional',
          nameKey: 'services.packages.professional',
          features: [
            'services.design.professional.feature1',
            'services.design.professional.feature2',
            'services.design.professional.feature3',
            'services.design.professional.feature4',
          ],
          featuresKey: 'design.professional',
          priceRangeKey: 'services.design.professional.price',
          timelineKey: 'services.design.professional.timeline',
        },
        {
          id: 'enterprise',
          nameKey: 'services.packages.enterprise',
          features: [
            'services.design.enterprise.feature1',
            'services.design.enterprise.feature2',
            'services.design.enterprise.feature3',
            'services.design.enterprise.feature4',
            'services.design.enterprise.feature5',
          ],
          featuresKey: 'design.enterprise',
          priceRangeKey: 'services.design.enterprise.price',
          timelineKey: 'services.design.enterprise.timeline',
        },
      ],
    },
    {
      id: 'marketing',
      icon: <TrendingUp size={40} />,
      title: t('services.marketing'),
      description: t('services.marketingDesc'),
      packages: [
        {
          id: 'starter',
          nameKey: 'services.packages.starter',
              features: [
                'services.packages.marketing.starter.feature1',
                'services.packages.marketing.starter.feature2',
                'services.packages.marketing.starter.feature3',
              ],
              priceRangeKey: 'services.packages.marketing.starter.price',
              timelineKey: 'services.packages.marketing.starter.timeline',
        },
        {
          id: 'professional',
          nameKey: 'services.packages.professional',
          features: [
            'services.marketing.professional.feature1',
            'services.marketing.professional.feature2',
            'services.marketing.professional.feature3',
            'services.marketing.professional.feature4',
          ],
          featuresKey: 'marketing.professional',
          priceRangeKey: 'services.marketing.professional.price',
          timelineKey: 'services.marketing.professional.timeline',
        },
        {
          id: 'enterprise',
          nameKey: 'services.packages.enterprise',
          features: [
            'services.marketing.enterprise.feature1',
            'services.marketing.enterprise.feature2',
            'services.marketing.enterprise.feature3',
            'services.marketing.enterprise.feature4',
            'services.marketing.enterprise.feature5',
          ],
          featuresKey: 'marketing.enterprise',
          priceRangeKey: 'services.marketing.enterprise.price',
          timelineKey: 'services.marketing.enterprise.timeline',
        },
      ],
    },
    {
      id: 'documents',
      icon: <FileText size={40} />,
      title: t('services.documents'),
      description: t('services.documentsDesc'),
      packages: [
        {
          id: 'starter',
          nameKey: 'services.packages.starter',
              features: [
                'services.packages.documents.starter.feature1',
                'services.packages.documents.starter.feature2',
                'services.packages.documents.starter.feature3',
              ],
              priceRangeKey: 'services.packages.documents.starter.price',
              timelineKey: 'services.packages.documents.starter.timeline',
        },
        {
          id: 'professional',
          nameKey: 'services.packages.professional',
          features: [
            'services.documents.professional.feature1',
            'services.documents.professional.feature2',
            'services.documents.professional.feature3',
            'services.documents.professional.feature4',
          ],
          featuresKey: 'documents.professional',
          priceRangeKey: 'services.documents.professional.price',
          timelineKey: 'services.documents.professional.timeline',
        },
        {
          id: 'enterprise',
          nameKey: 'services.packages.enterprise',
          features: [
            'services.documents.enterprise.feature1',
            'services.documents.enterprise.feature2',
            'services.documents.enterprise.feature3',
            'services.documents.enterprise.feature4',
            'services.documents.enterprise.feature5',
          ],
          featuresKey: 'documents.enterprise',
          priceRangeKey: 'services.documents.enterprise.price',
          timelineKey: 'services.documents.enterprise.timeline',
        },
      ],
    },
    {
      id: 'video',
      icon: <Film size={40} />,
      title: t('services.video'),
      description: t('services.videoDesc'),
      packages: [
        {
          id: 'starter',
          nameKey: 'services.packages.starter',
              features: [
                'services.packages.video.starter.feature1',
                'services.packages.video.starter.feature2',
                'services.packages.video.starter.feature3',
              ],
              priceRangeKey: 'services.packages.video.starter.price',
              timelineKey: 'services.packages.video.starter.timeline',
        },
        {
          id: 'professional',
          nameKey: 'services.packages.professional',
          features: [
            'services.video.professional.feature1',
            'services.video.professional.feature2',
            'services.video.professional.feature3',
            'services.video.professional.feature4',
          ],
          featuresKey: 'video.professional',
          priceRangeKey: 'services.video.professional.price',
          timelineKey: 'services.video.professional.timeline',
        },
        {
          id: 'enterprise',
          nameKey: 'services.packages.enterprise',
          features: [
            'services.video.enterprise.feature1',
            'services.video.enterprise.feature2',
            'services.video.enterprise.feature3',
            'services.video.enterprise.feature4',
            'services.video.enterprise.feature5',
          ],
          featuresKey: 'video.enterprise',
          priceRangeKey: 'services.video.enterprise.price',
          timelineKey: 'services.video.enterprise.timeline',
        },
      ],
    },
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

        {/* Services List with Packages */}
        <section className="px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-stone-anthracite/30 bg-ink-chrome/10 
                         hover:border-engrave-line/20 transition-all"
              >
                {/* Service Header */}
                <div 
                  className="p-6 md:p-8 cursor-pointer"
                  onClick={() => setExpandedService(
                    expandedService === service.id ? null : service.id
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="text-stone-slate group-hover:text-engrave-line transition-colors">
                        {service.icon}
                      </div>
                      
                      <div>
                        <h2 className="font-mono text-xl text-engrave-fresco mb-2">
                          {service.title}
                        </h2>
                        
                        <p className="font-mono text-sm text-stone-slate leading-relaxed max-w-2xl">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    
                    <motion.button
                      animate={{ rotate: expandedService === service.id ? 180 : 0 }}
                      className="text-stone-slate hover:text-engrave-line transition-colors"
                    >
                      {expandedService === service.id ? 
                        <ChevronUp size={24} /> : 
                        <ChevronDown size={24} />
                      }
                    </motion.button>
                  </div>
                </div>

                {/* Packages (Expanded) */}
                {expandedService === service.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 md:px-8 pb-8 border-t border-stone-anthracite/30"
                  >
                    <ServicePackages
                      serviceId={service.id}
                      serviceTitle={service.title}
                      packages={service.packages}
                    />
                  </motion.div>
                )}
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
    </div>
  );
}
