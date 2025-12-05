'use client';

import { useState } from 'react';

type RewardTab = 'usage' | 'earn';
type RewardFilter = 'request' | 'completed' | 'cancelled';

interface RewardRow {
  id: number;
  item: string;
  category: string;
  table: string;
  status: string;
  statusTone: 'pending' | 'done' | 'cancelled';
  requestedAt: string;
  subText?: string;
}

interface EarnRow {
  id: number;
  channel: string;
  type: string;
  phone: string;
  earnedAt: string;
}

const rewardTabs: { id: RewardTab; label: string }[] = [
  { id: 'usage', label: '사용내역' },
  { id: 'earn', label: '적립내역' },
];

const filterTabs: { id: RewardFilter; label: string }[] = [
  { id: 'request', label: '신청' },
  { id: 'completed', label: '완료' },
  { id: 'cancelled', label: '취소' },
];

const rows: RewardRow[] = [
  {
    id: 1,
    item: '리뷰',
    category: '새우꼬치 증 쿠폰',
    table: '14',
    status: '대기중',
    statusTone: 'pending',
    requestedAt: '2025-04-12 23:12:45',
  },
  {
    id: 2,
    item: '쿠폰',
    category: '계란밥 쿠폰 사용',
    table: '-',
    status: '대기중',
    statusTone: 'pending',
    requestedAt: '2025-04-12 23:12:45',
  },
  {
    id: 3,
    item: '쿠폰',
    category: '랜덤 사이드 메뉴 쿠폰 사용',
    table: '2',
    status: '사용 완료',
    statusTone: 'done',
    requestedAt: '2025-04-12 23:12:45',
  },
  {
    id: 4,
    item: '쿠폰',
    category: '랜덤 사리 추가 쿠폰 사용',
    table: '-',
    status: '사용 취소',
    statusTone: 'cancelled',
    requestedAt: '2025-04-12 23:12:45',
  },
];

const earnRows: EarnRow[] = [
  {
    id: 1,
    channel: '매장',
    type: '방문',
    phone: '010 7150 4560',
    earnedAt: '2025-04-12 23:12:45',
  },
  {
    id: 2,
    channel: '매장',
    type: '방문',
    phone: '010 7150 4560',
    earnedAt: '2025-04-12 23:12:45',
  },
  {
    id: 3,
    channel: '매장',
    type: '방문',
    phone: '010 7150 4560',
    earnedAt: '2025-04-12 23:12:45',
  },
  {
    id: 4,
    channel: '매장',
    type: '방문',
    phone: '010 7150 4560',
    earnedAt: '2025-04-12 23:12:45',
  },
];

const toneClassMap: Record<RewardRow['statusTone'], string> = {
  pending: 'text-error-red',
  done: 'text-fooding-purple',
  cancelled: 'text-info-blue',
};

