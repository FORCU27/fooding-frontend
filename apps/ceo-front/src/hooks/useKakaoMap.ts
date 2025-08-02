import { useEffect, useRef, useState, useCallback } from 'react';

// 카카오맵 관련 타입 정의
interface KakaoLatLng {
  getLat(): number;
  getLng(): number;
}

interface KakaoMouseEvent {
  latLng: KakaoLatLng;
}

interface KakaoMapOptions {
  center: KakaoLatLng;
  level: number;
}

interface KakaoMap {
  // 필요한 메서드들 추가 가능
  setCenter: (center: KakaoLatLng) => void;
}

interface KakaoMarker {
  // 필요한 메서드들 추가 가능
  setPosition: (position: KakaoLatLng) => void;
}

// 카카오맵 SDK의 타입 정의
declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => KakaoLatLng;
        Map: new (container: HTMLElement, options: KakaoMapOptions) => KakaoMap;
        Marker: new (options: { position: KakaoLatLng; map: KakaoMap }) => KakaoMarker;
        event: {
          addListener: (
            target: KakaoMap,
            type: string,
            handler: (e: KakaoMouseEvent) => void,
          ) => void;
          removeListener: (
            target: KakaoMap,
            type: string,
            handler: (e: KakaoMouseEvent) => void,
          ) => void;
        };
      };
    };
  }
}

// 카카오맵 훅 옵션 타입 정의
type UseKakaoMapOptions = {
  center?: { lat: number; lng: number };
  level?: number;
  onMapClick?: (e: KakaoMouseEvent) => void;
};

/**
 * 카카오맵을 사용하기 위한 커스텀 훅
 * 이 훅은 카카오맵 SDK 로딩, 지도 인스턴스 생성 및 관리, 이벤트 리스너 설정을 담당합니다.
 * @param options - 지도 설정 옵션 (중심점, 확대레벨, 클릭 이벤트 등)
 * @returns 지도 컨테이너 ref, 지도 인스턴스, 초기화 상태, 스크립트 로드 핸들러
 */
export const useKakaoMap = (options: UseKakaoMapOptions = {}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null); // Ref 이름 변경
  const [map, setMap] = useState<KakaoMap | null>(null);
  const [isSdkLoaded, setIsSdkLoaded] = useState(false); // kakaoLoaded에서 isSdkLoaded로 이름 변경
  const [isMapInitialized, setIsMapInitialized] = useState(false); // isInitialized에서 isMapInitialized로 이름 변경

  // 카카오맵 스크립트가 로드되었을 때 호출될 콜백
  // KakaoMap 컴포넌트의 <Script onLoad={handleScriptLoad} />와 연결
  const handleScriptLoad = useCallback(() => {
    console.log('Kakao Maps script file successfully loaded by Next.js Script component.');
    // 스크립트 파일이 로드되었으니, window.kakao.maps.load()를 사용하여 SDK 내부 모듈 로드 대기
    window.kakao.maps.load(() => {
      console.log('Kakao Maps SDK internal modules fully loaded and ready.');
      setIsSdkLoaded(true); // SDK 내부 모듈까지 완전히 준비되었음을 알림
    });
  }, []);

  // SDK 로딩 완료 후 지도를 초기화하는 useEffect
  useEffect(() => {
    console.log('Map initialization effect triggered:', {
      isSdkLoaded,
      hasContainerRef: !!mapContainerRef.current,
      isMapInitialized,
    });

    // SDK가 로드되었고, 컨테이너가 존재하며, 아직 지도가 초기화되지 않은 경우에만 실행
    if (isSdkLoaded && mapContainerRef.current && !isMapInitialized) {
      console.log('Attempting to initialize Kakao Map...');

      const defaultOptions = {
        center: new window.kakao.maps.LatLng(
          options.center?.lat ?? 37.5665, // 기본값: 서울시청 위도
          options.center?.lng ?? 126.978, // 기본값: 서울시청 경도
        ),
        level: options.level ?? 3, // 기본 확대레벨: 3
      };

      try {
        const newMap = new window.kakao.maps.Map(mapContainerRef.current!, defaultOptions);
        setMap(newMap);
        setIsMapInitialized(true); // 지도 초기화 완료 상태 설정
        console.log('Kakao Map initialized successfully.');
      } catch (error) {
        console.error('Error creating Kakao Map instance:', error);
      }
    }
  }, [isSdkLoaded, isMapInitialized, options]); // 의존성 배열에 mapContainerRef는 넣지 않아도 됨 (렌더링 시점에 이미 존재)

  // 지도 클릭 이벤트 리스너 추가/제거 (map과 onMapClick이 변경될 때마다)
  useEffect(() => {
    if (map && options.onMapClick) {
      console.log('Adding click event listener to Kakao Map.');
      const clickHandler = (e: KakaoMouseEvent) => {
        // console.log('Map clicked:', e); // 디버깅용
        options.onMapClick!(e); // 전달받은 onMapClick 콜백 호출
      };
      // 이벤트 리스너 추가
      window.kakao.maps.event.addListener(map, 'click', clickHandler);

      // 클린업 함수: 컴포넌트 언마운트 시 또는 의존성 변경 시 이벤트 리스너 제거
      return () => {
        // console.log('Removing click event listener from Kakao Map.'); // 디버깅용
        window.kakao.maps.event.removeListener(map, 'click', clickHandler); // removeListener는 제공되지 않으므로, 이 방법은 주의 필요.
        // 카카오맵 API는 addListener의 반환값을 사용하거나, 특정 인스턴스에 대한 모든 리스너를 제거하는 방식 (setMap(null) 시 자연스럽게 됨)
        // 여기서는 별도로 제거 로직이 필요 없을 수도 있습니다. map 인스턴스가 변경될 때 새로운 리스너가 추가되므로.
        // 하지만 명시적으로 제거하는 것이 안전합니다.
        // TODO: Kakao Maps API의 정확한 이벤트 리스너 제거 방식 확인 후 반영
      };
    }
  }, [map, options.onMapClick]); // map 또는 onMapClick 콜백이 변경될 때마다 재실행

  return {
    mapContainerRef, // 지도를 렌더링할 DOM 요소 참조
    map, // 생성된 지도 인스턴스
    isMapInitialized, // 지도 초기화 완료 상태
    handleScriptLoad, // KakaoMap 컴포넌트에 전달할 스크립트 로딩 핸들러
  };
};
