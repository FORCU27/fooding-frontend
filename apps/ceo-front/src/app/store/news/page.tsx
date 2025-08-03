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
  ToolTip,
} from '@repo/design-system/components/ceo';

const NewsPage = () => {
  const [isPossible, setIsPossible] = useState(false);
  const [isFree, setIsFree] = useState(false);

  return (
    <CardForm className=''>
      <div className='headline-2'>부가 정보</div>
      <Card>
        <CardSubtitle label='홈페이지 / SNS 링크' required>
          <UrlLinkList />
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='주차 가능한가요?' required>
          <ToggleGroup type='single' defaultValue='' className='grid grid-cols-2'>
            <ToggleGroupItem value='possible' onClick={() => setIsPossible(true)}>
              가능해요
            </ToggleGroupItem>
            <ToggleGroupItem value='impossible' onClick={() => setIsPossible(false)}>
              불가능해요
            </ToggleGroupItem>
          </ToggleGroup>
          {isPossible && (
            <ToggleGroup type='single' defaultValue='' className='grid grid-cols-4'>
              <ToggleGroupItem value='free' onClick={() => setIsFree(false)}>
                유료
              </ToggleGroupItem>
              <ToggleGroupItem value='paid' onClick={() => setIsFree(true)}>
                무료
              </ToggleGroupItem>
            </ToggleGroup>
          )}
          {!isFree && (
            <div className='mt-4'>
              <Input placeholder='주차 관련 안내사항을 입력하세요.' />
            </div>
          )}
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='시설/서비스 정보' required>
          <ToggleGroup type='multiple' variant='chip' className='w-full '>
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
        <CardSubtitle label='이용가능한 결제 수단' required>
          <ToolTip>
            네이버,카카오페이,페이코,애플페이 등 QR코드결제 또는 바코드 결제가 가능한 경우
            간편결제를 선택해주세요
          </ToolTip>
          <ToggleGroup type='multiple' variant='chip' className='w-full '>
            <ToggleGroupItem value='card'>지역화폐 (지류형)</ToggleGroupItem>
            <ToggleGroupItem value='cash'>지역화폐 (카드형)</ToggleGroupItem>
            <ToggleGroupItem value='point'>지역화폐 (모바일형)</ToggleGroupItem>
            <ToggleGroupItem value='coupon'>제로페이</ToggleGroupItem>
            <ToggleGroupItem value='etc'>간편결제</ToggleGroupItem>
          </ToggleGroup>
        </CardSubtitle>
      </Card>
      <div className='flex justify-center mb-17'>
        <Button>저장</Button>
      </div>
    </CardForm>
  );
};

export default NewsPage;
