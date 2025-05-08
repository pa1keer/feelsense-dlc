/** @type {import('next').NextConfig} */ 
const nextConfig = { 
  output: 'export', // Удалите эту строку, если не нужен статический экспорт
  eslint: { 
    ignoreDuringBuilds: true, 
  }, 
  typescript: { 
    ignoreBuildErrors: true, 
  }, 
  images: { 
    unoptimized: true, 
  }, 
}; 
 
export default nextConfig; 
