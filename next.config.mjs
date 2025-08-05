/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // ✅ Add this line to skip ESLint on build
  },
};

export default nextConfig;
