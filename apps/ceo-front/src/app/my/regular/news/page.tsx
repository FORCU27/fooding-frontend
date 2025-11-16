'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { storePostApi, StorePost } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import {
  SortToggle,
  Switch,
  DataTable,
  DropdownMenu,
  Pagination,
  Button,
} from '@repo/design-system/components/ceo';
import { EllipsisVerticalIcon } from '@repo/design-system/icons';
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';

import { useStore } from '@/context/StoreContext';

const PAGE_SIZE = 10;

const NewsPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { storeId } = useStore();
  const selectedStoreId = Number(storeId);

  const [sortType, setSortType] = useState<'RECENT' | 'OLD'>('RECENT');
  const [pageNum, setPageNum] = useState(1);

  const { data } = useQuery({
    queryKey: [queryKeys.ceo.storePost.list, storeId, sortType, pageNum],
    queryFn: () =>
      storePostApi.getStorePosts({
        searchString: '',
        pageNum,
        pageSize: PAGE_SIZE,
        storeId: selectedStoreId,
        sortType,
      }),
    enabled: !!selectedStoreId,
    placeholderData: keepPreviousData,
  });

  const list = data?.data.list ?? [];
  const pageInfo = data?.data?.pageInfo;

  const deleteMutation = useMutation({
    mutationFn: (id: number) => storePostApi.deleteStorePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.ceo.storePost.list, storeId] });
      alert('삭제되었습니다.');
    },
    onError: () => alert('삭제에 실패했습니다.'),
  });

  const columns: ColumnDef<StorePost>[] = useMemo(
    () => [
      {
        header: '사진',
        id: 'photo',
        size: 68,
        cell: ({ row }) =>
          row.original.images ? (
            <img
              src={row.original.images?.[0]?.imageUrl}
              className='size-[56px] object-cover rounded-md'
            />
          ) : (
            <div className='text-gray-4 text-sm'>-</div>
          ),
      },
      {
        header: '내용',
        id: 'content',
        size: 300,
        cell: ({ row }) => (
          <div className='flex flex-col'>
            <div className='font-medium'>{row.original.title}</div>
            <div className='text-gray-5 text-sm line-clamp-2'>{row.original.content}</div>
          </div>
        ),
      },
      {
        header: '공개여부',
        accessorKey: 'status',
        size: 95,
        cell: ({ row }) => (
          <div className='flex justify-center'>
            <Switch
              checked={row.original.isActive === true}
              // onChange
            />
          </div>
        ),
      },
      {
        header: '조회',
        accessorKey: 'viewCount',
        size: 82,
      },
      {
        header: '좋아요',
        accessorKey: 'likeCount',
        size: 82,
      },
      {
        header: '댓글',
        accessorKey: 'commentCount',
        size: 82,
      },
      {
        header: '',
        id: 'actions',
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
                  variant='default'
                  // onClick={() => deleteMutation.mutate(row.original.id)}
                >
                  수정
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  variant='danger'
                  onClick={() => deleteMutation.mutate(row.original.id)}
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
        <Button className='w-fit' onClick={() => router.push('/my/regular/news/create')}>
          소식작성
        </Button>
      </div>
      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <div className='flex justify-end p-4'>
          <SortToggle value={sortType} onSortChange={setSortType} />
        </div>
        <DataTable
          columns={columns}
          data={list}
          emptyRenderer='등록된 소식이 없습니다.'
          options={{
            manualSorting: true,
            manualPagination: true,
          }}
        />
      </div>
      {pageInfo && (
        <div className='flex justify-center mt-4 mb-[80px]'>
          <Pagination
            page={pageInfo.pageNum}
            total={pageInfo.totalPages}
            onChange={(page) => setPageNum(page)}
          />
        </div>
      )}
    </div>
  );
};

export default NewsPage;
