import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

export const useKakaoLoader = () => {
  useKakaoLoaderOrigin({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY!,
    libraries: ['clusterer', 'drawing', 'services'],
  });
};
