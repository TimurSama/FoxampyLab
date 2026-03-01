"use client";

/**
 * COOKIE CONSENT & ANALYTICS
 * GDPR-compliant cookie banner + behavioral tracking
 */

import { useState, useEffect } from 'react';
import styles from './cookies-consent.module.css';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'cookie_consent';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    timestamp: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setPreferences(parsed);
      initAnalytics(parsed);
    } else {
      setShowBanner(true);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    prefs.timestamp = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);
    setShowPreferences(false);
    initAnalytics(prefs);
  };

  const acceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: '',
    });
  };

  const acceptNecessary = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: '',
    });
  };

  if (!showBanner && !showPreferences) return null;

  if (showPreferences) {
    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h3>Настройки cookie</h3>
          <p className={styles.description}>
            Мы используем cookie для улучшения работы сайта и персонализации.
          </p>

          <div className={styles.options}>
            <label className={styles.option}>
              <input type="checkbox" checked disabled />
              <div>
                <strong>Необходимые</strong>
                <span>Обеспечивают базовую функциональность сайта</span>
              </div>
            </label>

            <label className={styles.option}>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) =>
                  setPreferences({ ...preferences, analytics: e.target.checked })
                }
              />
              <div>
                <strong>Аналитика</strong>
                <span>Помогают понять, как вы используете сайт</span>
              </div>
            </label>

            <label className={styles.option}>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) =>
                  setPreferences({ ...preferences, marketing: e.target.checked })
                }
              />
              <div>
                <strong>Маркетинг</strong>
                <span>Используются для персонализации рекламы</span>
              </div>
            </label>
          </div>

          <div className={styles.buttons}>
            <button onClick={() => savePreferences(preferences)} className={styles.primary}>
              Сохранить настройки
            </button>
            <button onClick={() => setShowPreferences(false)} className={styles.secondary}>
              Назад
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <p>
          Мы используем cookie для аналитики и персонализации.
          <button 
            onClick={() => setShowPreferences(true)} 
            className={styles.link}
          >
            Настроить
          </button>
        </p>
      </div>
      <div className={styles.actions}>
        <button onClick={acceptAll} className={styles.accept}>
          Принять все
        </button>
        <button onClick={acceptNecessary} className={styles.reject}>
          Только необходимые
        </button>
      </div>
    </div>
  );
}

function initAnalytics(prefs: CookiePreferences) {
  if (prefs.analytics) {
    initGoogleAnalytics();
    initBehavioralTracking();
  }
}

function initGoogleAnalytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  if (!GA_ID || typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', GA_ID, {
    anonymize_ip: true,
    page_location: window.location.href,
    page_path: window.location.pathname,
  });
}

class BehaviorTracker {
  private events: any[] = [];
  private sessionStart: number = Date.now();
  private scrollDepth: number = 0;
  private timeOnPage: number = 0;
  private activeTime: number = 0;
  private lastActivity: number = Date.now();
  private isActive: boolean = true;

  constructor() {
    if (typeof window === 'undefined') return;
    this.init();
  }

  private init() {
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
    
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, this.handleActivity.bind(this), { passive: true });
    });

    document.addEventListener('click', this.handleClick.bind(this));
    setInterval(this.updateTime.bind(this), 1000);
    window.addEventListener('beforeunload', this.sendData.bind(this));
  }

  private handleScroll() {
    const scrolled = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const depth = Math.round((scrolled / docHeight) * 100);
    
    if (depth > this.scrollDepth) {
      this.scrollDepth = depth;
      if (depth % 25 === 0) {
        this.track('scroll_depth', { depth });
      }
    }
  }

  private handleActivity() {
    this.lastActivity = Date.now();
    if (!this.isActive) {
      this.isActive = true;
    }
  }

  private handleClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const clickable = target.closest('a, button, [role="button"]');
    
    if (clickable) {
      this.track('click', {
        element: clickable.tagName.toLowerCase(),
        text: clickable.textContent?.slice(0, 50),
        href: (clickable as HTMLAnchorElement).href,
      });
    }
  }

  private updateTime() {
    this.timeOnPage++;
    if (Date.now() - this.lastActivity < 30000) {
      this.activeTime++;
    } else {
      this.isActive = false;
    }

    if (this.timeOnPage % 30 === 0) {
      this.saveSession();
    }
  }

  public track(type: string, data: Record<string, any> = {}) {
    const event = {
      type,
      timestamp: Date.now(),
      page: window.location.pathname,
      data,
    };
    
    this.events.push(event);
    
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', type, {
        ...data,
        page_path: window.location.pathname,
      });
    }
  }

  private saveSession() {
    const session = {
      duration: this.timeOnPage,
      activeTime: this.activeTime,
      scrollDepth: this.scrollDepth,
    };
    localStorage.setItem('behavior_session', JSON.stringify(session));
  }

  private sendData() {
    const data = {
      events: this.events,
      timestamp: new Date().toISOString(),
    };
    
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics', JSON.stringify(data));
    }
  }
}

let tracker: BehaviorTracker | null = null;

export function initBehavioralTracking() {
  if (typeof window === 'undefined') return;
  if (!tracker) {
    tracker = new BehaviorTracker();
  }
}

export function trackEvent(type: string, data?: Record<string, any>) {
  if (tracker) {
    tracker.track(type, data);
  }
}
