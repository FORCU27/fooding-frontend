import Image from 'next/image';

import { BellIcon, BookmarkIcon, SearchIcon } from '@repo/design-system/icons';
import { useFlow } from '@stackflow/react/future';

import { AuthGuard } from '@/components/Auth/AuthGuard';
import { cn } from '@/utils/cn';

function Header() {
  const flow = useFlow();

  return (
    <div className='fixed left-0 top-0 right-0 flex justify-center items-center pl-2 pr-3 w-full h-[60px] bg-white'>
      <Image src='/images/fooding_icon.png' width={48} height={48} alt='Fooding Icon' />
      <button
        className='mr-3 relative w-full h-[44px] bg-gray-1 rounded-[8px] pl-11 pr-10 outline-none text-[14px] text-gray-5 flex items-center'
        aria-label='검색'
        onClick={() => flow.push('SearchScreen', {})}
      >
        <SearchIcon className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-5' />
        지금 뜨는 이탈리안 레스토랑은?
      </button>
      <div className='flex justify-between gap-4'>
        <AuthGuard>
          <button onClick={() => flow.push('BookmarkListScreen', {})}>
            <BookmarkIcon className='cursor-pointer' />
          </button>
        </AuthGuard>
        <AuthGuard>
          <button onClick={() => flow.push('NotificationListScreen', {})}>
            <BellIcon className='cursor-pointer' />
          </button>
        </AuthGuard>
    <div className='flex flex-col fixed left-0 top-0 right-0'>
      <div className='h-[env(safe-area-inset-top)]' />
      <div className={cn('h-[60px]', 'w-full bg-white flex pl-2 pr-3 items-center')}>
        {/* TODO: 레이아웃 시프트 생겨서 svg로 변경 필요 */}
        <Image src='/images/fooding_icon.png' width={48} height={48} alt='Fooding Icon' />
        <SearchInput className='mr-3' placeholder='지금 뜨는 이탈리안 레스토랑은?' />
        <div className='flex justify-between gap-4'>
          <AuthGuard>
            <button onClick={() => flow.push('BookmarkListScreen', {})}>
              <BookmarkIcon className='cursor-pointer' />
            </button>
          </AuthGuard>
          <AuthGuard>
            <button onClick={() => flow.push('NotificationListScreen', {})}>
              <BellIcon className='cursor-pointer' />
            </button>
          </AuthGuard>
        </div>
      </div>
    </div>
  );
}

export default Header;
