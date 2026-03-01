"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface ConsultationCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle?: string;
  calendlyUrl?: string;
}

export default function ConsultationCalendar({ 
  isOpen, 
  onClose, 
  serviceTitle,
  calendlyUrl 
}: ConsultationCalendarProps) {
  const { t } = useI18n();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  // If Calendly URL provided, use Calendly embed
  if (calendlyUrl) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-ink-deep/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-ink-chrome/95 border border-stone-anthracite/50 max-w-4xl w-full h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="p-4 border-b border-stone-anthracite/30 flex items-center justify-between">
                <h2 className="font-mono text-xl text-engrave-fresco tracking-wider">
                  {t('modals.consultation.title')}
                </h2>
                <button
                  onClick={onClose}
                  className="text-stone-slate hover:text-engrave-line transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <iframe
                  src={calendlyUrl}
                  className="w-full h-full border-0"
                  title="Schedule Consultation"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Built-in calendar (simple version)
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement booking logic
    console.log({ selectedDate, selectedTime, name, email, description, serviceTitle });
    // Reset and close
    setSelectedDate(null);
    setSelectedTime(null);
    setName('');
    setEmail('');
    setDescription('');
    onClose();
  };

  // Simple date picker - just show next 14 days
  const getAvailableDates = () => {
    const dates: Date[] = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] bg-ink-deep/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="bg-ink-chrome/95 border border-stone-anthracite/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-anthracite/30">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-mono text-xl text-engrave-fresco tracking-wider">
                  {t('modals.consultation.title')}
                </h2>
                <button
                  onClick={onClose}
                  className="text-stone-slate hover:text-engrave-line transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              {serviceTitle && (
                <p className="font-mono text-sm text-stone-slate">
                  {t('modals.consultation.service')}: {serviceTitle}
                </p>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Date Selection */}
              <div>
                <label className="block font-mono text-sm text-engrave-fresco mb-3">
                  <CalendarIcon size={16} className="inline mr-2" />
                  {t('modals.consultation.selectDate')}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {getAvailableDates().map((date, index) => {
                    const isSelected = selectedDate?.getTime() === date.getTime();
                    return (
                      <motion.button
                        key={index}
                        type="button"
                        onClick={() => setSelectedDate(date)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 border font-mono text-xs text-center transition-colors
                          ${isSelected
                            ? 'border-engrave-line bg-engrave-line/10 text-engrave-line'
                            : 'border-stone-anthracite/30 text-stone-slate hover:border-stone-anthracite/50'
                          }`}
                      >
                        {formatDate(date)}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <label className="block font-mono text-sm text-engrave-fresco mb-3">
                    <Clock size={16} className="inline mr-2" />
                    {t('modals.consultation.selectTime')}
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {timeSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <motion.button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-3 border font-mono text-sm text-center transition-colors
                            ${isSelected
                              ? 'border-engrave-line bg-engrave-line/10 text-engrave-line'
                              : 'border-stone-anthracite/30 text-stone-slate hover:border-stone-anthracite/50'
                            }`}
                        >
                          {time}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-stone-slate mb-2">
                    {t('modals.consultation.nameLabel')}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 bg-ink-deep/50 border border-stone-anthracite/30 
                             text-engrave-line font-mono text-sm
                             focus:outline-none focus:border-engrave-line/50 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-stone-slate mb-2">
                    {t('modals.consultation.emailLabel')}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-ink-deep/50 border border-stone-anthracite/30 
                             text-engrave-line font-mono text-sm
                             focus:outline-none focus:border-engrave-line/50 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-mono text-xs text-stone-slate mb-2">
                  {t('modals.consultation.descriptionLabel')} ({t('modals.consultation.optional')})
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t('modals.consultation.descriptionPlaceholder')}
                  className="w-full h-24 px-4 py-3 bg-ink-deep/50 border border-stone-anthracite/30 
                           text-engrave-line font-mono text-sm
                           focus:outline-none focus:border-engrave-line/50 transition-colors
                           resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t border-stone-anthracite/30">
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 border border-stone-anthracite/30 
                           text-stone-slate font-mono text-sm tracking-widest
                           hover:border-engrave-line/50 hover:text-engrave-line transition-colors"
                >
                  {t('common.cancel')}
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={!selectedDate || !selectedTime || !name || !email}
                  whileHover={{ scale: selectedDate && selectedTime && name && email ? 1.02 : 1 }}
                  whileTap={{ scale: selectedDate && selectedTime && name && email ? 0.98 : 1 }}
                  className={`flex-1 px-6 py-3 font-mono text-sm tracking-widest flex items-center justify-center gap-2 transition-colors
                    ${selectedDate && selectedTime && name && email
                      ? 'bg-engrave-fresco text-ink-deep hover:bg-engrave-line'
                      : 'bg-stone-anthracite/30 text-stone-graphite cursor-not-allowed'
                    }`}
                >
                  <CalendarIcon size={16} />
                  {t('modals.consultation.confirm')}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

