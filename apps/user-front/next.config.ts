import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['img.freepik.com', 'd27gz6v6wvae1d.cloudfront.net'],
  },
};

export default nextConfig;
