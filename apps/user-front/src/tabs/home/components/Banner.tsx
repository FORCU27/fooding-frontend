import Image from 'next/image';

import { Button } from '@repo/design-system/components/b2c';
import { ChevronRightIcon } from '@repo/design-system/icons';

import { Carousel } from '@/components/Carousel';
import { useGetBannerList } from '@/hooks/banner/useGetBannerList';

export const Banner = () => {
  const {
    data: { list: banners },
  } = useGetBannerList();

  return (
    <Carousel>
      <Carousel.Region>
        <Carousel.List>
          {banners.map((banner) => (
            <Carousel.Item key={banner.id} className='h-[200px]'>
              <Image
                src='/images/home/banneritem1.png'
                alt='banner'
                fill
                className='object-cover'
                priority
              />
              <div className='absolute top-6 left-7'>
                <p className='text-white body-3 mb-1'>{banner.name}</p>
                <p className='text-white headline-1'>{banner.description}</p>
              </div>
              <Button className='absolute left-6 bottom-6' size='small' variant='primary'>
                <p className='body-5 mr-2'>예약하러 가기</p>
                <ChevronRightIcon size={20} color='var(--color-white)' />
              </Button>
            </Carousel.Item>
          ))}
        </Carousel.List>
        <Carousel.Pagination>
          {({ page }) => (
            <div className='absolute right-6 bottom-6 w-[48px] h-[28px] rounded-[8px] bg-black/60 flex justify-center items-center'>
              <p className='body-8 text-white opacity-100'>
                {page} / {banners.length}
              </p>
            </div>
          )}
        </Carousel.Pagination>
      </Carousel.Region>
    </Carousel>
  );
};
