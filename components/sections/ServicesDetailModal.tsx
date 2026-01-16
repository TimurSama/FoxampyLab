"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  color: string;
}

interface ServicesDetailModalProps {
  service: ServiceDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ServicesDetailModal({ service, isOpen, onClose }: ServicesDetailModalProps) {
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 xl:inset-32 bg-[#050505] border border-[#00F0FF]/30 z-50 overflow-y-auto max-h-[90vh]"
          >
            <div className="p-4 md:p-8 lg:p-12">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-[#00F0FF] hover:text-[#00F0FF]/80 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div style={{ color: service.color }} className="w-12 h-12 border border-current flex items-center justify-center">
                    <span className="font-mono text-xs">◈</span>
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-mono text-[#E0E0E0] mb-2">
                      {service.title}
                    </h2>
                    <p className="font-mono text-sm text-[#00F0FF]">
                      {service.subtitle}
                    </p>
                  </div>
                </div>
                <p className="font-mono text-base text-[#E0E0E0]/80 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {service.features && service.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-mono text-lg text-[#00F0FF] mb-4">Ключевые возможности:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.features.map((feature, i) => (
                      <div
                        key={i}
                        className="border border-[#00F0FF]/20 bg-[#00F0FF]/5 p-3"
                      >
                        <div className="font-mono text-sm text-[#E0E0E0]">
                          {feature}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

