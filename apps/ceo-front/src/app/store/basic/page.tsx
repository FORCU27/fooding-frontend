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

const BasicInfoPage = () => {
  const [parkingInfo, setParkingInfo] = useState('possible');
  const [amenities, setAmenities] = useState<string[]>(['reception', 'reservation', 'waiting']);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
          <Input id='name' />
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='업종' required>
          <SelectBox
            options={[
              { value: '1', label: '족발 보쌈' },
              { value: '2', label: '고기' },
              { value: '3', label: '패스트푸드' },
            ]}
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
          <ToggleGroup
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
          )}
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='홈페이지 주소'>
          <UrlLinkList />
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='편의시설'>
          <ToggleGroup type='multiple' value={amenities} onValueChange={setAmenities}>
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
          </ToggleGroup>
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='영업시간을 알려주세요'>
          <BusinessHours />
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='매장번호' required>
          <Input id='name' />
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
              <Input id='name' inputType='search' />
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

          <Input id='name' />
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='찾아오시는길' required>
          <TextArea id='name' maxLength={1000} />
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
