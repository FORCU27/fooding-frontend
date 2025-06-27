import { useState } from 'react';

import { CouponStatus } from '@repo/api/user';
import { Button, Dialog, EmptyState, Input, Tabs } from '@repo/design-system/components/b2c';
import { CloseIcon } from '@repo/design-system/icons';
import { ActivityComponentType } from '@stackflow/react/future';
import { Suspense } from '@suspensive/react';

import { IntersectionObserver } from '@/components/IntersectionObserver';
import { DefaultErrorBoundary } from '@/components/Layout/DefaultErrorBoundary';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useGetInfiniteMyCouponList } from '@/hooks/coupon/useGetMyCouponList';

const COUPONT_LIST_TYPES = ['available', 'used'] as const;
type CouponListType = (typeof COUPONT_LIST_TYPES)[number];

const couponListTabLabel: Record<CouponListType, string> = {
  available: '사용 가능 쿠폰',
  used: '사용 완료 쿠폰',
};

export const CouponListScreen: ActivityComponentType<'CouponListScreen'> = () => {
  return (
    <Screen className='bg-gray-1' header={<Header left={<Header.Back />} title='쿠폰함' />}>
      <Tabs defaultValue={COUPONT_LIST_TYPES[0]} className='flex-1 flex flex-col'>
        <Tabs.List fullWidth>
          {COUPONT_LIST_TYPES.map((type, index) => (
            <Tabs.Trigger key={index} value={type}>
              {couponListTabLabel[type]}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {COUPONT_LIST_TYPES.map((type, index) => (
          <DefaultErrorBoundary key={index}>
            <Suspense>
              <Tabs.Content value={type} className='flex-1 flex flex-col'>
                <CouponList type={type} />
              </Tabs.Content>
            </Suspense>
          </DefaultErrorBoundary>
        ))}
      </Tabs>
    </Screen>
  );
};

type CouponListProps = {
  type: CouponListType;
};

const CouponList = ({ type }: CouponListProps) => {
  const { coupons, fetchNextPage } = useGetInfiniteMyCouponList({
    used: type === 'used',
  });

  const emptyTitle: Record<CouponListType, string> = {
    available: '사용 가능한 쿠폰이 없어요.',
    used: '사용한 쿠폰이 없어요.',
  };

  if (coupons.length === 0) {
    return <EmptyState className='flex-1' title={emptyTitle[type]} />;
  }

  return (
    <div className='px-grid-margin'>
      <span className='mt-5 body-6 text-gray-5 flex'>쿠폰 1장</span>
      <ul className='mt-3 flex flex-col gap-5'>
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} />
        ))}
        <IntersectionObserver onIntersect={fetchNextPage} />
      </ul>
    </div>
  );
};

type CouponCardProps = {
  coupon: {
    id: number;
    name: string;
    status: CouponStatus;
  };
};

const CouponCard = ({ coupon }: CouponCardProps) => {
  return (
    <li className='p-5 flex flex-col bg-white rounded-[12px]'>
      <div className='flex justify-between'>
        <span className='body-4'>김가네 김밥</span>
        <CouponDetailDialog
          trigger={<span className='size-8 rounded-full bg-gray-1' />}
          coupon={coupon}
        />
      </div>
      <div className='mt-5 flex'>
        <div className='flex flex-col flex-1'>
          <span className='subtitle-1'>계란김밥 증정 쿠폰</span>
          <span className='body-8 text-gray-5'>사용기간: 2025-02-01 12:12:12</span>
        </div>
        <div className='size-[60px] rounded-[8px] bg-gray-100' />
      </div>

      <UseCouponDialog trigger={<Button className='mt-5'>사용하기</Button>} coupon={coupon} />
    </li>
  );
};

type CouponDetailDialogProps = {
  trigger: React.ReactNode;
  coupon: CouponCardProps['coupon'];
};

const CouponDetailDialog = ({ trigger }: CouponDetailDialogProps) => {
  return (
    <Dialog>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Content className='p-1 w-[320px]'>
        <Dialog.Header>
          <Dialog.Title className='body-7 text-gray-5'>계란김밥 증정 쿠폰</Dialog.Title>
          <Dialog.Description className='sr-only'>쿠폰</Dialog.Description>
          <span className='subtitle-1'>사용 조건</span>
        </Dialog.Header>
        <Dialog.Body className='pb-[52px]'>
          <span className='body-8-2 text-gray-5'>사용자가 입력한 조건</span>
          <span className='body-8-2 text-gray-5'>사용자가 입력한 조건</span>
          <span className='body-8-2 text-gray-5'>사용자가 입력한 조건</span>
          <span className='body-8-2 text-gray-5'>사용자가 입력한 조건</span>
        </Dialog.Body>
        <Dialog.Close className='absolute top-5 right-5'>
          <CloseIcon size={24} />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog>
  );
};

type UseCouponDialogProps = {
  trigger: React.ReactNode;
  coupon: CouponCardProps['coupon'];
};

const UseCouponDialog = ({ trigger, coupon }: UseCouponDialogProps) => {
  const [tableNumber, setTableNumber] = useState('');

  console.log(coupon);

  return (
    <Dialog>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title className='text-center'>쿠폰 사용</Dialog.Title>
          <Dialog.Description className='sr-only'>쿠폰 사용</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
          <Input
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            placeholder='테이블 번호를 입력해주세요'
          />
        </Dialog.Body>
        <Dialog.Footer className='gap-[10px]'>
          <Dialog.Close asChild>
            <Button className='w-[136px]' variant='outlined'>
              취소
            </Button>
          </Dialog.Close>
          <Button disabled={tableNumber.length === 0}>사용하기</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
