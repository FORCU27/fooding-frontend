import { StoreInfo } from '@repo/api/user';
import { Button, EmptyState } from '@repo/design-system/components/b2c';
import {
  ClockIcon,
  CompassIcon,
  MarkPinIcon,
  PhoneIcon,
  TrainIcon,
} from '@repo/design-system/icons';

import { Divider } from '@/components/Layout/Divider';
import { LoadingScreen } from '@/components/Layout/LoadingScreen';
import { Section } from '@/components/Layout/Section';
import { MenuCard } from '@/components/Store/MenuCard';
import { ReviewsList } from '@/components/Store/ReviewsList';
import { StoresList } from '@/components/Store/StoresList';
import { SubwayLine, SubwayLineBadge } from '@/components/SubwayLineBadge';
import { useGetStoreImmediateEntryList } from '@/hooks/store/useGetStoreImmediateEntryList';
import { useGetStoreList } from '@/hooks/store/useGetStoreList';
import { useGetStoreMenuList } from '@/hooks/store/useGetStoreMenuList';
import { useGetStoreReviewList } from '@/hooks/store/useGetStoreReviewList';
import { StoreInfoMap } from '@/libs/kakao-map/StoreInfoMap';
import { getKakaoMapDirectionUrl } from '@/libs/kakao-map/utils';
import { isNonEmptyArray } from '@/utils/array';
import { noop } from '@/utils/noop';

// TODO: API 연동
const mock = {
  subwayLocation: '제주역에서 847m',
  subwayNumber: 6,
  operatingHours: '매일 10:40 - 21:50',
} as const;

type StoreDetailHomeTabProps = {
  store: StoreInfo;
  onSeeMoreReviews: () => void;
  onSeeMoreMenus: () => void;
};

