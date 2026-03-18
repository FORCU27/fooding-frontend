'use client';

import Link from 'next/link';

export default function NoticePage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* 헤더 */}
      <header className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center'>
              <Link href='/' className='text-xl font-bold text-gray-900'>
                Fooding CEO
              </Link>
            </div>
            <nav className='flex space-x-8'>
              <Link href='/' className='text-gray-600 hover:text-gray-900'>
                홈
              </Link>
              <Link href='/my' className='text-gray-600 hover:text-gray-900'>
                마이페이지
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='bg-white rounded-lg shadow-sm'>
          <div className='px-6 py-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-8'>공지사항</h1>

            {/* 공지사항 목록 */}
            <div className='space-y-6'>
              <div className='border-b border-gray-200 pb-6'>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <h2 className='text-xl font-semibold text-gray-900 mb-2'>
                      [중요] 서비스 점검 안내 (2025년 10월 6일)
                    </h2>
                    <p className='text-sm text-gray-500 mb-3'>2025년 10월 6일</p>
                    <p className='text-gray-700 leading-relaxed'>
                      안녕하세요, Fooding 사장님들께 알려드립니다.
                      <br />
                      <br />
                      2025년 10월 6일 오후 2시부터 4시까지 서비스 점검이 진행될 예정입니다.
                      점검 시간 동안 일부 서비스 이용이 제한될 수 있으니 양해 부탁드립니다.
                      <br />
                      <br />
                      더 나은 서비스를 위해 최선을 다하겠습니다. 감사합니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className='border-b border-gray-200 pb-6'>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <h2 className='text-xl font-semibold text-gray-900 mb-2'>
                      신규 기능 업데이트 안내
                    </h2>
                    <p className='text-sm text-gray-500 mb-3'>2025년 9월 28일</p>
                    <p className='text-gray-700 leading-relaxed'>
                      Fooding CEO 앱에 새로운 기능이 추가되었습니다.
                      <br />
                      <br />
                      - 매출 분석 리포트 개선
                      - 고객 리뷰 관리 기능 추가
                      - 예약 시스템 최적화
                      <br />
                      <br />
                      자세한 내용은 앱에서 확인해주세요.
                    </p>
                  </div>
                </div>
              </div>

              <div className='border-b border-gray-200 pb-6'>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <h2 className='text-xl font-semibold text-gray-900 mb-2'>
                      개인정보 처리방침 개정 안내
                    </h2>
                    <p className='text-sm text-gray-500 mb-3'>2025년 9월 15일</p>
                    <p className='text-gray-700 leading-relaxed'>
                      개인정보 처리방침이 개정되었습니다.
                      <br />
                      <br />
                      주요 변경사항:
                      - 개인정보 수집 항목 확대
                      - 쿠키 사용 정책 추가
                      - 개인정보 보유기간 명시
                      <br />
                      <br />
                      자세한 내용은 개인정보 처리방침 페이지에서 확인하실 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 더보기 버튼 */}
            <div className='mt-8 text-center'>
              <button className='px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors'>
                더 많은 공지사항 보기
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className='bg-gray-900 text-white mt-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='text-center'>
            <p className='text-sm text-gray-400'>
              &copy; 2025 주식회사 푸딩. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
