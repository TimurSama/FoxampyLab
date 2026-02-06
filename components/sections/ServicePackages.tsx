"use client";

import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { TelegramService } from '@/lib/telegram';

interface PackageFeature {
  feature1?: string;
  feature2?: string;
  feature3?: string;
  feature4?: string;
  feature5?: string;
  feature6?: string;
  feature7?: string;
}

interface Package {
  title: string;
  description?: string;
  price: string;
  timeline: string;
  features: PackageFeature;
}

interface ServicePackagesProps {
  serviceId?: string;
  showComplex?: boolean;
}

export default function ServicePackages({ serviceId, showComplex = false }: ServicePackagesProps) {
  const { t, language } = useI18n();

  const getPackageData = (packageType: 'starter' | 'professional' | 'enterprise'): Package | null => {
    if (showComplex) {
      const complexPackages = t('services.packages.complex');
      if (!complexPackages || typeof complexPackages !== 'object') return null;
      const pkg = complexPackages[packageType];
      if (!pkg || typeof pkg !== 'object') return null;
      return {
        title: pkg.title || '',
        description: pkg.description || '',
        price: pkg.price || '',
        timeline: pkg.timeline || '',
        features: pkg as PackageFeature,
      };
    }

    if (!serviceId) return null;
    const servicePackages = t(`services.packages.${serviceId}`);
    if (!servicePackages || typeof servicePackages !== 'object') return null;
    const pkg = servicePackages[packageType];
    if (!pkg || typeof pkg !== 'object') return null;
    return {
      title: '',
      description: '',
      price: pkg.price || '',
      timeline: pkg.timeline || '',
      features: pkg as PackageFeature,
    };
  };

  const packages: Array<{ type: 'starter' | 'professional' | 'enterprise'; data: Package | null }> = [
    { type: 'starter', data: getPackageData('starter') },
    { type: 'professional', data: getPackageData('professional') },
    { type: 'enterprise', data: getPackageData('enterprise') },
  ].filter((pkg) => pkg.data !== null) as Array<{ type: 'starter' | 'professional' | 'enterprise'; data: Package }>;

  const handleOrder = (packageType: string) => {
    const message = language === 'ru'
      ? `Здравствуйте! Меня интересует пакет "${packageType}"${serviceId ? ` для услуги "${t(`services.${serviceId}`)}"` : ''}. Хотел бы обсудить детали.`
      : `Hello! I'm interested in the "${packageType}" package${serviceId ? ` for "${t(`services.${serviceId}`)}" service` : ''}. I'd like to discuss the details.`;
    window.open(TelegramService.getBotUrlWithMessage(message), '_blank');
  };

  if (packages.length === 0) return null;

  return (
    <div className="w-full py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="font-mono text-[10px] md:text-xs text-[#E0E0E0]/40 tracking-[0.3em] mb-4 uppercase">
            ─── {t('services.packages.investment')} ───
          </div>
          <h2 className="font-mono text-2xl md:text-4xl text-[#E0E0E0] uppercase tracking-tight mb-4">
            {showComplex
              ? (language === 'ru' ? 'Комплексные пакеты' : 'Complex Packages')
              : (language === 'ru' ? 'Пакеты услуг' : 'Service Packages')}
          </h2>
          <p className="font-mono text-sm md:text-base text-[#E0E0E0]/70 max-w-2xl mx-auto">
            {language === 'ru'
              ? 'Выберите пакет, который соответствует вашим потребностям. Цены указаны ориентировочно и могут варьироваться в зависимости от сложности проекта.'
              : 'Choose a package that fits your needs. Prices are indicative and may vary depending on project complexity.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {packages.map((pkg, index) => {
            const packageTitle = pkg.data.title || t(`services.packages.${pkg.type}`);
            const features = Object.values(pkg.data.features).filter((f): f is string => typeof f === 'string' && f.startsWith('feature'));
            const featureValues = features.map((key) => pkg.data.features[key as keyof PackageFeature]).filter(Boolean) as string[];

            return (
              <motion.div
                key={pkg.type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-black/40 border ${
                  pkg.type === 'professional'
                    ? 'border-white/30 scale-105 md:scale-110'
                    : 'border-white/10'
                } backdrop-blur-sm p-6 md:p-8 flex flex-col hover:border-white/20 transition-all`}
              >
                {pkg.type === 'professional' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white/10 border border-white/20 backdrop-blur-md">
                    <span className="font-mono text-xs text-white uppercase tracking-wider">
                      {language === 'ru' ? 'ПОПУЛЯРНЫЙ' : 'POPULAR'}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={20} className="text-[#E0E0E0]/60" />
                    <h3 className="font-mono text-xl md:text-2xl text-[#E0E0E0] uppercase tracking-tight">
                      {packageTitle}
                    </h3>
                  </div>
                  {pkg.data.description && (
                    <p className="font-mono text-xs text-[#E0E0E0]/60 mb-4">
                      {pkg.data.description}
                    </p>
                  )}
                </div>

                <div className="mb-6 flex-1">
                  <div className="space-y-3">
                    {featureValues.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check size={16} className="text-[#E0E0E0]/80 mt-0.5 flex-shrink-0" />
                        <span className="font-mono text-xs md:text-sm text-[#E0E0E0]/80 leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-white/10">
                  <div className="mb-4">
                    <div className="font-mono text-2xl md:text-3xl text-[#E0E0E0] mb-2">
                      {pkg.data.price}
                    </div>
                    <div className="font-mono text-xs text-[#E0E0E0]/60">
                      {t('services.packages.timeline')}: {pkg.data.timeline}
                    </div>
                  </div>
                  <button
                    onClick={() => handleOrder(packageTitle)}
                    className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 text-[#E0E0E0] font-mono text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 group"
                  >
                    {language === 'ru' ? 'Заказать' : 'Order'}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 md:mt-12 text-center"
        >
          <p className="font-mono text-xs text-[#E0E0E0]/50 mb-4">
            {language === 'ru'
              ? 'Все цены указаны в долларах США. Финальная стоимость зависит от объема работ и требований проекта.'
              : 'All prices are in USD. Final cost depends on scope of work and project requirements.'}
          </p>
          <p className="font-mono text-xs text-[#E0E0E0]/50">
            {language === 'ru'
              ? 'При комплексном заказе предоставляется скидка до 20%.'
              : 'Discount up to 20% available for complex orders.'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
