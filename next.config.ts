import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Ensure proper handling of Sanity Studio
  async rewrites() {
    return [
      {
        source: '/studio/:path*',
        destination: '/studio/[[...tool]]/:path*',
      },
    ];
  },
};

export default nextConfig;
