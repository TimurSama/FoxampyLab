'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from './translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Загружаем язык из localStorage, по умолчанию английский
    const saved = localStorage.getItem('language') as Language | null;
    if (saved && translations[saved]) {
      setLanguageState(saved);
    } else {
      // По умолчанию всегда английский
      setLanguageState('en');
      localStorage.setItem('language', 'en');
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

  const translationsObj = translations[language];
  
  // Функция-обертка для доступа к переводам через строковые пути (как в старом useLocale)
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translationsObj;
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        // Fallback to English
        value = translations.en;
        for (const k2 of keys) {
          value = value?.[k2];
        }
        break;
      }
    }
    return typeof value === 'string' ? value : key;
  };

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
    const defaultT = (key: string): string => {
      const keys = key.split('.');
      let value: any = translations.en;
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) break;
      }
      return typeof value === 'string' ? value : key;
    };
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: defaultT,
    };
  }
  return context;
}

