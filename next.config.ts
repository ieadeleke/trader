import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // skip heavy image optimization during build
  },
  eslint: {
    ignoreDuringBuilds: true, // prevents ESLint from eating memory at build
  },
  typescript: {
    ignoreBuildErrors: true, // optional: speeds up build, avoids memory spikes
  },
};

export default nextConfig;
