import Image from 'next/image';
import NextLink from 'next/link';

import { userBannerApi } from '@repo/api/user';
import { Button } from '@repo/design-system/components/b2c';
import { ChevronRightIcon } from '@repo/design-system/icons';
import { useQuery } from '@tanstack/react-query';

import { Carousel } from '@/components/Carousel';

const DEFAULT_PLACEHOLDER = '/images/home/banneritem1.png';

export const Banner = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user-banners'],
    queryFn: () =>
      userBannerApi.list({
        pageNum: 1,
        pageSize: 10,
      }),
    staleTime: 5_000,
  });

  const banners = data?.data.list ?? [];

  if (isError) {
    return null;
  }

  if (isLoading && banners.length === 0) {
    return (
      <div className='h-[200px] flex items-center justify-center bg-gray-100 rounded-[12px]'>
        <p className='body-4 text-gray-500'>배너를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (banners.length === 0) {
    return null;
  }

  return (
    <Carousel>
      <Carousel.Region>
        <Carousel.List>
          {banners.map((banner, index) => (
            <Carousel.Item key={banner.id ?? index} className='h-[220px]'>
              <Image
                src={banner.imageUrl || DEFAULT_PLACEHOLDER}
                alt={banner.name}
                fill
                className='object-cover'
                priority={index === 0}
              />
              {banner.link && (
                <Button
                  asChild
                  className='absolute left-6 bottom-6'
                  size='small'
                  variant='primary'
                >
                  <NextLink href={banner.link} target='_blank' rel='noopener noreferrer'>
                    <span className='body-5 mr-2'>바로가기</span>
                    <ChevronRightIcon size={20} color='var(--color-white)' />
                  </NextLink>
                </Button>
              )}
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
