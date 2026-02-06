"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, ShoppingCart } from 'lucide-react';
import UnifiedContactForm from '@/components/forms/UnifiedContactForm';

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
    const [isFlipped, setIsFlipped] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [showOrderForm, setShowOrderForm] = useState(false);
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
            { threshold: 0.3 }
        );

        observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    // Extract the first sentence or first 120 chars for the thesis
    const thesis = service.description.split('.')[0] + '.';

    return (
        <div ref={cardRef} className="relative h-[200px] sm:h-[240px] md:h-[260px] lg:h-[280px] w-full perspective-1000 group">
            <motion.div
                className="w-full h-full relative preserve-3d transition-all duration-700"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* FRONT SIDE */}
                <div
                    className="absolute inset-0 backface-hidden border border-white/5 bg-glass-matte
                     hover:border-white/20 hover:bg-black/03 hover:backdrop-blur-2xl 
                     transition-all duration-500 cursor-pointer p-3 sm:p-4 md:p-5 flex flex-col justify-center rounded-sm"
                    style={{ 
                        backfaceVisibility: 'hidden',
                        background: 'rgba(5, 5, 5, 0.85)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(224, 224, 224, 0.3)',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                    onClick={() => setIsFlipped(true)}
                >
                    <div className="space-y-4">
                        <h3 className="font-mono text-xl sm:text-2xl text-[#FFFFFF] tracking-tighter leading-tight uppercase group-hover:tracking-normal transition-all duration-500" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
                            {service.title}
                        </h3>

                        <div className="space-y-3">
                            <p className="font-mono text-[10px] sm:text-[11px] text-[#E0E0E0] uppercase tracking-[0.2em]" style={{ textShadow: '0 1px 5px rgba(0, 0, 0, 0.7)' }}>
                                {service.subtitle}
                            </p>

                            <motion.div 
                                className="w-12 h-[1px] bg-[#E0E0E0]/40 transition-all duration-500"
                                animate={isVisible ? { width: '5rem', backgroundColor: 'rgba(224, 224, 224, 0.6)' } : { width: '3rem', backgroundColor: 'rgba(224, 224, 224, 0.4)' }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            />

                            <motion.p 
                                className="font-mono text-[10px] sm:text-xs text-[#E0E0E0] leading-relaxed uppercase tracking-widest"
                                initial={{ opacity: 0, y: 8 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                style={{ textShadow: '0 1px 5px rgba(0, 0, 0, 0.7)' }}
                            >
                                {thesis}
                            </motion.p>
                        </div>
                    </div>

                    <div className="absolute bottom-6 right-6 flex items-center gap-3">
                        <motion.button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowOrderForm(true);
                            }}
                            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-[#E0E0E0] font-mono text-[10px] uppercase tracking-wider transition-all flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <ShoppingCart size={12} />
                            Заказать
                        </motion.button>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <ArrowRight size={16} className="text-[#E0E0E0]/40" />
                        </motion.div>
                    </div>
                </div>

                {/* BACK SIDE */}
                <div
                    className="absolute inset-0 backface-hidden bg-glass-matte border border-white/10 p-3 sm:p-4 md:p-5 rounded-sm overflow-y-auto"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: 'rgba(5, 5, 5, 0.85)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(224, 224, 224, 0.3)',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                    onClick={() => setIsFlipped(false)}
                >
                    <div className="flex justify-between items-start mb-6 pb-3 border-b border-[#E0E0E0]/10">
                        <div className="max-w-[85%]">
                            <h3 className="font-mono text-xs font-bold text-[#FFFFFF] uppercase tracking-[0.2em] mb-1">
                                {service.title}
                            </h3>
                            <p className="font-mono text-[9px] text-[#E0E0E0]/80 uppercase tracking-[0.1em]">
                                {service.subtitle}
                            </p>
                        </div>
                        <button className="text-[#E0E0E0]/40 hover:text-white transition-colors pt-1">
                            <X size={16} />
                        </button>
                    </div>

                    <div className="flex-grow space-y-6" style={{ maxHeight: 'calc(100% - 120px)' }}>
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1 h-[10px] bg-[#E0E0E0]"></div>
                                <h4 className="font-mono text-[10px] text-[#E0E0E0]/80 uppercase tracking-[0.3em]">
                    // Approach Analysis
                                </h4>
                            </div>
                            <p className="font-mono text-[11px] text-[#E0E0E0] leading-relaxed italic">
                                "{service.description}"
                            </p>
                        </section>

                        {service.features && service.features.length > 0 && (
                            <section>
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-1 h-[10px] bg-[#E0E0E0]/40"></div>
                                    <h4 className="font-mono text-[10px] text-[#E0E0E0]/80 uppercase tracking-[0.3em]">
                                        Capabilities Matrix
                                    </h4>
                                </div>
                                <div className="grid grid-cols-1 gap-px bg-[#E0E0E0]/10 border border-[#E0E0E0]/10">
                                    {service.features.map((feature, i) => (
                                        <div key={i} className="bg-[#050505]/03 p-4 flex items-start gap-4 hover:bg-[#E0E0E0]/5 transition-colors">
                                            <span className="font-mono text-[9px] text-[#E0E0E0]/20 mt-0.5">
                                                {(i + 1).toString().padStart(2, '0')}
                                            </span>
                                            <span className="font-mono text-[10px] text-[#E0E0E0]/80 leading-snug uppercase tracking-widest">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="mt-8 pt-4 border-t border-[#E0E0E0]/10 flex justify-between items-end opacity-20 hover:opacity-100 transition-opacity duration-500">
                        <div className="space-y-1">
                            <div className="font-mono text-[8px] text-[#E0E0E0] uppercase tracking-[0.5em]">FOXAMPY CORE SYSTEM</div>
                            <div className="font-mono text-[7px] text-[#E0E0E0]/60 uppercase tracking-[0.2em]">DECENTRALIZED ARCHITECTURE // R&D NODE</div>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowOrderForm(true);
                            }}
                            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-[#E0E0E0] font-mono text-[10px] uppercase tracking-wider transition-all flex items-center gap-2"
                        >
                            <ShoppingCart size={12} />
                            Заказать
                        </button>
                    </div>
                </div>
            </motion.div>
            <UnifiedContactForm
                isOpen={showOrderForm}
                onClose={() => setShowOrderForm(false)}
                serviceName={service.title}
                t={t}
            />
        </div>
    );
}
