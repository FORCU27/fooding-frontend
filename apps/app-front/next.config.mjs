/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const isDev = process.env.NODE_ENV === 'development';

// next-intl 플러그인 생성
const withNextIntl = createNextIntlPlugin();

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

// withNextIntl로 nextConfig를 감싸서 내보내기
export default withNextIntl(nextConfig);
