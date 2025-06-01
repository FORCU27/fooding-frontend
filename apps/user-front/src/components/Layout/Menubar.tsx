import { ChevronDownIcon, MarkPinIcon } from '@repo/design-system/icons';

function Menubar() {
  return (
    <div className='flex pl-5 pt-2 pb-4 bg-white w-full h-[44px]'>
      <div className='flex items-center gap-1'>
        <MarkPinIcon />
        <div className='flex p-1 gap-1 items-center'>
          <div className='subtitle-4'>홍대/합정/마포</div>
          <div className='flex items-center justify-center'>
            <ChevronDownIcon size={20} color='var(--color-gray-5)' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menubar;
