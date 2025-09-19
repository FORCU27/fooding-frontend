export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL as string,

  GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string,
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
  KAKAO_CLIENT_ID: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string,
  NAVER_CLIENT_ID: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID as string,
  APPLE_CLIENT_ID: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID as string,
  OAUTH_REDIRECT_URI: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI as string,

  KAKAO_JS_KEY: process.env.NEXT_PUBLIC_KAKAO_JS_KEY as string,
} as const;
