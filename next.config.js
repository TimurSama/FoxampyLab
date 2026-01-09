/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Для GitHub Pages - имя репозитория
  basePath: process.env.NODE_ENV === 'production' ? '/FoxampyLab' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/FoxampyLab/' : '',
  // Оптимизация bundle
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Tree shaking для Three.js
      config.resolve.alias = {
        ...config.resolve.alias,
        'three': require.resolve('three'),
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
