'use client';

import { useState } from 'react';

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
import { useKakaoMap } from '@/hooks/useKakaoMap';

const BasicInfoPage = () => {
  const [parkingInfo, setParkingInfo] = useState('possible');
  const [amenities, setAmenities] = useState<string[]>(['reception', 'reservation', 'waiting']);

  // 페이지에서 훅 사용
  const [clickedLatlng, setClickedLatlng] = useState<{ lat: number; lng: number } | null>(null);

  // useKakaoMap 훅 사용
  const { mapContainerRef, map, isMapInitialized, handleScriptLoad } = useKakaoMap({
    // 지도 초기 중심점 및 레벨 설정 (선택 사항)
    center: { lat: 33.450701, lng: 126.570667 }, // 제주도
    level: 3,
    // 지도 클릭 이벤트 핸들러
    onMapClick: (mouseEvent) => {
      const latlng = mouseEvent.latLng;
      setClickedLatlng({ lat: latlng.getLat(), lng: latlng.getLng() });
      console.log(`Clicked at: ${latlng.getLat()}, ${latlng.getLng()}`);
      // 이곳에서 마커 추가 등의 추가 작업 수행
      if (map) {
        // 마커 추가 예시 (API가 완전히 로드된 후)
        new window.kakao.maps.Marker({
          position: latlng,
          map: map,
        });
      }
    },
  });

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
          <ToggleGroup
            type='multiple'
            variant='chip'
            value={amenities}
            onValueChange={setAmenities}
          >
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
              mapContainerRef={mapContainerRef}
              isMapInitialized={isMapInitialized}
              onScriptLoad={handleScriptLoad}
            />
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className='absolute bottom-2 right-2 z-1 bg-white rounded-md p-2 shadow-md hover:bg-gray-50 transition-colors cursor-pointer'
                  type='button'
                >
                  위치 수정
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>위치 수정</DialogTitle>
                </DialogHeader>
                <div className='py-4'>
                  <div className='w-full h-[300px] relative mb-4'>
                    <KakaoMap
                      mapContainerRef={mapContainerRef}
                      isMapInitialized={isMapInitialized}
                      onScriptLoad={handleScriptLoad}
                    />
                  </div>
                  {clickedLatlng && (
                    <div className='bg-gray-50 p-3 rounded-lg'>
                      <p className='text-sm text-gray-600'>선택된 위치:</p>
                      <p className='font-medium'>
                        위도: {clickedLatlng.lat.toFixed(6)}, 경도: {clickedLatlng.lng.toFixed(6)}
                      </p>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant='outline'>취소</Button>
                  <Button>위치 저장</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
    </CardForm>
  );
};

export default BasicInfoPage;
