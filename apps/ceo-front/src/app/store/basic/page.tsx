'use client';

import { useState } from 'react';
import {
  CardForm,
  CeoButton,
  CeoCard,
  CeoInput,
  CeoSelectBox,
  CeoTextArea,
  CeoCarnSubtitle,
  CeoToggleGroup,
  CeoToggleGroupItem,
  CeoUrlLinkList,
  CeoBusinessHours,
} from '@repo/design-system/components/ceo';
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
        const marker = new window.kakao.maps.Marker({
          position: latlng,
          map: map,
        });
      }
    },
  });

  return (
    <CardForm className=''>
      <div className='headline-2'>기본 정보</div>
      <CeoCard>
        <CeoCarnSubtitle label='업체명' required>
          <CeoInput id='name' />
        </CeoCarnSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCarnSubtitle label='업종' required>
          <CeoSelectBox
            options={[
              { value: '1', label: '족발 보쌈' },
              { value: '2', label: '고기' },
              { value: '3', label: '패스트푸드' },
            ]}
            placeholder='업종을 선택해주세요'
          />
        </CeoCarnSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCarnSubtitle label='매장소개' required>
          <CeoTextArea id='name' maxLength={1000} />
        </CeoCarnSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCarnSubtitle label='주차 정보' required>
          <CeoToggleGroup
            type='single'
            defaultValue={parkingInfo}
            onValueChange={(value) => {
              if (value) setParkingInfo(value);
            }}
            className='w-full'
          >
            <CeoToggleGroupItem value='possible' className='flex-1'>
              주차 가능
            </CeoToggleGroupItem>
            <CeoToggleGroupItem value='impossible' className='flex-1'>
              주차 불가능
            </CeoToggleGroupItem>
          </CeoToggleGroup>
          {parkingInfo === 'possible' && (
            <div className='mt-4'>
              <CeoInput placeholder='주차 관련 안내사항을 입력하세요.' />
            </div>
          )}
        </CeoCarnSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCarnSubtitle label='홈페이지 주소'>
          <CeoUrlLinkList />
        </CeoCarnSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCarnSubtitle label='편의시설'>
          <CeoToggleGroup
            type='multiple'
            variant='chip'
            value={amenities}
            onValueChange={setAmenities}
          >
            <CeoToggleGroupItem value='group'>단체이용 가능</CeoToggleGroupItem>
            <CeoToggleGroupItem value='takeout'>포장</CeoToggleGroupItem>
            <CeoToggleGroupItem value='delivery'>배달</CeoToggleGroupItem>
            <CeoToggleGroupItem value='reception'>방문접수/출장</CeoToggleGroupItem>
            <CeoToggleGroupItem value='reservation'>예약</CeoToggleGroupItem>
            <CeoToggleGroupItem value='wifi'>무선인터넷</CeoToggleGroupItem>
            <CeoToggleGroupItem value='kids'>유아시설/놀이방</CeoToggleGroupItem>
            <CeoToggleGroupItem value='toilet'>남/녀 화장실 구분</CeoToggleGroupItem>
            <CeoToggleGroupItem value='chair'>유아의자</CeoToggleGroupItem>
            <CeoToggleGroupItem value='waiting'>대기공간</CeoToggleGroupItem>
            <CeoToggleGroupItem value='no-kids'>노키즈존</CeoToggleGroupItem>
          </CeoToggleGroup>
        </CeoCarnSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCarnSubtitle label='영업시간을 알려주세요'>
          <CeoBusinessHours />
        </CeoCarnSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCarnSubtitle label='매장번호' required>
          <CeoInput id='name' />
        </CeoCarnSubtitle>
      </CeoCard>

      <CeoCard>
        <CeoCarnSubtitle label='주소' required>
          <div className='w-full h-[180px] relative'>
            <KakaoMap
              mapContainerRef={mapContainerRef}
              isMapInitialized={isMapInitialized}
              onScriptLoad={handleScriptLoad}
            />
            <button
              className='absolute bottom-2 right-2 z-100 bg-white rounded-md p-2'
              type='button'
              onClick={() => {
                console.log('clickedLatlng', clickedLatlng);
              }}
            >
              위치 수정
            </button>
          </div>
          <CeoInput id='name' inputType='search' />
          <CeoInput id='name' />
        </CeoCarnSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCarnSubtitle label='찾아오시는길' required>
          <CeoTextArea id='name' maxLength={1000} />
        </CeoCarnSubtitle>
      </CeoCard>
      <div className='flex justify-center mb-17'>
        <CeoButton>저장</CeoButton>
      </div>
    </CardForm>
  );
};

export default BasicInfoPage;
