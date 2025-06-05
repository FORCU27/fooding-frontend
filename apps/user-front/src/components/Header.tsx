import Image from 'next/image';

import { SearchInput } from '@repo/design-system/components/b2c';
import { BellIcon, BookmarkIcon } from '@repo/design-system/icons';

function Header() {
  return (
    <div className='flex justify-center items-center pl-2 pr-3 w-full h-[60px] bg-white'>
      <Image src='/images/fooding_icon.png' width={48} height={48} alt='Fooding Icon' />
      <SearchInput.Container className='mr-3'>
        <SearchInput />
        <SearchInput.Button />
      </SearchInput.Container>
      <div className='flex justify-between gap-4'>
        <BookmarkIcon />
        <BellIcon />
      </div>
    </div>
  );
}

export default Header;
