'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function KakaoMapScript() {
  useEffect(() => {
    // 컴포넌트 마운트 시 SDK가 이미 로드되었는지 확인
    if (window.kakao && window.kakao.maps && window.kakao.maps.LatLng) {
      console.log('[KakaoMapScript] SDK already loaded on mount');
    }
  }, []);

  return (
    <Script
      src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false&libraries=services`}
      strategy='afterInteractive'
      onLoad={() => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            // 전역 이벤트 발생시켜 다른 컴포넌트에 알림
            window.dispatchEvent(new Event('kakaoMapSdkLoaded'));
          });
        }
      }}
      onError={(e) => console.error('[KakaoMapScript] Failed to load:', e)}
    />
  );
}
