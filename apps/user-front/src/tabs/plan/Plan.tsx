import { Tabs } from '@repo/design-system/components/b2c';
import { ActivityComponentType } from '@stackflow/react/future';

import { PlanCanceledList } from './components/PlanCanceledList';
import { PlanCompletedList } from './components/PlanCompletedList';
import { PlanScheuledList } from './components/PlanScheuledList';
import BottomTab from '@/components/Layout/BottomTab';
import { Header } from '@/components/Layout/Header';
import { Screen } from '@/components/Layout/Screen';

const tabItems = [
  { value: '1', label: '방문예정', content: <PlanScheuledList /> },
  { value: '2', label: '방문완료', content: <PlanCompletedList /> },
  { value: '3', label: '취소/노쇼', content: <PlanCanceledList /> },
];

export const PlanTab: ActivityComponentType<'PlanTab'> = () => {
  return (
    <Screen header={<Header title='예약/웨이팅' />} bottomTab={<BottomTab currentTab='plan' />}>
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
