import { ActivityComponentType } from '@stackflow/react/future';

import BottomTab from '@/components/Layout/BottomTab';
import { Screen } from '@/components/Layout/Screen';

export const ReservationTab: ActivityComponentType<'ReservationTab'> = () => {
  return <Screen bottomTab={<BottomTab currentTab='reservation' />}>Reservation</Screen>;
};
