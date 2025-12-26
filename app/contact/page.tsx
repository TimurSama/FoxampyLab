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
import FanMenu from '@/components/layout/FanMenu';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    project: '',
    budget: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be form submission logic
    setSubmitted(true);
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
                ─── CONTACT ───
              </div>
              
              <h1 className="text-4xl md:text-6xl font-mono text-engrave-fresco tracking-tight mb-6">
                СВЯЗАТЬСЯ
                <br />
                С НАМИ
              </h1>
              
              <p className="font-mono text-sm text-stone-slate max-w-2xl mx-auto leading-relaxed">
                Расскажите о вашем проекте. Первая консультация бесплатно.
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
                <h3 className="font-mono text-sm text-engrave-fresco mb-2">EMAIL</h3>
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
                <h3 className="font-mono text-sm text-engrave-fresco mb-2">TELEGRAM</h3>
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
                <h3 className="font-mono text-sm text-engrave-fresco mb-2">RESPONSE TIME</h3>
                <p className="font-mono text-sm text-stone-slate">
                  &lt; 24 часа
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 border border-stone-anthracite/30"
              >
                <MapPin size={24} className="text-engrave-line mb-4" />
                <h3 className="font-mono text-sm text-engrave-fresco mb-2">LOCATION</h3>
                <p className="font-mono text-sm text-stone-slate">
                  Remote-first, Worldwide
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
                    СООБЩЕНИЕ ОТПРАВЛЕНО
                  </h3>
                  <p className="font-mono text-sm text-stone-slate">
                    Мы свяжемся с вами в течение 24 часов.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-[10px] text-stone-slate tracking-widest mb-2">
                        ИМЯ *
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
                        EMAIL *
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
                        ТИП ПРОЕКТА
                      </label>
                      <select
                        value={formState.project}
                        onChange={e => setFormState({...formState, project: e.target.value})}
                        className="w-full px-4 py-3 bg-ink-deep border border-stone-anthracite/50 
                                 text-engrave-fresco font-mono text-sm
                                 focus:border-engrave-line/50 focus:outline-none transition-colors"
                      >
                        <option value="">Выберите...</option>
                        <option value="ecosystem">Экосистема / Комплексный проект</option>
                        <option value="web">Веб-сайт / Приложение</option>
                        <option value="blockchain">Blockchain / Web3</option>
                        <option value="design">Дизайн / Брендинг</option>
                        <option value="marketing">Маркетинг</option>
                        <option value="other">Другое</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] text-stone-slate tracking-widest mb-2">
                        БЮДЖЕТ
                      </label>
                      <select
                        value={formState.budget}
                        onChange={e => setFormState({...formState, budget: e.target.value})}
                        className="w-full px-4 py-3 bg-ink-deep border border-stone-anthracite/50 
                                 text-engrave-fresco font-mono text-sm
                                 focus:border-engrave-line/50 focus:outline-none transition-colors"
                      >
                        <option value="">Выберите...</option>
                        <option value="5k">до $5,000</option>
                        <option value="15k">$5,000 - $15,000</option>
                        <option value="50k">$15,000 - $50,000</option>
                        <option value="100k">$50,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-stone-slate tracking-widest mb-2">
                      СООБЩЕНИЕ *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={e => setFormState({...formState, message: e.target.value})}
                      placeholder="Расскажите о вашем проекте..."
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
                    ОТПРАВИТЬ <Send size={14} />
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <FanMenu />
    </div>
  );
}

