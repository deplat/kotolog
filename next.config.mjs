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
        hostname: 's3.timeweb.cloud',
      },
      {
        protocol: 'https',
        hostname: '31c3d159-kotolog.s3.timeweb.cloud',
      },
    ],
  },
}

export default nextConfig
