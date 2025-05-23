'use client';

import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  handleDrawerToggle: () => void;
}

const AppBarSection = ({ handleDrawerToggle }: Props) => {
  const [anchor, setAnchor] = React.useState(false);
  const [selectedStore, setSelectedStore] = React.useState('강고기 홍대점');

  const handleToggleMenu = () => setAnchor((prev) => !prev);

  const handleClose = (store?: string) => {
    if (store) setSelectedStore(store);
    setAnchor(false);
  };

  const stores = ['강고기 홍대점', '강고기 제주도점', '강고기 사당점'];

  const handleLogoutClick = async () => {
    try {
      // 로그아웃 요청 보내기
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

  return (
    <header className='fixed top-0 left-0 w-full border-b border-gray-200 bg-white text-black z-50 sm:ml-[240px]'>
      <div className='h-16 px-4 flex items-center justify-between'>
        <div className='flex items-center'>
          <button
            onClick={handleDrawerToggle}
            className='sm:hidden p-2 rounded hover:bg-gray-100'
            aria-label='Open drawer'
          >
            <MenuIcon />
          </button>

          <span className='ml-4 text-lg font-medium'>{selectedStore}</span>

          <button onClick={handleToggleMenu} className='ml-1 p-1'>
            <ExpandMoreIcon />
          </button>

          {anchor && (
            <div className='absolute mt-14 bg-gray-300 rounded shadow-md p-2 w-52'>
              {stores.map((store) => (
                <button
                  key={store}
                  onClick={() => handleClose(store)}
                  className='w-full text-left px-4 py-2 hover:bg-gray-200 rounded mb-1'
                >
                  {store}
                </button>
              ))}

              <button
                onClick={() => {
                  alert('매장 생성하기');
                }}
                className='mt-2 w-full flex items-center justify-center gap-2 font-semibold bg-white text-black py-2 px-4 rounded hover:bg-gray-100'
              >
                <AddIcon fontSize='small' />
                매장 생성하기
              </button>
            </div>
          )}
          {/*FIXME: 테스트용 로그아웃 버튼입니다 */}
          <button
            type='button'
            onClick={handleLogoutClick}
            className='cursor-pointer border border-gray-3 w-[80px] h-[45px] rounded-[11px]'
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppBarSection;