const RewardsPage = () => {
  const [activeTab, setActiveTab] = useState<RewardTab>('usage');
  const [activeFilter, setActiveFilter] = useState<RewardFilter>('request');

  return (
    <div className='min-h-[calc(100vh-60px)] w-full bg-[#F1F3F5]'>
      {/* 탭 메뉴 */}
      <div className='flex items-center gap-0 bg-white'>
        {rewardTabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type='button'
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-[63px] py-[22px] text-base font-medium transition-colors ${
                isActive
                  ? 'text-[#6366F1] border-b-[5px] border-[#6366F1]'
                  : 'text-[#767676] border-b-[5px] border-transparent'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className='mx-auto w-full max-w-[1280px]'>
        <div className='px-10 py-6'>
          {activeTab === 'usage' && (
            <div className='mt-6 flex items-center gap-3 rounded-[24px] bg-[#ECEEF4] px-6 py-4'>
              {filterTabs.map((filter) => {
                const isActive = filter.id === activeFilter;
                return (
                  <button
                    key={filter.id}
                    type='button'
                    onClick={() => setActiveFilter(filter.id)}
                    className={`min-w-[90px] rounded-full px-5 py-2 text-base font-semibold transition-all ${
                      isActive
                        ? 'border-2 border-[#6366F1] bg-white text-[#6366F1] shadow-[0_10px_25px_rgba(100,106,255,0.15)]'
                        : 'border border-gray-3 bg-[#F8F8FA] text-gray-4 hover:text-gray-5'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          )}

          <div className='mt-8 overflow-hidden rounded-[20px] border border-gray-2 bg-white'>
            {activeTab === 'usage' ? (
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='border-b border-gray-2 bg-[#F8F8FB]'>
                    <th className='w-[120px] px-8 py-3 text-left text-sm font-semibold text-gray-5'>항목</th>
                    <th className='px-8 py-3 text-left text-sm font-semibold text-gray-5'>카테고리</th>
                    <th className='w-[100px] px-8 py-3 text-center text-sm font-semibold text-gray-5'>테이블</th>
                    <th className='w-[120px] px-8 py-3 text-center text-sm font-semibold text-gray-5'>상태</th>
                    <th className='w-[220px] px-8 py-3 text-left text-sm font-semibold text-gray-5'>신청시간</th>
                    <th className='w-[200px] px-8 py-3'></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => {
                    const [date, time] = row.requestedAt.split(' ');

                    return (
                      <tr key={row.id} className='border-b border-gray-2 last:border-b-0'>
                        <td className='px-8 py-2 text-sm font-semibold text-gray-6'>{row.item}</td>
                        <td className='px-8 py-2 text-sm font-medium text-gray-6'>
                          {row.category}
                          {row.subText && <span className='ml-2 text-xs text-gray-4'>{row.subText}</span>}
                        </td>
                        <td className='px-8 py-2 text-center text-sm font-semibold text-gray-6'>{row.table}</td>
                        <td className={`px-8 py-2 text-center text-sm font-semibold ${toneClassMap[row.statusTone]}`}>
                          {row.status}
                        </td>
                        <td className='px-8 py-2 text-sm text-gray-6'>
                          <span className='font-medium'>{date}</span>
                          <span className='ml-2 text-xs text-gray-4'>{time}</span>
                        </td>
                        <td className='px-8 py-2'>
                          <div className='flex items-center justify-end gap-2'>
                            <button
                              type='button'
                              className='h-7 min-w-[90px] rounded-[12px] bg-[#6366F1] px-3 py-1 text-xs font-semibold text-white shadow-[0_12px_24px_rgba(106,104,255,0.35)]'
                            >
                              사용완료
                            </button>
                            <button
                              type='button'
                              className='h-7 min-w-[90px] rounded-[12px] border border-gray-3 bg-[#F2F2F5] px-3 py-1 text-xs font-semibold text-gray-5'
                            >
                              신청취소
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='border-b-2 border-gray-3 bg-[#F8F8FB]'>
                    <th className='w-[140px] px-6 py-6 text-left text-base font-medium text-gray-5'>채널</th>
                    <th className='w-[140px] px-6 py-6 text-left text-base font-medium text-gray-5'>종류</th>
                    <th className='w-[256px] px-6 py-6 text-left text-base font-medium text-gray-5'>휴대폰 번호</th>
                    <th className='w-[256px] px-6 py-5 text-left text-base font-medium text-gray-5'>적립시간</th>
                    <th className='px-6 py-6'></th>
                  </tr>
                </thead>
                <tbody>
                  {earnRows.map((row) => {
                    const [date, time] = row.earnedAt.split(' ');

                    return (
                      <tr key={row.id} className='border-b border-gray-3 last:border-b-0'>
                        <td className='px-6 py-8 text-base font-medium text-gray-6'>{row.channel}</td>
                        <td className='px-6 py-8 text-base font-medium text-gray-6'>{row.type}</td>
                        <td className='px-6 py-8 text-base font-medium text-gray-6'>{row.phone}</td>
                        <td className='px-6 py-5 text-base text-gray-6'>
                          <div className='flex flex-col'>
                            <span className='font-medium'>{date}</span>
                            <span className='text-sm text-gray-5'>{time}</span>
                          </div>
                        </td>
                        <td className='px-6 py-8'>
                          <div className='flex items-center justify-end'>
                            <button
                              type='button'
                              className='h-9 w-[132px] rounded-[12px] bg-[#6366F1] px-8 py-[18px] text-base font-medium text-white'
                            >
                              적립취소
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          <div className='mt-8 flex items-center justify-center gap-4 text-gray-4'>
            <button
              type='button'
              className='flex h-9 w-9 items-center justify-center rounded-full border border-gray-2 bg-white text-lg text-gray-4'
              aria-label='이전 페이지'
            >
              ‹
            </button>
            <span className='text-sm font-semibold text-gray-5'>1 / 1</span>
            <button
              type='button'
              className='flex h-9 w-9 items-center justify-center rounded-full border border-gray-2 bg-white text-lg text-gray-4'
              aria-label='다음 페이지'
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
