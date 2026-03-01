"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    items: FAQItem[];
    title?: string;
    subtitle?: string;
}

export default function FAQSection({ items, title = 'Часто задаваемые вопросы', subtitle }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="font-mono text-[10px] text-[#E0E0E0]/40 tracking-[0.5em] mb-4 uppercase">
                        ─── FAQ ───
                    </div>
                    <h2 className="text-3xl md:text-5xl font-mono font-light text-[#E0E0E0] mb-4">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-sm md:text-base font-mono text-[#E0E0E0]/70">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className="space-y-4">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-glass-matte border border-white/10 rounded-sm overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                            >
                                <h3 className="font-mono text-sm md:text-base text-[#E0E0E0] pr-4">
                                    {item.question}
                                </h3>
                                <ChevronDown
                                    size={20}
                                    className={`text-[#E0E0E0]/60 transition-transform flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="px-6 pb-5"
                                >
                                    <div className="pt-2 border-t border-white/5">
                                        <p className="font-mono text-xs md:text-sm text-[#E0E0E0]/80 leading-relaxed whitespace-pre-line">
                                            {item.answer}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
