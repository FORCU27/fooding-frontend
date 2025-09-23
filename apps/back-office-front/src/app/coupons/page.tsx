'use client';

import NextLink from 'next/link';
import { useState } from 'react';
import type React from 'react';

import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {
  AdminCouponResponse,
  AdminCreateCouponRequest,
  AdminUpdateCouponRequest,
  couponApi,
} from '@repo/api/admin';
import { useMutation, useQuery } from '@tanstack/react-query';

import { CreateCouponDialog } from './CreateCouponDialog';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { EditCouponDialog } from './EditCouponDialog';
import {
  BENEFIT_TYPE_LABEL,
  COUPON_STATUS_LABEL,
  COUPON_TYPE_LABEL,
  DISCOUNT_TYPE_LABEL,
  PROVIDE_TYPE_LABEL,
} from './options';
import { queryClient } from '@/components/Provider/providers';

type Coupon = AdminCouponResponse;

type StatusFilter = 'all' | 'ACTIVE' | 'INACTIVE';

const formatDate = (value?: string | null) => (value ? value : '-');
const formatDiscountValue = (coupon: Coupon) =>
  coupon.discountType === 'PERCENT'
    ? `${coupon.discountValue}%`
    : `${coupon.discountValue.toLocaleString()}원`;

export default function CouponsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [storeIdInput, setStoreIdInput] = useState('');
  const [storeIdFilter, setStoreIdFilter] = useState('');
  const [storeIdError, setStoreIdError] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null);

  const queryKey = ['coupons', page, pageSize, statusFilter, searchFilter, storeIdFilter] as const;

  const {
    data: couponsResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey,
    queryFn: () => {
      const searchString = searchFilter.trim() ? searchFilter.trim() : undefined;
      const status = statusFilter === 'all' ? undefined : statusFilter;
      const storeId = storeIdFilter.trim() ? Number(storeIdFilter.trim()) : undefined;

      return couponApi.list({
        pageNum: page,
        pageSize,
        searchString,
        status,
        storeId,
      });
    },
    staleTime: 5_000,
  });

  const createMutation = useMutation({
    mutationFn: (payload: AdminCreateCouponRequest) => couponApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      setIsCreateDialogOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: AdminUpdateCouponRequest }) =>
      couponApi.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      setIsEditDialogOpen(false);
      setSelectedCoupon(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => couponApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      setDeleteDialogOpen(false);
      setCouponToDelete(null);
    },
    onSettled: () => {
      setDeleteDialogOpen(false);
      setCouponToDelete(null);
    },
  });

  const coupons = couponsResponse?.data.list ?? [];
  const pageInfo = couponsResponse?.data.pageInfo;
  const totalPages = pageInfo?.totalPages ?? 1;
  const totalCount = pageInfo?.totalCount ?? 0;

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value as StatusFilter);
    setPage(1);
  };

  const handlePageSizeChange = (event: SelectChangeEvent) => {
    setPageSize(Number(event.target.value));
    setPage(1);
  };

  const applyFilters = () => {
    const trimmedStoreId = storeIdInput.trim();
    if (trimmedStoreId) {
      const parsed = Number(trimmedStoreId);
      if (Number.isNaN(parsed) || parsed <= 0) {
        setStoreIdError('숫자만 입력해 주세요');
        return;
      }
    }

    setStoreIdError('');
    setSearchFilter(search.trim());
    setStoreIdFilter(trimmedStoreId);
    setPage(1);
  };

  const handleFilterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      applyFilters();
    }
  };

  const handleResetFilters = () => {
    setSearch('');
    setSearchFilter('');
    setStoreIdInput('');
    setStoreIdFilter('');
    setStoreIdError('');
    setStatusFilter('all');
    setPage(1);
  };

  const handleDeleteClick = (coupon: Coupon) => {
    setCouponToDelete(coupon);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (couponToDelete) {
      deleteMutation.mutate(couponToDelete.id);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant='h4' component='h1'>
          쿠폰 관리
        </Typography>
        <Button variant='contained' onClick={() => setIsCreateDialogOpen(true)}>
          새 쿠폰 생성
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mb: 2,
          alignItems: 'center',
        }}
      >
        <TextField
          label='쿠폰명 검색'
          size='small'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleFilterKeyDown}
          sx={{ minWidth: 220 }}
        />

        <TextField
          label='가게 ID'
          size='small'
          value={storeIdInput}
          onChange={(e) => setStoreIdInput(e.target.value)}
          onKeyDown={handleFilterKeyDown}
          error={Boolean(storeIdError)}
          sx={{ minWidth: 160 }}
        />

        <FormControl size='small' sx={{ minWidth: 160 }}>
          <InputLabel>상태</InputLabel>
          <Select value={statusFilter} label='상태' onChange={handleStatusChange}>
            <MenuItem value='all'>전체</MenuItem>
            <MenuItem value='ACTIVE'>활성화</MenuItem>
            <MenuItem value='INACTIVE'>비활성화</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant='outlined' onClick={applyFilters}>
            검색
          </Button>
          <Button variant='text' onClick={handleResetFilters}>
            초기화
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>쿠폰명</TableCell>
              <TableCell>가게</TableCell>
              <TableCell>혜택 요약</TableCell>
              <TableCell>기간</TableCell>
              <TableCell>발급 수량</TableCell>
              <TableCell>상태</TableCell>
              <TableCell align='right'>작업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} align='center'>
                  로딩 중...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={8} align='center'>
                  데이터를 불러오지 못했습니다. 필터를 확인해 주세요.
                </TableCell>
              </TableRow>
            ) : coupons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align='center'>
                  표시할 쿠폰이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              coupons.map((coupon) => (
                <TableRow key={coupon.id} hover>
                  <TableCell>{coupon.id}</TableCell>
                  <TableCell>{coupon.name}</TableCell>
                  <TableCell>
                    {coupon.storeName ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body2'>{coupon.storeName}</Typography>
                        <Typography variant='caption' color='text.secondary'>
                          ID: {coupon.storeId ?? '-'}
                        </Typography>
                      </Box>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Typography variant='body2'>
                        {BENEFIT_TYPE_LABEL[coupon.benefitType] ?? coupon.benefitType}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        {COUPON_TYPE_LABEL[coupon.type] ?? coupon.type} /{' '}
                        {PROVIDE_TYPE_LABEL[coupon.provideType] ?? coupon.provideType}
                      </Typography>
                      <Typography variant='caption' sx={{ color: 'primary.main' }}>
                        {DISCOUNT_TYPE_LABEL[coupon.discountType] ?? coupon.discountType} /{' '}
                        {formatDiscountValue(coupon)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {coupon.issueStartOn
                      ? `${formatDate(coupon.issueStartOn)}${coupon.issueEndOn ? ` ~ ${formatDate(coupon.issueEndOn)}` : ''}`
                      : '-'}
                    <Typography variant='caption' color='text.secondary' display='block'>
                      만료 {formatDate(coupon.expiredOn)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='body2'>총 {coupon.totalQuantity ?? '무제한'}</Typography>
                      <Typography variant='caption' color='text.secondary'>
                        발급 {coupon.issuedQuantity}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={COUPON_STATUS_LABEL[coupon.status] ?? coupon.status}
                      color={coupon.status === 'ACTIVE' ? 'success' : 'default'}
                      size='small'
                    />
                  </TableCell>
                  <TableCell align='right'>
                    <Box
                      sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', flexWrap: 'wrap' }}
                    >
                      <Button
                        component={NextLink}
                        href={`/coupons/${coupon.id}`}
                        variant='text'
                        size='small'
                      >
                        상세
                      </Button>
                      <Button
                        variant='outlined'
                        size='small'
                        onClick={() => {
                          setSelectedCoupon(coupon);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        수정
                      </Button>
                      <Button
                        variant='outlined'
                        color='error'
                        size='small'
                        onClick={() => handleDeleteClick(coupon)}
                      >
                        삭제
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', md: 'center' },
          mt: 2,
          gap: 2,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant='body2'>페이지당 행 수</Typography>
          <FormControl size='small' sx={{ minWidth: 80 }}>
            <Select value={pageSize.toString()} onChange={handlePageSizeChange}>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
          <Typography variant='body2'>총 {totalCount}개</Typography>
        </Box>

        <Pagination
          count={totalPages}
          page={page}
          onChange={(_: React.ChangeEvent<unknown>, newPage: number) => setPage(newPage)}
          color='primary'
          showFirstButton
          showLastButton
        />
      </Box>

      <CreateCouponDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={(payload) => createMutation.mutate(payload)}
        loading={createMutation.isPending}
      />

      <EditCouponDialog
        open={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedCoupon(null);
        }}
        initialData={selectedCoupon}
        onSubmit={(payload) => {
          if (selectedCoupon) {
            updateMutation.mutate({ id: selectedCoupon.id, body: payload });
          }
        }}
        loading={updateMutation.isPending}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setCouponToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        loading={deleteMutation.isPending}
        title='쿠폰 삭제 확인'
        description={
          couponToDelete ? `정말로 '${couponToDelete.name}' 쿠폰을 삭제하시겠습니까?` : ''
        }
      />
    </Box>
  );
}
