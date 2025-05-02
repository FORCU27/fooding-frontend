import createNextIntlPlugin from 'next-intl/plugin';

const isDev = process.env.NODE_ENV === 'development';

// next-intl 플러그인 생성
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['appleid.apple.com', 'localhost.com', 'localhost:3000'],
    },
  },
};

// withNextIntl로 nextConfig를 감싸서 내보내기
export default withNextIntl(nextConfig);
