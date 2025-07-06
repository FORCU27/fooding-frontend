import { mockStoreReviewListResponse, StoreInfo } from '@repo/api/user';
import { Button, EmptyState } from '@repo/design-system/components/b2c';
import {
  ClockIcon,
  CompassIcon,
  MarkPinIcon,
  PhoneIcon,
  TrainIcon,
} from '@repo/design-system/icons';

import { Section } from '@/components/Layout/Section';
import { MenuCard } from '@/components/Store/MenuCard';
import { ReviewsList } from '@/components/Store/ReviewsList';
import { StoresList } from '@/components/Store/StoresList';
import { SubwayLineBadge } from '@/components/SubwayLineBadge';
import { useGetStoreList } from '@/hooks/store/useGetStoreList';
import { useGetStoreMenuList } from '@/hooks/store/useGetStoreMenuList';
import { noop } from '@/utils/noop';

const mock = {
  location: '제주 제주시 서해안로 654 바다풍경 정육식당',
  subwayLocation: '제주역에서 847m',
  subwayNumber: 6,
  operatingHours: '매일 10:40 - 21:50',
  isFinished: false,
} as const;

type StoreDetailHomeTabProps = {
  store: StoreInfo;
};

export const StoreDetailHomeTab = ({ store }: StoreDetailHomeTabProps) => {
  const { data: storeMenus } = useGetStoreMenuList(store.id);
  // const { data: storeReviews } = useGetStoreReviewList(store.id);
  const { data: reviews } = mockStoreReviewListResponse; //TODO: 추후 목데이터 제거
  const { data: stores } = useGetStoreList({ sortType: 'RECENT' });

  return (
    <div className='flex flex-col'>
      <Section className='mt-[10px] py-[20px] gap-[6px]'>
        <span className='body-6 flex items-center gap-[10px]'>
          <MarkPinIcon className='size-[18px] stroke-1' />
          {mock.location}
        </span>
        <span className='body-6 flex items-center gap-[10px]'>
          <ClockIcon className='size-[18px] stroke-1' />
          {!mock.isFinished && (
            <button className='flex items-center h-[26px] subtitle-7 text-white bg-gradient-to-r from-[#35FFBF] to-[#6CB8FF] rounded-full px-[10px]'>
              영업중
            </button>
          )}
          {mock.operatingHours}
        </span>
        <span className='body-6 flex items-center gap-[10px]'>
          <PhoneIcon className='size-[18px] stroke-1' />
          {store.contactNumber}
        </span>
      </Section>
      {/* TODO: 메뉴 목록 조회 기능 추가 */}
      <Section className='mt-[10px] pb-8'>
        <Section.Header>
          <Section.Title>메뉴</Section.Title>
          <Section.Link>더보기</Section.Link>
        </Section.Header>
        {storeMenus.length === 0 && <EmptyState className='mt-10' title='등록된 메뉴가 없어요!' />}
        {storeMenus.length > 0 && (
          <ul className='mt-6 flex gap-3 -mx-grid-margin overflow-x-auto scrollbar-hide px-grid-margin'>
            {/* TODO: 왜 배열일까 */}
            {storeMenus[0]?.menu.map((menu) => (
              <MenuCard key={menu.id}>
                <MenuCard.Image src={null} alt={menu.name} />
                <MenuCard.Title>{menu.name}</MenuCard.Title>
                <MenuCard.Price>{menu.price.toLocaleString()}</MenuCard.Price>
              </MenuCard>
            ))}
          </ul>
        )}
      </Section>
      {/* TODO: 리뷰 목록 조회 기능 추가 */}
      <Section className='mt-[10px]'>
        <Section.Header>
          <Section.Title className='flex items-center gap-1'>
            리뷰
            <span className='subtitle-6 text-gray-5'>({reviews.list.length})</span>
          </Section.Title>
          {reviews.list.length > 0 && <Section.Link>더보기</Section.Link>}
        </Section.Header>
        {reviews.list.length === 0 && (
          <EmptyState className='mt-10' title='등록된 리뷰가 없어요!' />
        )}
        {reviews.list.length > 0 && (
          <ul className='mt-6 flex gap-3 -mx-grid-margin overflow-x-auto scrollbar-hide px-grid-margin pb-8'>
            <ReviewsList reviews={reviews.list} />
          </ul>
        )}
      </Section>
      {/* TODO: 매장 위치 조회 기능 추가 */}
      <Section className='mt-[10px] pb-8'>
        <Section.Header>
          <Section.Title>매장 위치</Section.Title>
        </Section.Header>
        <div className='mt-[14px] rounded-[12px] bg-gray-1 h-[262px]' />
        <div className='mt-3 flex flex-col gap-1'>
          <span className='body-6 flex items-center gap-[10px]'>
            <MarkPinIcon className='size-[18px] stroke-1' />
            제주 제주시 서해안로 654 바다풍경 정육식당
          </span>
          <span className='body-6 flex items-center'>
            <TrainIcon className='mr-[10px] size-[18px] stroke-1' />
            <SubwayLineBadge className='mr-1' line={6} />
            제주역에서 847m
          </span>
        </div>
        <Button className='mt-5' variant='gray'>
          <CompassIcon className='mr-1 size-[18px]' />
          길찾기
        </Button>
      </Section>
      <div className='mt-[10px]'>
        {/* TODO: 다른사람이 함께 본 식당 목록 조회 기능 추가 */}
        <StoresList
          subtitle='다른사람이 함께 본 비슷한 식당'
          stores={stores.list}
          onClickTotalBtn={noop}
        />
        {/* TODO: 지금 바로 입장 가능한 식당 목록 조회 기능 추가 */}
        <StoresList
          subtitle='지금 바로 입장하실 수 있어요!'
          stores={stores.list}
          onClickTotalBtn={noop}
        />
      </div>
    </div>
  );
};
