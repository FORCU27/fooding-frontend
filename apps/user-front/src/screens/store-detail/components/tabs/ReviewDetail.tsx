import { StoreInfo } from '@repo/api/user';
import { EmptyState } from '@repo/design-system/components/b2c';
import { ChevronDownIcon, StarIcon } from '@repo/design-system/icons';

import { LoadingScreen } from '@/components/Layout/LoadingScreen';
import { Section } from '@/components/Layout/Section';
import { ReviewsDetailList } from '@/components/Store/ReviewsDetailList';
import { useGetStoreDetail } from '@/hooks/store/useGetStoreDetail';
import { useGetStoreReviewList } from '@/hooks/store/useGetStoreReviewList';
import { getRatingRatios } from '@/utils/rating';

type StoreDetailReviewTabProps = {
  store: StoreInfo;
};

export const StoreDetailReviewTab = ({ store }: StoreDetailReviewTabProps) => {
  const {
    data: storeInfo,
    isPending: storeInfoPending,
    isFetching: storeInfoFetching,
  } = useGetStoreDetail(store.id);
  const {
    data: reviews,
    isPending: reviewsPending,
    isFetching: reviewsFetching,
  } = useGetStoreReviewList(store.id);

  const ratingCounts: { [score: number]: number } = (() => {
    const counts: { [score: number]: number } = {};

    for (const review of reviews.list) {
      const roundedScore = Math.round(review.score.total);
      counts[roundedScore] = (counts[roundedScore] ?? 0) + 1;
    }

    return counts;
  })();

  const isLoading = storeInfoPending || storeInfoFetching || reviewsPending || reviewsFetching;

  if (isLoading) return <LoadingScreen />;

  return (
    <Section className='flex flex-col'>
      <div className='flex w-full h-[180px] justify-evenly items-center'>
        <div className='flex flex-col justify-center items-center'>
          <StarIcon size={24} className='stroke-fooding-yellow fill-fooding-yellow' />
          <p className='headline-3'>{storeInfo.averageRating}</p>
        </div>
        <div className='flex justify-center items-center'>
          <RatingBar ratingCounts={ratingCounts} />
        </div>
      </div>
      <hr className='text-gray-2 w-full' />
      <div className='flex gap-1 items-center mt-5'>
        <p className='body-4'>베스트순</p>
        <ChevronDownIcon size={16} className='stroke-gray-5 cursor-pointer' />
      </div>
      {reviews.list.length === 0 && (
        <EmptyState className='mt-10 mb-25' title='등록된 리뷰가 없어요!' />
      )}
      {reviews.list.length > 0 && (
        <ul className='flex flex-col mt-2 pb-24'>
          <ReviewsDetailList reviews={reviews.list} store={storeInfo} />
        </ul>
      )}
    </Section>
  );
};

interface RatingBarProps {
  ratingCounts: { [score: number]: number };
}

export const RatingBar = ({ ratingCounts }: RatingBarProps) => {
  const ratingRatios = getRatingRatios(ratingCounts);

  return (
    <div className='max-w-[310px] flex flex-col gap-2'>
      {ratingRatios.map(({ score, count, ratio }) => (
        <div key={score} className='flex items-center'>
          <span className='body-7 mr-2 w-[22px]'>{score}점</span>
          <div className='relative w-[200px] h-[6px] bg-gray-200 rounded-full overflow-hidden'>
            <div
              className='absolute top-0 left-0 h-full bg-[#FFCB05]'
              style={{ width: `${ratio}%` }}
            />
          </div>
          <span className='body-8 text-gray-5 w-[22px] ml-2'>{count}</span>
        </div>
      ))}
    </div>
  );
};
