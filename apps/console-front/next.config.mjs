/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // NOTE: eslint 룰을 따른다.
    // Warning: 빌드는 통과하지만, 문제를 놓칠 수 있습니다
    ignoreDuringBuilds: true,
  },
  compiler: {
    emotion: true,
  },
  devIndicators: {
    autoPrerender: false,
  },
  serverRuntimeConfig: {
    // 로컬 포트 변경
    port: process.env.PORT || 4000,
  },
};

export default nextConfig;
