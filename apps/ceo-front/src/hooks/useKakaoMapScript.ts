import { useEffect, useState } from 'react';

// 전역 SDK 로드 상태 관리
let globalSdkLoaded = false;
const sdkLoadedCallbacks: (() => void)[] = [];

// SDK가 로드되면 모든 대기 중인 콜백 실행
const notifySdkLoaded = () => {
  console.log('[useKakaoMapScript] Notifying all callbacks, SDK loaded');
  globalSdkLoaded = true;
  sdkLoadedCallbacks.forEach(callback => callback());
  sdkLoadedCallbacks.length = 0;
};

// SDK 로드 대기 콜백 등록
const onSdkLoaded = (callback: () => void) => {
  if (globalSdkLoaded) {
    console.log('[useKakaoMapScript] SDK already loaded, calling callback immediately');
    callback();
  } else {
    console.log('[useKakaoMapScript] SDK not loaded, adding to callback queue');
    sdkLoadedCallbacks.push(callback);
  }
};

/**
 * 카카오맵 SDK 로드 상태를 관리하는 훅
 * 여러 컴포넌트에서 SDK 로드 상태를 공유하기 위해 전역 상태로 관리
 */
export const useKakaoMapScript = () => {
  const [isSdkLoaded, setIsSdkLoaded] = useState(globalSdkLoaded);

  useEffect(() => {
    // 이미 로드되었으면 바로 상태 업데이트
    if (globalSdkLoaded) {
      setIsSdkLoaded(true);
      return;
    }

    // SDK 로드 대기
    const handleSdkLoaded = () => {
      console.log('[useKakaoMapScript] SDK loaded callback triggered');
      setIsSdkLoaded(true);
    };

    onSdkLoaded(handleSdkLoaded);

    // 전역 이벤트 리스너 등록
    const handleKakaoMapSdkLoaded = () => {
      console.log('[useKakaoMapScript] kakaoMapSdkLoaded event received');
      notifySdkLoaded();
    };

    window.addEventListener('kakaoMapSdkLoaded', handleKakaoMapSdkLoaded);

    // 컴포넌트 마운트 시 SDK 상태 확인
    if (window.kakao && window.kakao.maps && window.kakao.maps.LatLng) {
      console.log('[useKakaoMapScript] SDK already fully loaded');
      notifySdkLoaded();
    }

    return () => {
      window.removeEventListener('kakaoMapSdkLoaded', handleKakaoMapSdkLoaded);
    };
  }, []);

  const handleScriptLoad = () => {
    console.log('[useKakaoMapScript] Script onLoad triggered');
    
    if (window.kakao && window.kakao.maps && window.kakao.maps.LatLng) {
      console.log('[useKakaoMapScript] SDK already fully loaded');
      notifySdkLoaded();
      return;
    }

    if (window.kakao && window.kakao.maps && window.kakao.maps.load) {
      console.log('[useKakaoMapScript] Loading SDK internal modules');
      window.kakao.maps.load(() => {
        console.log('[useKakaoMapScript] SDK internal modules loaded');
        notifySdkLoaded();
      });
    }
  };

  return {
    isSdkLoaded,
    handleScriptLoad,
  };
};