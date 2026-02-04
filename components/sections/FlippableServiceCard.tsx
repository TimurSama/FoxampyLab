"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
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
    t: (key: string) => string;
}

export default function FlippableServiceCard({ service, t }: FlippableServiceCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

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
            { threshold: 0.2 }
        );

        observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    // Закрытие по Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isExpanded) {
                setIsExpanded(false);
            }
        };
        
        if (isExpanded) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isExpanded]);

    const thesis = service.description.split('.')[0] + '.';

    const handleExpand = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(true);
    }, []);

    const handleClose = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(false);
    }, []);

    return (
        <>
            {/* Компактная карточка */}
            <div 
                ref={cardRef} 
                className="relative h-[100px] sm:h-[110px] md:h-[120px] w-full group cursor-pointer"
                onClick={handleExpand}
            >
                <motion.div
                    className="w-full h-full border border-white/10 bg-black/80 backdrop-blur-md
                             hover:border-white/30 hover:bg-black/90 transition-all duration-300
                             p-3 sm:p-4 flex flex-col justify-center rounded-sm"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    style={{ 
                        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <h3 className="font-mono text-[10px] sm:text-[11px] md:text-xs text-white tracking-tight leading-tight uppercase mb-1" 
                        style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)' }}>
                        {service.title}
                    </h3>
                    <p className="font-mono text-[8px] sm:text-[9px] text-white/50 uppercase tracking-widest line-clamp-2">
                        {service.subtitle}
                    </p>
                    <div className="absolute bottom-2 right-2 opacity-30 group-hover:opacity-60 transition-opacity">
                        <ArrowRight size={12} className="text-white" />
                    </div>
                </motion.div>
            </div>

            {/* Развернутая карточка (overlay) */}
            <AnimatePresence>
                {isExpanded && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                            onClick={handleClose}
                        />
                        
                        {/* Развернутая карточка */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                            transition={{ 
                                duration: 0.5, 
                                ease: [0.23, 1, 0.32, 1],
                                rotateY: { duration: 0.6 }
                            }}
                            className="fixed inset-4 sm:inset-8 md:inset-12 lg:inset-16 z-[101] 
                                     bg-black/95 backdrop-blur-xl border border-white/20 rounded-sm
                                     overflow-y-auto"
                            style={{
                                boxShadow: '0 25px 100px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                                transformStyle: 'preserve-3d',
                                perspective: '1000px'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Кнопка закрытия */}
                            <button 
                                onClick={handleClose}
                                className="absolute top-4 right-4 z-10 p-2 border border-white/20 
                                         hover:bg-white/10 transition-colors"
                            >
                                <X size={20} className="text-white" />
                            </button>

                            <div className="p-6 sm:p-8 md:p-10 lg:p-12 h-full flex flex-col">
                                {/* Header */}
                                <div className="mb-6 pb-4 border-b border-white/10">
                                    <h2 className="font-mono text-xl sm:text-2xl md:text-3xl text-white uppercase tracking-tight mb-2"
                                        style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
                                        {service.title}
                                    </h2>
                                    <p className="font-mono text-xs sm:text-sm text-white/60 uppercase tracking-widest">
                                        {service.subtitle}
                                    </p>
                                </div>

                                {/* Content */}
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Description */}
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-1 h-3 bg-white"></div>
                                                <h4 className="font-mono text-[10px] text-white/60 uppercase tracking-[0.3em]">
                                                    Approach
                                                </h4>
                                            </div>
                                            <p className="font-mono text-sm text-white/80 leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    {service.features && service.features.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="w-1 h-3 bg-white/40"></div>
                                                <h4 className="font-mono text-[10px] text-white/60 uppercase tracking-[0.3em]">
                                                    Capabilities
                                                </h4>
                                            </div>
                                            <div className="grid grid-cols-1 gap-px bg-white/10 border border-white/10">
                                                {service.features.map((feature, i) => (
                                                    <div 
                                                        key={i} 
                                                        className="bg-black/80 p-3 flex items-start gap-3 hover:bg-white/5 transition-colors"
                                                    >
                                                        <span className="font-mono text-[9px] text-white/20 mt-0.5">
                                                            {(i + 1).toString().padStart(2, '0')}
                                                        </span>
                                                        <span className="font-mono text-[11px] text-white/70 leading-snug uppercase tracking-wide">
                                                            {feature}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-end opacity-30">
                                    <div className="space-y-0.5">
                                        <div className="font-mono text-[8px] text-white uppercase tracking-[0.5em]">FOXAMPY LAB</div>
                                        <div className="font-mono text-[7px] text-white/60 uppercase tracking-[0.2em]">DECENTRALIZED // R&D</div>
                                    </div>
                                    <div className="w-5 h-5 border border-white/30 rotate-45 flex items-center justify-center">
                                        <div className="w-1 h-1 bg-white animate-pulse"></div>
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
