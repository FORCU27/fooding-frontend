import { StoreInfo } from '@repo/api/user';
import { Masonry } from 'react-plock';

import { IntersectionObserver } from '@/components/IntersectionObserver';
import { Section } from '@/components/Layout/Section';
import { useGetInfiniteStoreImageList } from '@/hooks/store/useGetInfiniteStoreImageList';

type StoreDetailPhotoTabProps = {
  store: StoreInfo;
};

export const StoreDetailPhotoTab = ({ store }: StoreDetailPhotoTabProps) => {
  const { images, fetchNextPage } = useGetInfiniteStoreImageList({ storeId: store.id });

  return (
    <Section className='flex flex-col'>
      <Masonry
        className='mt-6'
        items={images}
        config={{
          columns: [2],
          gap: [8],
        }}
        render={(item, index) => (
          <div key={index}>
            <img
              key={index}
              src={item.imageUrl}
              alt='그림'
              className='rounded-[12px] w-full h-auto'
            />
          </div>
        )}
      />
      <IntersectionObserver onIntersect={fetchNextPage} />
    </Section>
  );
};
