"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle } from 'lucide-react';
import { TelegramService } from '@/lib/telegram';

interface UnifiedContactFormProps {
    isOpen: boolean;
    onClose: () => void;
    serviceName?: string;
    t: (key: string) => string;
}

export default function UnifiedContactForm({ isOpen, onClose, serviceName, t }: UnifiedContactFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('+');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.startsWith('+')) {
            setPhone(value);
        } else if (value === '') {
            setPhone('+');
        } else {
            setPhone('+' + value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = {
            name,
            email,
            phone,
            message,
            serviceName: serviceName || 'General Inquiry'
        };

        try {
            const response = await fetch('/api/telegram/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'contact',
                    data: formData
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send');
            }

            // Reset form
            setName('');
            setEmail('');
            setPhone('+');
            setMessage('');
            onClose();
        } catch (error) {
            console.error('Error submitting form:', error);
            // Fallback to Telegram bot
            const telegramMessage = `Новая заявка:\n\nИмя: ${name}\nEmail: ${email}\nТелефон: ${phone}\nУслуга: ${serviceName || 'Общий запрос'}\n\nСообщение:\n${message}`;
            window.open(TelegramService.getBotUrlWithMessage(telegramMessage), '_blank');
            setName('');
            setEmail('');
            setPhone('+');
            setMessage('');
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleTelegramClick = () => {
        const telegramMessage = `Новая заявка:\n\nИмя: ${name || 'Не указано'}\nEmail: ${email || 'Не указано'}\nТелефон: ${phone || 'Не указано'}\nУслуга: ${serviceName || 'Общий запрос'}\n\nСообщение:\n${message || 'Нет дополнительной информации'}`;
        window.open(TelegramService.getBotUrlWithMessage(telegramMessage), '_blank');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-[#0a0a0a] border border-white/20 rounded-lg p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="font-mono text-xl text-white">
                                    {serviceName ? `Заказать: ${serviceName}` : 'Связаться с нами'}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="text-white/60 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block font-mono text-sm text-white/80 mb-2">
                                        Имя *
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded text-white font-mono text-sm focus:outline-none focus:border-white/40"
                                    />
                                </div>

                                <div>
                                    <label className="block font-mono text-sm text-white/80 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded text-white font-mono text-sm focus:outline-none focus:border-white/40"
                                    />
                                </div>

                                <div>
                                    <label className="block font-mono text-sm text-white/80 mb-2">
                                        Телефон *
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        required
                                        className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded text-white font-mono text-sm focus:outline-none focus:border-white/40"
                                    />
                                </div>

                                <div>
                                    <label className="block font-mono text-sm text-white/80 mb-2">
                                        Дополнительная информация
                                    </label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded text-white font-mono text-sm focus:outline-none focus:border-white/40 resize-none"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 px-4 py-2 bg-white text-black font-mono text-sm hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        <Send size={16} />
                                        {isSubmitting ? 'Отправка...' : 'Отправить'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleTelegramClick}
                                        className="px-4 py-2 bg-[#0088cc] text-white font-mono text-sm hover:bg-[#0088cc]/90 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <MessageCircle size={16} />
                                        Telegram
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
