import Link from 'next/link';

import { StoreInfo } from '@repo/api/user';
import { Button, EmptyState } from '@repo/design-system/components/b2c';
import {
  BankNoteIcon,
  CalendarPlusIcon,
  CarIcon,
  ChairIcon,
  CompassIcon,
  CreditCardIcon,
  FaceHappyIcon,
  GroupIcon,
  HourGlassIcon,
  InstagramIcon,
  KidsIcon,
  LinkIcon,
  LuggageIcon,
  MarkPinIcon,
  ShoppingBagIcon,
  SmartPhoneIcon,
  TrainIcon,
  TruckIcon,
  UsersIcon,
  WifiIcon,
  XIcon,
  YoutubeIcon,
} from '@repo/design-system/icons';
import { cn } from '@repo/design-system/utils';

import { Divider } from '@/components/Layout/Divider';
import { LoadingScreen } from '@/components/Layout/LoadingScreen';
import { Section } from '@/components/Layout/Section';
import { StoresList } from '@/components/Store/StoresList';
import { SubwayLine, SubwayLineBadge } from '@/components/SubwayLineBadge';
import { useGetStoreAdditionalInfo } from '@/hooks/store/useGetStoreAdditionalInfo';
import { useGetStoreImmediateEntryList } from '@/hooks/store/useGetStoreImmediateEntryList';
import { useGetStoreList } from '@/hooks/store/useGetStoreList';
import { StoreInfoMap } from '@/libs/kakao-map/StoreInfoMap';
import { getKakaoMapDirectionUrl } from '@/libs/kakao-map/utils';
import { noop } from '@/utils/noop';

type StoreDetailInfoTabProps = {
  store: StoreInfo;
};

const ALL_FACILITIES = [
  '단체 이용 가능',
  '포장',
  '배달',
  '예약',
  '방문접수/출장',
  '무선인터넷',
  '유아시설/놀이방',
  '남/녀 화장실 구분',
  '유아의자',
  '대기공간',
  '노키즈존',
] as const;

type Facility = (typeof ALL_FACILITIES)[number];

const facilityIconMap: Record<Facility, { label: string; icon: React.ReactNode }> = {
  '단체 이용 가능': { label: '단체 이용 가능', icon: <UsersIcon /> },
  포장: { label: '포장', icon: <ShoppingBagIcon /> },
  배달: { label: '배달', icon: <TruckIcon /> },
  예약: { label: '예약', icon: <CalendarPlusIcon /> },
  '방문접수/출장': { label: '방문접수/출장', icon: <LuggageIcon /> },
  무선인터넷: { label: '무선인터넷', icon: <WifiIcon /> },
  '유아시설/놀이방': { label: '유아시설/놀이방', icon: <FaceHappyIcon /> },
  '남/녀 화장실 구분': { label: '남/녀 화장실 구분', icon: <GroupIcon /> },
  유아의자: { label: '유아의자', icon: <ChairIcon /> },
  대기공간: { label: '대기공간', icon: <HourGlassIcon /> },
  노키즈존: { label: '노키즈존', icon: <KidsIcon /> },
};

