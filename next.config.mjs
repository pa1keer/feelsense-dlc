/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Обязательно для статического экспорта с Radix UI
  },
  // Особые настройки для ваших зависимостей
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;