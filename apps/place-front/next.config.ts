import { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_CONSOLE_URL: isDev
      ? process.env.NEXT_PUBLIC_LOCAL_CONSOLE_URL
      : process.env.NEXT_PUBLIC_CONSOLE_URL,
  },
};

export default nextConfig;
