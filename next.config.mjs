/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '7srwfaunr1krwltq.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 's3.timeweb.cloud',
      },
    ],
  },
}

export default nextConfig
