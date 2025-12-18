/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true, // For static export compatibility if needed, or removing it if using Vercel/Node server
    },
};

export default nextConfig;
