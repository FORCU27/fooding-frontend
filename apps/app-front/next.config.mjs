/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  eslint: {
    // NOTE: eslint 룰을 따른다.
    // Warning: 빌드는 통과하지만, 문제를 놓칠 수 있습니다
    ignoreDuringBuilds: true,
  },
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
