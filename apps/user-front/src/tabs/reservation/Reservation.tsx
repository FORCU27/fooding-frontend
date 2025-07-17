import { Tabs } from '@repo/design-system/components/b2c';
import { ActivityComponentType } from '@stackflow/react/future';

import { ReservationCanceledList } from './components/ReservationCanceledList';
import { ReservationCompletedList } from './components/ReservationCompletedList';
import { ReservationScheuledList } from './components/ReservationScheuledList';
import BottomTab from '@/components/Layout/BottomTab';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';

const tabItems = [
  { value: '1', label: '방문예정', content: <ReservationScheuledList /> },
  { value: '2', label: '방문완료', content: <ReservationCompletedList /> },
  { value: '3', label: '취소/노쇼', content: <ReservationCanceledList /> },
];

export const ReservationTab: ActivityComponentType<'ReservationTab'> = () => {
  return (
    <Screen
      header={<Header title='예약/웨이팅' />}
      bottomTab={<BottomTab currentTab='reservation' />}
    >
      <Tabs defaultValue='1' className='flex flex-col h-full'>
        <Tabs.List fullWidth className='flex-shrink-0 bg-white'>
          {tabItems.map(({ value, label }) => (
            <Tabs.Trigger key={value} value={value}>
              {label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {tabItems.map(({ value, content }) => (
          <Tabs.Content
            key={value}
            value={value}
            className='flex-grow overflow-y-auto scrollbar-hide bg-gray-1'
          >
            <div className='h-full'>{content}</div>
          </Tabs.Content>
        ))}
      </Tabs>
    </Screen>
  );
};
