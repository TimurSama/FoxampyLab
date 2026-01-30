"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Mail, 
  MessageCircle, 
  MapPin, 
  Clock,
  Send,
  CheckCircle
} from 'lucide-react';
import Header from '@/components/layout/Header';
import { useI18n } from '@/lib/i18n/context';
import { TelegramService } from '@/lib/telegram';

export default function ContactPage() {
  const { t } = useI18n();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    project: '',
    budget: '',
    message: ''
  });
const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const contactData = {
        name: formState.name,
        email: formState.email,
        subject: formState.project,
        message: formState.message
      };

      if (TelegramService.isConfigured()) {
        await TelegramService.sendMessage(
          TelegramService.formatContactMessage(contactData)
        );
        setSubmitted(true);
        setFormState({
          name: '',
          email: '',
          project: '',
          budget: '',
          message: ''
        });
      } else {
        // Fallback - открываем Telegram бота
        const telegramMessage = TelegramService.formatContactMessage(contactData);
        const telegramUrl = `${TelegramService.getBotUrl()}?start=${encodeURIComponent(telegramMessage)}`;
        window.open(telegramUrl, '_blank');
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      alert('❌ Произошла ошибка. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-ink-deep">
      <div className="fixed inset-0 wireframe-grid pointer-events-none" />
      
      <Header />
      
      <main className="relative z-10 pt-32 pb-24">
        {/* Hero */}
        <section className="px-4 mb-16">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="font-mono text-[10px] text-stone-slate tracking-[0.5em] mb-6">
                ─── {t('contact.title')} ───
              </div>
              
              <h1 className="text-4xl md:text-6xl font-mono text-engrave-fresco tracking-tight mb-6">
                {t('contact.subtitle')}
              </h1>
              
              <p className="font-mono text-sm text-stone-slate max-w-2xl mx-auto leading-relaxed">
                {t('contact.description')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info + Form */}
        <section className="px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr,2fr] gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6 border border-stone-anthracite/30"
              >
                <Mail size={24} className="text-engrave-line mb-4" />
                <h3 className="font-mono text-sm text-engrave-fresco mb-2">{t('contact.email')}</h3>
                <a href="mailto:hello@fractalix.lab" 
                   className="font-mono text-sm text-stone-slate hover:text-engrave-line transition-colors">
                  hello@fractalix.lab
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 border border-stone-anthracite/30"
              >
                <MessageCircle size={24} className="text-engrave-line mb-4" />
                <h3 className="font-mono text-sm text-engrave-fresco mb-2">{t('contact.telegram')}</h3>
                <a href="https://t.me/fractalix_lab" 
                   className="font-mono text-sm text-stone-slate hover:text-engrave-line transition-colors">
                  @fractalix_lab
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 border border-stone-anthracite/30"
              >
                <Clock size={24} className="text-engrave-line mb-4" />
                <h3 className="font-mono text-sm text-engrave-fresco mb-2">{t('contact.responseTime')}</h3>
                <p className="font-mono text-sm text-stone-slate">
                  {t('contact.responseTimeValue')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 border border-stone-anthracite/30"
              >
                <MapPin size={24} className="text-engrave-line mb-4" />
                <h3 className="font-mono text-sm text-engrave-fresco mb-2">{t('contact.location')}</h3>
                <p className="font-mono text-sm text-stone-slate">
                  {t('contact.locationValue')}
                </p>
              </motion.div>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8 border border-stone-anthracite/30"
            >
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <CheckCircle size={48} className="text-engrave-line mb-4" />
                  <h3 className="font-mono text-xl text-engrave-fresco mb-2">
                    {t('contact.sent')}
                  </h3>
                  <p className="font-mono text-sm text-stone-slate">
                    {t('contact.sentDesc')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-[10px] text-stone-slate tracking-widest mb-2">
                        {t('common.name')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={e => setFormState({...formState, name: e.target.value})}
                        className="w-full px-4 py-3 bg-ink-deep border border-stone-anthracite/50 
                                 text-engrave-fresco font-mono text-sm
                                 focus:border-engrave-line/50 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] text-stone-slate tracking-widest mb-2">
                        {t('common.email')} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={e => setFormState({...formState, email: e.target.value})}
                        className="w-full px-4 py-3 bg-ink-deep border border-stone-anthracite/50 
                                 text-engrave-fresco font-mono text-sm
                                 focus:border-engrave-line/50 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-[10px] text-stone-slate tracking-widest mb-2">
                        {t('contact.projectType')}
                      </label>
                      <select
                        value={formState.project}
                        onChange={e => setFormState({...formState, project: e.target.value})}
                        className="w-full px-4 py-3 bg-ink-deep border border-stone-anthracite/50 
                                 text-engrave-fresco font-mono text-sm
                                 focus:border-engrave-line/50 focus:outline-none transition-colors"
                      >
                        <option value="">{t('contact.projectTypeOptions.select')}</option>
                        <option value="ecosystem">{t('contact.projectTypeOptions.ecosystem')}</option>
                        <option value="web">{t('contact.projectTypeOptions.web')}</option>
                        <option value="blockchain">{t('contact.projectTypeOptions.blockchain')}</option>
                        <option value="design">{t('contact.projectTypeOptions.design')}</option>
                        <option value="marketing">{t('contact.projectTypeOptions.marketing')}</option>
                        <option value="other">{t('contact.projectTypeOptions.other')}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] text-stone-slate tracking-widest mb-2">
                        {t('contact.budget')}
                      </label>
                      <select
                        value={formState.budget}
                        onChange={e => setFormState({...formState, budget: e.target.value})}
                        className="w-full px-4 py-3 bg-ink-deep border border-stone-anthracite/50 
                                 text-engrave-fresco font-mono text-sm
                                 focus:border-engrave-line/50 focus:outline-none transition-colors"
                      >
                        <option value="">{t('contact.budgetOptions.select')}</option>
                        <option value="5k">{t('contact.budgetOptions.5k')}</option>
                        <option value="15k">{t('contact.budgetOptions.15k')}</option>
                        <option value="50k">{t('contact.budgetOptions.50k')}</option>
                        <option value="100k">{t('contact.budgetOptions.100k')}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-stone-slate tracking-widest mb-2">
                      {t('common.message')} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={e => setFormState({...formState, message: e.target.value})}
                      placeholder={t('contact.messagePlaceholder')}
                      className="w-full px-4 py-3 bg-ink-deep border border-stone-anthracite/50 
                               text-engrave-fresco font-mono text-sm resize-none
                               focus:border-engrave-line/50 focus:outline-none transition-colors
                               placeholder:text-stone-anthracite"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-engrave-fresco text-ink-deep font-mono text-sm tracking-widest
                             flex items-center justify-center gap-2"
                  >
                    {t('common.send')} <Send size={14} />
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

