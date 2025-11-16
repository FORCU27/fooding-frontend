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

import ConfirmModal from '@/components/ConfirmModal';
import { useStore } from '@/context/StoreContext';

const PAGE_SIZE = 10;

const NewsPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { storeId } = useStore();
  const selectedStoreId = Number(storeId);

  const [sortType, setSortType] = useState<'RECENT' | 'OLD'>('RECENT');
  const [pageNum, setPageNum] = useState(1);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmType, setConfirmType] = useState<'toggle' | 'delete' | null>(null);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [nextActiveStatus, setNextActiveStatus] = useState<'active' | 'inactive' | null>(null);

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

  const toggleActivatePost = useMutation({
    mutationFn: ({ id, isActive }: { id: number; isActive: 'active' | 'inactive' }) =>
      storePostApi.activateStorePost(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.storePost.list, storeId],
      });
    },
    onError: () => {
      alert('공개 여부 변경에 실패했습니다.');
    },
  });

  const deletePost = useMutation({
    mutationFn: (id: number) => storePostApi.deleteStorePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.ceo.storePost.list, storeId] });
      alert('삭제되었습니다.');
    },
    onError: () => alert('삭제에 실패했습니다.'),
  });

  const handleConfirm = () => {
    if (confirmType === 'toggle' && targetId && nextActiveStatus) {
      toggleActivatePost.mutate({ id: targetId, isActive: nextActiveStatus });
    }

    if (confirmType === 'delete' && targetId) {
      deletePost.mutate(targetId);
    }

    setConfirmOpen(false);
    setConfirmType(null);
    setTargetId(null);
    setNextActiveStatus(null);
  };

  const columns: ColumnDef<StorePost>[] = useMemo(
    () => [
      {
        header: '사진',
        id: 'photo',
        size: 68,
        cell: ({ row }) =>
          row.original.images?.[0] ? (
            <img
              src={row.original.images[0].imageUrl}
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
        cell: ({ row }) => {
          const { id, isActive } = row.original;

          return (
            <div className='flex justify-center'>
              <Switch
                checked={!!isActive}
                onChange={(checked) => {
                  setTargetId(id);
                  setNextActiveStatus(checked ? 'active' : 'inactive');
                  setConfirmType('toggle');
                  setConfirmOpen(true);
                }}
              />
            </div>
          );
        },
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
                <DropdownMenu.Item variant='default'>수정</DropdownMenu.Item>
                <DropdownMenu.Item
                  variant='danger'
                  onClick={() => {
                    setTargetId(row.original.id);
                    setConfirmType('delete');
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

      <ConfirmModal
        open={confirmOpen}
        title={confirmType === 'toggle' ? '공개 여부를 변경하시겠습니까?' : '삭제하시겠습니까?'}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};

export default NewsPage;
