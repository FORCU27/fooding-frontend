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
  const [clickedLatlng, setClickedLatlng] = useState<{ lat: number; lng: number } | null>(null);
  const [centerCoords, setCenterCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [addressInfo, setAddressInfo] = useState<{ address: string; zonecode: string } | null>(null);

  // Dialog 전용 지도 훅
  const { mapContainerRef, map, isMapInitialized, handleScriptLoad, reinitializeMap } = useKakaoMap({
    center: { lat: 33.450701, lng: 126.570667 },
    level: 3,
    showCenterPin: true,
    onCenterChanged: (center) => {
      setCenterCoords(center);
      // 좌표를 주소로 변환
      getAddressFromCoords(center.lat, center.lng);
    },
    onMapClick: (mouseEvent) => {
      const latlng = mouseEvent.latLng;
      setClickedLatlng({ lat: latlng.getLat(), lng: latlng.getLng() });
      console.log(`[LocationEditDialog] Map clicked at: ${latlng.getLat()}, ${latlng.getLng()}`);
      if (map) {
        new window.kakao.maps.Marker({
          position: latlng,
          map: map,
        });
      }
    },
  });

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
      setClickedLatlng(null);
      setCenterCoords(null);
      setAddressInfo(null);
    } else {
      // Dialog가 열렸을 때 지도 재초기화 시도
      console.log('[LocationEditDialog] Dialog opened, attempting map reinitialization');
      setTimeout(() => {
        reinitializeMap();
      }, 100);
    }
  }, [isOpen, reinitializeMap]);

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
              <KakaoMap
                mapId='location-edit-dialog-map'
                mapContainerRef={mapContainerRef}
                isMapInitialized={isMapInitialized}
                onScriptLoad={handleScriptLoad}
              />
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

          {clickedLatlng && (
            <div className='bg-gray-50 p-3 rounded-lg'>
              <p className='text-sm text-gray-600'>클릭된 위치:</p>
              <p className='font-medium'>
                위도: {clickedLatlng.lat.toFixed(6)}, 경도: {clickedLatlng.lng.toFixed(6)}
              </p>
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