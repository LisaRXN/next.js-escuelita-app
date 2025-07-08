import type { NextConfig } from "next";
// @ts-expect-error: PrismaPlugin is not typed correctly for this usage
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';




const nextConfig: NextConfig = {
  /* config options here */
  webpack(config, { isServer }) {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }
    return config;
  },
  images: {
    remotePatterns : [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  
};

export default nextConfig;
