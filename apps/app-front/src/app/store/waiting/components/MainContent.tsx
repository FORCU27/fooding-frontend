import { GetStoreWaitingOverviewResult } from '@repo/api/app';

import { ActionButtons } from './ActionButtons';
import { StoreName } from './StoreName';
import { WaitingInfo } from './WaitingInfo';
import { WaitingStats } from './WaitingStats';

interface MainContentProps {
  onClick: () => void;
  waitingOverview?: GetStoreWaitingOverviewResult;
  onClickWaitingList?: () => void;
}

export const MainContent = ({
  onClick,
  waitingOverview,
  onClickWaitingList,
}: MainContentProps) => (
  <div className='flex-1 max-w-4xl'>
    <StoreName />
    <WaitingInfo />
    <WaitingStats waitingOverview={waitingOverview} onClickWaitingList={onClickWaitingList} />
    <ActionButtons onClick={onClick} onClickWaitingList={onClickWaitingList} />
  </div>
);
