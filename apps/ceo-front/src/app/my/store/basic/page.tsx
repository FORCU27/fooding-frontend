'use client';

import { useState, useEffect } from 'react';

import { PutStoreBody } from '@repo/api/ceo';
import {
  CardForm,
  Button,
  Card,
  Input,
  SelectBox,
  TextArea,
  CardSubtitle,
  Dialog,
} from '@repo/design-system/components/ceo';
import DaumPostcode from 'react-daum-postcode';

import KakaoMap from '@/components/KakoMap';
import LocationEditDialog from '@/components/LocationEditDialog';
import { useGetStore } from '@/hooks/store/useGetStore';
import { usePutStore } from '@/hooks/store/usePutStore';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { useSelectedStoreId } from '@/hooks/useSelectedStoreId';

const BasicInfoPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [mapMarker, setMapMarker] = useState<kakao.maps.Marker | null>(null);

  // selectedStoreId 가져오기
  const { selectedStoreId, isLoading: isLoadingStoreId } = useSelectedStoreId();

  // selectedStoreId가 있을 때만 가게 데이터 조회
  const { data: store } = useGetStore(selectedStoreId);
  const putStoreMutation = usePutStore();

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    contactNumber: '',
    address: '',
    direction: '',
    information: '',
    latitude: 0,
    longitude: 0,
  });

  // store 데이터로 폼 초기화 (초기 로드 시 한 번만)
  useEffect(() => {
    if (store && !isInitialized) {
      setFormData({
        name: store.name || '',
        category: store.category || '',
        contactNumber: store.contactNumber || '',
        address: store.address || '',
        direction: store.direction || '',
        information: store.addressDetail || '', // addressDetail을 information 필드에 매핑
        latitude: store.latitude || 0,
        longitude: store.longitude || 0,
      });
      setIsInitialized(true);
    }
  }, [store, isInitialized]);

  // 메인 지도용 훅 - store 데이터가 있으면 해당 위치로, 없으면 기본값
  const { mapContainerRef, map, isMapInitialized, handleScriptLoad, reinitializeMap } = useKakaoMap(
    {
      center: store
        ? { lat: store.latitude, lng: store.longitude }
        : { lat: 33.450701, lng: 126.570667 },
      level: 3,
    },
  );

  // 페이지 재방문 시 지도 재초기화
  useEffect(() => {
    // 페이지 진입 시 SDK가 이미 로드되어 있으면 재초기화
    if (window.kakao && window.kakao.maps && !isMapInitialized) {
      reinitializeMap();
    }
  }, [isMapInitialized, reinitializeMap]); // 마운트 시 한 번만 실행

  // store 데이터가 로드되고 지도가 초기화되면 중심점 업데이트
  useEffect(() => {
    if (store && map && isMapInitialized) {
      const newCenter = new window.kakao.maps.LatLng(store.latitude, store.longitude);
      map.setCenter(newCenter);

      // 기존 마커 제거
      if (mapMarker) {
        mapMarker.setMap(null);
      }

      // 새 마커 추가
      const marker = new window.kakao.maps.Marker({
        position: newCenter,
        map: map,
      });
      setMapMarker(marker);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store, map, isMapInitialized]);

  interface PostcodeData {
    address: string;
    addressType: string;
    bname: string;
    buildingName: string;
    zonecode: string;
  }

  const onCompletePost = (data: PostcodeData) => {
    // 도로명 주소 또는 지번 주소를 선택하면 바로 input에 반영
    const fullAddress = data.address;

    // 카카오맵 Geocoder로 주소를 좌표로 변환
    if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(
        fullAddress,
        (result: kakao.maps.services.GeocoderResult[], status: kakao.maps.services.Status) => {
          if (status === window.kakao.maps.services.Status.OK && result[0]) {
            const lat = parseFloat(result[0].y);
            const lng = parseFloat(result[0].x);

            // 주소와 좌표를 함께 업데이트
            setFormData((prev) => ({
              ...prev,
              address: fullAddress,
              latitude: lat,
              longitude: lng,
            }));

            // 메인 지도도 새 위치로 이동
            if (map && isMapInitialized) {
              const newCenter = new window.kakao.maps.LatLng(lat, lng);
              map.setCenter(newCenter);

              // 기존 마커 제거
              if (mapMarker) {
                mapMarker.setMap(null);
              }

              // 새 마커 추가
              const marker = new window.kakao.maps.Marker({
                position: newCenter,
                map: map,
              });
              setMapMarker(marker);
            }
          } else {
            // 좌표 변환 실패 시 주소만 업데이트
            setFormData((prev) => ({ ...prev, address: fullAddress }));
          }
        },
      );
    } else {
      // Kakao Maps API가 없으면 주소만 업데이트
      setFormData((prev) => ({ ...prev, address: fullAddress }));
    }

    setIsAddressDialogOpen(false); // 다이얼로그 자동 닫기
  };

  const handleSave = () => {
    if (!store || !selectedStoreId) return;

    // 빈 문자열이나 undefined 값을 필터링
    const putBody: PutStoreBody = {
      name: formData.name || undefined,
      category: formData.category || undefined,
      contactNumber: formData.contactNumber || undefined,
      address: formData.address || undefined,
      addressDetail: formData.information || undefined, // information을 addressDetail로 매핑
      direction: formData.direction || undefined,
      description: store.description || undefined,
      // 위도 경도는 formData에서 가져옴 (수정된 경우 반영)
      latitude: formData.latitude || store.latitude || undefined,
      longitude: formData.longitude || store.longitude || undefined,
    };

    // undefined 값을 제거
    const cleanedBody = Object.fromEntries(
      Object.entries(putBody).filter(([, value]) => value !== undefined),
    ) as PutStoreBody;

    // selectedStoreId 사용
    const storeIdToUpdate = selectedStoreId;

    putStoreMutation.mutate(
      { id: storeIdToUpdate, body: cleanedBody },
      {
        onSuccess: () => {},
        onError: () => {},
      },
    );
  };

  // 로딩 중이거나 storeId가 없으면 대체 UI 표시
  if (isLoadingStoreId) {
    return (
      <CardForm className='p-grid-margin'>
        <div className='headline-2'>기본 정보</div>
        <Card>
          <div className='flex items-center justify-center py-8'>
            <div className='text-center'>
              <div className='mb-4'>
                <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]' />
              </div>
              <div className='text-gray-600'>가게 정보를 불러오는 중...</div>
            </div>
          </div>
        </Card>
      </CardForm>
    );
  }

  if (!selectedStoreId) {
    return (
      <CardForm className='p-grid-margin'>
        <div className='headline-2'>기본 정보</div>
        <Card>
          <div className='flex items-center justify-center py-8'>
            <div className='text-center'>
              <div className='text-gray-600'>가게를 선택해주세요.</div>
              <a href='/store/select' className='text-blue-500 underline mt-2 inline-block'>
                가게 선택하기
              </a>
            </div>
          </div>
        </Card>
      </CardForm>
    );
  }

  return (
    <CardForm className='' onSubmit={(e) => e.preventDefault()}>
      <div className='headline-2'>기본 정보</div>
      <Card>
        <CardSubtitle label='업체명' required>
          <Input
            id='name'
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          />
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='업종' required>
          <SelectBox
            options={[
              { value: 'KOREAN', label: '한식' },
              { value: 'CHINESE', label: '중식' },
              { value: 'WESTERN', label: '양식' },
              { value: 'JAPANESE', label: '일식' },
              { value: 'ASIAN', label: '아시안' },
              { value: 'SNACK', label: '분식' },
              { value: 'CAFE', label: '카페' },
              { value: 'FAST_FOOD', label: '패스트푸드' },
              { value: 'CHICKEN', label: '치킨' },
            ]}
            label='업종 선택'
            value={formData.category}
            onValueChange={(value) => {
              setFormData((prev) => ({ ...prev, category: value }));
            }}
            placeholder='업종을 선택해주세요'
          />
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='매장번호' required>
          <Input
            id='contactNumber'
            value={formData.contactNumber}
            onChange={(e) => setFormData((prev) => ({ ...prev, contactNumber: e.target.value }))}
          />
        </CardSubtitle>
      </Card>

      <Card>
        <CardSubtitle label='주소' required>
          <div className='w-full h-[180px] relative'>
            <KakaoMap
              mapId='main-kakao-map'
              mapContainerRef={mapContainerRef}
              isMapInitialized={isMapInitialized}
              onScriptLoad={handleScriptLoad}
            />
            <button
              className='absolute bottom-2 right-2 z-1 bg-white rounded-md p-2 shadow-md hover:bg-gray-50 transition-colors cursor-pointer'
              type='button'
              onClick={() => setIsDialogOpen(true)}
            >
              위치 수정
            </button>
          </div>
          <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
            <Dialog.Trigger asChild>
              <Input
                id='address'
                inputType='search'
                value={formData.address}
                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                onClick={() => setIsAddressDialogOpen(true)}
              />
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>변경하실 주소를 알려주세요</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <DaumPostcode style={{ height: '500px' }} onComplete={onCompletePost} />
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant='outlined' onClick={() => setIsAddressDialogOpen(false)}>
                  닫기
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog>

          <Input
            id='direction'
            value={formData.direction}
            onChange={(e) => setFormData((prev) => ({ ...prev, direction: e.target.value }))}
          />
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='상세주소'>
          <TextArea
            id='information'
            maxLength={1000}
            value={formData.information}
            onChange={(e) => setFormData((prev) => ({ ...prev, information: e.target.value }))}
            placeholder='상세 주소를 입력하세요 (예: 3층 301호)'
          />
        </CardSubtitle>
      </Card>
      <div className='flex justify-center mb-17'>
        <Button type='button' onClick={handleSave} disabled={putStoreMutation.isPending}>
          {putStoreMutation.isPending ? '저장 중...' : '저장'}
        </Button>
      </div>

      {/* 위치 수정 Dialog */}
      <LocationEditDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialCenter={store ? { lat: store.latitude, lng: store.longitude } : undefined}
        onSaveLocation={(address, lat, lng) => {
          setFormData((prev) => ({
            ...prev,
            address: address,
            latitude: lat,
            longitude: lng,
          }));

          // 메인 지도도 새 위치로 이동
          if (map && isMapInitialized) {
            const newCenter = new window.kakao.maps.LatLng(lat, lng);
            map.setCenter(newCenter);

            // 기존 마커 제거
            if (mapMarker) {
              mapMarker.setMap(null);
            }

            // 새 마커 추가
            const marker = new window.kakao.maps.Marker({
              position: newCenter,
              map: map,
            });
            setMapMarker(marker);
          }
        }}
      />
    </CardForm>
  );
};

export default BasicInfoPage;
