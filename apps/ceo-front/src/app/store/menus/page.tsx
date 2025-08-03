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

const MenusPage = () => {
  const [isPossible, setIsPossible] = useState(false);
  const [isFree, setIsFree] = useState(false);

  return (
    <CardForm className=''>
      <div className='headline-2'>메뉴</div>
    </CardForm>
  );
};

export default MenusPage;
