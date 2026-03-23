/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_CONSOLE_URL: isDev
      ? process.env.NEXT_PUBLIC_LOCAL_CONSOLE_URL
      : process.env.NEXT_PUBLIC_CONSOLE_URL,
  },
  // compiler: {
  //     emotion: true
  // },
};

export default nextConfig;
