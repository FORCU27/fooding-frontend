'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { couponApiV2 } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import {
  Button,
  DataTable,
  DropdownMenu,
  Pagination,
  SortToggle,
  Switch,
  type SortOrder,
} from '@repo/design-system/components/ceo';
import { EllipsisVerticalIcon } from '@repo/design-system/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table';

import { useSelectedStoreId } from '@/hooks/useSelectedStoreId';

interface Coupon {
  id: number;
  name: string;
  benefitType: string;
  discountType: string | null;
  discountValue: number | null;
  issuedQuantity: number;
  totalQuantity: number | null;
  issueStartOn: string;
  issueEndOn: string;
  status: string;
}

const CouponListPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { selectedStoreId, isInitialized } = useSelectedStoreId();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('LATEST');

  const { data: couponList, isLoading } = useQuery({
    queryKey: [queryKeys.ceo.coupon.list, selectedStoreId, pagination],
    queryFn: () =>
      couponApiV2.getCouponList({
        storeId: selectedStoreId || 0,
        pageNum: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        // status 필터를 제거하여 모든 쿠폰을 보여줌
      }),
    enabled: !!selectedStoreId && isInitialized,
  });

  // 쿠폰 상태 업데이트 mutation
  const updateCouponStatusMutation = useMutation({
    mutationFn: async ({
      couponId,
      status,
    }: {
      couponId: number;
      status: 'ACTIVE' | 'INACTIVE';
    }) => {
      return couponApiV2.updateCouponStatus(couponId, status);
    },
    onSuccess: () => {
      // 쿠폰 리스트 다시 불러오기
      queryClient.invalidateQueries({ queryKey: [queryKeys.ceo.coupon.list] });
    },
    onError: (error) => {
      console.error('쿠폰 상태 업데이트 실패:', error);
      // TODO: 에러 토스트 메시지 표시
    },
  });

  const columns: ColumnDef<Coupon>[] = [
    {
      header: '쿠폰 이름',
      accessorKey: 'name',
      size: 300, // 쿠폰 이름은 넓게
      minSize: 200,
      cell: ({ row }) => (
        <div className='flex flex-col items-start gap-1'>
          {row.original.status === 'INACTIVE' && (
            <span className='px-2 py-0.5 text-xs font-medium text-white bg-blue-500 rounded'>
              발급 일시중단
            </span>
          )}
          <span
            className='font-medium text-gray-900 cursor-pointer hover:text-primary-pink transition-colors'
            onClick={() => router.push(`/my/reward/coupon/${row.original.id}`)}
          >
            {row.original.name}
          </span>
        </div>
      ),
    },
    {
      header: '발급여부',
      accessorKey: 'status',
      size: 80, // 최소 너비
      minSize: 80,
      maxSize: 100,
      cell: ({ row }) => (
        <div className='flex justify-center'>
          <Switch
            checked={row.original.status === 'ACTIVE'}
            onChange={(checked) => {
              updateCouponStatusMutation.mutate({
                couponId: row.original.id,
                status: checked ? 'ACTIVE' : 'INACTIVE',
              });
            }}
          />
        </div>
      ),
    },
    {
      header: '발급수',
      accessorKey: 'totalQuantity',
      size: 80, // 최소 너비
      minSize: 80,
      maxSize: 100,
      cell: ({ row }) => (
        <div className='text-center'>{row.original.totalQuantity || '무제한'}</div>
      ),
    },
    {
      header: '받은쿠폰',
      accessorKey: 'issuedQuantity',
      size: 80, // 최소 너비
      minSize: 80,
      maxSize: 100,
      cell: ({ row }) => <div className='text-center'>{row.original.issuedQuantity || 0}</div>,
    },
    {
      header: '남은쿠폰',
      id: 'remaining',
      size: 80, // 최소 너비
      minSize: 80,
      maxSize: 100,
      cell: ({ row }) => {
        const content = !row.original.totalQuantity
          ? '무제한'
          : Math.max(0, row.original.totalQuantity - row.original.issuedQuantity);
        return <div className='text-center'>{content}</div>;
      },
    },
    {
      id: 'actions',
      size: 60, // 액션 버튼 최소 너비
      minSize: 60,
      maxSize: 80,
      header: '',
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
                onClick={() => router.push(`/my/reward/coupon/edit/${row.original.id}`)}
              >
                수정
              </DropdownMenu.Item>
              <DropdownMenu.Item variant='danger'>삭제</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  if (!isInitialized || isLoading) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-gray-600'>쿠폰 목록을 불러오는 중...</div>
      </div>
    );
  }

  if (!selectedStoreId) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-gray-600'>스토어를 선택해주세요.</div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center mb-6'>
        <div className='headline-2'>쿠폰</div>
      </div>

      <div className='flex justify-end gap-4'>
        <Button onClick={() => router.push('/my/reward/coupon/create')}>쿠폰선물</Button>
        <Button variant='primaryPink' onClick={() => router.push('/my/reward/coupon/create')}>
          쿠폰생성
        </Button>
      </div>

      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <div className='flex justify-end p-4'>
          <SortToggle
            value={sortOrder}
            onSortChange={(value) => {
              setSortOrder(value);
              // 정렬 상태 업데이트 - 예시로 생성일 기준 정렬
              setSorting(
                value === 'LATEST' ? [{ id: 'name', desc: true }] : [{ id: 'name', desc: false }],
              );
            }}
          />
        </div>
        <DataTable
          columns={columns}
          data={couponList?.list || []}
          emptyRenderer='등록된 쿠폰이 없습니다.'
          options={{
            manualPagination: false, // 클라이언트 사이드 페이지네이션으로 변경
            state: {
              pagination,
              sorting,
            },
            onPaginationChange: setPagination,
            onSortingChange: setSorting,
          }}
        />
      </div>

      {couponList?.pageInfo && (
        <div className='flex justify-center mt-4'>
          <Pagination
            page={pagination.pageIndex + 1}
            total={couponList.pageInfo.totalPages}
            onChange={(page) => setPagination((prev) => ({ ...prev, pageIndex: page - 1 }))}
          />
        </div>
      )}
    </div>
  );
};

export default CouponListPage;
