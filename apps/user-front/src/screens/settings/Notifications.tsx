/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';

import { Switch } from '@repo/design-system/components/b2c';
import { ActivityComponentType, useFlow } from '@stackflow/react/future';

import BottomTab from '@/components/Layout/BottomTab';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';
import { useAuth } from '@/components/Provider/AuthProvider';
import { useUpdateUserInfo } from '@/hooks/auth/useUpdateUserInfo';

export const NotificationSettingScreen: ActivityComponentType<'NotificationSettingScreen'> = () => {
  const { user } = useAuth();
  const { pop } = useFlow();

  const updateAgreeStatus = useUpdateUserInfo();
  const [initialMarketingAgree] = useState(user?.marketingConsent ?? false);
  const [initialPushAgree] = useState(user?.pushAgreed ?? false);

  const [marketingAgree, setMarketingAgree] = useState(initialMarketingAgree);
  const [pushAgree, setPushAgree] = useState(initialPushAgree);

  const handleSwitchChange = (key: 'push' | 'marketing') => {
    if (key === 'push') {
      const next = !pushAgree;
      setPushAgree(next);
    }
    if (key === 'marketing') {
      const next = !marketingAgree;
      setMarketingAgree(next);
    }
  };

  useEffect(() => {
    const isChanged = marketingAgree !== initialMarketingAgree || pushAgree !== initialPushAgree;

    if (user && isChanged) {
      updateAgreeStatus.mutate(
        {
          marketingConsent: marketingAgree,
          pushAgreed: pushAgree,
          nickname: user.nickname ?? undefined,
          gender: user.gender ?? undefined,
        },
        {
          onSuccess: () => {
            pop();
          },
        },
      );
    }
  }, [marketingAgree, pushAgree]);

  return (
    <Screen
      header={<Header title='알림 설정' left={<Header.Back />} />}
      bottomTab={<BottomTab currentTab='mypage' />}
    >
      <div className='flex flex-col px-grid-margin py-grid-margin body-3 gap-9'>
        <div className='flex justify-between'>
          <span>서비스 알림 받기</span>
          <Switch
            onClick={() => handleSwitchChange('push')}
            checked={pushAgree}
            disabled={updateAgreeStatus.isPending}
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
            onClick={() => handleSwitchChange('marketing')}
            checked={marketingAgree}
            disabled={updateAgreeStatus.isPending}
          />
        </div>
      </div>
    </Screen>
  );
};
