'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
} from '@repo/design-system/components/ceo';
import KakaoMap from './KakoMap';
import { useKakaoMap } from '@/hooks/useKakaoMap';

type LocationEditDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function LocationEditDialog({ isOpen, onOpenChange }: LocationEditDialogProps) {
  const [centerCoords, setCenterCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [addressInfo, setAddressInfo] = useState<{ address: string; zonecode: string } | null>(
    null,
  );
  const [showTooltip, setShowTooltip] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Dialog 전용 지도 훅
  const { mapContainerRef, map, isMapInitialized, handleScriptLoad, reinitializeMap } = useKakaoMap(
    {
      center: { lat: 33.450701, lng: 126.570667 },
      level: 3,
      showCenterPin: true,
      onCenterChanged: (center) => {
        setCenterCoords(center);
        // 좌표를 주소로 변환
        getAddressFromCoords(center.lat, center.lng);
        // 초기 로드가 아닐 때만 툴팁 숨기기 (사용자가 실제로 지도를 움직인 경우)
        if (!isInitialLoad) {
          setShowTooltip(false);
        } else {
          setIsInitialLoad(false); // 초기 로드 완료 표시
        }
      },
      // onMapClick: (mouseEvent) => {
      //   const latlng = mouseEvent.latLng;
      //   setClickedLatlng({ lat: latlng.getLat(), lng: latlng.getLng() });
      //   console.log(`[LocationEditDialog] Map clicked at: ${latlng.getLat()}, ${latlng.getLng()}`);
      //   if (map) {
      //     new window.kakao.maps.Marker({
      //       position: latlng,
      //       map: map,
      //     });
      //   }
      // },
    },
  );

  // 좌표를 주소로 변환하는 함수
  const getAddressFromCoords = (lat: number, lng: number) => {
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      console.error('Kakao Maps services not available');
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();
    const coord = new window.kakao.maps.LatLng(lat, lng);

    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const address = result[0]?.address;
        if (address) {
          setAddressInfo({
            address: address.address_name || '',
            zonecode: address.zip_code || '',
          });
        }
      } else {
        console.error('주소 변환 실패:', status);
        setAddressInfo(null);
      }
    });
  };

  // Dialog이 열릴 때와 닫힐 때 상태 관리
  useEffect(() => {
    if (!isOpen) {
      setCenterCoords(null);
      setAddressInfo(null);
      setShowTooltip(false); // Dialog가 닫힐 때 툴팁 숨김
      setIsInitialLoad(true); // 다음 열기를 위해 초기 로드 상태 리셋
    } else {
      // Dialog가 열렸을 때 지도 재초기화 시도
      console.log('[LocationEditDialog] Dialog opened, attempting map reinitialization');
      setTimeout(() => {
        reinitializeMap();
      }, 100);
    }
  }, [isOpen, reinitializeMap]);

  // 지도가 초기화되면 툴팁 표시
  useEffect(() => {
    if (isMapInitialized && isOpen && !isInitialLoad) {
      setShowTooltip(true);

      // 3초 후 툴팁 숨기기
      const tooltipTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 3000);

      return () => clearTimeout(tooltipTimer);
    }
  }, [isMapInitialized, isOpen, isInitialLoad]);

  console.log('[LocationEditDialog] Render:', {
    isOpen,
    isMapInitialized,
    hasMapRef: !!mapContainerRef.current,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>위치 수정</DialogTitle>
        </DialogHeader>
        <div className='py-4'>
          <div className='w-full h-[300px] relative mb-4'>
            {isOpen && (
              <>
                <KakaoMap
                  mapId='location-edit-dialog-map'
                  mapContainerRef={mapContainerRef}
                  isMapInitialized={isMapInitialized}
                  onScriptLoad={handleScriptLoad}
                />
                {/* 줌 컨트롤 버튼 */}
                <div className='absolute top-4 left-4 z-10 flex flex-col'>
                  <button
                    type='button'
                    className='w-10 h-10 bg-white border border-gray-300 rounded-t-md flex items-center justify-center hover:bg-gray-50 shadow-sm'
                    onClick={() => {
                      if (map) {
                        const currentLevel = map.getLevel();
                        map.setLevel(currentLevel - 1);
                      }
                    }}
                  >
                    <span className='text-lg font-bold text-gray-700'>+</span>
                  </button>
                  <button
                    type='button'
                    className='w-10 h-10 bg-white border border-gray-300 border-t-0 rounded-b-md flex items-center justify-center hover:bg-gray-50 shadow-sm'
                    onClick={() => {
                      if (map) {
                        const currentLevel = map.getLevel();
                        map.setLevel(currentLevel + 1);
                      }
                    }}
                  >
                    <span className='text-lg font-bold text-gray-700'>−</span>
                  </button>
                </div>

                {/* 말풍선 툴팁 */}
                {showTooltip && (
                  <div className='absolute top-14 left-1/2 transform -translate-x-1/2 z-10 animate-fade-in'>
                    <div className='bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg relative'>
                      지도를 움직여 아이콘을 움겨보세요
                      {/* 말풍선 화살표 */}
                      <div className='absolute top-full left-1/2 transform -translate-x-1/2'>
                        <div className='w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-800'></div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* 중앙 핀 위치 정보 표시 */}
          {centerCoords && (
            <div className='bg-blue-50 p-3 rounded-lg mb-4'>
              <p className='text-sm text-blue-600 font-medium mb-2'>현재 중앙 위치:</p>
              <p className='text-sm text-gray-700'>
                위도: {centerCoords.lat.toFixed(6)}, 경도: {centerCoords.lng.toFixed(6)}
              </p>
              {addressInfo && (
                <div className='mt-2'>
                  <p className='text-sm text-gray-700'>
                    <span className='font-medium'>주소:</span> {addressInfo.address}
                  </p>
                  {addressInfo.zonecode && (
                    <p className='text-sm text-gray-700'>
                      <span className='font-medium'>우편번호:</span> {addressInfo.zonecode}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button>위치 저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
