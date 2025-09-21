import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['img.freepik.com', 'ducf0htkez9mz.cloudfront.net', 'd27gz6v6wvae1d.cloudfront.net'],
  },
};

export default nextConfig;
