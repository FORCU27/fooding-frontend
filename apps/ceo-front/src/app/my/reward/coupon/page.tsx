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
import { EllipsisVerticalIcon } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table';

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
        status: 'ACTIVE',
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
      // TODO: API 엔드포인트가 있으면 여기에 추가
      // return couponApiV2.updateCouponStatus(couponId, status);
      console.log('Updating coupon status:', { couponId, status });
      return Promise.resolve({ couponId, status });
    },
    onSuccess: () => {
      // 쿠폰 리스트 다시 불러오기
      queryClient.invalidateQueries({ queryKey: [queryKeys.ceo.coupon.list] });
    },
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ko-KR');
  };

  const formatDiscountValue = (type: string, value: number | null) => {
    if (!value) return '-';
    return type === 'PERCENT' ? `${value}%` : `${value.toLocaleString()}원`;
  };

  const columns: ColumnDef<Coupon>[] = [
    {
      header: '쿠폰 이름',
      accessorKey: 'name',
      cell: ({ row }) => <span className='font-medium text-gray-900'>{row.original.name}</span>,
    },
    {
      header: '발급여부',
      accessorKey: 'status',
      cell: ({ row }) => (
        <Switch
          checked={row.original.status === 'ACTIVE'}
          onChange={(checked) => {
            updateCouponStatusMutation.mutate({
              couponId: row.original.id,
              status: checked ? 'ACTIVE' : 'INACTIVE',
            });
          }}
        />
      ),
    },
    {
      header: '발급수',
      accessorKey: 'totalQuantity',
      cell: ({ row }) => row.original.totalQuantity || '무제한',
    },
    {
      header: '받은쿠폰',
      accessorKey: 'issuedQuantity',

      cell: ({ row }) => row.original.issuedQuantity || 0,
    },
    {
      header: '남은쿠폰',
      id: 'remaining',
      cell: ({ row }) => {
        if (!row.original.totalQuantity) return '무제한';
        const remaining = row.original.totalQuantity - row.original.issuedQuantity;
        return remaining > 0 ? remaining : 0;
      },
    },
    {
      id: 'actions',
      header: '액션',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <button className='size-6 flex justify-center items-center cursor-pointer'>
              <EllipsisVerticalIcon className='size-5' />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content side='left'>
            <DropdownMenu.Item onClick={() => router.push(`/my/reward/coupon/${row.original.id}`)}>
              수정
            </DropdownMenu.Item>
            <DropdownMenu.Item variant='danger'>삭제</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
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
