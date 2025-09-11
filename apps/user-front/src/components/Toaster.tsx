import { Toaster as RhtToaster } from 'react-hot-toast';

export const Toaster = () => {
  return (
    <RhtToaster
      position='bottom-center'
      toastOptions={{
        className:
          'text-sm w-full h-[90px] font-bold text-[20px] text-white! bg-gray-6/70! backdrop-blur-sm rounded-[12px]! px-6! [&>*[role="status"]]:justify-start! [&>*[role="status"]]:ml-4! max-w-full!',
        success: {
          iconTheme: {
            primary: '#0BB76D',
            secondary: 'white',
          },
        },
      }}
    />
  );
};
