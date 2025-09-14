import { Toaster as RhtToaster, toast as RhtToast } from 'react-hot-toast';

import { CheckIcon } from '../../icons';

export const Toaster = () => {
  return (
    <RhtToaster
      position='bottom-center'
      containerClassName='mb-[26px] inset-5!'
      toastOptions={{
        className:
          'text-sm w-full py-8! font-bold text-[20px] text-white! bg-gray-6/70! backdrop-blur-sm rounded-[12px]! px-6! [&>*[role="status"]]:justify-start! [&>*[role="status"]]:ml-4! max-w-full!',
        success: {
          icon: (
            <span className='size-[25px] flex justify-center items-center bg-fooding-green text-white rounded-full'>
              <CheckIcon className='size-4' />
            </span>
          ),
          iconTheme: {
            primary: '#0BB76D',
            secondary: 'white',
          },
        },
      }}
    />
  );
};

export const toast = RhtToast;
