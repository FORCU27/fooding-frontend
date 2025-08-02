'use client';

import Script from 'next/script';
import React from 'react';

// 카카오맵 컴포넌트의 props 타입 정의
type KakaoMapProps = {
  mapContainerRef: React.RefObject<HTMLDivElement | null>; // mapContainer에서 mapContainerRef로 이름 변경 (ref임을 명확히)
  isMapInitialized: boolean; // isInitialized에서 isMapInitialized로 이름 변경 (명확성)
  onMapClick?: (e: React.MouseEvent<HTMLDivElement>) => void; // 지도 클릭 이벤트 핸들러
  onScriptLoad: () => void; // 스크립트 로딩 완료 콜백 추가
};

/**
 * 카카오맵 컴포넌트
 * 이 컴포넌트는 카카오맵 SDK 스크립트를 로드하고, 지도를 렌더링할 컨테이너를 제공합니다.
 * 지도 인스턴스 생성 및 관리는 useKakaoMap 훅에서 담당합니다.
 */
const KakaoMap = ({
  mapContainerRef,
  isMapInitialized,
  onMapClick,
  onScriptLoad,
}: KakaoMapProps) => {
  return (
    <>
      {/*
        카카오맵 SDK 스크립트 로딩
        - appkey: 환경 변수에서 가져온 카카오 앱 키
        - autoload=false: SDK 로드 후 수동 초기화를 위해 자동 초기화 비활성화
        - onLoad: 스크립트 파일 자체 로딩 완료 시 onScriptLoad 콜백 호출
        - strategy='afterInteractive': 페이지 상호작용 가능 상태 후 로드
      */}
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false`}
        onLoad={onScriptLoad}
        onError={(e) => console.error('Failed to load Kakao Maps script:', e)} // 오류 처리 추가
        strategy='afterInteractive'
      />

      {/* 지도를 렌더링할 컨테이너 div */}
      <div
        ref={mapContainerRef} // 외부 훅에서 전달받은 ref를 연결
        style={{
          width: '100%',
          height: '100%',
          // 지도 초기화 전에는 회색 배경, 초기화 후에는 투명 (UX 개선)
          backgroundColor: isMapInitialized ? 'transparent' : '#f5f5f5',
          border: '1px solid #ddd', // 디버깅용 테두리
        }}
        onClick={onMapClick} // 지도 클릭 이벤트 핸들러 (props로 전달된 경우)
      />
    </>
  );
};

export default KakaoMap;
