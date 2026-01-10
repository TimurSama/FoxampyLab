// Sentry error tracking setup
// This will be initialized in production only

export const initSentry = () => {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
    return;
  }

  const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
  
  if (!SENTRY_DSN) {
    console.warn('Sentry DSN not configured');
    return;
  }

  // Dynamic import to reduce bundle size
  // @ts-expect-error - Sentry is optional dependency
  import('@sentry/nextjs').then((Sentry: any) => {
    Sentry.init({
      dsn: SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 0.1, // 10% of transactions
      beforeSend(event: any) {
        // Filter out development errors
        if (event.environment === 'development') {
          return null;
        }
        return event;
      },
    });
  }).catch((err) => {
    console.warn('Failed to initialize Sentry:', err);
  });
};

// Manual error reporting
export const captureException = (error: Error, context?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  if ((window as any).Sentry) {
    (window as any).Sentry.captureException(error, {
      contexts: {
        custom: context,
      },
    });
  } else {
    console.error('Error:', error, context);
  }
};

// Capture message
export const captureMessage = (message: string, level: 'info' | 'warning' | 'error' = 'info') => {
  if (typeof window === 'undefined') return;

  if ((window as any).Sentry) {
    (window as any).Sentry.captureMessage(message, level);
  } else {
    console[level === 'error' ? 'error' : level === 'warning' ? 'warn' : 'log'](message);
  }
};





