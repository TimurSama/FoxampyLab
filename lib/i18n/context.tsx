'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from './translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Загружаем язык из localStorage или определяем по браузеру
    const saved = localStorage.getItem('language') as Language | null;
    if (saved && translations[saved]) {
      setLanguageState(saved);
    } else {
      // Определяем язык браузера
      const browserLang = navigator.language.split('-')[0];
      const supportedLangs: Language[] = ['en', 'ru', 'ar', 'es', 'pl', 'fr', 'de'];
      if (supportedLangs.includes(browserLang as Language)) {
        setLanguageState(browserLang as Language);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    // Устанавливаем dir для арабского языка
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  };

  const t = translations[language];

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    // Возвращаем дефолтные значения, если контекст не доступен
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: translations.en,
    };
  }
  return context;
}

