import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_CONSOLE_URL: isDev
      ? process.env.NEXT_PUBLIC_LOCAL_CONSOLE_URL
      : process.env.NEXT_PUBLIC_CONSOLE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd27gz6v6wvae1d.cloudfront.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
