/** @type {import('next').NextConfig} */
const nextConfig = {
  // Для Vercel не используем статический экспорт (нужны API routes)
  // Для GitHub Pages используем статический экспорт
  // Vercel автоматически устанавливает переменную VERCEL=1
  ...(process.env.VERCEL || process.env.VERCEL_ENV ? {} : { output: 'export' }),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Для GitHub Pages - имя репозитория. При локальной сборке оставляем пустым, чтобы избежать 404.
  basePath: process.env.GITHUB_ACTIONS === 'true' ? '/FoxampyLab' : '',
  assetPrefix: process.env.GITHUB_ACTIONS === 'true' ? '/FoxampyLab/' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.GITHUB_ACTIONS === 'true' ? '/FoxampyLab' : '',
  },
  // Оптимизация bundle
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Tree shaking для Three.js
      config.resolve.alias = {
        ...config.resolve.alias,
        'three': require.resolve('three'),
      };

      // Исключаем node-telegram-bot-api из клиентской сборки
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'node-telegram-bot-api': false,
        'supports-color': false,
      };

      // Оптимизация для production
      if (process.env.NODE_ENV === 'production') {
        config.optimization = {
          ...config.optimization,
          usedExports: true,
          sideEffects: false,
        };
      }
    }
    return config;
  },
  // Экспериментальные оптимизации
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

module.exports = nextConfig;
