'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { CeoPost } from '@repo/api/ceo';

import { useStore } from '@/context/StoreContext';
import { useGetSelfQuery } from '@/hooks/auth/useGetSelf';
import { useGetRecentPosts } from '@/hooks/post/useGetRecentPosts';

const POST_TYPE_LABEL: Record<CeoPost['type'], string> = {
  NOTICE: '공지',
  EVENT: '이벤트',
};

const formatPostDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleDateString('ko-KR');
};

export default function PortalLandingPage() {
  const { data: me } = useGetSelfQuery();
  const { data: postsData, isLoading: isPostsLoading, isError: isPostsError } = useGetRecentPosts();
  const { clearStore } = useStore();

  const isLoggedIn = !!me;
  const posts = postsData?.list ?? [];

  const serviceItems = [
    { icon: '👥', title: '웨이팅', color: 'text-blue-600', iconBg: 'bg-blue-100', path: '/my' },
    { icon: '📖', title: '예약', color: 'text-green-600', iconBg: 'bg-green-100', path: '/my' },
    { icon: '⭐', title: '리워드', color: 'text-yellow-600', iconBg: 'bg-yellow-100', path: '/my' },
  ];

  const appDownloads = [
    {
      title: '사장님 앱',
      subtitle: '매장 관리 앱',
      platforms: [
        {
          name: 'Google Play',
          icon: '🤖',
          url: 'https://play.google.com/store/apps/details?id=com.openai.chatgpt&hl=ko',
          rating: 4.8,
          reviewCount: 1250,
        },
        {
          name: 'App Store',
          icon: '🍎',
          url: 'https://apps.apple.com/kr/app/%EB%84%A4%EC%9D%B4%EB%B2%84-naver/id393499958',
          rating: 4.7,
          reviewCount: 892,
        },
      ],
      color: 'bg-red-500',
    },
    {
      title: '포스 앱',
      subtitle: '주문, 예약, 웨이팅, 리워드 통합 관리 앱',
      platforms: [
        {
          name: 'Google Play',
          icon: '🤖',
          url: 'https://play.google.com/store/apps/details?id=com.openai.chatgpt&hl=ko',
          rating: 4.6,
          reviewCount: 756,
        },
        {
          name: 'App Store',
          icon: '🍎',
          url: 'https://apps.apple.com/kr/app/%EB%84%A4%EC%9D%B4%EB%B2%84-naver/id393499958',
          rating: 4.5,
          reviewCount: 634,
        },
        {
          name: 'Windows',
          icon: '💻',
          url: 'https://github.com/FORCU27/',
          rating: null,
          reviewCount: null,
        },
        {
          name: 'Mac',
          icon: '💻',
          url: 'https://github.com/FORCU27/',
          rating: null,
          reviewCount: null,
        },
      ],
      color: 'bg-red-500',
    },
    {
      title: '매장 앱',
      subtitle: '웨이팅, 리워드 앱',
      platforms: [
        {
          name: 'Google Play',
          icon: '🤖',
          url: 'https://play.google.com/store/apps/details?id=com.openai.chatgpt&hl=ko',
          rating: 4.9,
          reviewCount: 2103,
        },
        {
          name: 'App Store',
          icon: '🍎',
          url: 'https://apps.apple.com/kr/app/%EB%84%A4%EC%9D%B4%EB%B2%84-naver/id393499958',
          rating: 4.8,
          reviewCount: 1547,
        },
      ],
      color: 'bg-red-500',
    },
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
                        clearStore();
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
                  <Link href='/my'>
                    <button className='px-8 py-4 rounded-md bg-red-500 text-white hover:bg-red-600 shadow-lg text-base'>
                      서비스 신청하기
                    </button>
                  </Link>
                ) : (
                  <Link href='/login'>
                    <button className='px-8 py-4 rounded-md bg-red-500 text-white hover:bg-red-600 shadow-lg text-base'>
                      서비스 신청하기
                    </button>
                  </Link>
                )}
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
            {/* 서비스 관리 카드 */}
            <div className='border border-gray-200 rounded-lg bg-white shadow-sm'>
              <div className='p-6 border-b border-gray-100'>
                <h3 className='text-lg font-semibold text-gray-900'>서비스</h3>
              </div>
              <div className='p-6'>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
                  {serviceItems.map((item) => (
                    <Link key={item.title} href={item.path}>
                      <div className='flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-red-300 hover:shadow-sm transition-all cursor-pointer'>
                        <div
                          className={`w-14 h-14 rounded-full ${item.iconBg} flex items-center justify-center text-2xl`}
                        >
                          <span className={item.color}>{item.icon}</span>
                        </div>
                        <span className='font-medium text-gray-700'>{item.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* 추천 기능들 */}
            {/* <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
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
            </div> */}

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
                  {isPostsLoading && (
                    <div className='space-y-4'>
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div
                          key={index}
                          className='flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-100 animate-pulse'
                        >
                          <div className='w-2 h-2 bg-red-200 rounded-full mt-2 flex-shrink-0' />
                          <div className='flex-1 space-y-2'>
                            <div className='h-3 bg-red-200 rounded w-20' />
                            <div className='h-3 bg-red-200 rounded w-3/4' />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {!isPostsLoading && isPostsError && (
                    <div className='p-4 bg-red-50 border border-red-200 rounded text-sm text-red-600'>
                      공지사항을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
                    </div>
                  )}
                  {!isPostsLoading && !isPostsError && posts.length === 0 && (
                    <div className='p-4 bg-red-50 border border-red-100 rounded text-sm text-gray-600'>
                      등록된 공지사항이 없습니다.
                    </div>
                  )}
                  {!isPostsLoading && !isPostsError && posts.length > 0 && (
                    <div className='space-y-4'>
                      {posts.map((post) => (
                        <div
                          key={post.id}
                          className='flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-100 hover:bg-red-100 transition-colors'
                        >
                          <div className='w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0' />
                          <div className='flex-1 space-y-1'>
                            <div className='flex flex-wrap items-center gap-2 text-xs text-gray-500'>
                              <span className='px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-medium'>
                                {POST_TYPE_LABEL[post.type]}
                              </span>
                              {post.createdAt && <span>{formatPostDate(post.createdAt)}</span>}
                            </div>
                            <p className='text-gray-800 font-medium line-clamp-2'>{post.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
                      로그인/회원가입 하기
                    </button>
                  </Link>
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
                      <a
                        key={p.name}
                        href={p.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center justify-center gap-2 h-9 rounded-md border border-gray-200 hover:bg-red-50 hover:border-red-200 text-sm'
                      >
                        <span>{p.icon}</span>
                        {p.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}

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
                      href='https://play.google.com/store/apps/details?id=com.fooding.ceo'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors'
                    >
                      <span className='text-lg'>🤖</span>
                      <div className='flex-1'>
                        <div className='text-sm text-gray-300'>Google Play</div>
                      </div>
                    </a>
                    <a
                      href='https://apps.apple.com/app/fooding-ceo/id123456789'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors'
                    >
                      <span className='text-lg'>🍎</span>
                      <div className='flex-1'>
                        <div className='text-sm text-gray-300'>App Store</div>
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
                        href='/my'
                        className='block text-gray-300 hover:text-red-400 transition-colors'
                      >
                        {link}
                      </a>
                    ),
                  )}
                </div>
              </div>

              {/* 고객지원 */}
              {/* <div>
                <h3 className='text-lg font-semibold text-white mb-4'>고객지원</h3>
                <div className='space-y-2'>
                  <a
                    href='#'
                    className='block text-gray-300 hover:text-red-400 transition-colors'
                  >
                    자주묻는 질문
                  </a>
                  <a
                    href='#'
                    className='block text-gray-300 hover:text-red-400 transition-colors'
                  >
                    이용가이드
                  </a>
                  <a
                    href='#'
                    className='block text-gray-300 hover:text-red-400 transition-colors'
                  >
                    기술지원
                  </a>
                  <a
                    href='/notice'
                    className='block text-gray-300 hover:text-red-400 transition-colors'
                  >
                    공지사항
                  </a>
                  <a
                    href='#'
                    className='block text-gray-300 hover:text-red-400 transition-colors'
                  >
                    이벤트
                  </a>
                </div>
              </div> */}

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
                  href='https://fooding-cs.notion.site/2025-09-14-ver-26e6b89156ba81a083a8feed50bda06?pvs=25'
                  className='text-sm text-gray-300 hover:text-red-400 transition-colors flex items-center gap-1'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  사이트 이용약관
                  <span className='text-xs'>🔗</span>
                </a>
                <a
                  href='https://fooding-cs.notion.site/2025-09-14-ver-26e6b89156ba81659fb3c2ac4dab36bb'
                  className='text-sm text-gray-300 hover:text-red-400 transition-colors flex items-center gap-1'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  개인정보 처리방침
                  <span className='text-xs'>🔗</span>
                </a>
                <a
                  href='https://fooding-cs.notion.site/2025-09-14-ver-26e6b89156ba81a7b020fca6b8d9dc06'
                  className='text-sm text-gray-300 hover:text-red-400 transition-colors flex items-center gap-1'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  마케팅 수집약관
                  <span className='text-xs'>🔗</span>
                </a>
                <a
                  href='https://fooding-cs.notion.site/2025-09-14-ver-2716b89156ba802599f7c69e7d581241'
                  className='text-sm text-gray-300 hover:text-red-400 transition-colors flex items-center gap-1'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  위치정보 이용약관
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
