<<<<<<< HEAD
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
    unoptimized: true, 
  }, 
}; 
 
export default nextConfig; 
=======
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
>>>>>>> 9bac6daa24c242160843f27333a920e8fc4861ab
