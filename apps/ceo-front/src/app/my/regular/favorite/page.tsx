'use client';
import Image from 'next/image';
import { useMemo, useCallback, useState } from 'react';

import { bookmarkApi, BookmarkSortType, StoreBookmark } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import {
  SortToggle,
  DataTable,
  DropdownMenu,
  Pagination,
} from '@repo/design-system/components/ceo';
import { StarIcon, EllipsisVerticalIcon } from '@repo/design-system/icons';
import { useQuery, useQueryClient, useMutation, keepPreviousData } from '@tanstack/react-query';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';

import ConfirmModal from '@/components/ConfirmModal';
import { useSelectedStoreId } from '@/hooks/useSelectedStoreId';
import { getDaysSince } from '@/utils/date';

// TODO 리뷰페이지에서 활용하는 ProfileImage 와 재사용화 예정
const ProfileImage = () => (
  <svg width='68' height='68' viewBox='0 0 68 68' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect width='68' height='68' rx='34' fill='#F1F3F5' />
    <path
      d='M34.0018 37C30.8317 37 28.0126 38.5306 26.2178 40.906C25.8315 41.4172 25.6384 41.6728 25.6447 42.0183C25.6496 42.2852 25.8172 42.6219 26.0272 42.7867C26.299 43 26.6757 43 27.429 43H40.5746C41.3279 43 41.7046 43 41.9764 42.7867C42.1864 42.6219 42.354 42.2852 42.3589 42.0183C42.3652 41.6728 42.1721 41.4172 41.7858 40.906C39.991 38.5306 37.1719 37 34.0018 37Z'
      stroke='#BEBEBE'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M34.0018 34C36.4871 34 38.5018 31.9853 38.5018 29.5C38.5018 27.0147 36.4871 25 34.0018 25C31.5165 25 29.5018 27.0147 29.5018 29.5C29.5018 31.9853 31.5165 34 34.0018 34Z'
      stroke='#BEBEBE'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const FavoritePage = () => {
  const queryClient = useQueryClient();
  const { selectedStoreId, isInitialized } = useSelectedStoreId();

  const [sortOrder, setSortOrder] = useState<BookmarkSortType>('RECENT');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetBookmarkId, setTargetBookmarkId] = useState<number | null>(null);

  const { data: bookmarkList } = useQuery({
    queryKey: [
      queryKeys.ceo.bookmark.list,
      selectedStoreId,
      pagination.pageIndex,
      pagination.pageSize,
      sortOrder,
    ],
    queryFn: () =>
      bookmarkApi.get(selectedStoreId || 0, {
        searchString: '',
        pageNum: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        sortType: sortOrder,
      }),
    enabled: !!selectedStoreId && isInitialized,
    placeholderData: keepPreviousData,
  });

  const deleteBookmark = useMutation({
    mutationFn: (bookmarkId: number) => bookmarkApi.delete(selectedStoreId!, bookmarkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.ceo.bookmark.list, selectedStoreId] });
      setConfirmOpen(false);
      setTargetBookmarkId(null);
    },
    onError: (err) => console.error('삭제 실패:', err),
  });

  const putStarBookmark = useMutation({
    mutationFn: ({ bookmarkId, isStarred }: { bookmarkId: number; isStarred: boolean }) =>
      bookmarkApi.putStarred(selectedStoreId!, bookmarkId, { isStarred: !isStarred }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.bookmark.list, selectedStoreId],
      });
      setTargetBookmarkId(null);
    },
    onError: (err) => console.error('즐겨찾기 실패:', err),
  });

  const handleDelete = () => {
    if (targetBookmarkId) deleteBookmark.mutate(targetBookmarkId);
  };

  const handleStarButton = useCallback(
    (bookmarkId: number, isStarred: boolean) => {
      if (bookmarkId && isStarred) putStarBookmark.mutate({ bookmarkId, isStarred });
    },
    [putStarBookmark],
  );

  const columns = useMemo<ColumnDef<StoreBookmark>[]>(
    () => [
      {
        header: '',
        id: 'actions-starring',
        size: 68,
        cell: ({ row }) => (
          <StarIcon
            size={24}
            color={row.original.isStarred ? '#FFD83D' : '#E2DFDF'}
            fill={row.original.isStarred ? '#FFD83D' : '#E2DFDF'}
            stroke={row.original.isStarred ? '#FFD83D' : '#E2DFDF'}
            onClick={() => handleStarButton(row.original.id, row.original.isStarred)}
          />
        ),
      },
      {
        header: '',
        id: 'image',
        size: 68,
        cell: ({ row }) =>
          row.original.profileImage ? (
            <Image src={row.original.profileImage} alt='profile image' width={68} height={68} />
          ) : (
            <ProfileImage />
          ),
      },
      {
        accessorKey: 'nickname',
        header: () => <div className='text-left'>닉네임</div>,
        size: 300,
        cell: ({ getValue }) => <div>{getValue<string>()}</div>,
      },
      {
        header: '지역',
        accessorKey: 'address',
        cell: ({ getValue }) => <div className='text-center'>{getValue<string>()}</div>,
      },
      {
        header: '인증',
        cell: ({ row }) => (
          <div className='text-center'>{row.original.verifiedCount.toLocaleString()}</div>
        ),
      },
      {
        header: '기간',
        cell: ({ row }) => (
          <div className='text-center'>{getDaysSince(row.original.createdAt)}</div>
        ),
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
                    setTargetBookmarkId(row.original.id);
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
    [handleStarButton],
  );

  return (
    <div className='space-y-4'>
      <div className='headline-2'>단골</div>
      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <div className='flex justify-end p-4'>
          <SortToggle value={sortOrder} onSortChange={setSortOrder} />
        </div>
        <DataTable
          columns={columns}
          data={bookmarkList?.data.list || []}
          emptyRenderer='등록된 단골이 없습니다.'
          options={{
            manualPagination: false,
            manualSorting: true,
          }}
        />
      </div>
      {bookmarkList?.data.pageInfo && (
        <div className='flex justify-center mt-4 mb-[80px]'>
          <Pagination
            page={pagination.pageIndex + 1}
            total={bookmarkList?.data.pageInfo.totalPages}
            onChange={(page) => setPagination((prev) => ({ ...prev, pageIndex: page - 1 }))}
          />
        </div>
      )}
      <ConfirmModal
        open={confirmOpen}
        title='단골 목록에서 삭제하시겠습니까?'
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};

export default FavoritePage;
