import Image from 'next/image';

import { BellIcon, BookmarkIcon, SearchIcon } from '@repo/design-system/icons';

function Header() {
  return (
    <div className='flex justify-center items-center pl-2 pr-3 w-full h-[60px] bg-white'>
      <Image src='/images/fooding_icon.png' width={48} height={48} alt='Fooding Icon' />
      <div className='flex justify-between items-center pl-3 pr-3 mr-3 bg-gray-1 rounded-lg w-full'>
        <input
          type='text'
          className='w-full h-[45px] text-[gray-1] placeholder-[gray-1] rounded-lg border-none outline-none'
          placeholder='지금 뜨는 이탈리안 레스토랑은?'
        />
        <SearchIcon color='var(--color-gray-5)' />
      </div>
      <div className='flex justify-between gap-4'>
        <BookmarkIcon />
        <BellIcon />
      </div>
    </div>
  );
}

export default Header;
