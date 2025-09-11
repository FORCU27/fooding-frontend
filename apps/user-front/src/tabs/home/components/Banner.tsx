import Image from 'next/image';

import { Button } from '@repo/design-system/components/b2c';
import { ChevronRightIcon } from '@repo/design-system/icons';

import { Carousel } from '@/components/Carousel';

const CAROUSEL_ITEMS = Array.from({ length: 10 });

// TODO: 실제 컨텐츠 추가
export const Banner = () => (
  <Carousel>
    <Carousel.Region>
      <Carousel.List>
        {CAROUSEL_ITEMS.map((_, index) => (
          <Carousel.Item key={index} className='h-[200px]'>
            <Image
              src='/images/home/banneritem1.png'
              alt='banner'
              fill
              className='object-cover'
              priority
            />
            <div className='absolute top-6 left-7'>
              <p className='text-white body-3 mb-1'>흑백요리사 출연 셰프 맛집</p>
              <p className='text-white headline-1'>오늘 메뉴는 뭔가요?</p>
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
              {page} / {CAROUSEL_ITEMS.length}
            </p>
          </div>
        )}
      </Carousel.Pagination>
    </Carousel.Region>
  </Carousel>
);
