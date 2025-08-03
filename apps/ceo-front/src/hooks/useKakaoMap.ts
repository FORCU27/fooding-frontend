import { useEffect, useRef, useState, useCallback } from 'react';
import { useKakaoMapScript } from './useKakaoMapScript';

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
  getCenter: () => KakaoLatLng;
  getLevel: () => number;
  setLevel: (level: number) => void;
  relayout?: () => void;
}

interface KakaoMarker {
  // 필요한 메서드들 추가 가능
  setPosition: (position: KakaoLatLng) => void;
}

interface KakaoMarkerImage {
  // 마커 이미지 관련 메서드들
}

// 카카오맵 SDK의 타입 정의
declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => KakaoLatLng;
        Map: new (container: HTMLElement, options: KakaoMapOptions) => KakaoMap;
        Marker: new (options: {
          position: KakaoLatLng;
          map: KakaoMap;
          image?: KakaoMarkerImage;
        }) => KakaoMarker;
        MarkerImage: new (
          src: string,
          size: { width: number; height: number },
          options?: { offset?: { x: number; y: number } },
        ) => KakaoMarkerImage;
        Size: new (width: number, height: number) => { width: number; height: number };
        Point: new (x: number, y: number) => { x: number; y: number };
        services: {
          Geocoder: new () => {
            coord2Address: (
              lng: number,
              lat: number,
              callback: (result: any, status: any) => void,
            ) => void;
          };
          Status: {
            OK: string;
          };
        };
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
  onCenterChanged?: (center: { lat: number; lng: number }) => void;
  showCenterPin?: boolean;
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
  const [isMapInitialized, setIsMapInitialized] = useState(false); // isInitialized에서 isMapInitialized로 이름 변경
  const centerMarkerRef = useRef<KakaoMarker | null>(null); // 중앙 핀 참조

  // 전역 SDK 로드 상태 사용
  const { isSdkLoaded, handleScriptLoad } = useKakaoMapScript();

  // 지도 재초기화를 위한 함수
  const reinitializeMap = useCallback(() => {
    console.log('[useKakaoMap] Reinitializing map');
    setIsMapInitialized(false);
    setMap(null);
    centerMarkerRef.current = null;
  }, []);

  // 컨테이너 가용성을 체크하는 함수
  const checkContainerAndInitialize = useCallback(() => {
    if (!isSdkLoaded || isMapInitialized) {
      return;
    }

    // 컨테이너가 DOM에 실제로 렌더링되었는지 확인
    const container = mapContainerRef.current;
    if (!container) {
      console.log('[useKakaoMap] Container ref not available yet');
      return;
    }

    // 컨테이너가 실제로 화면에 보이는지 확인 (Dialog의 경우 중요)
    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      console.log('[useKakaoMap] Container not visible yet, dimensions:', rect);
      return;
    }

    console.log('[useKakaoMap] Container is ready, initializing map:', {
      width: rect.width,
      height: rect.height,
      container: container,
    });

    try {
      // SDK가 완전히 로드되었는지 다시 확인
      if (!window.kakao || !window.kakao.maps || !window.kakao.maps.LatLng) {
        console.error('[useKakaoMap] Kakao Maps SDK not fully loaded');
        return;
      }

      const defaultOptions = {
        center: new window.kakao.maps.LatLng(
          options.center?.lat ?? 37.5665,
          options.center?.lng ?? 126.978,
        ),
        level: options.level ?? 3,
      };

      console.log('[useKakaoMap] Creating map with options:', defaultOptions);
      const newMap = new window.kakao.maps.Map(container, defaultOptions);

      // 중앙 핀 생성 (showCenterPin이 true인 경우)
      if (options.showCenterPin) {
        // 커스텀 마커 이미지 생성
        const imageSrc =
          'data:image/svg+xml;base64,' +
          btoa(`
          <svg width="30" height="35" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_dd_2942_20602)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M24.6986 14.3454C24.6986 21.8875 15.0017 28.3521 15.0017 28.3521C15.0017 28.3521 5.30469 21.8875 5.30469 14.3454C5.30469 8.98992 9.64617 4.64844 15.0017 4.64844C20.3571 4.64844 24.6986 8.98992 24.6986 14.3454Z" fill="#2A2A2A" stroke="#2A2A2A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0019 17.574C16.787 17.574 18.2342 16.1269 18.2342 14.3417C18.2342 12.5565 16.787 11.1094 15.0019 11.1094C13.2167 11.1094 11.7695 12.5565 11.7695 14.3417C11.7695 16.1269 13.2167 17.574 15.0019 17.574Z" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
          <filter id="filter0_dd_2942_20602" x="1.30469" y="0.648438" width="27.3945" height="33.7031" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="1.5"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2942_20602"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="2"/>
          <feGaussianBlur stdDeviation="1.5"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
          <feBlend mode="normal" in2="effect1_dropShadow_2942_20602" result="effect2_dropShadow_2942_20602"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_2942_20602" result="shape"/>
          </filter>
          </defs>
          </svg>
        `);

        const imageSize = new window.kakao.maps.Size(40, 50);
        const imageOption = { offset: new window.kakao.maps.Point(20, 50) };

        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        const centerMarker = new window.kakao.maps.Marker({
          position: defaultOptions.center,
          map: newMap,
          image: markerImage,
        });
        centerMarkerRef.current = centerMarker;
        console.log('[useKakaoMap] Center pin created with custom image');
      }

      // 지도 중심좌표 변경 이벤트 리스너 추가
      if (options.onCenterChanged) {
        // 초기 중앙 좌표 설정
        const initialCenter = {
          lat: defaultOptions.center.getLat(),
          lng: defaultOptions.center.getLng(),
        };
        options.onCenterChanged(initialCenter);

        window.kakao.maps.event.addListener(newMap, 'center_changed', () => {
          const center = newMap.getCenter();
          const centerCoords = {
            lat: center.getLat(),
            lng: center.getLng(),
          };

          // 중앙 핀이 있다면 위치 업데이트
          if (centerMarkerRef.current) {
            centerMarkerRef.current.setPosition(center);
          }

          options.onCenterChanged!(centerCoords);
        });
      }

      // 지도 초기화 후 relayout 호출
      setTimeout(() => {
        if (newMap.relayout) {
          console.log('[useKakaoMap] Calling relayout for proper sizing');
          newMap.relayout();
        }
      }, 100);

      setMap(newMap);
      setIsMapInitialized(true);
      console.log('[useKakaoMap] Kakao Map initialized successfully');
    } catch (error) {
      console.error('[useKakaoMap] Error creating Kakao Map instance:', error);
    }
  }, [isSdkLoaded, isMapInitialized, options]);

  // SDK 로딩 완료 후 지도를 초기화하는 useEffect
  useEffect(() => {
    console.log('[useKakaoMap] Map initialization effect triggered:', {
      isSdkLoaded,
      hasContainerRef: !!mapContainerRef.current,
      isMapInitialized,
    });

    if (isSdkLoaded && !isMapInitialized) {
      // 즉시 시도
      checkContainerAndInitialize();

      // 컨테이너가 아직 준비되지 않았다면 약간의 지연 후 다시 시도
      const timeoutId = setTimeout(() => {
        checkContainerAndInitialize();
      }, 50);

      // 더 긴 지연으로 한 번 더 시도 (Dialog 렌더링 완료 대기)
      const timeoutId2 = setTimeout(() => {
        checkContainerAndInitialize();
      }, 200);

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(timeoutId2);
      };
    }
  }, [isSdkLoaded, isMapInitialized, checkContainerAndInitialize]);

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
    reinitializeMap, // 지도 재초기화 함수
  };
};