export const StoreDetailHomeTab = ({
  store,
  onSeeMoreReviews,
  onSeeMoreMenus,
}: StoreDetailHomeTabProps) => {
  const {
    data: storeMenus,
    isPending: isMenusPending,
    isFetching: isMenusFetching,
  } = useGetStoreMenuList(store.id);
  const {
    data: reviews,
    isPending: isReviewsPending,
    isFetching: isReviewsFetching,
  } = useGetStoreReviewList(store.id);
  const { data: stores, isPending: isStoresPending } = useGetStoreList({ sortType: 'RECENT' });
  const {
    data: immediateEntryStores,
    isPending: isImmediatePending,
    isFetching: isImmediateFetching,
  } = useGetStoreImmediateEntryList({
    pageNum: 1,
    pageSize: 10,
  });

  const isLoading =
    isMenusPending ||
    isMenusFetching ||
    isReviewsPending ||
    isReviewsFetching ||
    isStoresPending ||
    isImmediatePending ||
    isImmediateFetching;

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className='flex flex-col'>
      <Section className='py-[20px] gap-[6px]'>
        <span className='body-6 flex items-center gap-[10px]'>
          <MarkPinIcon className='size-[18px] stroke-1' />
          {store.address}
        </span>
        <span className='body-6 flex items-center gap-[10px]'>
          <ClockIcon className='size-[18px] stroke-1' />
          {!store.isFinished && (
            <button className='flex items-center h-[26px] subtitle-7 text-white bg-gradient-to-r from-[#35FFBF] to-[#6CB8FF] rounded-full px-[10px]'>
              영업중
            </button>
          )}
          {store.isFinished && (
            <button className='flex items-center h-[26px] subtitle-7 text-gray-4 bg-gray-1 rounded-full px-[10px]'>
              영업종료
            </button>
          )}
          {mock.operatingHours}
        </span>
        <span className='body-6 flex items-center gap-[10px]'>
          <PhoneIcon className='size-[18px] stroke-1' />
          {store.contactNumber}
        </span>
      </Section>
      <Divider />
      <Section className='pb-8'>
        <Section.Header>
          <Section.Title>메뉴</Section.Title>
          <Section.Link onClick={onSeeMoreMenus}>더보기</Section.Link>
        </Section.Header>
        {!isNonEmptyArray(storeMenus) ? (
          <EmptyState className='mt-10' title='등록된 메뉴가 없어요!' />
        ) : (
          <ul className='mt-6 flex gap-3 -mx-grid-margin overflow-x-auto scrollbar-hide px-grid-margin'>
            {storeMenus[0].menu.map((menu) => (
              <MenuCard key={menu.id}>
                <MenuCard.Image src={menu.imageUrls[0] ?? null} alt={menu.name} />
                <MenuCard.Title>{menu.name}</MenuCard.Title>
                <MenuCard.Price>{menu.price.toLocaleString()}</MenuCard.Price>
              </MenuCard>
            ))}
          </ul>
        )}
      </Section>
      <Divider />
      <Section>
        <Section.Header>
          <Section.Title className='flex items-center gap-1'>
            리뷰
            <span className='subtitle-6 text-gray-5'>({reviews.list.length})</span>
          </Section.Title>
          {reviews.list.length > 0 && (
            <Section.Link onClick={onSeeMoreReviews}>더보기</Section.Link>
          )}
        </Section.Header>
        {reviews.list.length === 0 && (
          <EmptyState className='my-10' title='등록된 리뷰가 없어요!' />
        )}
        {reviews.list.length > 0 && (
          <ul className='mt-6 flex gap-3 -mx-grid-margin overflow-x-auto scrollbar-hide px-grid-margin pb-8'>
            <ReviewsList reviews={reviews.list} />
          </ul>
        )}
      </Section>
      <Divider />
      <Section className='pb-8'>
        <Section.Header>
          <Section.Title>매장 위치</Section.Title>
        </Section.Header>
        <div className='w-full mt-[14px] rounded-[12px] h-[300px]'>
          {store.latitude != null && store.longitude != null ? (
            <StoreInfoMap lat={store.latitude} lng={store.longitude} className='rounded-2xl' />
          ) : (
            <EmptyState className='mt-20' title='등록된 위치정보가 없어요!' />
          )}
        </div>
        <div className='mt-3 flex flex-col gap-1'>
          <span className='body-6 flex items-center gap-[10px]'>
            <MarkPinIcon className='size-[18px] stroke-1' />
            {store.address}
          </span>
          <span className='body-6 flex items-center'>
            <TrainIcon className='mr-[10px] size-[18px] stroke-1' />

            {store.stations &&
              store.stations.map((station) => (
                <SubwayLineBadge
                  key={station.id}
                  className='mr-1'
                  line={station.line as SubwayLine}
                />
              ))}

            {store.direction}
          </span>
        </div>
        {store.latitude && store.longitude && (
          <PathfindingButton
            className='mt-5'
            latitude={store.latitude}
            longitude={store.longitude}
            name={store.name}
          />
        )}
      </Section>
      <Divider />
      <div>
        {/* TODO: 다른사람이 함께 본 식당 목록 조회 기능 추가 */}
        <StoresList
          subtitle='다른사람이 함께 본 비슷한 식당'
          stores={stores.list}
          onClickTotalBtn={noop}
        />
        <StoresList
          subtitle='지금 바로 입장하실 수 있어요!'
          stores={immediateEntryStores.list}
          onClickTotalBtn={noop}
        />
      </div>
    </div>
  );
};

type PathfindingButtonProps = {
  className?: string;
  latitude: number;
  longitude: number;
  name: string;
};

const PathfindingButton = ({ className, latitude, longitude, name }: PathfindingButtonProps) => {
  return (
    <Button
      className={className}
      variant='gray'
      size='large'
      onClick={() => getKakaoMapDirectionUrl({ latitude, longitude, name })}
    >
      <CompassIcon />
      <span className='ml-1'>길찾기</span>
    </Button>
  );
};
