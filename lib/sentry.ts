// Sentry error tracking setup
// This will be initialized in production only
// Note: @sentry/nextjs package is optional - install it if you want error tracking

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
  // Using Function to bypass TypeScript module resolution for optional dependency
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const dynamicImport = new Function('modulePath', 'return import(modulePath)');
  dynamicImport('@sentry/nextjs')
    .then((Sentry: any) => {
      if (Sentry?.init) {
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
      }
    })
    .catch((err: any) => {
      // Silently fail if Sentry is not installed
      // This is expected if @sentry/nextjs package is not installed
      if (err?.code !== 'MODULE_NOT_FOUND' && !err?.message?.includes('Cannot find module')) {
        console.warn('Failed to initialize Sentry:', err);
      }
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





