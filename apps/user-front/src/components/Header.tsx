import { BellIcon, BookmarkIcon, SearchIcon } from '@repo/design-system/icons';

/* eslint-disable @next/next/no-img-element */
function Header() {
  return (
    <div className='h-16 flex justify-center items-center p-3'>
      <img
        src={'/images/fooding_icon.png'}
        width='26px'
        height='44px'
        className='mr-4'
        alt='Fooding Icon'
      />
      <div className='flex justify-center items-center pl-3 pr-3 mr-3 bg-[#F1F3F5] rounded-lg'>
        <input
          type='text'
          className='w-[250px] h-[45px] p-2 text-[#767676] placeholder-[#767676] rounded-lg border-none outline-none'
          placeholder='지금 뜨는 이탈리안 레스토랑은?'
        />
        <SearchIcon color='#767676' />
      </div>
      <div className='flex justify-between gap-4'>
        <BookmarkIcon />
        <BellIcon />
      </div>
    </div>
  );
}

export default Header;
