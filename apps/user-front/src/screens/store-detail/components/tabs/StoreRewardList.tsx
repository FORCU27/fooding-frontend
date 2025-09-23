import Image from 'next/image';
import { useState } from 'react';

import { StoreReward } from '@repo/api/user';
import { BottomSheet, Button, Checkbox, EmptyState } from '@repo/design-system/components/b2c';
import { FoodingIcon, GiftIcon } from '@repo/design-system/icons';
import { useFlow } from '@stackflow/react/future';

import { Section } from '@/components/Layout/Section';
import { useGetStoreDetail } from '@/hooks/store/useGetStoreDetail';
import { useGetStoreRewardList } from '@/hooks/store/useGetStoreRewardList';
import { usePurchaseStoreReward } from '@/hooks/store/usePurchaseStoreReward';
import { isNonEmptyArray } from '@/utils/array';

type StoreRewardListTabProps = {
  storeId: number;
};

export const StoreRewardListTab = ({ storeId }: StoreRewardListTabProps) => {
  const flow = useFlow();

  const { data: rewards } = useGetStoreRewardList(storeId);
  const { data: store } = useGetStoreDetail(storeId);

  return (
    <Section className='flex flex-col bg-gray-1'>
      <div className='flex flex-col gap-5 py-4 mb-25'>
        <div className='flex rounded-xl p-5 bg-white justify-between'>
          <div className='flex gap-3 justify-center items-center'>
            {store.images && isNonEmptyArray(store.images) ? (
              <Image src={store.images[0].imageUrl} width={40} height={40} alt='스토어 이미지' />
            ) : (
              <div className='flex justify-center items-center w-10 h-10 rounded-xl'>
                <FoodingIcon className='text-gray-2' />
              </div>
            )}
            <div>
              <p className='subtitle-4'>{store.name}</p>
              <p className='subtitle-6 text-gray-5'>{rewards.point} 포인트</p>
            </div>
          </div>
          <Button
            variant='outlined'
            size='small'
            onClick={() => flow.push('MyRewardListScreen', {})}
          >
            적립내역
          </Button>
        </div>
        {rewards.pointShopItems.length === 0 && (
          <EmptyState className='mt-20' title='등록된 리워드가 없어요.' />
        )}
        {rewards.pointShopItems.map((reward) => (
          <StoreRewardItem
            key={reward.id}
            reward={reward}
            userPoint={rewards.point}
            storeId={store.id}
          />
        ))}
      </div>
    </Section>
  );
};

type StoreRewardItemProps = {
  reward: StoreReward;
  storeId: number;
  userPoint: number;
};

