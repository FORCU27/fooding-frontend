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
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  ToggleGroupItem,
  BusinessHours,
  ToggleGroup,
  UrlLinkList,
} from '@repo/design-system/components/ceo';
import DaumPostcode from 'react-daum-postcode';

import KakaoMap from '@/components/KakoMap';
import LocationEditDialog from '@/components/LocationEditDialog';
import { useGetStore } from '@/hooks/store/useGetStore';
import { usePutStore } from '@/hooks/store/usePutStore';
import { useKakaoMap } from '@/hooks/useKakaoMap';

const BasicInfoPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [mapMarker, setMapMarker] = useState<kakao.maps.Marker | null>(null);

  const parkingInfo = [];

  const { data: store } = useGetStore(15);
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
        information: store.information || '',
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
    if (!store) return;

    // 빈 문자열이나 undefined 값을 필터링
    const putBody: PutStoreBody = {
      name: formData.name || undefined,
      category: formData.category || undefined,
      contactNumber: formData.contactNumber || undefined,
      address: formData.address || undefined,
      direction: formData.direction || undefined,
      // 추가 필드들 (필요한 경우)
      regionId: store.regionId || undefined,
      description: store.description || undefined,
      // 위도 경도는 formData에서 가져옴 (수정된 경우 반영)
      latitude: formData.latitude || store.latitude,
      longitude: formData.longitude || store.longitude,
    };

    // undefined 값을 제거
    const cleanedBody = Object.fromEntries(
      Object.entries(putBody).filter(([, value]) => value !== undefined),
    ) as PutStoreBody;

    putStoreMutation.mutate(
      { id: 15, body: cleanedBody },
      {
        onSuccess: () => {
          // alert('저장되었습니다.');
        },
        onError: () => {
          // alert('저장에 실패했습니다.');
        },
      },
    );
  };

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
              { value: '한식', label: '한식' },
              { value: '중식', label: '중식' },
              { value: '양식', label: '양식' },
              { value: '일식', label: '일식' },
              { value: '아시안', label: '아시안' },
              { value: '분식', label: '분식' },
              { value: '카페', label: '카페' },
              { value: '패스트푸드', label: '패스트푸드' },
              { value: '치킨', label: '치킨' },
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
        <CardSubtitle label='매장소개' required>
          <TextArea id='name' maxLength={1000} />
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='주차 정보' required>
          <></>
          {/* <ToggleGroup
            type='single'
            defaultValue={parkingInfo}
            onValueChange={(value) => {
              if (value) setParkingInfo(value);
            }}
            className='w-full'
          >
            <ToggleGroupItem value='possible' className='flex-1'>
              주차 가능
            </ToggleGroupItem>
            <ToggleGroupItem value='impossible' className='flex-1'>
              주차 불가능
            </ToggleGroupItem>
          </ToggleGroup>
          {parkingInfo === 'possible' && (
            <div className='mt-4'>
              <Input placeholder='주차 관련 안내사항을 입력하세요.' />
            </div>
          )} */}
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='홈페이지 주소'>
          <UrlLinkList />
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='편의시설'>
          {/* <ToggleGroup type='multiple' value={amenities} onValueChange={setAmenities}>
            <ToggleGroupItem value='group'>단체이용 가능</ToggleGroupItem>
            <ToggleGroupItem value='takeout'>포장</ToggleGroupItem>
            <ToggleGroupItem value='delivery'>배달</ToggleGroupItem>
            <ToggleGroupItem value='reception'>방문접수/출장</ToggleGroupItem>
            <ToggleGroupItem value='reservation'>예약</ToggleGroupItem>
            <ToggleGroupItem value='wifi'>무선인터넷</ToggleGroupItem>
            <ToggleGroupItem value='kids'>유아시설/놀이방</ToggleGroupItem>
            <ToggleGroupItem value='toilet'>남/녀 화장실 구분</ToggleGroupItem>
            <ToggleGroupItem value='chair'>유아의자</ToggleGroupItem>
            <ToggleGroupItem value='waiting'>대기공간</ToggleGroupItem>
            <ToggleGroupItem value='no-kids'>노키즈존</ToggleGroupItem>
          </ToggleGroup> */}
          <></>
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='영업시간을 알려주세요'>
          <BusinessHours />
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
            <DialogTrigger asChild>
              <Input
                id='address'
                inputType='search'
                value={formData.address}
                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                onClick={() => setIsAddressDialogOpen(true)}
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>변경하실 주소를 알려주세요</DialogTitle>
              </DialogHeader>
              <div className='py-4 '>
                <DaumPostcode
                  style={{ height: '500px' }}
                  onComplete={onCompletePost}
                ></DaumPostcode>
              </div>
              <DialogFooter>
                <Button variant='outline' onClick={() => setIsAddressDialogOpen(false)}>
                  닫기
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Input
            id='direction'
            value={formData.direction}
            onChange={(e) => setFormData((prev) => ({ ...prev, direction: e.target.value }))}
          />
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='찾아오시는길' required>
          <TextArea
            id='information'
            maxLength={1000}
            value={formData.information}
            onChange={(e) => setFormData((prev) => ({ ...prev, information: e.target.value }))}
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
