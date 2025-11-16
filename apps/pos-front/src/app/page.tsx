'use client';

import { useState } from 'react';

import { Button } from '@repo/design-system/components/b2b';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

interface Notice {
  id: number;
  title: string;
  date: string;
}

const DashboardPage = () => {
  const [currentDate, setCurrentDate] = useState(dayjs('2025-07-19'));
  const [isStoreOpen, setIsStoreOpen] = useState(true);

  const notices: Notice[] = [
    { id: 1, title: '기능 공지사항', date: '2025.05.06' },
    { id: 2, title: '기능 공지사항', date: '2025.05.06' },
    { id: 3, title: '기능 공지사항', date: '2025.05.06' },
  ];

  const monthlyRevenue = '12,343,343';

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        window.location.href = '/login';
      } else {
        console.error('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate((prev) => prev.subtract(1, 'month').clone());
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => prev.add(1, 'month').clone());
  };

  const startOfMonth = currentDate.startOf('month');
  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfWeek = startOfMonth.day();

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const renderCalendarDays = () => {
    const days = [];
    const weeks = [];

    // 빈 날짜 채우기
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // 실제 날짜 채우기
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    // 주 단위로 나누기
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks;
  };

  const calendarWeeks = renderCalendarDays();
  const selectedDay = 19; // 현재 선택된 날짜

  return (
    <div className='min-h-screen bg-gray-1 p-10 w-full'>
      {/* 메인 컨텐츠 */}
      <div className='max-w-[1280px] mx-auto w-full'>
        <div className='flex gap-6'>
          {/* 왼쪽 영역 */}
          <div className='flex-1 space-y-6'>
            {/* 공지사항 카드 */}
            <div className='bg-white rounded-xl p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xl font-bold text-gray-6'>공지사항</h2>
                <button className='text-lg font-bold text-gray-6'>더보기</button>
              </div>
              <div className='space-y-4'>
                {notices.map((notice, index) => (
                  <div key={notice.id} className='flex items-center justify-between p-4 bg-white rounded-lg'>
                    <div className='flex items-center gap-4'>
                      <span className='text-base text-black'>{notice.title}</span>
                      {index === 0 && <span className='text-base text-black'>기능 공지사항이에요</span>}
                    </div>
                    <span className='text-base text-gray-5'>{notice.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 월 매출 카드 */}
            <div className='bg-white rounded-xl p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xl font-bold text-gray-6'>월 매출 {monthlyRevenue}</h2>
                <button className='text-lg font-bold text-gray-6'>더보기</button>
              </div>
            </div>

            {/* 캘린더 */}
            <div className='bg-white rounded-xl p-6'>
              <div className='mb-4'>
                <div className='flex items-center justify-center gap-4 mb-6'>
                  <button onClick={handlePrevMonth} className='w-6 h-6 flex items-center justify-center'>
                    <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M13.75 16.5L8.25 11L13.75 5.5'
                        stroke='#333333'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </button>
                  <h3 className='text-base font-medium text-gray-1'>{currentDate.format('YYYY년 M월')}</h3>
                  <button onClick={handleNextMonth} className='w-6 h-6 flex items-center justify-center'>
                    <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M8.25 5.5L13.75 11L8.25 16.5'
                        stroke='#333333'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </button>
                </div>

                {/* 요일 헤더 */}
                <div className='flex gap-2 mb-2'>
                  {weekDays.map((day, index) => (
                    <div key={day} className='flex-1 flex justify-center'>
                      <span
                        className={`text-sm font-medium ${
                          index === 0 ? 'text-error-red' : index === 6 ? 'text-info-blue' : 'text-gray-5'
                        }`}
                      >
                        {day}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 캘린더 그리드 */}
                <div className='space-y-2'>
                  {calendarWeeks.map((week, weekIndex) => (
                    <div key={weekIndex} className='flex gap-2'>
                      {week.map((day, dayIndex) => {
                        if (day === null) {
                          return <div key={dayIndex} className='flex-1 h-[30px]' />;
                        }

                        const isSelected = day === selectedDay;
                        const isSunday = dayIndex === 0;
                        const isSaturday = dayIndex === 6;

                        return (
                          <div
                            key={dayIndex}
                            className={`flex-1 flex flex-col items-center justify-center h-[30px] relative ${
                              isSelected ? 'bg-fooding-purple rounded-full w-[30px]' : ''
                            }`}
                          >
                            <span
                              className={`text-sm font-medium ${
                                isSelected
                                  ? 'text-white'
                                  : isSunday
                                    ? 'text-error-red'
                                    : isSaturday
                                      ? 'text-info-blue'
                                      : day <= 14
                                        ? 'text-gray-4'
                                        : day === 20
                                          ? 'text-info-blue'
                                          : day === 21
                                            ? 'text-error-red'
                                            : day === 22 || day === 28 || day === 29
                                              ? 'text-error-red'
                                              : 'text-black'
                              }`}
                            >
                              {day}
                            </span>
                            {/* 매출 데이터 표시 */}
                            {day <= 7 && (
                              <span className='absolute top-[-12px] text-xs text-black opacity-20'>123,232</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽 사이드바 */}
          <div className='w-[466px] space-y-6'>
            <div className='bg-white rounded-xl p-6 space-y-4'>
              {/* 개점/개점취소 버튼 */}
              <div className='flex gap-4'>
                <Button
                  variant={isStoreOpen ? 'primary' : 'outlined'}
                  className={`w-[202px] h-[57px] rounded-lg text-lg ${
                    isStoreOpen
                      ? 'bg-fooding-purple text-white'
                      : 'bg-gray-1 border border-gray-1 text-gray-4'
                  }`}
                  onClick={() => setIsStoreOpen(true)}
                >
                  개점
                </Button>
                <Button
                  variant='outlined'
                  className='w-[202px] h-[55px] rounded-lg bg-gray-1 border border-gray-1 text-gray-4 text-lg'
                  disabled={!isStoreOpen}
                  onClick={() => setIsStoreOpen(false)}
                >
                  개점취소
                </Button>
              </div>

              {/* 마감/마감취소 버튼 */}
              <div className='flex gap-4'>
                <Button
                  variant='outlined'
                  className='w-[202px] h-[57px] rounded-lg bg-gray-1 border border-gray-3 text-gray-4 text-lg'
                  disabled
                >
                  마감
                </Button>
                <Button
                  variant='outlined'
                  className='w-[202px] h-[55px] rounded-lg bg-gray-1 border border-gray-3 text-gray-4 text-lg'
                  disabled
                >
                  마감취소
                </Button>
              </div>

              {/* 로그아웃 버튼 */}
              <Button
                variant='outlined'
                className='w-full h-[55px] rounded-lg bg-white border border-gray-3 text-black text-base'
                onClick={handleLogout}
              >
                로그아웃
              </Button>

              {/* 구분선 */}
              <div className='border-t border-gray-3 my-4' />

              {/* 로고 영역 */}
              <div className='flex flex-col items-center justify-center py-8'>
                <div className='text-center'>
                  <h1 className='text-[40px] font-medium text-black mb-2'>Fooding POS</h1>
                  <p className='text-base font-medium text-black'>Powered by Forcu27</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
