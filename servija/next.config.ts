import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://44.214.178.65:8080/:path*',
      },
    ];
  },
};

export default nextConfig;