"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';

interface FlippableServiceCardProps {
    service: {
        id: string;
        title: string;
        subtitle: string;
        description: string;
        features?: string[];
        icon?: string;
    };
    t: (key: string) => string; // Translation function
}

export default function FlippableServiceCard({ service, t }: FlippableServiceCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const expandedCardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cardRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    // Блокируем скролл страницы когда карточка открыта
    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isExpanded]);

    // Extract the first sentence or first 120 chars for the thesis
    const thesis = service.description.split('.')[0] + '.';

    return (
        <>
            {/* Компактная карточка - адаптивный размер для размещения всех 9 карточек */}
            <div 
                ref={cardRef} 
                className="relative h-[100px] xs:h-[110px] sm:h-[120px] md:h-[130px] lg:h-[140px] xl:h-[150px] w-full group"
            >
                <motion.div
                    className="w-full h-full border border-white/5 bg-glass-matte
                     hover:border-white/20 hover:bg-black/03 hover:backdrop-blur-2xl 
                     transition-all duration-500 cursor-pointer p-1.5 sm:p-2 md:p-2.5 flex flex-col justify-center rounded-sm"
                    style={{ 
                        background: 'rgba(5, 5, 5, 0.85)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(224, 224, 224, 0.3)',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                    onClick={() => setIsExpanded(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="space-y-1 sm:space-y-1.5">
                        <h3 className="font-mono text-xs sm:text-sm md:text-base text-[#FFFFFF] tracking-tighter leading-tight uppercase group-hover:tracking-normal transition-all duration-500" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
                            {service.title}
                        </h3>

                        <div className="space-y-1">
                            <p className="font-mono text-[7px] sm:text-[8px] md:text-[9px] text-[#E0E0E0] uppercase tracking-[0.15em]" style={{ textShadow: '0 1px 5px rgba(0, 0, 0, 0.7)' }}>
                                {service.subtitle}
                            </p>

                            <motion.div 
                                className="w-6 sm:w-8 h-[1px] bg-[#E0E0E0]/40 transition-all duration-500"
                                animate={isVisible ? { width: '3rem', backgroundColor: 'rgba(224, 224, 224, 0.6)' } : { width: '1.5rem', backgroundColor: 'rgba(224, 224, 224, 0.4)' }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            />

                            <motion.p 
                                className="font-mono text-[7px] sm:text-[8px] text-[#E0E0E0] leading-tight uppercase tracking-wider line-clamp-2"
                                initial={{ opacity: 0, y: 4 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                style={{ textShadow: '0 1px 5px rgba(0, 0, 0, 0.7)' }}
                            >
                                {thesis}
                            </motion.p>
                        </div>
                    </div>

                    <motion.div 
                        className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2"
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <ArrowRight size={12} className="text-[#E0E0E0]/40" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Увеличенная карточка с overlay */}
            <AnimatePresence>
                {isExpanded && (
                    <>
                        {/* Overlay с затемнением */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                            onClick={() => setIsExpanded(false)}
                        />

                        {/* Увеличенная карточка */}
                        <motion.div
                            ref={expandedCardRef}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                            className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none"
                        >
                            <div
                                className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto border border-white/10 bg-glass-matte rounded-sm pointer-events-auto"
                                style={{
                                    background: 'rgba(5, 5, 5, 0.95)',
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(224, 224, 224, 0.3)',
                                    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Заголовок с кнопкой закрытия */}
                                <div className="flex justify-between items-start p-3 sm:p-4 md:p-6 border-b border-[#E0E0E0]/10 sticky top-0 bg-[#050505]/95 backdrop-blur-sm z-10">
                                    <div className="max-w-[85%] pr-2">
                                        <h3 className="font-mono text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#FFFFFF] uppercase tracking-[0.15em] mb-1 sm:mb-2 leading-tight" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
                                            {service.title}
                                        </h3>
                                        <p className="font-mono text-[10px] sm:text-xs md:text-sm text-[#E0E0E0]/80 uppercase tracking-[0.1em]">
                                            {service.subtitle}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsExpanded(false)}
                                        className="text-[#E0E0E0]/40 hover:text-white transition-colors p-2 -mt-2 -mr-2"
                                        aria-label="Close"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Контент */}
                                <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
                                    {/* Описание */}
                                    <section>
                                        <div className="flex items-center gap-2 mb-2 sm:mb-3 md:mb-4">
                                            <div className="w-1 h-[10px] sm:h-[12px] bg-[#E0E0E0]"></div>
                                            <h4 className="font-mono text-[10px] sm:text-xs md:text-sm text-[#E0E0E0]/80 uppercase tracking-[0.25em] sm:tracking-[0.3em]">
                                                // Approach Analysis
                                            </h4>
                                        </div>
                                        <p className="font-mono text-xs sm:text-sm md:text-base text-[#E0E0E0] leading-relaxed italic px-1" style={{ textShadow: '0 1px 5px rgba(0, 0, 0, 0.7)' }}>
                                            "{service.description}"
                                        </p>
                                    </section>

                                    {/* Features */}
                                    {service.features && service.features.length > 0 && (
                                        <section>
                                            <div className="flex items-center gap-2 mb-2 sm:mb-3 md:mb-4">
                                                <div className="w-1 h-[10px] sm:h-[12px] bg-[#E0E0E0]/40"></div>
                                                <h4 className="font-mono text-[10px] sm:text-xs md:text-sm text-[#E0E0E0]/80 uppercase tracking-[0.25em] sm:tracking-[0.3em]">
                                                    Capabilities Matrix
                                                </h4>
                                            </div>
                                            <div className="grid grid-cols-1 gap-px bg-[#E0E0E0]/10 border border-[#E0E0E0]/10">
                                                {service.features.map((feature, i) => (
                                                    <div key={i} className="bg-[#050505]/30 p-2 sm:p-3 md:p-4 flex items-start gap-2 sm:gap-3 md:gap-4 hover:bg-[#E0E0E0]/5 transition-colors">
                                                        <span className="font-mono text-[9px] sm:text-[10px] md:text-xs text-[#E0E0E0]/20 mt-0.5 flex-shrink-0">
                                                            {(i + 1).toString().padStart(2, '0')}
                                                        </span>
                                                        <span className="font-mono text-[10px] sm:text-xs md:text-sm text-[#E0E0E0]/80 leading-snug uppercase tracking-wider sm:tracking-widest">
                                                            {feature}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    {/* Кнопка заказать */}
                                    <div className="pt-3 sm:pt-4 border-t border-[#E0E0E0]/10">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Здесь можно добавить логику заказа
                                                window.location.href = '/contact';
                                            }}
                                            className="w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-[#E0E0E0] text-[#050505] font-mono text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-2 sm:gap-3 hover:bg-[#FFFFFF] transition-colors"
                                        >
                                            {t('common.order') || 'Заказать'}
                                            <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
