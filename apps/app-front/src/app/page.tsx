'use client';

import { exampleApi } from '@repo/api/example';
import { NextPage } from 'next';

const Home: NextPage = () => {
  const onClick = () => {
    exampleApi.deleteExample('1');
  };

  return (
    <main className='h-dvh flex justify-center items-center'>
      <h1>app-front</h1>
      <button onClick={onClick}>delete example</button>
    </main>
  );
};

export default Home;
