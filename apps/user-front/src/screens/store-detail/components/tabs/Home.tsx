import { StoreInfo } from '@repo/api/user';
import { Button, EmptyState } from '@repo/design-system/components/b2c';
import {
  ClockIcon,
  CompassIcon,
  MarkPinIcon,
  PhoneIcon,
  TrainIcon,
} from '@repo/design-system/icons';
import { useFlow } from '@stackflow/react/future';

import { Section } from '@/components/Layout/Section';
import { MenuCard } from '@/components/Store/MenuCard';
import { ReviewsList } from '@/components/Store/ReviewsList';
import { StoresList } from '@/components/Store/StoresList';
import { SubwayLineBadge } from '@/components/SubwayLineBadge';
import { useGetStoreList } from '@/hooks/store/useGetStoreList';
import { useGetStoreMenuList } from '@/hooks/store/useGetStoreMenuList';
import { useGetStoreReviewList } from '@/hooks/store/useGetStoreReviewList';
import { StoreInfoMap } from '@/libs/kakao-map/StoreInfoMap';
import { getKakaoMapDirectionUrl } from '@/libs/kakao-map/utils';
import { isNonEmptyArray } from '@/utils/array';
import { noop } from '@/utils/noop';

// TODO: API 연동
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
  const flow = useFlow();

  const { data: storeMenus } = useGetStoreMenuList(store.id);
  const { data: reviews } = useGetStoreReviewList(store.id);
  const { data: stores } = useGetStoreList({ sortType: 'RECENT' });

  return (
    <div className='flex flex-col'>
      <Section className='mt-[10px] py-[20px] gap-[6px]'>
        <span className='body-6 flex items-center gap-[10px]'>
          <MarkPinIcon className='size-[18px] stroke-1' />
          {store.address}
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
      <Section className='mt-[10px] pb-8'>
        <Section.Header>
          <Section.Title>메뉴</Section.Title>
          <Section.Link>더보기</Section.Link>
        </Section.Header>
        {!isNonEmptyArray(storeMenus) ? (
          <EmptyState className='mt-10' title='등록된 메뉴가 없어요!' />
        ) : (
          <ul className='mt-6 flex gap-3 -mx-grid-margin overflow-x-auto scrollbar-hide px-grid-margin'>
            {storeMenus[0].menu.map((menu) => (
              <MenuCard key={menu.id}>
                <MenuCard.Image src={null} alt={menu.name} />
                <MenuCard.Title>{menu.name}</MenuCard.Title>
                <MenuCard.Price>{menu.price.toLocaleString()}</MenuCard.Price>
              </MenuCard>
            ))}
          </ul>
        )}
      </Section>
      <Section className='mt-[10px]'>
        <Section.Header>
          <Section.Title className='flex items-center gap-1'>
            리뷰
            <span className='subtitle-6 text-gray-5'>({reviews.list.length})</span>
          </Section.Title>
          {reviews.list.length > 0 && (
            <Section.Link
              onClick={() => flow.push('StoreDetailScreen', { storeId: store.id, tab: 'review' })}
            >
              더보기
            </Section.Link>
          )}
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
      <Section className='mt-[10px] pb-8'>
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
            <SubwayLineBadge className='mr-1' line={6} />
            {store.direction}
          </span>
        </div>
        {store.latitude && store.longitude && (
          <PathfindingButton
            latitude={store.latitude}
            longitude={store.longitude}
            name={store.name}
          />
        )}
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

type PathfindingButtonProps = {
  latitude: number;
  longitude: number;
  name: string;
};

const PathfindingButton = ({ latitude, longitude, name }: PathfindingButtonProps) => {
  return (
    <Button
      variant='gray'
      size='large'
      onClick={() => getKakaoMapDirectionUrl({ latitude, longitude, name })}
    >
      <CompassIcon />
      <span className='ml-1'>길찾기</span>
    </Button>
  );
};
