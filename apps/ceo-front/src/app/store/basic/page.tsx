'use client';

import { useState, useEffect } from 'react';

import {
  CardForm,
  Button,
  Card,
  Input,
  SelectBox,
  TextArea,
  CardSubtitle,
  ToggleGroup,
  ToggleGroupItem,
  UrlLinkList,
  BusinessHours,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@repo/design-system/components/ceo';
import DaumPostcode from 'react-daum-postcode';

import KakaoMap from '@/components/KakoMap';
import LocationEditDialog from '@/components/LocationEditDialog';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { useGetStore } from '@/hooks/store/useGetStore';

const BasicInfoPage = () => {
  const [parkingInfo, setParkingInfo] = useState('possible');
  const [amenities, setAmenities] = useState<string[]>(['reception', 'reservation', 'waiting']);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: store, isLoading, error, isError } = useGetStore(15);

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    contactNumber: '',
    address: '',
    direction: '',
    information: '',
  });

  // store 데이터로 폼 초기화
  useEffect(() => {
    if (store) {
      console.log('Initializing form with store data:', store);
      setFormData({
        name: store.name || '',
        category: store.category || '',
        contactNumber: store.contactNumber || '',
        address: store.address || '',
        direction: store.direction || '',
        information: store.information || '',
      });
    }
  }, [store]);

  console.log('store', store);
  console.log('isLoading', isLoading);
  console.log('error', error);

  // 메인 지도용 훅
  const { mapContainerRef, map, isMapInitialized, handleScriptLoad, reinitializeMap } = useKakaoMap(
    {
      center: { lat: 33.450701, lng: 126.570667 },
      level: 3,
    },
  );

  // 페이지 재방문 시 지도 재초기화
  useEffect(() => {
    // 페이지 진입 시 SDK가 이미 로드되어 있으면 재초기화
    if (window.kakao && window.kakao.maps && !isMapInitialized) {
      console.log('[BasicInfoPage] Page mounted with SDK loaded, reinitializing map2');
      reinitializeMap();
    }
  }, []); // 마운트 시 한 번만 실행

  interface PostcodeData {
    address: string;
    addressType: string;
    bname: string;
    buildingName: string;
    zonecode: string;
  }

  const onCompletePost = (data: PostcodeData) => {
    console.log(data);
  };

  return (
    <CardForm className=''>
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
              console.log('SelectBox value changed:', value);
              console.log('Previous formData:', formData);
              setFormData((prev) => {
                const newData = { ...prev, category: value };
                console.log('New formData:', newData);
                return newData;
              });
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
          <Dialog>
            <DialogTrigger asChild>
              <Input
                id='address'
                inputType='search'
                value={formData.address}
                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
              />
              {/* <button
                className='w-full h-[58px] bg-white rounded-md p-2 shadow-md hover:bg-gray-50 transition-colors cursor-pointer'
                type='button'
              >
                위치 수정
              </button> */}
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
                <Button variant='outline'>취소</Button>
                <Button>위치 저장</Button>
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
        <Button>저장</Button>
      </div>

      {/* 위치 수정 Dialog */}
      <LocationEditDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </CardForm>
  );
};

export default BasicInfoPage;
