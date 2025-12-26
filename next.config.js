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
};

module.exports = nextConfig;
