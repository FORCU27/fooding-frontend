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

const FavoritePage = () => {
  const [isPossible, setIsPossible] = useState(false);
  const [isFree, setIsFree] = useState(false);

  return (
    <CardForm className=''>
      <div className='headline-2'>소식</div>
    </CardForm>
  );
};

export default FavoritePage;
