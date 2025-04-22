'use client';

import { useRouter } from 'next/navigation';

const Navigation = () => {
  const router = useRouter();
  return (
    <nav className='bg-white border-b border-gray-200'>
      <div className='flex items-center p-4 gap-4'>
        <button
          onClick={() => router.back()}
          className='flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 text-lg cursor-pointer'
        >
          ←
        </button>
        <span className='text-md font-bold text-gray-800'>대시보드</span>
      </div>
    </nav>
  );
};

const Contents = () => {
  const waitingInfo = {
    number: '2 [ 현장 ]',
    phone: '010-1234-5678',
    name: '강주영',
    people: '총 4명 ( 성인 3, 유아 1 - 유아용 의자 1 )',
    visitCount: '5회 방문',
    status: '웨이팅 중',
    waitTime: '4분 대기',
  };

  const history = [
    {
      id: 1,
      label: '웨이팅 등록',
      time: '2025-03-31 (월) 18:30:20',
      result: '카카오톡 성공',
    },
    {
      id: 2,
      label: '입장 호출',
      time: '2025-03-31 (월) 18:34:35',
      result: '카카오톡 성공',
    },
  ];

  return (
    <main className='p-6 bg-gray-100 min-h-screen'>
      <div className='flex gap-6'>
        {/* 웨이팅 상세 정보 */}
        <section className='flex-1 bg-white rounded-md shadow-sm p-5'>
          <h2 className='text-base font-semibold mb-4'>웨이팅 상세 정보</h2>
          <div className='space-y-3 text-sm text-gray-800'>
            <div className='flex justify-between items-center'>
              <span className='font-medium w-40'>호출번호</span>
              <span>{waitingInfo.number}</span>
              <button className='ml-auto text-sm border border-gray-300 px-3 py-1 rounded'>
                변경
              </button>
            </div>
            <div className='flex justify-between items-center'>
              <span className='font-medium w-40'>휴대폰 번호/이름</span>
              <span>
                {waitingInfo.phone} / {waitingInfo.name}
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='font-medium w-40'>웨이팅 인원</span>
              <span>{waitingInfo.people}</span>
              <button className='ml-auto text-sm border border-gray-300 px-3 py-1 rounded'>
                변경
              </button>
            </div>
            <div className='flex justify-between items-center'>
              <span className='font-medium w-40'>방문이력</span>
              <span>{waitingInfo.visitCount}</span>
            </div>
          </div>
        </section>

        {/* 웨이팅 이력 */}
        <section className='flex-[1.3] bg-white rounded-md shadow-sm p-5'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-base font-semibold'>웨이팅 이력</h2>
            <span className='text-sm text-gray-500'>
              {waitingInfo.status} ({waitingInfo.waitTime})
            </span>
          </div>
          <table className='w-full text-sm text-left border-t border-gray-200'>
            <thead className='text-gray-500'>
              <tr className='border-b border-gray-100'>
                <th className='py-2'>No.</th>
                <th className='py-2'>변동사항</th>
                <th className='py-2'>시간</th>
                <th className='py-2'>발송결과</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id} className='border-b border-gray-100'>
                  <td className='py-2'>{h.id}</td>
                  <td>{h.label}</td>
                  <td>{h.time}</td>
                  <td className='text-blue-500 underline cursor-pointer'>{h.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
};

export default function AdminWaitingDetailPage() {
  return (
    <>
      <Navigation />
      <Contents />
    </>
  );
}
