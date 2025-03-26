/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // NOTE: eslint 룰을 따른다.
    // Warning: 빌드는 통과하지만, 문제를 놓칠 수 있습니다
    ignoreDuringBuilds: true,
  },
  // compiler: {
  //     emotion: true
  // },
};

export default nextConfig;
