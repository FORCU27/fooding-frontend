import Image from 'next/image';

export const FoodImage = () => (
  <div className='absolute bottom-0 right-0 w-[300px] md:w-[400px] lg:w-[800px] z-0'>
    <Image
      src='/images/wating/wating-three-food.png'
      alt='음식 이미지'
      width={800}
      height={533}
      style={{ width: '100%', height: 'auto' }}
      priority
    />
  </div>
);
