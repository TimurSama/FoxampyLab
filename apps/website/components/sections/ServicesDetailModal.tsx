"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
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
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-50"
          />

          {/* Modal Card */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                rotateX: 15,
                y: 100
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateX: 0,
                y: 0
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                rotateX: -15,
                y: 100
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.5
              }}
              className="w-full max-w-4xl max-h-[85vh] overflow-hidden pointer-events-auto"
              style={{ perspective: '1000px' }}
            >
              {/* Card with gradient overlay for readability */}
              <div className="relative bg-glass-matte border border-white/10 rounded-sm shadow-2xl overflow-hidden">
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent pointer-events-none" />

                {/* Content */}
                <div className="relative overflow-y-auto max-h-[85vh] custom-scrollbar">
                  <div className="p-6 md:p-10 lg:p-12">
                    {/* Close button */}
                    <motion.button
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      onClick={onClose}
                      className="absolute top-6 right-6 p-2 text-[#E0E0E0] hover:text-white 
                               bg-black/30 hover:bg-black/50 border border-white/10 
                               rounded-full transition-all hover:rotate-90 duration-300 z-10"
                    >
                      <X size={20} />
                    </motion.button>

                    {/* Header */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="mb-8"
                    >
                      <div className="flex items-start gap-6 mb-6">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                          className="w-16 h-16 border-2 border-[#E0E0E0] text-[#E0E0E0] 
                                   flex items-center justify-center bg-black/30 backdrop-blur-sm"
                        >
                          <span className="font-mono text-2xl">◈</span>
                        </motion.div>
                        <div className="flex-1">
                          <h2 className="text-3xl md:text-4xl font-mono font-light text-white mb-3 
                                       drop-shadow-lg tracking-tight">
                            {service.title}
                          </h2>
                          <p className="font-mono text-sm md:text-base text-[#E0E0E0]/90 
                                      tracking-wide uppercase drop-shadow">
                            {service.subtitle}
                          </p>
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-black/40 backdrop-blur-sm border border-white/10 p-6 rounded-sm"
                      >
                        <p className="font-mono text-sm md:text-base text-[#E0E0E0] 
                                    leading-relaxed whitespace-pre-line">
                          {service.description}
                        </p>
                      </motion.div>
                    </motion.div>

                    {/* Features */}
                    {service.features && service.features.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                          <h3 className="font-mono text-xs text-[#E0E0E0]/60 uppercase tracking-[0.3em]">
                            Ключевые возможности
                          </h3>
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {service.features.map((feature, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + i * 0.05 }}
                              className="group relative border border-white/10 bg-black/30 
                                       backdrop-blur-sm p-4 hover:border-white/30 
                                       hover:bg-black/40 transition-all duration-300"
                            >
                              <div className="flex items-start gap-3">
                                <ArrowRight
                                  size={16}
                                  className="text-[#E0E0E0]/40 group-hover:text-[#E0E0E0] 
                                           transition-colors mt-1 flex-shrink-0"
                                />
                                <span className="font-mono text-sm text-[#E0E0E0] leading-relaxed">
                                  {feature}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Action button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="mt-8 flex justify-center"
                    >
                      <button
                        onClick={onClose}
                        className="px-8 py-4 bg-[#E0E0E0] text-[#050505] font-mono text-sm 
                                 tracking-[0.3em] uppercase hover:bg-white transition-all 
                                 transform hover:scale-105 active:scale-95 flex items-center gap-3"
                      >
                        Закрыть
                        <X size={16} />
                      </button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
