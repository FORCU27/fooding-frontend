import Image from 'next/image';

import { FullscreenBottomSheet } from '@repo/design-system/components/b2c';
import { CloseIcon } from '@repo/design-system/icons';

import { Carousel } from './Carousel';

type ImageGalleryProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  imageUrls: string[];
  initialPage: number;
};

export const ImageGallery = ({
  isOpen,
  onClose,
  title,
  imageUrls,
  initialPage,
}: ImageGalleryProps) => {
  return (
    <FullscreenBottomSheet isOpen={isOpen} onOpenChange={(isOpen) => isOpen === false && onClose()}>
      <FullscreenBottomSheet.Content className='bg-black' hideCloseButton>
        <Carousel initialPage={initialPage}>
          <div className='flex h-[60px] items-center text-white justify-between'>
            <div className='flex items-center'>
              <FullscreenBottomSheet.Close className='ml-3 size-[30px] flex justify-center items-center'>
                <CloseIcon />
              </FullscreenBottomSheet.Close>
              <span className='ml-4 font-semibold'>{title}</span>
            </div>
            <div className='flex items-center mr-5 gap-1'>
              <span className='body-7'>전체</span>
              <Carousel.Pagination>
                {({ page }) => (
                  <span className='subtitle-7'>
                    {page}/{imageUrls.length}
                  </span>
                )}
              </Carousel.Pagination>
            </div>
          </div>
          <div className='flex justify-center items-center h-full'>
            <Carousel.Region className='w-full'>
              <Carousel.List className='h-full'>
                {imageUrls.map((imageUrl, index) => (
                  <Carousel.Item key={index} className='h-[265px] bg-white'>
                    <Image src={imageUrl} alt='이미지' fill />
                  </Carousel.Item>
                ))}
              </Carousel.List>
            </Carousel.Region>
          </div>
        </Carousel>
      </FullscreenBottomSheet.Content>
    </FullscreenBottomSheet>
  );
};
