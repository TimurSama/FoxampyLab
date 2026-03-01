"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Menu, X, Search, ChevronDown, Globe, MessageSquare, User, Mail, Phone, Calendar, Clock, ArrowRight, Send } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n/context';
import type { Language } from '@/lib/i18n/translations';
import CalendarPicker from '@/components/forms/CalendarPicker';
import ErrorModal from '@/components/modals/ErrorModal';
import { TelegramService } from '@/lib/telegram';

const menuItemsConfig = [
  { path: '/', label: 'ГЛАВНАЯ', labelEn: 'HOME' },
  { path: '/hub', label: 'HUB', labelEn: 'HUB' },
  { path: '/gallery', label: 'ГАЛЕРЕЯ', labelEn: 'GALLERY' },
  { path: '/about', label: 'О НАС', labelEn: 'ABOUT' },
  { path: '/services', label: 'УСЛУГИ', labelEn: 'SERVICES' },
  { path: '/research', label: 'R&D', labelEn: 'R&D' },
  { path: '/join', label: 'JOIN', labelEn: 'JOIN' },
  { path: '/contact', label: 'КОНТАКТЫ', labelEn: 'CONTACT' },
];
export default function Header() {
  const router = useRouter();
  const { t, language, setLanguage } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
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
  const menuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);

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

  const languages: Language[] = ['en', 'ru'];
  const languageNames: Record<Language, string> = {
    en: 'EN',
    ru: 'RU',
  };

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = useCallback((path: string) => {
    setMenuOpen(false);
    router.push(path);
  }, [router]);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search logic here
      setSearchQuery('');
      setSearchOpen(false);
    }
  }, [searchQuery]);

  const handleDateSelect = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      setShowCalendar(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    try {
      await TelegramService.sendLead({
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
      setContactOpen(false);
    } catch (error) {
      console.error('Contact form error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка. Пожалуйста, попробуйте еще раз.';
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
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-2 md:mx-8 mt-1 bg-glass-matte/95 backdrop-blur-xl shadow-[0_2px_12px_0_rgba(0,0,0,0.2)] rounded-sm">
          <div className="px-4 md:px-8 py-2 flex items-center justify-between relative">
          {/* Burger Menu - Left */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 border border-stone-anthracite/30 text-stone-slate 
                       hover:text-engrave-line hover:border-engrave-line/20 transition-colors"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 bg-ink-chrome/95 border border-stone-anthracite/50 
                           backdrop-blur-md min-w-[180px] z-50 shadow-lg"
                >
                  {menuItemsConfig.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleMenuClick(item.path)}
                      className="w-full px-4 py-2.5 text-left font-mono text-xs text-stone-slate 
                               hover:bg-ink-deep hover:text-engrave-line transition-colors
                               border-b border-stone-anthracite/20 last:border-b-0"
                    >
                      {language !== 'en' ? item.label : item.labelEn}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Logo - Center */}
          <Link href="/" className={`absolute left-1/2 -translate-x-1/2 transition-opacity duration-200 ${searchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <motion.div
              className="font-mono text-sm md:text-base tracking-[0.2em] text-engrave-fresco cursor-pointer whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              FOXAMPY LAB
            </motion.div>
          </Link>

          {/* Search + Language - Right */}
          <div className="flex flex-col items-end gap-1 md:flex-row md:items-center md:gap-3">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('header.searchPlaceholder')}
                    autoFocus
                    className="w-32 md:w-48 px-3 py-1.5 bg-ink-chrome/03 border border-stone-anthracite/50 
                             font-mono text-xs text-engrave-fresco placeholder-stone-anthracite
                             focus:border-engrave-line/30 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="p-1.5 text-stone-slate hover:text-engrave-line ml-1"
                  >
                    <X size={14} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 border border-stone-anthracite/30 text-stone-slate 
                           hover:text-engrave-line hover:border-engrave-line/20 transition-colors"
                >
                  <Search size={14} />
                </button>
              )}
            </div>

            {/* Language Switcher */}
            <div className="relative" ref={languageMenuRef}>
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="px-3 py-2 border border-stone-anthracite/30 text-stone-slate 
                         hover:text-engrave-line hover:border-engrave-line/20 transition-colors
                         flex items-center gap-1.5 font-mono text-xs"
              >
                <Globe size={14} />
                <span>{languageNames[language]}</span>
                <ChevronDown size={12} className={languageMenuOpen ? 'rotate-180' : ''} />
              </button>

              {/* Language Dropdown */}
              <AnimatePresence>
                {languageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 bg-ink-chrome/03 border border-stone-anthracite/50 
                             backdrop-blur-xl min-w-[120px] z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setLanguageMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left font-mono text-xs transition-colors
                                 border-b border-stone-anthracite/20 last:border-b-0
                                 ${language === lang
                            ? 'bg-ink-deep text-engrave-line'
                            : 'text-stone-slate hover:bg-ink-deep hover:text-engrave-line'
                          }`}
                      >
                        {languageNames[lang]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          </div>
        </div>
      </header>

      {/* Floating Contact Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setContactOpen(true)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#E0E0E0] text-[#050505] rounded-full flex items-center justify-center shadow-lg hover:bg-[#FFFFFF] transition-colors"
        aria-label={t('contact.consultation.title') || 'Contact us'}
      >
        <MessageSquare size={24} />
      </motion.button>

      <AnimatePresence>
        {contactOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setContactOpen(false)}
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
                    <button onClick={() => setContactOpen(false)} className="p-2 hover:bg-white/10 transition-colors rounded-full">
                      <X size={18} className="text-[#E0E0E0]/80" />
                    </button>
                  </div>

                  <form onSubmit={handleContactSubmit} className="p-5 space-y-4 bg-[#0A0A0A]">
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
