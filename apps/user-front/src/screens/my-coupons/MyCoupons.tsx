'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

import { Coupon } from '@repo/api/user';
import { Button, Dialog, EmptyState, Input, Tabs } from '@repo/design-system/components/b2c';
import { CheckIcon, CloseIcon, FoodingIcon, InfoCircleIcon } from '@repo/design-system/icons';
import { ActivityComponentType } from '@stackflow/react/future';
import { Suspense } from '@suspensive/react';
import { overlay } from 'overlay-kit';

import { IntersectionObserver } from '@/components/IntersectionObserver';
import { DefaultErrorBoundary } from '@/components/Layout/DefaultErrorBoundary';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useApplyCoupon } from '@/hooks/coupon/useApplyCoupon';
import { useGetInfiniteMyCouponList } from '@/hooks/coupon/useGetMyCouponList';
import { formatDashDateTime } from '@/utils/date';

const COUPONT_LIST_TYPES = ['available', 'used'] as const;
type CouponListType = (typeof COUPONT_LIST_TYPES)[number];

const couponListTabLabel: Record<CouponListType, string> = {
  available: '사용 가능 쿠폰',
  used: '사용 완료 쿠폰',
};

export const MyCouponListScreen: ActivityComponentType<'MyCouponListScreen'> = () => {
  const [tabs, setTabs] = useState<string>(COUPONT_LIST_TYPES[0]);

  const screenRef = useRef<HTMLDivElement>(null);

  const onTabsChange = (value: string) => {
    setTabs(value);

    if (screenRef.current) {
      screenRef.current.scrollTo({ top: 0 });
    }
  };

  return (
    <Screen
      ref={screenRef}
      className='bg-gray-1'
      header={<Header left={<Header.Back />} title='쿠폰함' />}
    >
      <Tabs value={tabs} onChange={onTabsChange} className='flex-1 flex flex-col'>
        <Tabs.List className='sticky top-0' fullWidth>
          {COUPONT_LIST_TYPES.map((type, index) => (
            <Tabs.Trigger key={index} value={type}>
              {couponListTabLabel[type]}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {COUPONT_LIST_TYPES.map((listType) => (
          <DefaultErrorBoundary key={listType}>
            <Suspense clientOnly>
              <Tabs.Content value={listType} className='flex-1 flex flex-col'>
                {(() => {
                  switch (listType) {
                    case 'available':
                      return <AvailableCouponList />;
                    case 'used':
                      return <UsedCouponList />;
                    default:
                      listType satisfies never;
                  }
                })()}
              </Tabs.Content>
            </Suspense>
          </DefaultErrorBoundary>
        ))}
      </Tabs>
    </Screen>
  );
};

const AvailableCouponList = () => {
  const { coupons, totalCount, fetchNextPage } = useGetInfiniteMyCouponList({
    used: false,
  });

  if (coupons.length === 0) {
    return <EmptyState className='flex-1' title='사용 가능한 쿠폰이 없어요.' />;
  }

  return (
    <div className='px-grid-margin'>
      <span className='mt-5 body-6 text-gray-5 flex'>쿠폰 {totalCount}장</span>
      <ul className='mt-3 flex flex-col gap-5'>
        {coupons.map((coupon) => (
          <CouponCard
            key={coupon.id}
            coupon={coupon}
            button={
              <Button
                onClick={() => {
                  overlay.open(({ isOpen, close }) => (
                    <ApplyCouponDialog
                      isOpen={isOpen}
                      onOpenChange={(open) => open === false && close()}
                      coupon={coupon}
                    />
                  ));
                }}
              >
                사용하기
              </Button>
            }
          />
        ))}
        <IntersectionObserver onIntersect={fetchNextPage} />
      </ul>
    </div>
  );
};

const UsedCouponList = () => {
  const { coupons, totalCount, fetchNextPage } = useGetInfiniteMyCouponList({
    used: true,
  });

  if (coupons.length === 0) {
    return <EmptyState className='flex-1' title='사용한 쿠폰이 없어요.' />;
  }

  return (
    <div className='px-grid-margin'>
      <span className='mt-5 body-6 text-gray-5 flex'>쿠폰 {totalCount}장</span>
      <ul className='mt-3 flex flex-col gap-5'>
        {coupons.map((coupon) => (
          <CouponCard
            key={coupon.id}
            coupon={coupon}
            button={<Button disabled>사용 완료</Button>}
          />
        ))}
        <IntersectionObserver onIntersect={fetchNextPage} />
      </ul>
    </div>
  );
};

type CouponCardProps = {
  coupon: Coupon;
  button: React.ReactNode;
};

const CouponCard = ({ coupon, button }: CouponCardProps) => {
  return (
    <li className='p-5 flex flex-col bg-white rounded-[12px]'>
      <div className='flex justify-between'>
        <span className='body-4'>{coupon.storeName}</span>
        <CouponDetailDialog
          trigger={
            <button
              className='size-8 flex justify-center rounded-full items-center text-gray-5'
              aria-label='쿠폰 상세 보기'
            >
              <InfoCircleIcon />
            </button>
          }
          coupon={coupon}
        />
      </div>
      <div className='my-5 flex'>
        <div className='flex flex-col flex-1'>
          <span className='subtitle-1'>{coupon.name}</span>
          {coupon.expiredOn && (
            <span className='body-8 text-gray-5 mt-1'>
              사용기간: {formatDashDateTime(coupon.expiredOn)}
            </span>
          )}
        </div>
        <GiftBoxIcon />
      </div>
      {button}
    </li>
  );
};

type CouponDetailDialogProps = {
  trigger: React.ReactNode;
  coupon: CouponCardProps['coupon'];
};

const CouponDetailDialog = ({ coupon, trigger }: CouponDetailDialogProps) => {
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
          <span className='body-8-2 text-gray-5'>{coupon.conditions ?? '사용 조건이 없어요.'}</span>
        </Dialog.Body>
        <Dialog.Close className='absolute top-5 right-5'>
          <CloseIcon size={24} />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog>
  );
};

type ApplyCouponDialogProps = {
  coupon: CouponCardProps['coupon'];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const ApplyCouponDialog = ({ isOpen, onOpenChange, coupon }: ApplyCouponDialogProps) => {
  const [tableNumber, setTableNumber] = useState('');
  const [success, setSuccess] = useState(false);

  const { mutate: applyCoupon, isPending } = useApplyCoupon();

  const onApplyButtonClick = () => {
    if (isPending) return;

    applyCoupon(
      { id: coupon.id, body: { tableNumber } },
      {
        onSuccess: () => {
          setSuccess(true);
        },
        onError: () => {
          // TODO: 에러 처리
        },
      },
    );
  };

  const NUMBER_ONLY_REGEX = /^[0-9]*$/;

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!NUMBER_ONLY_REGEX.test(event.target.value)) {
      return;
    }

    setTableNumber(event.target.value);
  };

  return (
    <Dialog isOpen={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Content className='w-[400px]'>
        <>
          {!success && (
            <>
              <Dialog.Header className='h-[60px]'>
                <Dialog.Title className='text-center'>쿠폰 사용</Dialog.Title>
                <Dialog.Description className='sr-only'>쿠폰 사용</Dialog.Description>
              </Dialog.Header>
              <Dialog.Body>
                <div className='flex items-center gap-4 mt-6'>
                  <CouponStoreThumbnail mainImage={coupon.mainImage} />
                  <div className='flex flex-col gap-2 justify-center'>
                    <span className='subtitle-1'>{coupon.name}</span>
                    <span className='body-6 text-gray-5'>{coupon.storeName}</span>
                  </div>
                </div>
                <Input
                  className='mt-6'
                  value={tableNumber}
                  onChange={onInputChange}
                  inputMode='numeric'
                  placeholder='테이블 번호를 입력해주세요'
                  maxLength={5}
                />
                <span className='body-6 text-gray-5 mt-4 text-center'>
                  쿠폰 사용시 취소가 불가능하오니 확인 후 사용해주세요!
                </span>
              </Dialog.Body>
              <Dialog.Footer className='mt-5 gap-[10px]'>
                <Dialog.Close asChild>
                  <Button className='w-[136px]' variant='outlined'>
                    취소
                  </Button>
                </Dialog.Close>
                <Button onClick={onApplyButtonClick} disabled={tableNumber.length === 0}>
                  사용하기
                </Button>
              </Dialog.Footer>
            </>
          )}
          {success && (
            <>
              <Dialog.Header>
                <div className='mt-5 flex justify-center items-center size-[60px] rounded-full border-2 border-primary-pink text-primary-pink self-center'>
                  <CheckIcon size={36} strokeWidth={1} />
                </div>
                <Dialog.Title className='headline-3 text-center mt-6'>
                  쿠폰이 사용되었습니다!
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <div className='mt-5 bg-gray-1 rounded-[12px] flex gap-4 p-6'>
                  <CouponStoreThumbnail mainImage={coupon.mainImage} />
                  <div className='flex flex-col gap-2 justify-center'>
                    <span className='subtitle-1'>{coupon.name}</span>
                    <span className='body-6 text-gray-5'>{coupon.storeName}</span>
                  </div>
                </div>
              </Dialog.Body>
              <Dialog.Footer className='mt-5'>
                <Dialog.Close asChild>
                  <Button>확인</Button>
                </Dialog.Close>
              </Dialog.Footer>
            </>
          )}
        </>
      </Dialog.Content>
    </Dialog>
  );
};

type CouponStoreThumbnailProps = {
  mainImage: string | null;
};

const CouponStoreThumbnail = ({ mainImage }: CouponStoreThumbnailProps) => {
  return (
    <div className='size-[60px] relative rounded-[8px] overflow-hidden'>
      {mainImage ? (
        <Image fill src={mainImage} alt='쿠폰 이미지' />
      ) : (
        <div className='bg-gray-2 flex justify-center items-center text-[#111111]/10 w-full h-full'>
          <FoodingIcon />
        </div>
      )}
    </div>
  );
};

const GiftBoxIcon = () => {
  return (
    <svg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M30 15V55M30 15H21.1607C19.8583 15 18.6093 14.4732 17.6883 13.5355C16.7674 12.5979 16.25 11.3261 16.25 10C16.25 8.67392 16.7674 7.40215 17.6883 6.46447C18.6093 5.52678 19.8583 5 21.1607 5C28.0357 5 30 15 30 15ZM30 15H38.8393C40.1417 15 41.3907 14.4732 42.3117 13.5355C43.2326 12.5979 43.75 11.3261 43.75 10C43.75 8.67392 43.2326 7.40215 42.3117 6.46447C41.3907 5.52678 40.1417 5 38.8393 5C31.9643 5 30 15 30 15ZM50 27.5V47C50 49.8003 50 51.2004 49.455 52.27C48.9757 53.2108 48.2108 53.9757 47.2699 54.455C46.2004 55 44.8003 55 42 55L18 55C15.1997 55 13.7996 55 12.73 54.455C11.7892 53.9757 11.0243 53.2108 10.545 52.2699C10 51.2004 10 49.8003 10 47V27.5M5 19L5 23.5C5 24.9001 5 25.6002 5.27248 26.135C5.51217 26.6054 5.89462 26.9878 6.36502 27.2275C6.8998 27.5 7.59987 27.5 9 27.5L51 27.5C52.4001 27.5 53.1002 27.5 53.635 27.2275C54.1054 26.9878 54.4878 26.6054 54.7275 26.135C55 25.6002 55 24.9001 55 23.5V19C55 17.5999 55 16.8998 54.7275 16.365C54.4878 15.8946 54.1054 15.5122 53.635 15.2725C53.1002 15 52.4001 15 51 15L9 15C7.59987 15 6.8998 15 6.36502 15.2725C5.89462 15.5122 5.51217 15.8946 5.27248 16.365C5 16.8998 5 17.5999 5 19Z'
        stroke='#EDEDED'
        strokeWidth='5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
