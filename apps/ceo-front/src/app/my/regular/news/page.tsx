'use client';

import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';

import {
  SortToggle,
  DataTable,
  DropdownMenu,
  Pagination,
  Button,
} from '@repo/design-system/components/ceo';
import { EllipsisVerticalIcon } from '@repo/design-system/icons';
import type { PaginationState } from '@tanstack/react-table';

const NewsPage = () => {
  const router = useRouter();

  const [sortOrder, setSortOrder] = useState('RECENT');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [targetId, setTargetId] = useState<number | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const columns = useMemo(
    () => [
      {
        header: '사진',
        id: 'photo',
        size: 68,
      },
      {
        header: '내용',
        id: 'content',
        size: 300,
      },
      {
        header: '공개여부',
        id: 'content',
        size: 95,
      },
      {
        header: '조회',
        size: 82,
      },
      {
        header: '조아요',
        size: 82,
      },
      {
        header: '댓글',
        size: 82,
      },
      {
        header: '',
        id: 'actions-dropdown',
        size: 68,
        cell: ({ row }) => (
          <div className='flex justify-center'>
            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <button className='size-6 flex justify-center items-center cursor-pointer'>
                  <EllipsisVerticalIcon className='size-5' />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content side='left'>
                <DropdownMenu.Item
                  variant='danger'
                  onClick={() => {
                    setTargetId(row.original.id);
                    setConfirmOpen(true);
                  }}
                >
                  삭제
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div className='space-y-4'>
      <div className='headline-2'>소식</div>
      <div className='flex justify-end'>
        <Button className='w-fit' onClick={() => router.push('/my/reward/news/create')}>
          소식작성
        </Button>
      </div>
      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <div className='flex justify-end p-4'>
          <SortToggle value={'RECENT'} onSortChange={setSortOrder} />
        </div>
        <DataTable
          columns={columns}
          data={[]}
          emptyRenderer='등록된 소식이 없습니다.'
          options={{
            manualPagination: false,
            manualSorting: true,
          }}
        />
      </div>
      <div className='flex justify-center mt-4 mb-[80px]'>
        <Pagination
          page={1}
          total={1}
          onChange={(page) => setPagination((prev) => ({ ...prev, pageIndex: page - 1 }))}
        />
      </div>
    </div>
  );
};

export default NewsPage;
