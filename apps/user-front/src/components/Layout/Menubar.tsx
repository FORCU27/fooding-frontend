import ChevronDownIcon from '@/assets/icons/ChevronDownIcon';
import MarkPinIcon from '@/assets/icons/MarkpinIcon';

function Menubar() {
  return (
    <div className='h-16 flex p-5'>
      <div className='justify-start items-center'>
        <div className='flex items-center justify-start'>
          <MarkPinIcon />
          <div className='flex flex-row items-center p-2 gap-2'>
            <div className='font-bold'>홍대/합정/마포</div>
            <button type='button' className='flex justify-center items-center'>
              <ChevronDownIcon size={20} color='#767676' className='cursor-auto' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menubar;
