import { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';
import { columnsType1, columnsType3, columnsType5 } from './DataTable';

type Story = StoryObj<typeof DataTable<any>>;

const meta: Meta<typeof DataTable<any>> = {
  title: 'Components/ceo/DataTable',
  component: DataTable,
  render: (args) => (
    <div className='w-full min-w-[1080px] overflow-x-auto'>
      <DataTable {...args} />
    </div>
  ),
};

export default meta;

export const Default: Story = {
  args: {
    columns: columnsType1,
    data: [
      {
        image: '/placeholder.png',
        title: '가성비맛집 바다풍경 정육식당 사전 예약 필수입니다.',
        active: true,
        views: 9999,
        likes: 9999,
        comments: 9999,
      },
      {
        image: '/placeholder.png',
        title: '가성비맛집 바다풍경 정육식당 사전 예약 필수입니다.',
        active: true,
        views: 9999,
        likes: 9999,
        comments: 9999,
      },
      {
        image: '/placeholder.png',
        title: '가성비맛집 바다풍경 정육식당 사전 예약 필수입니다.',
        active: true,
        views: 9999,
        likes: 9999,
        comments: 9999,
      },
    ],
  },
};

// 1번 페이지 스토리
export const Type1: Story = {
  args: {
    columns: columnsType1,
    data: [
      { image: '/sample1.png', title: '상품 A', active: true, views: 100, likes: 50, comments: 10 },
      { image: '/sample2.png', title: '상품 B', active: false, views: 200, likes: 30, comments: 5 },
    ],
  },
};

// // 2번 페이지 스토리
// export const Type2: Story = {
//   args: {
//     columns: columnsType2,
//     data: [
//       { favorite: true, nickname: '유저1', region: '서울', cert: 'Y', period: '30일' },
//       { favorite: false, nickname: '유저2', region: '부산', cert: 'N', period: '7일' },
//     ],
//   },
// };

// 3번 페이지 스토리
export const Type3: Story = {
  args: {
    columns: columnsType3,
    data: [
      { no: 1, point: 100, channel: '웹', type: '적립', earnedAt: '2025-09-10' },
      { no: 2, point: 200, channel: '앱', type: '사용', earnedAt: '2025-09-12' },
    ],
  },
};

// // 4번 페이지 스토리
// export const Type4: Story = {
//   args: {
//     columns: columnsType4,
//     data: [
//       { couponName: '신규회원 쿠폰', issued: true, totalIssued: 100, used: 30, remain: 70 },
//       { couponName: '추석 이벤트 쿠폰', issued: false, totalIssued: 50, used: 10, remain: 40 },
//     ],
//   },
// };

// 5번 페이지 스토리
export const Type5: Story = {
  args: {
    columns: columnsType5,
    data: [
      { nickname: '사용자A', receivedAt: '2025-09-01', usedAt: '2025-09-03' },
      { nickname: '사용자B', receivedAt: '2025-09-05', usedAt: '2025-09-07' },
    ],
  },
};
