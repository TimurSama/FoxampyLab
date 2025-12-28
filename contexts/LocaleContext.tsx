"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale } from '@/i18n';
import enMessages from '@/messages/en.json';
import ruMessages from '@/messages/ru.json';
import plMessages from '@/messages/pl.json';
import esMessages from '@/messages/es.json';
import frMessages from '@/messages/fr.json';
import deMessages from '@/messages/de.json';
import arMessages from '@/messages/ar.json';
import beMessages from '@/messages/be.json';

type Messages = typeof enMessages;

const messagesMap: Record<Locale, any> = {
  en: enMessages,
  ru: ruMessages,
  pl: plMessages,
  es: esMessages,
  fr: frMessages,
  de: deMessages,
  ar: arMessages,
  be: beMessages,
};

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  messages: Messages;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    // Load saved locale from localStorage
    const savedLocale = localStorage.getItem('locale') as Locale | null;
    if (savedLocale && messagesMap[savedLocale]) {
      setLocaleState(savedLocale);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      const supportedLocale = Object.keys(messagesMap).find(
        (l) => l === browserLang
      ) as Locale | undefined;
      if (supportedLocale) {
        setLocaleState(supportedLocale);
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    // Update HTML lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale;
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      // For RTL languages
      if (locale === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    }
  }, [locale]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = messagesMap[locale];
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        // Fallback to English
        value = messagesMap['en'];
        for (const k2 of keys) {
          value = value?.[k2];
        }
        break;
      }
    }
    return value || key;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, messages: messagesMap[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
