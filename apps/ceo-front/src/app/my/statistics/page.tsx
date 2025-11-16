'use client';

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const StatisticsPage = () => {
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

  // 7월 캘린더 데이터 (2025년 7월)
  const calendarDays = ['일', '월', '화', '수', '목', '금', '토'];
  const calendarDates = [
    [null, null, null, null, null, null, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, 31, null, null, null, null, null],
  ];

  return (
    <div className='min-h-screen p-6'>
      <div className='max-w-7xl mx-auto space-y-6'>
        {/* 상단 메트릭 카드들 */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* 총 매출 카드 */}
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <div className='text-gray-600 text-sm mb-2'>총 매출</div>
            <div className='text-3xl font-bold text-gray-900 mb-2'>7,941,900 원</div>
            <div className='flex items-center text-green-600 text-sm'>
              <svg className='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z' clipRule='evenodd' />
              </svg>
              0.6% 어제
            </div>
          </div>

          {/* 오늘 방문자 수 카드 */}
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <div className='text-gray-600 text-sm mb-2'>오늘 방문자 수</div>
            <div className='text-3xl font-bold text-gray-900 mb-2'>563 팀</div>
            <div className='flex items-center text-red-600 text-sm'>
              <svg className='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z' clipRule='evenodd' />
              </svg>
              1.2% 어제
            </div>
          </div>

          {/* 오늘 웨이팅 수 카드 */}
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <div className='text-gray-600 text-sm mb-2'>오늘 웨이팅 수</div>
            <div className='text-3xl font-bold text-gray-900 mb-2'>229 팀</div>
            <div className='flex items-center text-red-600 text-sm'>
              <svg className='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z' clipRule='evenodd' />
              </svg>
              1.2% 어제
            </div>
          </div>
        </div>

        {/* 목표 매출 카드 */}
        <div className='bg-white rounded-lg shadow-sm p-6'>
          <div className='text-gray-600 text-sm mb-2'>2025 목표 매출</div>
          <div className='text-3xl font-bold text-gray-900 mb-4'>40%</div>
          <div className='w-full bg-gray-200 rounded-full h-3 mb-2'>
            <div className='bg-purple-500 h-3 rounded-full' style={{ width: '40%' }}></div>
          </div>
          <div className='flex justify-between text-xs text-gray-500'>
            <span>0%</span>
            <span>20%</span>
            <span>40%</span>
            <span>60%</span>
            <span>80%</span>
            <span>100%</span>
          </div>
        </div>

        {/* 하단 카드들 */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* 캘린더 카드 */}
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <div className='flex items-center justify-center mb-4'>
              <button className='p-1 hover:bg-gray-100 rounded'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                </svg>
              </button>
              <h3 className='text-lg font-semibold mx-4'>2025년 7월</h3>
              <button className='p-1 hover:bg-gray-100 rounded'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
              </button>
            </div>
            
            <div className='mb-4'>
              {/* 요일 헤더 */}
              <div className='grid grid-cols-7 gap-1 text-center text-sm mb-2'>
                {calendarDays.map((day, index) => (
                  <div
                    key={day}
                    className={`font-medium py-2 ${index === 0 || index === 6 ? 'text-red-500' : 'text-gray-900'}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              
              {/* 날짜 그리드 */}
              <div className='grid grid-cols-7 gap-1'>
                {calendarDates.flat().map((date, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 flex items-center justify-center text-sm rounded-full ${
                      date === 19
                        ? 'bg-purple-500 text-white'
                        : date === null
                        ? ''
                        : index % 7 === 0 || index % 7 === 6
                        ? 'text-red-500'
                        : 'text-gray-900'
                    }`}
                  >
                    {date}
                  </div>
                ))}
              </div>
            </div>

            <div className='bg-purple-500 text-white px-4 py-2 rounded-full text-sm text-center'>
              19 7월 이벤트 한달 20% 할인데이!
            </div>
          </div>

          {/* 웨이팅 상태 및 차트 카드 */}
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <div className='grid grid-cols-3 gap-4 mb-6'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900'>48 팀</div>
                <div className='text-sm text-gray-600'>현재 웨이팅</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900'>32 분</div>
                <div className='text-sm text-gray-600'>예상 시간</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-gray-900'>4 분전</div>
                <div className='text-sm text-gray-600'>최근 입장</div>
              </div>
            </div>

            <div className='h-48'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart data={chartData}>
                  <XAxis 
                    dataKey='time' 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    domain={[0, 100]}
                    ticks={[0, 10, 30, 50, 70, 100]}
                  />
                  <Area
                    type='monotone'
                    dataKey='value'
                    stroke='#8B5CF6'
                    fill='#8B5CF6'
                    fillOpacity={0.3}
                    strokeWidth={2}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#8B5CF6' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
