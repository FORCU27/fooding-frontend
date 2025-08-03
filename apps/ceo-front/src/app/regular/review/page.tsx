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

const ReviewPage = () => {
  const [isPossible, setIsPossible] = useState(false);
  const [isFree, setIsFree] = useState(false);

  return (
    <CardForm className=''>
      <div className='headline-2'>리뷰</div>
    </CardForm>
  );
};

export default ReviewPage;
