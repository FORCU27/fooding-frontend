import { StoreInfo } from '@repo/api/user';
import { EmptyState } from '@repo/design-system/components/b2c';

import { Section } from '@/components/Layout/Section';
import { ReviewsList } from '@/components/Store/ReviewsList';
import { useGetStoreReviewList } from '@/hooks/store/useGetStoreReviewList';

type StoreDetailReviewTabProps = {
  store: StoreInfo;
};

// FIXME: 가게상세 리뷰탭 API 나오면 수정
export const StoreDetailReviewTab = ({ store }: StoreDetailReviewTabProps) => {
  const { data: reviews } = useGetStoreReviewList(store.id);

  return (
    <div className='flex flex-col'>
      <Section className='mt-[10px]'>
        {reviews.list.length === 0 && (
          <EmptyState className='h-[120px]' title='등록된 리뷰가 없어요.' />
        )}
        {reviews.list.length > 0 && (
          <ul className='mt-6 flex flex-col gap-3 items-center -mx-grid-margin overflow-x-auto scrollbar-hide px-grid-margin pb-8'>
            <ReviewsList items={reviews.list} />
          </ul>
        )}
      </Section>
    </div>
  );
};
