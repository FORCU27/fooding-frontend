import { GetStoreWaitingOverviewResult } from '@repo/api/app';

interface WaitingStatsProps {
  waitingOverview?: GetStoreWaitingOverviewResult;
  onClickWaitingList?: () => void;
}

export const WaitingStats = ({
  waitingOverview,
  onClickWaitingList,
}: WaitingStatsProps) => (
  <div className='flex flex-row mt-12'>
    <div
      className='w-[250px] flex flex-col items-center cursor-pointer hover:bg-gray-50 rounded-2xl transition-colors py-2'
      onClick={onClickWaitingList}
    >
      <h3 className='subtitle-2-2 font-bold mb-4 mt-4'>현재 웨이팅</h3>
      <p className='text-[125px] font-bold text-primary-pink whitespace-nowrap'>
        {waitingOverview?.waitingCount ?? 0}
        <span className='text-3xl ml-2'>팀</span>
      </p>
    </div>
    <div className='w-[250px] border-l border-dark flex flex-col items-center'>
      <h3 className='subtitle-2-2 font-bold mb-4 mt-4'>예상시간</h3>
      <p className='text-[125px] font-bold text-primary-pink whitespace-nowrap'>
        {waitingOverview?.estimatedWaitingTimeMinutes ?? 0}
        <span className='text-3xl ml-2'>분</span>
      </p>
    </div>
  </div>
);
