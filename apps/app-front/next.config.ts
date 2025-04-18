import createNextIntlPlugin from 'next-intl/plugin';

const isDev = process.env.NODE_ENV === 'development';

// next-intl 플러그인 생성
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_CONSOLE_URL: isDev
      ? process.env.NEXT_PUBLIC_LOCAL_CONSOLE_URL
      : process.env.NEXT_PUBLIC_CONSOLE_URL,
  },
};

// withNextIntl로 nextConfig를 감싸서 내보내기
export default withNextIntl(nextConfig);
