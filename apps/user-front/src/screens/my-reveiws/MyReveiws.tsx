import { EmptyState } from '@repo/design-system/components/b2c';
import { ActivityComponentType } from '@stackflow/react/future';

import { MyReviewCard } from './components/MyReviewCard';
import BottomTab from '@/components/Layout/BottomTab';
import { Header } from '@/components/Layout/Header';
import { LoadingScreen } from '@/components/Layout/LoadingScreen';
import { Screen } from '@/components/Layout/Screen';
import { useGetMyReviewList } from '@/hooks/review/useGetMyReviewList';

export const MyReviewsScreen: ActivityComponentType<'MyReviewsScreen'> = () => {
  const {
    data: reviews,
    isPending,
    isFetching,
  } = useGetMyReviewList({
    sortType: 'RECENT',
    sortDirection: 'DESCENDING',
    pageNum: 1,
    pageSize: 100,
  });

  if (isPending || isFetching) return <LoadingScreen />;

  if (reviews.list.length === 0) {
    return <EmptyState title='작성한 리뷰가 없어요!' />;
  }

  return (
    <Screen
      header={<Header left={<Header.Back />} title='내 리뷰' />}
      bottomTab={<BottomTab currentTab='mypage' />}
    >
      <div className='flex flex-col gap-3 p-5'>
        {reviews.list.map((review) => (
          <div key={review.reviewId}>
            <li className='flex py-grid-margin'>
              <MyReviewCard storeId={review.storeId} review={review} />
            </li>
          </div>
        ))}
      </div>
    </Screen>
  );
};
