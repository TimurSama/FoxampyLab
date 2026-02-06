"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Google Analytics 4
export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const gaId = process.env.NEXT_PUBLIC_GA4_ID;
    if (!gaId || typeof window === 'undefined') return;

    // Загружаем GA4 скрипт
    if (!window.gtag) {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script1);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', gaId, {
        page_path: pathname,
      });
    } else {
      window.gtag('config', gaId, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  const gaId = process.env.NEXT_PUBLIC_GA4_ID;
  if (!gaId) return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

// Meta Pixel (Facebook)
export function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    if (!pixelId || typeof window === 'undefined') return;

    if (!window.fbq) {
      window.fbq = function (...args: any[]) {
        (window.fbq.q = window.fbq.q || []).push(args);
      };
      window.fbq.l = +new Date();
      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');
    } else {
      window.fbq('track', 'PageView');
    }
  }, [pathname]);

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!pixelId) return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

// Yandex Metrica
export function YandexMetrica() {
  const pathname = usePathname();

  useEffect(() => {
    const metricaId = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;
    if (!metricaId || typeof window === 'undefined') return;

    if (!window.ym) {
      window.ym = function (...args: any[]) {
        (window.ym.a = window.ym.a || []).push(args);
      };
      window.ym.l = +new Date();
      window.ym(metricaId, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      });
      window.ym(metricaId, 'hit', pathname);
    } else {
      window.ym(metricaId, 'hit', pathname);
    }
  }, [pathname]);

  const metricaId = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;
  if (!metricaId) return null;

  return (
    <>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(${metricaId}, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `,
        }}
      />
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${metricaId}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}

// Обертка для всех аналитик
export default function Analytics() {
  return (
    <>
      <GoogleAnalytics />
      <MetaPixel />
      <YandexMetrica />
    </>
  );
}

// Утилита для отслеживания событий
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  // Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }

  // Meta Pixel
  if (window.fbq) {
    window.fbq('track', eventName, eventParams);
  }

  // Yandex Metrica
  const metricaId = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;
  if (window.ym && metricaId) {
    window.ym(metricaId, 'reachGoal', eventName, eventParams);
  }
};

// Расширение типов для window
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    ym?: (...args: any[]) => void;
  }
}
