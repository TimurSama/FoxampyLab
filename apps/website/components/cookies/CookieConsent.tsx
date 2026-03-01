"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

const COOKIE_CONSENT_KEY = 'cookie_consent';

export default function CookieConsent() {
  const { language } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Проверяем, было ли уже дано согласие
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Показываем баннер с небольшой задержкой
      setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 2000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  const texts = {
    ru: {
      title: 'Использование файлов cookie',
      description: 'Мы используем файлы cookie для улучшения работы сайта, аналитики и персонализации контента. Продолжая использовать сайт, вы соглашаетесь с использованием cookie.',
      accept: 'Принять все',
      reject: 'Отклонить',
      learnMore: 'Узнать больше',
      privacyLink: '/privacy',
    },
    en: {
      title: 'Cookie Usage',
      description: 'We use cookies to improve site functionality, analytics, and content personalization. By continuing to use the site, you agree to the use of cookies.',
      accept: 'Accept All',
      reject: 'Reject',
      learnMore: 'Learn More',
      privacyLink: '/privacy',
    },
  };

  const t = texts[language];

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
        >
          <div className="max-w-6xl mx-auto bg-black/95 border border-white/20 backdrop-blur-xl rounded-lg shadow-2xl p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-shrink-0">
                <Cookie className="text-[#E0E0E0]" size={32} />
              </div>
              
              <div className="flex-1">
                <h3 className="font-mono text-sm md:text-base text-[#E0E0E0] mb-2 uppercase tracking-tight">
                  {t.title}
                </h3>
                <p className="font-mono text-xs md:text-sm text-[#E0E0E0]/70 leading-relaxed mb-3">
                  {t.description}
                </p>
                <a
                  href={t.privacyLink}
                  className="font-mono text-xs text-[#E0E0E0]/60 hover:text-[#E0E0E0] underline transition-colors"
                >
                  {t.learnMore}
                </a>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <button
                  onClick={handleReject}
                  className="px-4 py-2 border border-white/20 text-[#E0E0E0]/70 hover:text-[#E0E0E0] hover:border-white/40 font-mono text-xs uppercase tracking-wider transition-all"
                >
                  {t.reject}
                </button>
                <button
                  onClick={handleAccept}
                  className="px-4 py-2 bg-[#E0E0E0] text-black hover:bg-white font-mono text-xs uppercase tracking-wider transition-all"
                >
                  {t.accept}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
