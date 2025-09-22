import { StoreInfo } from '@repo/api/user';
import { EmptyState } from '@repo/design-system/components/b2c';
import { overlay } from 'overlay-kit';
import { Masonry } from 'react-plock';

import { ImageGallery } from '@/components/ImageGallery';
import { IntersectionObserver } from '@/components/IntersectionObserver';
import { Section } from '@/components/Layout/Section';
import { useGetInfiniteStoreImageList } from '@/hooks/store/useGetInfiniteStoreImageList';

type StoreDetailPhotoTabProps = {
  store: StoreInfo;
};

export const StoreDetailPhotoTab = ({ store }: StoreDetailPhotoTabProps) => {
  const { images, fetchNextPage } = useGetInfiniteStoreImageList({ storeId: store.id });

  const onImageClick = (id: number) => {
    const index = images.findIndex((img) => img.id === id);

    overlay.open(({ isOpen, close }) => (
      <ImageGallery
        isOpen={isOpen}
        onClose={close}
        imageUrls={images.map((img) => img.imageUrl)}
        title={store.name}
        initialPage={index + 1}
      />
    ));
  };

  if (images.length === 0) {
    return <EmptyState className='py-[100px]' title='올라온 사진이 없어요!' />;
  }

  return (
    <Section className='flex flex-col'>
      <Masonry
        className='mt-6'
        items={images}
        config={{
          columns: [2],
          gap: [8],
        }}
        render={(item: { id: number; imageUrl: string }, index: number) => (
          <button key={index} onClick={() => onImageClick(item.id)}>
            <img src={item.imageUrl} alt='그림' className='rounded-[12px] w-full h-auto' />
          </button>
        )}
      />
      <IntersectionObserver onIntersect={fetchNextPage} />
    </Section>
  );
};
