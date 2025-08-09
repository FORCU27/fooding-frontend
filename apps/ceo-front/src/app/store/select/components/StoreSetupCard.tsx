'use client';
import Image from 'next/image';
import { ChangeEvent } from 'react';

import { Input, Button } from '@repo/design-system/components/b2c';

type StoreSetupCardProps = {
  storeName: string;
  onChangeStoreName: (value: string) => void;
  onCreateStore: () => void;
};

export default function StoreSetupCard({
  storeName,
  onChangeStoreName,
  onCreateStore,
}: StoreSetupCardProps) {
  return (
    <div className='bg-white rounded-2xl shadow-lg w-[571px] p-[60px] text-center flex flex-col items-center'>
      <Image src='/images/fooding-ceo-logo.svg' alt='fooding logo' width={153} height={24} />
      <h1 className='headline-3 text-center pt-[12px]'>
        사장님을 위한 전용 공간에 오신 걸 환영합니다
      </h1>

      <div className='py-[32px] flex flex-col items-center w-full'>
        <hr className='w-full border-gray-5' />
        <p className='text-gray-5 body-2 min-h-[182px] flex items-center'>관리할 매장이 없습니다</p>
        <hr className='w-full border-gray-5' />
      </div>

      <Input
        placeholder='매장명을 입력해주세요'
        value={storeName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeStoreName(e.target.value)}
        className='h-[58px] subtitle-1 mb-[12px] placeholder:font-bold'
      />

      <Button
        disabled={!storeName.trim()}
        onClick={onCreateStore}
        className='w-full py-3 rounded-full subtitle-1'
      >
        매장 생성하기
      </Button>
    </div>
  );
}
