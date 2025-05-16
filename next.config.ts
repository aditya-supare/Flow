import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  images : {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com'
      },
      {
        protocol: 'https',
        hostname: 'ucarecdn.com'
      },
    ]
  }
};

export default nextConfig;
