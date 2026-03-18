'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

const waitingDetail = {
  callNumber: '2 [ 현장 ]',
  phone: '010-0000-0000',
  name: '홍길동',
  channel: '현장',
  people: '총 4명 · 성인 3 · 유아 1 - 유아용 의자 1',
  visitCount: '5회 방문',
  memo: '고객 요청',
  user: '-',
  status: '웨이팅 중',
  waitTime: '4분 대기',
};

const history = [
  {
    id: 1,
    label: '웨이팅 등록',
    date: '2025-03-31',
    time: '18:30:20',
    memo: '카카오톡 성공',
  },
  {
    id: 2,
    label: '입장 호출',
    date: '2025-03-31',
    time: '18:34:35',
    memo: '카카오톡 성공',
  },
  {
    id: 3,
    label: '웨이팅 취소',
    date: '2025-03-31',
    time: '18:40:10',
    memo: '카카오톡 미발송',
  },
];

const cellBase =
  'w-[167px] px-6 py-5 text-base font-semibold text-[#767676] flex items-center justify-start flex-shrink-0';
const valueBase =
  'flex-1 px-6 py-5 text-lg font-medium text-[#111111] flex items-center justify-between gap-4 min-h-[72px]';

const DetailRow = ({
  label,
  value,
  action,
}: {
  label: string;
  value: string;
  action?: ReactNode;
}) => (
  <div className='flex items-center'>
    <div className={cellBase}>{label}</div>
    <div className={valueBase}>
      <span className='flex-1'>{value}</span>
      {action}
    </div>
  </div>
);

const HistoryRow = ({
  id,
  label,
  date,
  time,
  memo,
}: {
  id: number;
  label: string;
  date: string;
  time: string;
  memo: string;
}) => (
  <div className='grid grid-cols-[72px,180px,1fr,180px] border-b border-[#E2DFDF] last:border-b-0'>
    <div className='flex items-center justify-center px-6 py-6 text-lg font-semibold text-[#111111]'>{id}</div>
    <div className='flex items-center px-6 py-6 text-lg font-medium text-[#111111]'>{label}</div>
    <div className='flex flex-col justify-center px-6 py-4 text-base font-medium text-[#111111]'>
      <span>{date}</span>
      <span className='text-sm font-medium text-[#767676]'>{time}</span>
    </div>
    <div className='flex items-center justify-between px-6 py-4 text-base font-medium text-[#111111]'>
      <span>{memo}</span>
      <button
        type='button'
        className='w-[52px] h-[54px] rounded-[12px] border border-[#E2DFDF] flex items-center justify-center'
      >
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M12 8V16M8 12H16' stroke='#767676' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      </button>
    </div>
  </div>
);

const WaitingDetailPage = () => {
  const router = useRouter();

  return (
    <div className='min-h-screen bg-[#F1F3F5]'>
      <header className='w-full bg-white border-b border-[#EDEDED]'>
        <div className='mx-auto flex h-[60px] w-full max-w-[1280px] items-center px-6'>
          <button
            type='button'
            onClick={() => router.back()}
            className='flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2DFDF]'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M15 18L9 12L15 6'
                stroke='#111111'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <h1 className='ml-4 text-xl font-semibold text-[#111111]'>웨이팅 상세</h1>
        </div>
      </header>

      <div className='mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-6 py-8'>
        <div className='flex flex-wrap items-center justify-between gap-4 px-1'>
          <div className='flex items-center gap-6 text-lg font-semibold text-[#111111]'>
            <span>상세정보</span>
            <span>웨이팅 이력</span>
          </div>
          <span className='text-lg font-semibold text-[#111111]'>{`${waitingDetail.status} (${waitingDetail.waitTime})`}</span>
        </div>
        <div className='flex flex-col gap-6 lg:flex-row'>
          <section className='w-full rounded-[12px] bg-white shadow-sm lg:w-[612px] divide-y divide-[#E2DFDF]'>
            <DetailRow
              label='호출번호'
              value={waitingDetail.callNumber}
              action={
                <button
                  type='button'
                  className='rounded-[8px] border border-[#E2DFDF] px-5 py-2 text-sm font-medium text-[#111111]'
                >
                  변경
                </button>
              }
            />
            <DetailRow
              label='채널'
              value={waitingDetail.channel}
            />
            <DetailRow
              label='휴대폰 번호'
              value={waitingDetail.phone}
              action={
                <button
                  type='button'
                  className='rounded-[8px] border border-[#E2DFDF] px-5 py-2 text-sm font-medium text-[#111111]'
                >
                  변경
                </button>
              }
            />
            <DetailRow label='이름' value={waitingDetail.name} />
            <DetailRow label='방문이력' value={waitingDetail.visitCount} />
            <DetailRow label='웨이팅 인원' value={waitingDetail.people} />
            <DetailRow
              label='메모'
              value={waitingDetail.memo}
              action={
                <button
                  type='button'
                  className='h-[54px] w-[52px] rounded-[12px] border border-[#E2DFDF] flex items-center justify-center'
                  aria-label='메모 수정'
                >
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M12 8V16M8 12H16'
                      stroke='#767676'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
              }
            />
            <DetailRow label='사용자' value={waitingDetail.user} />
          </section>

          <section className='w-full rounded-[12px] bg-white shadow-sm lg:flex-1'>
            <div className='grid grid-cols-[72px,180px,1fr,180px] rounded-t-[12px] border-b-2 border-[#E2DFDF] bg-white text-base font-semibold text-[#767676]'>
              <div className='flex items-center justify-center px-6 py-4'>No.</div>
              <div className='flex items-center px-6 py-4'>상태</div>
              <div className='flex items-center px-6 py-4'>시간</div>
              <div className='flex items-center px-6 py-4'>메모</div>
            </div>
            {history.map((item) => (
              <HistoryRow key={item.id} {...item} />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default WaitingDetailPage;
