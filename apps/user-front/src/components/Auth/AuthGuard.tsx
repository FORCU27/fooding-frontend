import React from 'react';

import { useLoginBottomSheet } from './LoginBottomSheet';
import { useAuth } from '../Provider/AuthProvider';

/**
 * 로그인이 되어있지 않은 경우 로그인 모달을 띄웁니다. onClick 이벤트만 지원합니다.
 *
 * @example
 * <AuthGuard>
 *  <button onClick={() => conosle.log('로그인 되어있음')}>로그인이 필요한 액션</button>
 * </AuthGuard>
 */
export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const loginBottomSheet = useLoginBottomSheet();
  const { user } = useAuth();

  const isLoggedIn = !!user;

  const onClick = () => {
    loginBottomSheet.open();
  };

  return React.isValidElement<React.ComponentPropsWithRef<'button'>>(children)
    ? React.cloneElement(children, {
        ...children.props,
        onClick: !isLoggedIn ? onClick : children.props.onClick,
      })
    : children;
};
