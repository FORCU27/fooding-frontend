import { NextPage } from 'next';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Menubar from '@/components/Layout/Menubar';

const Home: NextPage = () => {
  return (
    <main className='flex flex-col h-[calc(100vh-120px)]'>
      <Header />
      <Menubar />
      <main className='flex flex-col h-[calc(100vh-120px)]'>
        <div className='flex flex-col p-5'>
          <div className='flex w-[400px] h-[200px] mx-auto justify-center items-center font-semibold text-4xl'>
            배너
          </div>
          <div className='flex flex-col p-4 mb-3'>
            <div className='flex justify-between mb-3'>
              <div className='text-2xl '>핫플레이스</div>
              <div>{'전체보기 >'}</div>
            </div>
            <div className='text-[#767676] mb-3'>인기많은 매장이에요!</div>
            <div className='flex justify-around'>
              <div className='w-[150px] h-[150px] bg-[#F1F3F5]'>test IMG</div>
              <div className='w-[150px] h-[150px] bg-[#F1F3F5]'>test IMG</div>
              <div className='w-[150px] h-[150px] bg-[#F1F3F5]'>test IMG</div>
            </div>
          </div>
          <div className='flex flex-col p-4 mb-3'>
            <div className='flex justify-between mb-3'>
              <div className='text-2xl'>신규입접</div>
              <div>{'전체보기 >'}</div>
            </div>
            <div className='text-[#767676] mb-3'>새로 오픈했어요!</div>
            <div className='flex justify-around'>
              <div className='w-[150px] h-[150px] bg-[#F1F3F5]'>test IMG</div>
              <div className='w-[150px] h-[150px] bg-[#F1F3F5]'>test IMG</div>
              <div className='w-[150px] h-[150px] bg-[#F1F3F5]'>test IMG</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </main>
  );
};

export default Home;
