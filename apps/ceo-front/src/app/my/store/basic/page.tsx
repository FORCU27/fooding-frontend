'use client';

import { useState, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { PutStoreBody } from '@repo/api/ceo';
import { toast, Toaster } from '@repo/design-system/components/b2c';
import {
  CardForm,
  Button,
  Card,
  Input,
  SelectBox,
  TextArea,
  CardSubtitle,
  Dialog,
  Spinner,
} from '@repo/design-system/components/ceo';
import DaumPostcode from 'react-daum-postcode';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import KakaoMap from '@/components/KakoMap';
import LocationEditDialog from '@/components/LocationEditDialog';
import { useGetStore } from '@/hooks/store/useGetStore';
import { usePutStore } from '@/hooks/store/usePutStore';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { useSelectedStoreId } from '@/hooks/useSelectedStoreId';

// 폼 유효성 검사 스키마
const storeFormSchema = z.object({
  name: z.string().min(1, '업체명을 입력해주세요'),
  category: z.string().optional(),
  contactNumber: z.string().min(1, '매장번호를 입력해주세요'),
  address: z.string().min(1, '주소를 입력해주세요'),
  direction: z.string().optional(),
  description: z.string().optional(),
  information: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

type StoreFormData = z.infer<typeof storeFormSchema>;

const BasicInfoPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [mapMarker, setMapMarker] = useState<kakao.maps.Marker | null>(null);

  // selectedStoreId 가져오기
  const { selectedStoreId, isLoading: isLoadingStoreId } = useSelectedStoreId();

  // selectedStoreId가 있을 때만 가게 데이터 조회
  const { data: store, isLoading: isLoadingStore } = useGetStore(selectedStoreId);
  const putStoreMutation = usePutStore();


  // React Hook Form 설정
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      name: '',
      category: '',
      contactNumber: '',
      address: '',
      direction: '',
      description: '',
      information: '',
      latitude: 0,
      longitude: 0,
    },
  });

  const formData = watch();

  // store 데이터로 폼 초기화
  useEffect(() => {
    if (store) {
      // reset 대신 각 필드를 개별적으로 설정
      setValue('name', store.name ?? '');
      setValue('category', store.category ?? '');
      setValue('contactNumber', store.contactNumber ?? '');
      setValue('address', store.address ?? '');
      setValue('direction', store.direction ?? '');
      setValue('description', store.description ?? '');
      setValue('information', store.addressDetail ?? '');
      setValue('latitude', store.latitude ?? 0);
      setValue('longitude', store.longitude ?? 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);

  // 메인 지도용 훅 - store 데이터가 있으면 해당 위치로, 없으면 기본값
  const { mapContainerRef, map, isMapInitialized, handleScriptLoad, reinitializeMap } = useKakaoMap(
    {
      center:
        store && store.latitude && store.longitude
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
    if (store && map && isMapInitialized && store.latitude && store.longitude) {
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
            setValue('address', fullAddress);
            setValue('latitude', lat);
            setValue('longitude', lng);

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
            setValue('address', fullAddress);
          }
        },
      );
    } else {
      // Kakao Maps API가 없으면 주소만 업데이트
      setValue('address', fullAddress);
    }

    setIsAddressDialogOpen(false); // 다이얼로그 자동 닫기
  };

  const onSubmit = (data: StoreFormData) => {
    if (!store || !selectedStoreId) {
      toast.error('가게 정보를 불러올 수 없습니다. 페이지를 새로고침 해주세요.');
      return;
    }

    // 필수 필드와 선택 필드 구분
    const putBody: PutStoreBody = {
      name: data.name || undefined,
      category: data.category || undefined,
      contactNumber: data.contactNumber || undefined,
      address: data.address || undefined,
      addressDetail: data.information || undefined, // information을 addressDetail로 매핑
      direction: data.direction || undefined,
      description: data.description ?? '', // 필수 필드이므로 빈 문자열이라도 전송
      // 위도 경도는 formData에서 가져옴 (수정된 경우 반영)
      latitude: data.latitude || store.latitude || undefined,
      longitude: data.longitude || store.longitude || undefined,
    };

    // undefined 값만 제거 (빈 문자열은 유지)
    const cleanedBody = Object.fromEntries(
      Object.entries(putBody).filter(([, value]) => value !== undefined),
    ) as PutStoreBody;

    putStoreMutation.mutate(
      { id: selectedStoreId, body: cleanedBody },
      {
        onSuccess: () => {
          toast.success('저장되었습니다.');
        },
        onError: () => {
          toast.error('저장 중 오류가 발생했습니다.');
        },
      },
    );
  };

  if (isLoadingStoreId) {
    return (
      <CardForm className='p-grid-margin'>
        <div className='headline-2'>기본 정보</div>
        <Card>
          <Spinner text='로딩 중...' />
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

  if (isLoadingStore) {
    return (
      <CardForm className='p-grid-margin'>
        <div className='headline-2'>기본 정보</div>
        <Card>
          <Spinner text='가게 정보를 불러오는 중...' />
        </Card>
      </CardForm>
    );
  }

  const onFormError = (validationErrors: typeof errors) => {
    // 첫 번째 에러 메시지 찾기
    const firstError = Object.values(validationErrors)[0];
    if (firstError?.message) {
      toast.error(firstError.message);
    } else {
      toast.error('입력 정보를 확인해주세요.');
    }
  };

  return (
    <CardForm className='' onSubmit={handleSubmit(onSubmit, onFormError)}>
      <div className='headline-2'>기본 정보</div>
      <Card>
        <CardSubtitle label='업체명' required>
          <div>
            <Input
              id='name'
              value={formData.name || ''}
              onChange={(e) => setValue('name', e.target.value)}
            />
            {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>}
          </div>
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='업종' required>
          <div>
            <SelectBox
              key={formData.category}
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
              onValueChange={(value) => setValue('category', value)}
              placeholder='업종을 선택해주세요'
            />
            {errors.category && <p className='text-red-500 text-sm mt-1'>{errors.category.message}</p>}
          </div>
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='매장소개' required>
          <TextArea
            id='description'
            rows={3}
            maxLength={1000}
            value={formData.description || ''}
            onChange={(e) => setValue('description', e.target.value)}
            placeholder='매장소개를 입력하세요'
          />
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='매장번호' required>
          <div>
            <Input
              id='contactNumber'
              value={formData.contactNumber || ''}
              onChange={(e) => setValue('contactNumber', e.target.value)}
            />
            {errors.contactNumber && (
              <p className='text-red-500 text-sm mt-1'>{errors.contactNumber.message}</p>
            )}
          </div>
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
          <div>
            <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
              <Dialog.Trigger asChild>
                <Input
                  id='address'
                  inputType='search'
                  value={formData.address}
                  onClick={() => setIsAddressDialogOpen(true)}
                  readOnly
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
            {errors.address && <p className='text-red-500 text-sm mt-1'>{errors.address.message}</p>}
          </div>

          <div className='mt-4'>
            <Input
              id='information'
              value={formData.information || ''}
              onChange={(e) => setValue('information', e.target.value)}
              placeholder='상세 주소를 입력하세요 (예: 3층 301호)'
            />
          </div>
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='찾아오시는 길'>
          <TextArea
            id='direction'
            rows={3}
            maxLength={1000}
            value={formData.direction || ''}
            onChange={(e) => setValue('direction', e.target.value)}
            placeholder='찾아오시는 길을 입력하세요'
          />
        </CardSubtitle>
      </Card>
      <div className='flex justify-center mb-17'>
        <Button type='submit' disabled={putStoreMutation.isPending}>
          {putStoreMutation.isPending ? '저장 중...' : '저장'}
        </Button>
      </div>

      {/* 위치 수정 Dialog */}
      <LocationEditDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialCenter={
          store && store.latitude && store.longitude
            ? { lat: store.latitude, lng: store.longitude }
            : undefined
        }
        onSaveLocation={(address, lat, lng) => {
          setValue('address', address);
          setValue('latitude', lat);
          setValue('longitude', lng);

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
      <Toaster />
    </CardForm>
  );
};

export default BasicInfoPage;
