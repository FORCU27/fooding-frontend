import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

import { env } from '@/configs/env';

export const useKakaoLoader = () => {
  useKakaoLoaderOrigin({
    appkey: env.KAKAO_JS_KEY,
    libraries: ['clusterer', 'drawing', 'services'],
  });
};
