"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Send, Calendar } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import SendForResearchModal from '@/components/modals/SendForResearchModal';
import ConsultationCalendar from '@/components/modals/ConsultationCalendar';

interface Package {
  id: string;
  nameKey: string;
  features: string[];
  priceRangeKey: string;
  timelineKey: string;
}

interface ServicePackagesProps {
  serviceId: string;
  serviceTitle: string;
  packages: Package[];
  calendlyUrl?: string;
}

export default function ServicePackages({ 
  serviceId, 
  serviceTitle, 
  packages,
  calendlyUrl 
}: ServicePackagesProps) {
  const { t } = useI18n();
  const [researchModalOpen, setResearchModalOpen] = useState(false);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleResearch = (packageId: string) => {
    setSelectedPackage(packageId);
    setResearchModalOpen(true);
  };

  const handleConsultation = (packageId: string) => {
    setSelectedPackage(packageId);
    setConsultationModalOpen(true);
  };

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="border border-stone-anthracite/30 bg-ink-chrome/10 
                     hover:border-engrave-line/30 transition-all"
          >
            <div className="p-6 flex flex-col h-full">
              {/* Package Name */}
              <h3 className="font-mono text-lg text-engrave-fresco mb-2 tracking-wider">
                {t(pkg.nameKey)}
              </h3>

              {/* Features */}
              <ul className="flex-1 space-y-2 mb-6">
                {pkg.features.map((featureKey, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-engrave-line mt-0.5 flex-shrink-0" />
                    <span className="font-mono text-xs text-stone-slate leading-relaxed">
                      {t(featureKey)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Price & Timeline */}
              <div className="mb-6 space-y-2 pb-6 border-b border-stone-anthracite/20">
                <div>
                  <div className="font-mono text-[10px] text-stone-graphite mb-1">
                    {t('services.packages.investment')}
                  </div>
                  <div className="font-mono text-base text-engrave-fresco">
                    {t(pkg.priceRangeKey)}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-stone-graphite mb-1">
                    {t('services.packages.timeline')}
                  </div>
                  <div className="font-mono text-sm text-stone-slate">
                    {t(pkg.timelineKey)}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <motion.button
                  onClick={() => handleResearch(pkg.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 bg-engrave-fresco text-ink-deep 
                           font-mono text-xs tracking-widest flex items-center justify-center gap-2
                           hover:bg-engrave-line transition-colors"
                >
                  <Send size={14} />
                  {t('services.packages.sendResearch')}
                </motion.button>
                <motion.button
                  onClick={() => handleConsultation(pkg.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 border border-stone-anthracite/30 
                           text-stone-slate font-mono text-xs tracking-widest 
                           flex items-center justify-center gap-2
                           hover:border-engrave-line/50 hover:text-engrave-line transition-colors"
                >
                  <Calendar size={14} />
                  {t('services.packages.scheduleConsultation')}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modals */}
      <SendForResearchModal
        isOpen={researchModalOpen}
        onClose={() => {
          setResearchModalOpen(false);
          setSelectedPackage(null);
        }}
        serviceTitle={`${serviceTitle} - ${selectedPackage ? packages.find(p => p.id === selectedPackage)?.nameKey || '' : ''}`}
      />
      <ConsultationCalendar
        isOpen={consultationModalOpen}
        onClose={() => {
          setConsultationModalOpen(false);
          setSelectedPackage(null);
        }}
        serviceTitle={`${serviceTitle} - ${selectedPackage ? packages.find(p => p.id === selectedPackage)?.nameKey || '' : ''}`}
        calendlyUrl={calendlyUrl}
      />
    </>
  );
}

