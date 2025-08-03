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

const SeatGuidePage = () => {
  const [isPossible, setIsPossible] = useState(false);
  const [isFree, setIsFree] = useState(false);

  return (
    <CardForm className=''>
      <div className='headline-2'>영업 시간 / 휴무일</div>
      <Card>
        <CardSubtitle label='영업 시간을 알려주세요'>
          <></>
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='휴게 시간을 알려주세요'>
          <></>
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='영업 시간 고나련 기타 정보'>
          <></>
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='휴무일이 있나요?'>
          <></>
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='정기 휴무일이 있나요?'>
          <></>
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='공유일중 휴무일이 있나요?'>
          <></>
        </CardSubtitle>
      </Card>
      <Card>
        <CardSubtitle label='그 외 휴무일이 있다면?'>
          <></>
        </CardSubtitle>
      </Card>
      <div className='headline-2'>미리보기</div>
    </CardForm>
  );
};

export default SeatGuidePage;
