import Image from 'next/image';

export const FoodImage = () => (
  <div className='absolute bottom-0 right-0 w-[600px]'>
    <Image
      src='/images/wating/wating-three-food.png'
      alt='음식 이미지'
      width={600}
      height={400}
      style={{ width: '100%', height: 'auto' }}
    />
  </div>
);
