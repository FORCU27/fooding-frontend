'use client';

import {
  CardForm,
  CeoButton,
  CeoCard,
  CeoInput,
  CeoSelectBox,
  CeoTextArea,
  CeoCarnSubtitle,
} from '@repo/design-system/components/ceo';

const BasicInfoPage = () => {
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
              { value: '1', label: '족발 보쌈@@@@@@@@@@@@@@' },
              { value: '2', label: '고기' },
              { value: '3', label: '패스트푸드' },
              { value: '4', label: '피자' },
              { value: '5', label: '야식' },
              { value: '6', label: '치킨' },
              { value: '7', label: '카페' },
              { value: '8', label: '분식' },
              { value: '9', label: '아시안' },
            ]}
            label='업종 선택'
          />
        </CeoCarnSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCarnSubtitle label='매장소개' required>
          <CeoTextArea id='name' maxLength={1000} />
        </CeoCarnSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCarnSubtitle label='매장번호' required>
          <CeoInput id='name' />
        </CeoCarnSubtitle>
      </CeoCard>
      <CeoCard>
        <CeoCarnSubtitle label='주소' required>
          <div>지도</div>
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
