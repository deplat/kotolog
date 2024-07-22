/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "7srwfaunr1krwltq.public.blob.vercel-storage.com",
            }
        ]
    }
};

export default nextConfig;
