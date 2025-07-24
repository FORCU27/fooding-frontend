import { JSX, useEffect, useState } from 'react';

import { UserIcon } from '@repo/design-system/icons';
import { Link } from '@stackflow/link/future';
import { useFlow } from '@stackflow/react/future';

import { useLoginBottomSheet } from '../Auth/LoginBottomSheet';
import { useAuth } from '../Provider/AuthProvider';

type ReservationLinkProps = {
  BottomTabItem: (props: { children: React.ReactNode; isActive: boolean }) => JSX.Element;
  BottomTabLabel: (props: { children: React.ReactNode }) => JSX.Element;
  isActive: boolean;
};

export const ReservationLink = ({
  BottomTabItem,
  BottomTabLabel,
  isActive,
}: ReservationLinkProps) => {
  const loginBottomSheet = useLoginBottomSheet();
  const { user } = useAuth();
  const flow = useFlow();

  const isLoggedIn = !!user;
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked && isLoggedIn) {
      flow.push('ReservationTab', {});
      loginBottomSheet.close();
      setClicked(false);
    }
  }, [clicked, isLoggedIn, flow, loginBottomSheet]);

  const handleClick = (e: React.MouseEvent) => {
    if (isActive) e.preventDefault();

    if (!isLoggedIn) {
      e.preventDefault();
      setClicked(true);
      loginBottomSheet.open();
    }
  };

  return (
    <BottomTabItem isActive={isActive}>
      <Link
        activityName='ReservationTab'
        activityParams={{}}
        replace
        animate={false}
        onClick={handleClick}
      >
        <UserIcon size={24} />
        <BottomTabLabel>예약/웨이팅</BottomTabLabel>
      </Link>
    </BottomTabItem>
  );
};
