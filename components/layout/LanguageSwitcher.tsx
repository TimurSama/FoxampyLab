"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';
import { Locale } from '@/i18n';

const languageNames: Record<Locale, string> = {
  en: 'EN',
  ru: 'RU',
  pl: 'PL',
  es: 'ES',
  fr: 'FR',
  de: 'DE',
  ar: 'AR',
  be: 'BE',
};

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-2 md:px-3 py-1.5 border border-stone-anthracite/50 
                 hover:border-engrave-line/30 transition-colors"
      >
        <Globe size={12} className="text-engrave-dim" />
        <span className="font-mono text-[8px] md:text-[9px] text-stone-slate tracking-widest">
          {languageNames[locale]}
        </span>
        <ChevronDown 
          size={10} 
          className={`text-stone-slate transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 bg-ink-chrome border border-stone-anthracite/50 
                       backdrop-blur-xl z-50 min-w-[120px]"
            >
              {Object.entries(languageNames).map(([langCode, langName]) => (
                <button
                  key={langCode}
                  onClick={() => handleLanguageChange(langCode as Locale)}
                  className={`w-full px-4 py-2 text-left font-mono text-[9px] tracking-widest transition-colors
                    ${locale === langCode 
                      ? 'bg-engrave-fresco/20 text-engrave-fresco' 
                      : 'text-stone-slate hover:bg-ink-deep hover:text-engrave-line'
                    }`}
                >
                  {langName}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