const StoreRewardItem = ({ reward, storeId, userPoint }: StoreRewardItemProps) => {
  const flow = useFlow();
  const { mutate } = usePurchaseStoreReward();
  const { data: store } = useGetStoreDetail(storeId);

  const [isCheck, setIsCheck] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isConfirmBottomSheetOpen, setIsConfirmBottomSheetOpen] = useState(false);

  const resultPoint = userPoint - reward.point;
  const isNotEnough = resultPoint < 0;

  const handlePurchaseClick = () => {
    mutate(
      { storeId, rewardId: reward.id },
      { onSuccess: () => setIsConfirmBottomSheetOpen(true) },
    );
    setIsCheck(false);
    setIsBottomSheetOpen(false);
  };

  const handleConfirmClick = () => {
    setIsConfirmBottomSheetOpen(false);

    flow.push('MyCouponListScreen', {});
  };

  return (
    <div className='flex flex-col rounded-xl p-5 bg-white gap-3'>
      <div className='flex gap-2'>
        <div className='flex w-25 h-25 justify-center items-center rounded-xl'>
          <GiftIcon className='text-gray-2 w-[60px] h-[60px]' />
        </div>
        <div className='flex flex-col gap-2'>
          <div
            className={`inline-flex w-fit px-2 py-1 body-7 rounded-sm ${
              reward.quantity === null || reward.quantity > 0
                ? 'text-info-blue bg-[rgba(0,128,248,0.1)]'
                : 'text-error-red bg-[rgba(225,19,0,0.1)]'
            }`}
          >
            {reward.quantity === null || reward.quantity > 0 ? '판매중' : '구매불가'}
          </div>
          <p className='subtitle-5'>{reward.name}</p>
          <p className='body-8 text-gray-5'>
            남은 수량: {reward.quantity === null ? '무제한' : reward.quantity}
          </p>
          <p className='subtitle-1'>{reward.point} P</p>
        </div>
      </div>
      <Button variant='outlined' onClick={() => setIsBottomSheetOpen(true)}>
        구매하기
      </Button>

      <BottomSheet open={isBottomSheetOpen} onOpenChange={setIsBottomSheetOpen}>
        <BottomSheet.Content>
          <BottomSheet.Header>
            <BottomSheet.Title className='headline-3'>쿠폰 구매</BottomSheet.Title>
          </BottomSheet.Header>
          <BottomSheet.Body>
            <div className='flex items-center mb-6 gap-4'>
              <div className='flex justify-center items-center'>
                <GiftIcon className='text-gray-2 w-[60px] h-[60px]' />
              </div>
              <div>
                <p className='subtitle-1'>{reward.name}</p>
                <p className='body-6 text-gray-5'>
                  남은 수량: {reward.quantity === null ? '무제한' : reward.quantity}
                </p>
              </div>
            </div>
            <div className='flex flex-col p-5 gap-3 bg-gray-1 rounded-xl'>
              <div className='flex justify-between'>
                <p className='body-6 text-gray-5'>보유 포인트</p>
                <p className={`body-5 ${isNotEnough ? 'text-error-red' : ''}`}>{userPoint} P</p>
              </div>
              <div className='flex justify-between'>
                <p className='body-6 text-gray-5'>차감 포인트</p>
                <p className='body-5'>{reward.point} P</p>
              </div>
              <hr className='text-gray-3' />
              <div className='flex justify-between'>
                <p className='body-6 text-gray-5'>구매 후 잔여 포인트</p>
                <p className={`body-5 ${isNotEnough ? 'text-error-red' : ''}`}>
                  {resultPoint < 0 ? '포인트 부족' : `${resultPoint} P`}
                </p>
              </div>
            </div>
            <Checkbox.Label className='pt-5 px-2'>
              <Checkbox checked={isCheck} onChange={setIsCheck} className='w-[25px] h-[25px]' />
              <Checkbox.LabelText>
                쿠폰 구매 시 취소가 불가능하오니 확인 후 사용해주세요!
              </Checkbox.LabelText>
            </Checkbox.Label>
          </BottomSheet.Body>
          <BottomSheet.Footer>
            <div className='flex w-full gap-2 justify-center '>
              <Button
                onClick={() => setIsBottomSheetOpen(false)}
                variant='outlined'
                size='large'
                className='w-[30%]'
              >
                취소
              </Button>
              <Button
                onClick={handlePurchaseClick}
                variant='primary'
                size='large'
                className='w-[70%]'
                disabled={!isCheck || isNotEnough}
              >
                구매하기
              </Button>
            </div>
          </BottomSheet.Footer>
        </BottomSheet.Content>
      </BottomSheet>

      <BottomSheet open={isConfirmBottomSheetOpen} onOpenChange={setIsConfirmBottomSheetOpen}>
        <BottomSheet.Content>
          <BottomSheet.Body>
            <div className='flex flex-col justify-center items-center gap-6'>
              <CircleCheckIcon />
              <div className='flex flex-col headline-3'>쿠폰이 구매되었습니다!</div>
            </div>

            <div className='flex gap-3 mt-10 items-center p-5 bg-gray-1 border border-gray-2 rounded-xl'>
              {store.images && isNonEmptyArray(store.images) ? (
                <Image src={store.images[0].imageUrl} width={60} height={60} alt='스토어 이미지' />
              ) : (
                <div className='flex justify-center items-center w-[60px] h-[60px] rounded-xl'>
                  <GiftIcon className='text-gray-3' size={40} />
                </div>
              )}
              <div>
                <p className='subtitle-1'>{reward.name}</p>
                <p className='body-6 text-gray-5'>{store.name}</p>
              </div>
            </div>
          </BottomSheet.Body>
          <BottomSheet.Footer>
            <div className='flex w-full gap-2 justify-center '>
              <Button
                onClick={() => setIsConfirmBottomSheetOpen(false)}
                variant='outlined'
                size='large'
                className='w-[30%]'
              >
                닫기
              </Button>
              <Button
                onClick={handleConfirmClick}
                variant='primary'
                size='large'
                className='w-[70%]'
              >
                쿠폰함으로
              </Button>
            </div>
          </BottomSheet.Footer>
        </BottomSheet.Content>
      </BottomSheet>
    </div>
  );
};

const CircleCheckIcon = () => {
  return (
    <svg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M16 30L25 39L43 21'
        stroke='#FF2B3D'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <circle cx='30' cy='30' r='29' stroke='#FF2B3D' strokeWidth='2' />
    </svg>
  );
};
