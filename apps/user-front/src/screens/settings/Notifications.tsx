'use client';

import { useState } from 'react';

import { Switch } from '@repo/design-system/components/b2c';
import { ActivityComponentType } from '@stackflow/react/future';

import BottomTab from '@/components/Layout/BottomTab';
import { DefaultErrorBoundary } from '@/components/Layout/DefaultErrorBoundary';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useGetUserInfo } from '@/hooks/auth/useGetUserInfo';
import { useUpdateUserInfo } from '@/hooks/auth/useUpdateUserInfo';

export const NotificationSettingScreen: ActivityComponentType<'NotificationSettingScreen'> = () => {
  return (
    <DefaultErrorBoundary>
      <NotificationSettingScreenContent />
    </DefaultErrorBoundary>
  );
};

const NotificationSettingScreenContent = () => {
  const { data: user } = useGetUserInfo();
  const updateUserInfo = useUpdateUserInfo();

  const [marketingAgreeChecked, setMarketingAgreeChecked] = useState(user.marketingConsent);
  const [pushAgreeChecked, setPushAgreeChecked] = useState(user.pushAgreed);

  const onMarketingConsentChange = (value: boolean) => {
    setMarketingAgreeChecked(value);

    updateUserInfo.mutate(
      {
        marketingConsent: value,
        pushAgreed: user.pushAgreed,
        nickname: user.nickname ?? undefined,
        gender: user.gender ?? undefined,
      },
      {
        onError: () => {
          setMarketingAgreeChecked(!value);
        },
      },
    );
  };

  const onPushAgreeChange = (value: boolean) => {
    setPushAgreeChecked(value);

    updateUserInfo.mutate(
      {
        marketingConsent: user.marketingConsent,
        pushAgreed: value,
        nickname: user.nickname ?? undefined,
        gender: user.gender ?? undefined,
      },
      {
        onError: () => {
          setPushAgreeChecked(!value);
        },
      },
    );
  };

  return (
    <Screen
      header={<Header title='알림 설정' left={<Header.Back />} />}
      bottomTab={<BottomTab currentTab='mypage' />}
    >
      <div className='flex flex-col px-grid-margin py-grid-margin body-3 gap-9'>
        <div className='flex justify-between'>
          <span>서비스 알림 받기</span>
          <Switch
            checked={pushAgreeChecked}
            onChange={(pushAgreeChecked) => onPushAgreeChange(pushAgreeChecked)}
          />
        </div>
        <div className='flex justify-between'>
          <div>
            <div className='flex gap-2 items-center'>
              <span>마케팅 알림 받기</span>
              <span className='body-8 text-primary-pink'>약관 보기</span>
            </div>
            <span className='body-8 text-gray-5'>이벤트, 할인 등 다양한 혜택을 안내드려요!</span>
          </div>
          <Switch
            checked={marketingAgreeChecked}
            onChange={(marketingAgreeChecked) => onMarketingConsentChange(marketingAgreeChecked)}
          />
        </div>
      </div>
    </Screen>
  );
};
