'use client';

import { useState } from 'react';

import { DatePicker } from '@repo/design-system/components/ceo';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { useStore } from '@/context/StoreContext';
import { useStatistics } from '@/hooks/store/useStatistics';

const StatisticsPage = () => {
  const { storeId } = useStore();
  const selectedStoreId = storeId ? Number(storeId) : null;

  // 선택된 날짜 상태 관리
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Get selected date in YYYY-MM-DD format
  const dateString = selectedDate.toISOString().split('T')[0] || '';

  const {
    data: statisticsResponse,
    isLoading,
    isError,
  } = useStatistics(selectedStoreId, dateString);

  // 통계 데이터 또는 기본값 사용
  const statistics = statisticsResponse?.data || {
    totalSales: 0,
    totalSalesChangeRate: 0,
    totalVisitors: 0,
    visitorChangeRate: 0,
    annualTargetSalesRate: 0,
    currentWaitingCount: 0,
    expectedWaitingTime: 0,
    lastEntranceMinutesAgo: 0,
  };

  const showSkeleton = isLoading && !isError;

  // 차트 데이터
  const chartData = [
    { time: '00시', value: 20 },
    { time: '03시', value: 15 },
    { time: '06시', value: 25 },
    { time: '09시', value: 40 },
    { time: '12시', value: 85 },
    { time: '15시', value: 60 },
    { time: '18시', value: 70 },
    { time: '21시', value: 45 },
    { time: '24시', value: 30 },
  ];

  // 날짜 변경 핸들러
  const handleDateChange = (date: Date | Date[] | null) => {
    if (date && !Array.isArray(date)) {
      setSelectedDate(date);
    }
  };

  // 숫자 포맷팅 헬퍼 함수
  const formatNumber = (num: number) => num.toLocaleString('ko-KR');
  const formatChangeRate = (rate: number) => {
    const absRate = Math.abs(rate) / 100;
    return absRate.toFixed(1);
  };

  return (
    <div className='min-h-screen p-6'>
      <div className='max-w-7xl mx-auto space-y-6'>
        {/* 데이터 없음 알림 */}
        {/* {!hasData && !showSkeleton && (
          <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
            <div className='flex items-center'>
              <svg
                className='w-5 h-5 text-yellow-600 mr-2'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='text-sm text-yellow-800'>
                통계 데이터가 아직 생성되지 않았습니다. 기본값으로 표시됩니다.
              </span>
            </div>
          </div>
        )} */}

        {/* 상단 메트릭 카드들 */}
        {showSkeleton ? (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='bg-white rounded-lg shadow-sm p-6 animate-pulse'>
                <div className='h-4 bg-gray-200 rounded w-24 mb-2'></div>
                <div className='h-8 bg-gray-200 rounded w-32 mb-2'></div>
                <div className='h-4 bg-gray-200 rounded w-20'></div>
              </div>
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* 총 매출 카드 */}
            <div className='bg-white rounded-lg shadow-sm p-6'>
              <div className='text-gray-600 text-sm mb-2'>총 매출</div>
              <div className='text-3xl font-bold text-gray-900 mb-2'>
                {formatNumber(statistics.totalSales)} 원
              </div>
              <div
                className={`flex items-center text-sm ${statistics.totalSalesChangeRate >= 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                <svg className='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                  {statistics.totalSalesChangeRate >= 0 ? (
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z'
                      clipRule='evenodd'
                    />
                  ) : (
                    <path
                      fillRule='evenodd'
                      d='M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  )}
                </svg>
                {formatChangeRate(statistics.totalSalesChangeRate)}% 어제
              </div>
            </div>

            {/* 오늘 방문자 수 카드 */}
            <div className='bg-white rounded-lg shadow-sm p-6'>
              <div className='text-gray-600 text-sm mb-2'>오늘 방문자 수</div>
              <div className='text-3xl font-bold text-gray-900 mb-2'>
                {formatNumber(statistics.totalVisitors)} 팀
              </div>
              <div
                className={`flex items-center text-sm ${statistics.visitorChangeRate >= 0 ? 'text-green-600' : 'text-red-600'}`}
              >
                <svg className='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                  {statistics.visitorChangeRate >= 0 ? (
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z'
                      clipRule='evenodd'
                    />
                  ) : (
                    <path
                      fillRule='evenodd'
                      d='M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  )}
                </svg>
                {formatChangeRate(statistics.visitorChangeRate)}% 어제
              </div>
            </div>

            {/* 오늘 웨이팅 수 카드 - 목표 매출 달성률로 변경 */}
            {/* <div className='bg-white rounded-lg shadow-sm p-6'>
              <div className='text-gray-600 text-sm mb-2'>연간 목표 매출 달성률</div>
              <div className='text-3xl font-bold text-gray-900 mb-2'>
                {formatChangeRate(statistics.annualTargetSalesRate)}%
              </div>
            </div> */}
          </div>
        )}

        {/* 목표 매출 카드 */}
        {showSkeleton ? (
          <div className='bg-white rounded-lg shadow-sm p-6 animate-pulse'>
            <div className='h-4 bg-gray-200 rounded w-32 mb-2'></div>
            <div className='h-8 bg-gray-200 rounded w-20 mb-4'></div>
            <div className='w-full bg-gray-200 rounded-[12px] h-12 mb-2'></div>
            <div className='flex justify-between'>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className='h-3 bg-gray-200 rounded w-8'></div>
              ))}
            </div>
          </div>
        ) : (
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <div className='text-gray-600 text-sm mb-2'>2025 목표 매출</div>
            <div className='text-3xl font-bold text-gray-900 mb-4'>
              {formatChangeRate(statistics.annualTargetSalesRate)}%
            </div>
            <div className='flex justify-between text-xs text-gray-500 mb-3'>
              <span>0%</span>
              <span>20%</span>
              <span>40%</span>
              <span>60%</span>
              <span>80%</span>
              <span>100%</span>
            </div>
            <div className='w-full bg-gray-200 rounded-[12px] h-12 mb-2'>
              <div
                className='bg-purple-500 h-3 rounded-[12px]'
                style={{
                  width: `${Math.min(statistics.annualTargetSalesRate / 100, 100)}%`,
                }}
              ></div>
            </div>
          </div>
        )}

        {/* 하단 카드들 */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* 캘린더 카드 */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg'>
              <DatePicker
                mode='single'
                value={selectedDate}
                onChange={handleDateChange}
                disablePast={false}
                className='w-full'
              />
            </div>
            <div className='bg-white body-2 px-[32px] py-[18px] rounded-lg text-sm text-center mt-4 flex items-center gap-2'>
              <span className='rounded-full w-8 h-8 flex body-5 items-center justify-center transition-colors relative bg-fooding-purple text-white cursor-pointer z-10'>
                {selectedDate.getDate()}
              </span>{' '}
              {selectedDate.getMonth() + 1}월 이벤트 한달 20% 할인데이!
            </div>
          </div>

          {/* 웨이팅 현황 차트 카드 */}
          {showSkeleton ? (
            <div className='bg-white rounded-lg shadow-sm p-8 animate-pulse lg:col-span-2'>
              <div className='h-6 bg-gray-200 rounded w-32 mb-8'></div>
              <div className='h-60 bg-gray-200 rounded'></div>
            </div>
          ) : (
            <div className='bg-white rounded-lg shadow-sm p-8 lg:col-span-2'>
              <h2 className='text-gray-600 text-sm mb-2'>웨이팅 현황</h2>

              <div className='h-60'>
                <ResponsiveContainer width='100%' height='100%'>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id='colorValue' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='0%' stopColor='#8B5CF6' stopOpacity={0.8} />
                        <stop offset='100%' stopColor='#8B5CF6' stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray='0' stroke='#E5E7EB' vertical={false} />
                    <XAxis
                      dataKey='time'
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 14, fill: '#9CA3AF' }}
                      dy={10}
                    />
                    <YAxis
                      orientation='right'
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 14, fill: '#D1D5DB' }}
                      domain={[0, 100]}
                      ticks={[0, 10, 30, 50, 70, 100]}
                      dx={10}
                    />
                    <Area
                      type='monotone'
                      dataKey='value'
                      stroke='#8B5CF6'
                      fill='url(#colorValue)'
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, fill: '#8B5CF6', strokeWidth: 0 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
