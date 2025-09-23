import Image from 'next/image';

import { useFlow } from '@stackflow/react/future';

import { Carousel } from '@/components/Carousel';
import { useGetBannerList } from '@/hooks/banner/useGetBannerList';
import { screenId } from '@/libs/stackflow';

const DEFAULT_PLACEHOLDER = '/images/home/banneritem1.png';

export const Banner = () => {
  const flow = useFlow();

  const { data: banners } = useGetBannerList();

  if (banners.length === 0) {
    return null;
  }

  return (
    <Carousel>
      <Carousel.Region>
        <Carousel.List>
          {banners.map((banner, index) => (
            <Carousel.Item key={banner.id} className='h-[220px]'>
              <button
                onClick={() => {
                  if (!banner.parameters || !banner.parameters.screenId) return;

                  const screenName = screenId[banner.parameters.screenId];

                  if (screenName) {
                    flow.push(screenName, {});
                  }
                }}
              >
                <Image
                  src={banner.imageUrl || DEFAULT_PLACEHOLDER}
                  alt={banner.name}
                  fill
                  className='object-cover w-full h-ful'
                  priority={index === 0}
                />
              </button>
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
