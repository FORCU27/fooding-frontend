'use client';

import Script from 'next/script';

export default function KakaoMapScript() {
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
    />
  );
}
