import { GetStoreWaitingOverviewResult } from '@repo/api/app';

import { ActionButtons } from './ActionButtons';
import { StoreName } from './StoreName';
import { WaitingInfo } from './WaitingInfo';
import { WaitingStats } from './WaitingStats';

export const MainContent = ({
  onClick,
  waitingOverview,
}: {
  onClick: () => void;
  waitingOverview?: GetStoreWaitingOverviewResult;
}) => (
  <div className='flex-1 max-w-4xl'>
    <StoreName />
    <WaitingInfo />
    <WaitingStats waitingOverview={waitingOverview} />
    <ActionButtons onClick={onClick} />
  </div>
);
