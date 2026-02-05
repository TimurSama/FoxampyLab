"use client";

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Mail, MessageSquare, Phone, Send, User, X } from 'lucide-react';
import CalendarPicker from '@/components/forms/CalendarPicker';
import ErrorModal from '@/components/modals/ErrorModal';
import { useI18n } from '@/lib/i18n/context';
import { submitLead } from '@/lib/forms/submitLead';

export default function FloatingContactButton() {
  const { t, language } = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorModal, setErrorModal] = useState<{ isOpen: boolean; error: string; telegramMessage?: string }>({
    isOpen: false,
    error: '',
  });

  const timeSlots = useMemo(
    () => ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
    []
  );

  const availableDates = useMemo(() => {
    const dates: Date[] = [];
    const today = new Date();
    for (let i = 0; i < 30; i += 1) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  }, []);

  const formatDateForDisplay = (date: Date): string =>
    date.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const handleDateSelect = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      setShowCalendar(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    try {
      await submitLead({
        type: 'consultation',
        data: {
          name,
          email,
          phone,
          date: selectedDate.toISOString(),
          time: selectedTime,
        },
      });

      alert(t('contact.consultation.confirm') || 'Заявка отправлена!');
      setName('');
      setEmail('');
      setPhone('');
      setSelectedDate(null);
      setSelectedTime('');
      setIsExpanded(false);
    } catch (error) {
      console.error('Ошибка отправки заявки:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Ошибка отправки заявки. Попробуйте позже.';
      setErrorModal({
        isOpen: true,
        error: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#E0E0E0] text-[#050505] rounded-full flex items-center justify-center shadow-lg hover:bg-[#FFFFFF] transition-colors"
        aria-label={t('contact.consultation.title') || 'Contact us'}
      >
        <MessageSquare size={24} />
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 z-[59] bg-black/80 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-24 left-6 z-[60] w-[calc(100vw-3rem)] md:w-[450px] pointer-events-auto"
              >
                <div className="bg-[#0A0A0A] border border-white/20 overflow-hidden rounded-sm shadow-2xl">
                  <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#050505]">
                    <h2 className="font-mono text-sm uppercase tracking-widest text-[#E0E0E0]">
                      {t('contact.consultation.title') || 'Связаться с нами'}
                    </h2>
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="p-2 hover:bg-white/10 transition-colors rounded-full"
                    >
                      <X size={18} className="text-[#E0E0E0]/80" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="p-5 space-y-4 bg-[#0A0A0A]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#E0E0E0]/60 mb-2">
                          <User size={12} /> {t('contact.consultation.nameLabel') || 'Name'}
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          placeholder={t('contact.consultation.nameLabel') || 'Your name'}
                          className="w-full px-3 py-2 bg-[#050505] border border-white/20 text-white font-mono text-xs focus:border-white/40 focus:outline-none transition-colors placeholder:text-white/20"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#E0E0E0]/60 mb-2">
                          <Mail size={12} /> {t('contact.consultation.emailLabel') || 'Email'}
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="mail@example.com"
                          className="w-full px-3 py-2 bg-[#050505] border border-white/20 text-white font-mono text-xs focus:border-white/40 focus:outline-none transition-colors placeholder:text-white/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#E0E0E0]/60 mb-2">
                        <Phone size={12} /> {t('contact.phoneLabel') || 'Phone'}
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-[#050505] border border-white/20 text-white font-mono text-xs focus:border-white/40 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#E0E0E0]/60 mb-2">
                          <Calendar size={12} /> {t('contact.consultation.selectDate') || 'Date'}
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowCalendar(true)}
                          className="w-full px-3 py-2 bg-[#050505] border border-white/20 text-white font-mono text-xs text-left flex justify-between items-center hover:bg-white/10 transition-all"
                        >
                          {selectedDate ? formatDateForDisplay(selectedDate) : (t('contact.consultation.selectDate') || 'Select...')}
                          <ArrowRight size={10} className="opacity-40" />
                        </button>
                      </div>
                      <div>
                        <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#E0E0E0]/60 mb-2">
                          <Clock size={12} /> {t('contact.consultation.selectTime') || 'Time'}
                        </label>
                        <select
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          required
                          className="w-full px-3 py-2 bg-[#050505] border border-white/20 text-white font-mono text-xs focus:border-white/40 focus:outline-none transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-[#050505]">{t('contact.consultation.selectTime') || 'Select...'}</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time} className="bg-[#050505]">{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={!selectedDate || !selectedTime || isSubmitting}
                        className="flex-1 py-3 bg-[#E0E0E0] text-[#050505] font-mono text-xs tracking-[0.2em] uppercase flex items-center justify-center hover:bg-[#FFFFFF] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-[#050505]/30 border-t-[#050505] rounded-full animate-spin" />
                            {t('common.sending') || 'Отправка...'}
                          </>
                        ) : (
                          t('contact.consultation.confirm') || 'Отправить заявку'
                        )}
                      </button>
                      <a
                        href="https://t.me/FoxampyLab_contact_bot"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 bg-[#050505] hover:bg-[#0A0A0A] border border-white/20 transition-colors flex items-center justify-center"
                        title="Написать в Telegram"
                      >
                        <Send size={16} className="text-white" />
                      </a>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {showCalendar && (
        <CalendarPicker
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          availableDates={availableDates}
          onClose={() => setShowCalendar(false)}
        />
      )}

      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, error: '' })}
        error={errorModal.error}
        telegramMessage={errorModal.telegramMessage}
      />
    </>
  );
}
