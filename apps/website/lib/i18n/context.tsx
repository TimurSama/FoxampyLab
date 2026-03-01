'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from './translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: { returnObjects?: boolean }) => string | any;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ru');

  useEffect(() => {
    // Загружаем язык из localStorage, по умолчанию русский
    const saved = localStorage.getItem('language') as Language | null;
    if (saved && translations[saved]) {
      setLanguageState(saved);
    } else {
      // По умолчанию русский для главной страницы
      setLanguageState('ru');
      localStorage.setItem('language', 'ru');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = 'ltr';
  };

  const translationsObj = translations[language];

  // Функция-обертка для доступа к переводам через строковые пути (как в старом useLocale)
  const t = (key: string, options?: { returnObjects?: boolean }): string | any => {
    try {
      const keys = key.split('.');
      let value: any = translationsObj;

      // Проходим по пути в текущем языке
      for (const k of keys) {
        if (value === null || value === undefined) {
          value = undefined;
          break;
        }
        value = value[k];
      }

      // Если значение не найдено в текущем языке, используем английский как fallback
      if (value === undefined || value === null) {
        value = translations.en;
        for (const k of keys) {
          if (value === null || value === undefined) {
            value = undefined;
            break;
          }
          value = value[k];
        }
      }

      // Если все еще не найдено, возвращаем ключ
      if (value === undefined || value === null) {
        return key;
      }

      // Если запрошен объект, возвращаем его как есть
      if (options?.returnObjects) {
        return value;
      }

      // Возвращаем строку или преобразуем в строку
      return typeof value === 'string' ? value : (typeof value === 'object' ? key : String(value));
    } catch (error) {
      console.error('Translation error for key:', key, error);
      return key;
    }
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
    const defaultT = (key: string, options?: { returnObjects?: boolean }): string | any => {
      try {
        const keys = key.split('.');
        let value: any = translations.en;
        for (const k of keys) {
          if (value === null || value === undefined) {
            break;
          }
          value = value[k];
        }
        if (value === undefined || value === null) {
          return key;
        }
        if (options?.returnObjects) {
          return value;
        }
        return typeof value === 'string' ? value : (typeof value === 'object' ? key : String(value));
      } catch (error) {
        console.error('Translation error for key:', key, error);
        return key;
      }
    };
    return {
      language: 'ru' as Language,
      setLanguage: () => { },
      t: defaultT,
    };
  }
  return context;
}

