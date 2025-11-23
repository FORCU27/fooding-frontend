'use client';

import { toast } from '@repo/design-system/components/b2c';

const DashboardPage = () => {
  const handleAlert = () => {
    toast.success('CEO-FRONT!');

    if (window.interop) {
      window.interop.setBadgeCount(12345);
    } else {
      console.warn('Interop not available');
    }
  };
  return (
    <div className='flex flex-col h-full w-full justify-center items-center bg-white'>
      <h1 className='text-3xl font-bold text-gray-800 mb-4'>ceo-front</h1>
      <button
        type='button'
        onClick={handleAlert}
        className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
      >
        HELLO WORLD
      </button>
    </div>
  );
};

export default DashboardPage;
