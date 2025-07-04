'use client';

const DashboardPage = () => {
  const handleAlert = () => {
    alert('CEO-FRONT!');

    if (window.interop) {
      window.interop.setBadgeCount(12345);
    } else {
      console.warn('Interop not available');
    }
  };
  return (
    <div className='flex flex-col h-full w-full justify-center items-center bg-white'>
      <h1 className='text-3xl font-bold text-gray-800 mb-4'>PC사이즈 테스트 : 1024px ~</h1>
      <h1 className='text-3xl font-bold text-gray-800 mb-4'>테이블 테스트 : 768px ~ 1023px</h1>
      <h1 className='text-3xl font-bold text-gray-800 mb-4'>모바일사이즈 테스트 : ~ 767px</h1>
    </div>
  );
};

export default DashboardPage;
