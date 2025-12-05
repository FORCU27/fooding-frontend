import { ProgressCircle } from '@repo/design-system/components/b2c';

export const LoadingScreen = () => {
  return (
    <div className='flex flex-col items-center pt-8'>
      <ProgressCircle />
    </div>
  );
};
