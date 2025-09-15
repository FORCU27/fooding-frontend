import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';
import { ColumnDef } from '@tanstack/react-table';

import { Switch } from './Switch';
import { DropdownMenu } from './DropdownMenu';
import { EllipsisVerticalIcon } from 'lucide-react';

import logoGray from '../../assets/logo/fooding-logo-gray.png';

type RowData = {
  id: number;
  thumbnail: string;
  content: string;
  isPublic: boolean;
  views: number;
  likes: number;
  comments: number;
};

const meta: Meta<typeof DataTable> = {
  title: 'Components/ceo/DataTable',
  parameters: {
    layout: 'centered',
  },
  component: DataTable,
};
export default meta;

// 예시 공통 컬럼
const columns: ColumnDef<RowData>[] = [
  {
    accessorKey: 'thumbnail',
    header: () => <span className='w-[68px] block'>사진</span>,
    cell: ({ row }) => (
      <img
        src={row.original.thumbnail}
        alt='썸네일'
        className='w-[64px] h-[64px] rounded bg-gray-100 object-cover'
      />
    ),
    size: 60,
  },
  {
    accessorKey: 'content',
    header: '내용',
    cell: ({ row }) => <span className='truncate'>{row.original.content}</span>,
  },
  {
    accessorKey: 'isPublic',
    header: '공개여부',
    cell: ({ row }) => <Switch defaultChecked={row.original.isPublic} />,
  },
  {
    accessorKey: 'views',
    header: '조회',
  },
  {
    accessorKey: 'likes',
    header: '좋아요',
  },
  {
    accessorKey: 'comments',
    header: '댓글',
  },
  {
    id: 'actions',
    header: '',
    cell: () => (
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <button className='size-6 flex justify-center items-center cursor-pointer'>
            <EllipsisVerticalIcon className='size-5' />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content side='left'>
          <DropdownMenu.Item>수정</DropdownMenu.Item>
          <DropdownMenu.Item variant='danger'>삭제</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    ),
  },
];

// 예시 목록 데이터
const sampleData: RowData[] = [
  {
    id: 1,
    thumbnail: 'https://placehold.co/60x60',
    content: '가성비맛집 바다풍경 정육식당 사전 예약 필수입니다.',
    isPublic: true,
    views: 9999,
    likes: 9999,
    comments: 9999,
  },
  {
    id: 2,
    thumbnail: 'https://placehold.co/60x60',
    content: '이 집은 진짜 맛있습니다.',
    isPublic: false,
    views: 8888,
    likes: 7777,
    comments: 6666,
  },
];

type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  render: () => (
    <div className='rounded-[20px] bg-white pt-[32px] pb-[40px] px-[32px] shadow-sm'>
      <DataTable columns={columns} data={sampleData} />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className='rounded-[20px] bg-white pt-[32px] pb-[40px] px-[32px] shadow-sm'>
      <DataTable
        columns={columns}
        data={[]}
        emptyRenderer={
          <div className='flex flex-col items-center justify-center gap-4'>
            <img src={logoGray} width={199} height={48} alt='logo' />
            <p className='text-gray-3 body-2'>아직 사용 내역이 없어요</p>
          </div>
        }
      />
    </div>
  ),
};
