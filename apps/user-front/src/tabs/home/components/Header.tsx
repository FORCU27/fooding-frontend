import Image from 'next/image';

import { BellIcon, BookmarkIcon, SearchIcon } from '@repo/design-system/icons';
import { useFlow } from '@stackflow/react/future';

import { AuthGuard } from '@/components/Auth/AuthGuard';

function Header() {
  const { push } = useFlow();

  return (
    <div className='fixed left-0 top-0 right-0 flex justify-center items-center pl-2 pr-3 w-full h-[60px] bg-white'>
      <Image src='/images/fooding_icon.png' width={48} height={48} alt='Fooding Icon' />
      <button
        className='mr-3 relative w-full h-[44px] bg-gray-1 rounded-[8px] pl-11 pr-10 outline-none text-[14px] text-gray-5 flex items-center'
        aria-label='검색'
        onClick={() => push('SearchScreen', {})}
      >
        <SearchIcon className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-5' />
        지금 뜨는 이탈리안 레스토랑은?
      </button>
      <div className='flex justify-between gap-4'>
        <AuthGuard>
          <button onClick={() => push('BookmarkListScreen', {})}>
            <BookmarkIcon className='cursor-pointer' />
          </button>
        </AuthGuard>
        <AuthGuard>
          <button onClick={() => push('NotificationListScreen', {})}>
            <BellIcon className='cursor-pointer' />
          </button>
        </AuthGuard>
      </div>
    </div>
  );
}

export default Header;
