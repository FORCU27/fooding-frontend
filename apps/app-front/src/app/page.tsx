'use client';

import { NextPage } from 'next';

const Home: NextPage = () => {
  const handleAlert = () => {
    alert('APP-FRONT!');

    if (window.interop) {
      window.interop.setBadgeCount(12345);
    } else {
      console.warn('Interop not available');
    }
  };

  return (
    <main className='h-dvh flex flex-col justify-center items-center bg-gray-100'>
    <h1 className='text-3xl font-bold text-gray-800 mb-4'>app-front</h1>
    <button
      type='button'
      onClick={handleAlert}
      className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
    >
      HELLO WORLD
    </button>
  </main>
  );
};

export default Home;
