'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useGetSelfQuery } from '@/hooks/auth/useGetSelf';

export default function PortalLandingPage() {
  const { data: me } = useGetSelfQuery();

  const isLoggedIn = !!me;

  const managementItems = [
    { icon: '🕒', title: '영업시간', color: 'text-red-600', iconBg: 'bg-red-100' },
    { icon: '🎁', title: '쿠폰관리', color: 'text-orange-600', iconBg: 'bg-orange-100' },
    { icon: '📅', title: '휴무일', color: 'text-purple-600', iconBg: 'bg-purple-100' },
  ];

  const serviceItems = [
    { icon: '👥', title: '웨이팅', color: 'text-blue-600', iconBg: 'bg-blue-100' },
    { icon: '📖', title: '예약', color: 'text-green-600', iconBg: 'bg-green-100' },
    { icon: '⭐', title: '리워드', color: 'text-yellow-600', iconBg: 'bg-yellow-100' },
  ];

  const notices = [
    '새로운 웨이팅 시스템 업데이트 안내',
    '쿠폰 관리 기능 개선 사항',
    '매장 운영 가이드북 제공',
    '고객 리뷰 관리 팁',
  ];

  const appDownloads = [
    {
      title: '사장님 앱',
      subtitle: '매장 관리 앱',
      platforms: [
        { name: 'Google Play', icon: '🤖' },
        { name: 'App Store', icon: '🍎' },
      ],
      color: 'bg-red-500',
    },
    {
      title: '포스 앱',
      subtitle: '주문, 예약, 웨이팅, 리워드 통합 관리 앱',
      platforms: [
        { name: 'Google Play', icon: '🤖' },
        { name: 'App Store', icon: '🍎' },
        { name: 'Windows', icon: '💻' },
        { name: 'Mac', icon: '💻' },
      ],
      color: 'bg-red-500',
    },
    {
      title: '매장 앱',
      subtitle: '웨이팅, 리워드 앱',
      platforms: [
        { name: 'Google Play', icon: '🤖' },
        { name: 'App Store', icon: '🍎' },
      ],
      color: 'bg-red-500',
    },
  ];

  const faqItems = [
    '서비스 신청은 어떻게 하나요?',
    '앱 설치가 안될 때는?',
    '요금제는 어떻게 되나요?',
    '기술지원은 어떻게 받나요?',
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* 헤더 */}
      <header className='bg-white border-b border-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-20'>
            <div className='flex items-center'>
              <div className='flex items-center space-x-3'>
                <Image
                  src='/images/fooding-ceo-logo.svg'
                  width={162}
                  height={28}
                  alt='ceo-logo'
                  className='object-contain'
                />
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              {isLoggedIn ? (
                <div className='flex items-center space-x-3'>
                  <span className='text-sm text-gray-600'>{me.name} 사장님</span>
                  <button
                    onClick={async () => {
                      const response = await fetch('/api/auth/logout', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                      });
                      if (response.ok) {
                        window.location.href = '/';
                      }
                    }}
                    className='px-6 h-10 rounded-md border border-gray-200 text-gray-800 hover:border-red-300 hover:text-red-600 transition-colors'
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <>
                  <Link href='/login'>
                    <button className='px-6 h-10 rounded-md border border-gray-200 text-gray-800 hover:border-red-300 hover:text-red-600 transition-colors'>
                      회원가입
                    </button>
                  </Link>
                  <Link href='/login'>
                    <button className='px-6 h-10 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors'>
                      로그인
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 배너 */}
      <section className='bg-red-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h1 className='text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-800 leading-tight'>
                사장님을 위한
                <br />
                <span className='text-red-500'>올인원 솔루션</span>
              </h1>
              <p className='text-lg md:text-xl mb-8 text-gray-600'>
                매장 운영부터 고객 관리까지, 모든 것을 한 번에
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                {isLoggedIn ? (
                  <button className='px-8 py-4 rounded-md bg-red-500 text-white hover:bg-red-600 shadow-lg text-base'>
                    서비스 신청하기
                  </button>
                ) : (
                  <Link href='/login'>
                    <button className='px-8 py-4 rounded-md bg-red-500 text-white hover:bg-red-600 shadow-lg text-base'>
                      서비스 신청하기
                    </button>
                  </Link>
                )}
                <button className='px-8 py-4 rounded-md border border-red-300 text-red-600 hover:bg-red-50 text-base'>
                  더 알아보기
                </button>
              </div>
            </div>

            <div className='flex justify-center lg:justify-end'>
              <div className='w-80 h-80'>
                <img
                  src='https://images.unsplash.com/photo-1659353741155-e988422cf9ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGVsaXZlcnklMjBhcHAlMjBjaGFyYWN0ZXJ8ZW58MXx8fHwxNzU3NzYyOTQxfDA&ixlib=rb-4.1.0&q=80&w=1080'
                  alt='Character Illustration'
                  className='w-full h-full object-cover rounded-2xl shadow-lg'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* 왼쪽 컬럼 - 매장 관리 기능들 */}
          <div className='lg:col-span-2 space-y-8'>
            {/* 아이콘 그리드 */}
            <div className='grid grid-cols-3 gap-4'>
              {managementItems.map((item) => (
                <button
                  key={item.title}
                  className='flex flex-col items-center gap-3 p-6 bg-white rounded-lg border border-gray-200 hover:border-red-300 hover:shadow-sm transition-all'
                >
                  <div
                    className={`w-12 h-12 rounded-full ${item.iconBg} flex items-center justify-center text-xl`}
                  >
                    <span className={item.color}>{item.icon}</span>
                  </div>
                  <span className='text-sm font-medium text-gray-700'>{item.title}</span>
                </button>
              ))}
            </div>

            {/* 서비스 관리 카드 */}
            <div className='border border-gray-200 rounded-lg bg-white shadow-sm'>
              <div className='p-6 border-b border-gray-100'>
                <h3 className='text-lg font-semibold text-gray-900'>서비스 관리</h3>
              </div>
              <div className='p-6'>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
                  {serviceItems.map((item) => (
                    <button
                      key={item.title}
                      className='flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-red-300 hover:shadow-sm transition-all'
                    >
                      <div
                        className={`w-14 h-14 rounded-full ${item.iconBg} flex items-center justify-center text-2xl`}
                      >
                        <span className={item.color}>{item.icon}</span>
                      </div>
                      <span className='font-medium text-gray-700'>{item.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 추천 기능들 */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow'>
                <div className='p-6'>
                  <div className='w-full h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-lg mb-4 flex items-center justify-center'>
                    <span className='text-2xl'>📊</span>
                  </div>
                  <h4 className='font-semibold text-gray-800 mb-2'>매출 분석</h4>
                  <p className='text-sm text-gray-600'>
                    매장 매출을 분석하고 인사이트를 제공합니다
                  </p>
                </div>
              </div>

              <div className='border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow'>
                <div className='p-6'>
                  <div className='w-full h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center'>
                    <span className='text-2xl'>📱</span>
                  </div>
                  <h4 className='font-semibold text-gray-800 mb-2'>모바일 주문</h4>
                  <p className='text-sm text-gray-600'>모바일에서 간편하게 주문을 받아보세요</p>
                </div>
              </div>

              <div className='border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow'>
                <div className='p-6'>
                  <div className='w-full h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-4 flex items-center justify-center'>
                    <span className='text-2xl'>💡</span>
                  </div>
                  <h4 className='font-semibold text-gray-800 mb-2'>운영 가이드</h4>
                  <p className='text-sm text-gray-600'>효율적인 매장 운영을 위한 팁과 가이드</p>
                </div>
              </div>
            </div>

            {/* 공지사항 */}
            <div className='border border-gray-200 rounded-lg bg-white shadow-sm'>
              <div className='p-6 border-b border-gray-100'>
                <h3 className='text-lg font-semibold text-gray-900 flex items-center gap-3'>
                  <div className='w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm'>
                    🔔
                  </div>
                  공지사항
                </h3>
              </div>
              <div className='p-6'>
                <div className='space-y-4'>
                  {notices.map((notice) => (
                    <div
                      key={notice}
                      className='flex items-start gap-4 p-4 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors border border-red-100'
                    >
                      <div className='w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0'></div>
                      <span className='text-gray-700'>{notice}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽 컬럼 - 로그인 및 다운로드 */}
          <div className='lg:col-span-1 space-y-6'>
            {/* 로그인 상태에 따른 UI */}
            {isLoggedIn ? (
              <div className='border border-gray-200 rounded-lg bg-white shadow-sm'>
                <div className='p-6 border-b border-gray-100'>
                  <h3 className='text-lg font-semibold text-gray-900'>로그인 정보</h3>
                </div>
                <div className='p-6 space-y-4'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-10 h-10 bg-red-100 rounded-full flex items-center justify-center'>
                      <span className='text-red-600 text-lg'>👤</span>
                    </div>
                    <div>
                      <p className='font-medium text-gray-900'>{me.name} 사장님</p>
                      <p className='text-sm text-gray-600'>{me.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={async () => {
                      const response = await fetch('/api/auth/logout', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                      });
                      if (response.ok) {
                        window.location.href = '/';
                      }
                    }}
                    className='w-full h-10 rounded-md border border-gray-300 text-gray-700 hover:border-red-300 hover:text-red-600 transition-colors'
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            ) : (
              <div className='border border-gray-200 rounded-lg bg-white shadow-sm'>
                <div className='p-6 border-b border-gray-100'>
                  <h3 className='text-lg font-semibold text-gray-900'>로그인</h3>
                </div>
                <div className='p-6 space-y-6'>
                  {/* 환영 메시지 */}
                  <div className='text-center space-y-2'>
                    <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto'>
                      <span className='text-2xl'>👋</span>
                    </div>
                    <h4 className='text-lg font-semibold text-gray-900'>푸딩 사장님 반갑습니다</h4>
                    <p className='text-sm text-gray-600'>로그인해주세요 :)</p>
                  </div>

                  {/* 로그인 버튼 */}
                  <Link href='/login'>
                    <button className='w-full h-12 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors font-medium text-base shadow-sm'>
                      로그인하기
                    </button>
                  </Link>

                  {/* 하단 링크들 */}
                  <div className='flex justify-between items-center pt-2'>
                    <Link
                      href='/login'
                      className='text-sm text-gray-500 hover:text-red-600 transition-colors'
                    >
                      아이디/비밀번호 찾기
                    </Link>
                    <Link
                      href='/login'
                      className='text-sm text-red-600 hover:text-red-700 transition-colors font-medium'
                    >
                      회원가입
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* 앱 다운로드 */}
            {appDownloads.map((app) => (
              <div key={app.title} className='border border-gray-200 rounded-lg bg-white shadow-sm'>
                <div className='p-6 border-b border-gray-100'>
                  <div className='flex items-center gap-3'>
                    <div
                      className={`w-8 h-8 ${app.color} rounded-lg flex items-center justify-center text-white text-sm`}
                    >
                      ⬇️
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold text-gray-900'>{app.title}</h3>
                      <p className='text-sm text-gray-600'>{app.subtitle}</p>
                    </div>
                  </div>
                </div>
                <div className='p-6'>
                  <div className='grid grid-cols-2 gap-2'>
                    {app.platforms.map((p) => (
                      <button
                        key={p.name}
                        className='flex items-center justify-center gap-2 h-9 rounded-md border border-gray-200 hover:bg-red-50 hover:border-red-200 text-sm'
                      >
                        <span>{p.icon}</span>
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* 자주묻는 질문 */}
            <div className='border border-gray-200 rounded-lg bg-white shadow-sm'>
              <div className='p-6 border-b border-gray-100'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white text-sm'>
                    ❓
                  </div>
                  <h3 className='text-lg font-semibold text-gray-900'>자주묻는 질문</h3>
                </div>
              </div>
              <div className='p-6'>
                <div className='space-y-3'>
                  {faqItems.map((faq) => (
                    <button
                      key={faq}
                      className='w-full text-left p-3 hover:bg-red-50 rounded-lg text-sm text-gray-700 transition-colors border border-gray-100'
                    >
                      • {faq}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 서비스 신청 */}
            <div className='border border-gray-200 rounded-lg bg-white shadow-sm'>
              <div className='p-6 border-b border-gray-100'>
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white text-sm'>
                    📝
                  </div>
                  <h3 className='text-lg font-semibold text-gray-900'>서비스 신청</h3>
                </div>
              </div>
              <div className='p-6'>
                <p className='text-sm text-gray-600 mb-4'>
                  {isLoggedIn
                    ? '새로운 매장을 등록하고 Fooding 서비스를 시작하세요'
                    : '로그인 후 새로운 매장을 등록하고 Fooding 서비스를 시작하세요'}
                </p>
                {isLoggedIn ? (
                  <button className='w-full h-10 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors'>
                    서비스 신청하기
                  </button>
                ) : (
                  <Link href='/login'>
                    <button className='w-full h-10 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors'>
                      로그인 후 신청하기
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className='bg-gray-900 text-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* 메인 푸터 콘텐츠 */}
          <div className='py-16'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {/* 브랜드 및 앱 다운로드 */}
              <div className='lg:col-span-1'>
                <div className='flex items-center space-x-3 mb-6'>
                  <Image
                    src='/images/fooding-ceo-logo.svg'
                    width={162}
                    height={28}
                    alt='ceo-logo'
                    className='object-contain'
                  />
                </div>
                <p className='text-gray-300 mb-6'>매장 운영을 더 쉽고 똑똑하게</p>

                <div className='space-y-3'>
                  <h4 className='font-semibold text-white mb-3'>앱 다운로드</h4>
                  <div className='flex flex-col space-y-2'>
                    <a
                      href='#'
                      className='flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors'
                    >
                      <span className='text-lg'>🤖</span>
                      <div>
                        <div className='text-sm text-gray-300'>Google Play</div>
                        <div className='text-xs text-gray-400'>사장님 앱 다운로드</div>
                      </div>
                    </a>
                    <a
                      href='#'
                      className='flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors'
                    >
                      <span className='text-lg'>🍎</span>
                      <div>
                        <div className='text-sm text-gray-300'>App Store</div>
                        <div className='text-xs text-gray-400'>사장님 앱 다운로드</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* 주요 서비스 */}
              <div>
                <h3 className='text-lg font-semibold text-white mb-4'>주요 서비스</h3>
                <div className='space-y-2'>
                  {['사장님 앱', '웨이팅', '예약', '쿠폰관리', '매출분석', '고객관리'].map(
                    (link) => (
                      <a
                        key={link}
                        href='#'
                        className='block text-gray-300 hover:text-red-400 transition-colors'
                      >
                        {link}
                      </a>
                    ),
                  )}
                </div>
              </div>

              {/* 고객지원 */}
              <div>
                <h3 className='text-lg font-semibold text-white mb-4'>고객지원</h3>
                <div className='space-y-2'>
                  {['자주묻는 질문', '이용가이드', '기술지원', '공지사항', '이벤트'].map((link) => (
                    <a
                      key={link}
                      href='#'
                      className='block text-gray-300 hover:text-red-400 transition-colors'
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>

              {/* 연락처 정보 */}
              <div>
                <h3 className='text-lg font-semibold text-white mb-4'>연락처</h3>
                <div className='space-y-4'>
                  {/* <div className="flex items-start gap-3">
                    <div className="w-5 h-5 text-red-400 mt-0.5">📞</div>
                    <div>
                      <div className="text-sm text-gray-300">고객센터</div>
                      <a href="tel:0507" className="text-white hover:text-red-400">
                        0507
                      </a>
                    </div>
                  </div> */}

                  <div className='flex items-start gap-3'>
                    <div className='w-5 h-5 text-red-400 mt-0.5'>✉️</div>
                    <div>
                      <div className='text-sm text-gray-300'>이메일 문의</div>
                      <a href='mailto:contact@fooding.im' className='text-white hover:text-red-400'>
                        contact@fooding.im
                      </a>
                    </div>
                  </div>

                  <div className='flex items-start gap-3'>
                    <div className='w-5 h-5 text-red-400 mt-0.5'>📍</div>
                    <div>
                      <div className='text-sm text-gray-300'>주소</div>
                      <div className='text-white text-sm'>
                        서울특별시 금천구
                        <br />
                        Forcu 산업센터 2동 1004호
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 구분선 */}
          <div className='border-t border-gray-700' />

          {/* 하단 정보 */}
          <div className='py-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* 회사 정보 */}
              <div>
                <h4 className='font-semibold text-white mb-3'>주식회사 푸딩</h4>
                <div className='text-sm text-gray-400 space-y-1'>
                  {/* <p>대표자: 강주영 | 사업자 번호: 000-00-00000</p> */}
                  <p>통신판매업신고: 2025-금천구-9999</p>
                </div>
              </div>

              {/* 약관 링크 */}
              <div className='flex flex-wrap gap-6 lg:justify-end'>
                <a
                  href='#'
                  className='text-sm text-gray-300 hover:text-red-400 transition-colors flex items-center gap-1'
                >
                  서비스 이용약관
                  <span className='text-xs'>🔗</span>
                </a>
                <a
                  href='#'
                  className='text-sm text-gray-300 hover:text-red-400 transition-colors flex items-center gap-1'
                >
                  개인정보처리방침
                  <span className='text-xs'>🔗</span>
                </a>
                <a
                  href='#'
                  className='text-sm text-gray-300 hover:text-red-400 transition-colors flex items-center gap-1'
                >
                  사업자정보확인
                  <span className='text-xs'>🔗</span>
                </a>
              </div>
            </div>

            <div className='text-center mt-8 pt-8 border-t border-gray-700'>
              <p className='text-sm text-gray-400'>
                &copy; 2025 주식회사 푸딩. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
