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
    const [isFlipped, setIsFlipped] = useState(false);
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
            { threshold: 0.3 }
        );

        observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    // Extract the first sentence or first 120 chars for the thesis
    const thesis = service.description.split('.')[0] + '.';

    return (
        <div ref={cardRef} className="relative h-[400px] w-full perspective-1000 group">
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
                     transition-all duration-500 cursor-pointer p-6 md:p-8 flex flex-col justify-center rounded-sm"
                    style={{ 
                        backfaceVisibility: 'hidden',
                        background: 'rgba(5, 5, 5, 0.25)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)'
                    }}
                    onClick={() => setIsFlipped(true)}
                >
                    <div className="space-y-6">
                        <h3 className="font-mono text-2xl text-[#FFFFFF] tracking-tighter leading-tight uppercase group-hover:tracking-normal transition-all duration-500">
                            {service.title}
                        </h3>

                        <div className="space-y-4">
                            <p className="font-mono text-[11px] text-[#E0E0E0]/40 uppercase tracking-[0.2em]">
                                {service.subtitle}
                            </p>

                            <motion.div 
                                className="w-12 h-[1px] bg-[#E0E0E0]/20 transition-all duration-500"
                                animate={isVisible ? { width: '5rem', backgroundColor: 'rgba(224, 224, 224, 0.4)' } : { width: '3rem', backgroundColor: 'rgba(224, 224, 224, 0.2)' }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            />

                            <motion.p 
                                className="font-mono text-xs text-[#E0E0E0]/60 leading-relaxed uppercase tracking-widest"
                                initial={{ opacity: 0, y: 8 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                {thesis}
                            </motion.p>
                        </div>
                    </div>

                    <motion.div 
                        className="absolute bottom-10 right-10"
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <ArrowRight size={18} className="text-[#E0E0E0]/40" />
                    </motion.div>
                </div>

                {/* BACK SIDE */}
                <div
                    className="absolute inset-0 backface-hidden bg-glass-matte border border-white/10 p-6 md:p-8 rounded-sm overflow-hidden"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: 'rgba(5, 5, 5, 0.25)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)'
                    }}
                    onClick={() => setIsFlipped(false)}
                >
                    <div className="flex justify-between items-start mb-8 pb-4 border-b border-[#E0E0E0]/10">
                        <div className="max-w-[85%]">
                            <h3 className="font-mono text-xs font-bold text-[#FFFFFF] uppercase tracking-[0.2em] mb-1">
                                {service.title}
                            </h3>
                            <p className="font-mono text-[9px] text-[#E0E0E0]/40 uppercase tracking-[0.1em]">
                                {service.subtitle}
                            </p>
                        </div>
                        <button className="text-[#E0E0E0]/40 hover:text-white transition-colors pt-1">
                            <X size={16} />
                        </button>
                    </div>

                    <div className="flex-grow space-y-10">
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1 h-[10px] bg-[#E0E0E0]"></div>
                                <h4 className="font-mono text-[10px] text-[#E0E0E0]/40 uppercase tracking-[0.3em]">
                    // Approach Analysis
                                </h4>
                            </div>
                            <p className="font-mono text-[11px] text-[#E0E0E0]/90 leading-relaxed italic">
                                "{service.description}"
                            </p>
                        </section>

                        {service.features && service.features.length > 0 && (
                            <section>
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-1 h-[10px] bg-[#E0E0E0]/40"></div>
                                    <h4 className="font-mono text-[10px] text-[#E0E0E0]/40 uppercase tracking-[0.3em]">
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

                    <div className="mt-12 pt-6 border-t border-[#E0E0E0]/10 flex justify-between items-end opacity-20 hover:opacity-100 transition-opacity duration-500">
                        <div className="space-y-1">
                            <div className="font-mono text-[8px] text-[#E0E0E0] uppercase tracking-[0.5em]">FOXAMPY CORE SYSTEM</div>
                            <div className="font-mono text-[7px] text-[#E0E0E0]/60 uppercase tracking-[0.2em]">DECENTRALIZED ARCHITECTURE // R&D NODE</div>
                        </div>
                        <div className="w-6 h-6 border border-[#E0E0E0]/30 rotate-45 flex items-center justify-center">
                            <div className="w-1 h-1 bg-[#E0E0E0] animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
