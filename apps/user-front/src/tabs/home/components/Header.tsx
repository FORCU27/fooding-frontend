import Image from 'next/image';

import { SearchInput } from '@repo/design-system/components/b2c';
import { BellIcon, BookmarkIcon } from '@repo/design-system/icons';
import { useFlow } from '@stackflow/react/future';

import { AuthGuard } from '@/components/Auth/AuthGuard';

function Header() {
  const { push } = useFlow();

  return (
    <div className='fixed left-0 top-0 right-0 flex justify-center items-center pl-2 pr-3 w-full h-[60px] bg-white'>
      <Image src='/images/fooding_icon.png' width={48} height={48} alt='Fooding Icon' />
      <SearchInput.Container className='mr-3'>
        <SearchInput placeholder='지금 뜨는 이탈리안 레스토랑은?' />
        <SearchInput.Button />
      </SearchInput.Container>
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