export const StoreDetailInfoTab = ({ store }: StoreDetailInfoTabProps) => {
  const { data: stores, isPending, isFetching } = useGetStoreList({ sortType: 'RECENT' });
  const { data: info } = useGetStoreAdditionalInfo(store.id);
  const { data: immediateEntryStores } = useGetStoreImmediateEntryList({
    pageNum: 1,
    pageSize: 10,
  });

  if (isPending || isFetching) return <LoadingScreen />;

  return (
    <div className='flex flex-col'>
      <Section className='py-[20px] gap-6'>
        <Section.Header>
          <Section.Title>소개</Section.Title>
        </Section.Header>
        <p>{store.description}</p>
      </Section>

      <Divider />

      <Section className='pb-8'>
        <Section.Header>
          <Section.Title>매장 위치</Section.Title>
        </Section.Header>
        <div className='w-full mt-[14px] rounded-[12px] h-[300px]'>
          {store.latitude !== null && store.longitude != null ? (
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

            {store.stations.map((station) => (
              <SubwayLineBadge
                className='mr-1'
                line={station.line as SubwayLine}
                key={station.id}
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

      <Section className='py-[20px] gap-6'>
        <Section.Header>
          <Section.Title className='flex justify-center items-center gap-2'>
            편의시설 및 서비스
            <span className='text-gray-5 subtitle-3'>{info?.facilities.length}</span>
          </Section.Title>
        </Section.Header>
        <div className='grid grid-cols-4 gap-x-8 gap-y-10 place-items-center'>
          {ALL_FACILITIES.map((facility) => {
            const has = info?.facilities.includes(facility);
            const { icon, label } = facilityIconMap[facility];

            return (
              <div
                key={facility}
                className={cn(
                  'flex flex-col justify-center items-center gap-2 px-4',
                  has ? 'text-black' : 'text-gray-4',
                )}
              >
                {icon}
                <span className='text-gray-5 body-7'>{label}</span>
              </div>
            );
          })}
        </div>
      </Section>
      <Divider />
      <Section className='py-[20px] gap-6'>
        <Section.Header>
          <Section.Title>주차</Section.Title>
        </Section.Header>
        <div>
          {info?.parkingAvailable ? (
            <div className='flex gap-2'>
              <CarIcon />
              <span>주차가능</span>
            </div>
          ) : (
            <div className='flex gap-2 text-gray-4'>
              <CarIcon />
              <span>주차불가</span>
            </div>
          )}
        </div>
      </Section>
      <Divider />
      <Section className='py-[20px] gap-6'>
        <Section.Header>
          <Section.Title className='flex justify-center items-center gap-2'>
            결제수단
            <span className='text-gray-5 subtitle-3'>
              {(info?.paymentMethods && info?.paymentMethods.length) || 0}
            </span>
          </Section.Title>
        </Section.Header>
        <div className='flex gap-6 flex-col body-6'>
          {info?.paymentMethods &&
            info?.paymentMethods.map((method) => {
              if (method === '지역화폐(카드형)') {
                return (
                  <div key={method} className='flex items-center gap-2'>
                    <CreditCardIcon /> 지역화폐(카드형)
                  </div>
                );
              }
              if (method === '지역화폐(지류형)') {
                return (
                  <div key={method} className='flex items-center gap-2'>
                    <BankNoteIcon /> 지역화폐(지류형)
                  </div>
                );
              }
              if (method === 'zeropay') {
                return (
                  <div key={method} className='flex items-center gap-2'>
                    <SmartPhoneIcon />
                    제로페이
                  </div>
                );
              }
              return null;
            })}
        </div>
      </Section>
      <Divider />
      <Section className='py-[20px] gap-6'>
        <Section.Header>
          <Section.Title>홈페이지 / SNS 링크</Section.Title>
        </Section.Header>
        <div className='flex flex-col gap-6'>
          <div className='flex gap-6 items-center'>
            <div className='rounded-full w-10 h-10 flex justify-center items-center bg-black'>
              <InstagramIcon className='text-white' />
            </div>
            {info?.links && info.links[0] ? (
              <Link href={'/'} className='underline'>
                {info.links[0]}
              </Link>
            ) : (
              <span className='text-gray-5'>링크가 없습니다.</span>
            )}
          </div>
          <div className='flex gap-6 items-center'>
            <div className='rounded-full w-10 h-10 flex justify-center items-center bg-black'>
              <XIcon className='text-white' />
            </div>
            {info?.links && info.links[1] ? (
              <Link href={'/'} className='underline'>
                {info.links[1]}
              </Link>
            ) : (
              <span className='text-gray-5'>링크가 없습니다.</span>
            )}
          </div>
          <div className='flex gap-6 items-center'>
            <div className='rounded-full w-10 h-10 flex justify-center items-center bg-black'>
              <YoutubeIcon className='text-white' />
            </div>
            {info?.links && info.links[2] ? (
              <Link href={'/'} className='underline'>
                {info.links[2]}
              </Link>
            ) : (
              <span className='text-gray-5'>링크가 없습니다.</span>
            )}
          </div>
          <div className='flex gap-6 items-center'>
            <div className='rounded-full w-10 h-10 flex justify-center items-center bg-black'>
              <LinkIcon className='text-white' />
            </div>
            {info?.links && info.links[3] ? (
              <Link href={'/'} className='underline'>
                {info.links[3]}
              </Link>
            ) : (
              <span className='text-gray-5'>링크가 없습니다.</span>
            )}
          </div>
        </div>
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
