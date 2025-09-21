'use client';

import NextLink from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { ArrowBack, Delete, Edit } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
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
  AdminUpdateCouponRequest,
  UserCouponStatus,
  adminUserCouponApi,
  couponApi,
} from '@repo/api/admin';
import { useMutation, useQuery } from '@tanstack/react-query';

import { DeleteConfirmDialog } from '../DeleteConfirmDialog';
import { EditCouponDialog } from '../EditCouponDialog';
import {
  BENEFIT_TYPE_LABEL,
  COUPON_STATUS_LABEL,
  COUPON_TYPE_LABEL,
  DISCOUNT_TYPE_LABEL,
  PROVIDE_TYPE_LABEL,
  USER_COUPON_STATUS_LABEL,
  USER_COUPON_STATUS_OPTIONS,
} from '../options';
import { queryClient } from '@/components/Provider/providers';

const formatDate = (value?: string | null) => (value ? value : '-');
const formatDateTime = (value?: string | null) => (value ? value.replace('T', ' ') : '-');
const formatDiscountValue = (coupon: AdminCouponResponse) =>
  coupon.discountType === 'PERCENT'
    ? `${coupon.discountValue}%`
    : `${coupon.discountValue.toLocaleString()}원`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const USER_COUPON_STATUS_FILTER_VALUES = USER_COUPON_STATUS_OPTIONS.map((option) => option.value);

type UserCouponStatusFilter = (typeof USER_COUPON_STATUS_FILTER_VALUES)[number];

type IssueFormState = {
  userId: string;
  error: string;
};

const INITIAL_ISSUE_FORM: IssueFormState = {
  userId: '',
  error: '',
};

export default function CouponDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const couponId = Number(params?.id ?? NaN);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [issueForm, setIssueForm] = useState<IssueFormState>(INITIAL_ISSUE_FORM);
  const [userCouponsPage, setUserCouponsPage] = useState(1);
  const [userCouponsPageSize, setUserCouponsPageSize] = useState(10);
  const [userCouponStatusFilter, setUserCouponStatusFilter] =
    useState<UserCouponStatusFilter>('all');

  const {
    data: couponResponse,
    isLoading: isCouponLoading,
    isError: isCouponError,
  } = useQuery({
    queryKey: ['coupon', couponId],
    queryFn: () => couponApi.retrieve(couponId),
    enabled: Number.isFinite(couponId),
  });

  const {
    data: userCouponResponse,
    isLoading: isUserCouponLoading,
    isError: isUserCouponError,
  } = useQuery({
    queryKey: [
      'coupon-user-coupons',
      couponId,
      userCouponsPage,
      userCouponsPageSize,
      userCouponStatusFilter,
    ],
    queryFn: () =>
      adminUserCouponApi.list({
        pageNum: userCouponsPage,
        pageSize: userCouponsPageSize,
        couponId,
        status:
          userCouponStatusFilter === 'all'
            ? undefined
            : (userCouponStatusFilter as UserCouponStatus),
      }),
    enabled: Number.isFinite(couponId),
    staleTime: 5_000,
  });

  const coupon = couponResponse?.data;
  const issuedUserCoupons = useMemo(
    () => userCouponResponse?.data.list ?? [],
    [userCouponResponse?.data.list],
  );
  const userCouponPageInfo = userCouponResponse?.data.pageInfo;

  const updateMutation = useMutation({
    mutationFn: (payload: AdminUpdateCouponRequest) => couponApi.update(couponId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupon', couponId] });
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      setIsEditDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => couponApi.delete(couponId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      router.push('/coupons');
    },
  });

  const issueMutation = useMutation({
    mutationFn: (userId: number) => adminUserCouponApi.issue({ userId, couponId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupon-user-coupons', couponId] });
      queryClient.invalidateQueries({ queryKey: ['coupon', couponId] });
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      setIssueForm(INITIAL_ISSUE_FORM);
    },
    onError: () => {
      setIssueForm((prev) => ({
        ...prev,
        error: '쿠폰 발급에 실패했습니다. 입력값을 확인해 주세요.',
      }));
    },
  });

  const handleStatusFilterChange = (event: SelectChangeEvent<UserCouponStatusFilter>) => {
    setUserCouponStatusFilter(event.target.value as UserCouponStatusFilter);
    setUserCouponsPage(1);
  };

  const handleIssueUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIssueForm({ userId: event.target.value, error: '' });
  };

  const handleIssueSubmit = () => {
    const trimmed = issueForm.userId.trim();
    if (!trimmed) {
      setIssueForm((prev) => ({ ...prev, error: '유저 ID를 입력해 주세요.' }));
      return;
    }

    const parsed = Number(trimmed);
    if (Number.isNaN(parsed) || parsed <= 0) {
      setIssueForm((prev) => ({ ...prev, error: '유효한 유저 ID를 입력해 주세요.' }));
      return;
    }

    issueMutation.mutate(parsed);
  };

  if (!Number.isFinite(couponId)) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity='error'>유효하지 않은 쿠폰입니다.</Alert>
      </Box>
    );
  }

  if (isCouponLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>쿠폰 정보를 불러오는 중입니다...</Typography>
      </Box>
    );
  }

  if (isCouponError || !coupon) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity='error'>쿠폰 정보를 불러오지 못했습니다.</Alert>
      </Box>
    );
  }

  const handleDeleteConfirm = () => {
    deleteMutation.mutate();
  };

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          variant='outlined'
          onClick={() => router.push('/coupons')}
        >
          목록으로
        </Button>
        <Typography variant='h4' component='h1'>
          {coupon.name}
        </Typography>
        <Chip
          label={COUPON_STATUS_LABEL[coupon.status] ?? coupon.status}
          color={coupon.status === 'ACTIVE' ? 'success' : 'default'}
          size='small'
          sx={{ ml: 1 }}
        />
        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
          <Button startIcon={<Edit />} variant='outlined' onClick={() => setIsEditDialogOpen(true)}>
            수정
          </Button>
          <Button
            startIcon={<Delete />}
            variant='outlined'
            color='error'
            onClick={() => setDeleteDialogOpen(true)}
          >
            삭제
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Typography variant='h6' gutterBottom>
          쿠폰 정보
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
          }}
        >
          <Box>
            <Typography variant='body2' color='text.secondary'>
              쿠폰 ID
            </Typography>
            <Typography variant='body1'>{coupon.id}</Typography>
          </Box>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              혜택 유형
            </Typography>
            <Typography variant='body1'>
              {BENEFIT_TYPE_LABEL[coupon.benefitType] ?? coupon.benefitType}
            </Typography>
          </Box>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              쿠폰 유형
            </Typography>
            <Typography variant='body1'>{COUPON_TYPE_LABEL[coupon.type] ?? coupon.type}</Typography>
          </Box>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              할인 유형
            </Typography>
            <Typography variant='body1'>
              {DISCOUNT_TYPE_LABEL[coupon.discountType] ?? coupon.discountType}
            </Typography>
          </Box>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              대상
            </Typography>
            <Typography variant='body1'>
              {PROVIDE_TYPE_LABEL[coupon.provideType] ?? coupon.provideType}
            </Typography>
          </Box>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              할인값
            </Typography>
            <Typography variant='body1'>{formatDiscountValue(coupon)}</Typography>
          </Box>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              발급 기간
            </Typography>
            <Typography variant='body1'>
              {coupon.issueStartOn
                ? `${formatDate(coupon.issueStartOn)}${coupon.issueEndOn ? ` ~ ${formatDate(coupon.issueEndOn)}` : ''}`
                : '-'}
            </Typography>
          </Box>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              사용 기한
            </Typography>
            <Typography variant='body1'>{formatDate(coupon.expiredOn)}</Typography>
          </Box>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              발급 수량
            </Typography>
            <Typography variant='body1'>
              총 {coupon.totalQuantity ?? '무제한'}
              <Typography component='span' variant='caption' color='text.secondary' sx={{ ml: 1 }}>
                (발급 {coupon.issuedQuantity})
              </Typography>
            </Typography>
          </Box>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              등록일
            </Typography>
            <Typography variant='body1'>{formatDateTime(coupon.createdAt)}</Typography>
          </Box>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              수정일
            </Typography>
            <Typography variant='body1'>{formatDateTime(coupon.updatedAt)}</Typography>
          </Box>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              사용 조건
            </Typography>
            <Typography variant='body1'>{coupon.conditions || '-'}</Typography>
          </Box>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              가게
            </Typography>
            {coupon.storeId ? (
              <Button
                component={NextLink}
                href={`/stores/${coupon.storeId}`}
                variant='text'
                size='small'
              >
                {coupon.storeName ?? `스토어 #${coupon.storeId}`} 상세 보기
              </Button>
            ) : (
              <Typography variant='body1'>전체 가맹점 대상</Typography>
            )}
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant='h6' gutterBottom>
          쿠폰 발급
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'flex-end' }}>
          <TextField
            label='유저 ID'
            value={issueForm.userId}
            onChange={handleIssueUserIdChange}
            size='small'
            sx={{ width: { xs: '100%', md: 200 } }}
            disabled={issueMutation.isPending}
          />
          <Button
            variant='contained'
            onClick={handleIssueSubmit}
            disabled={issueMutation.isPending}
          >
            발급하기
          </Button>
        </Stack>
        {issueForm.error && (
          <Alert severity='error' sx={{ mt: 2 }}>
            {issueForm.error}
          </Alert>
        )}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems={{ md: 'center' }}
          justifyContent='space-between'
          sx={{ mb: 2 }}
        >
          <Typography variant='h6'>발급 내역</Typography>
          <Stack direction='row' spacing={2} alignItems='center'>
            <FormControl size='small' sx={{ minWidth: 140 }}>
              <InputLabel id='user-coupon-status-filter'>상태</InputLabel>
              <Select
                labelId='user-coupon-status-filter'
                value={userCouponStatusFilter}
                label='상태'
                onChange={handleStatusFilterChange}
              >
                {USER_COUPON_STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size='small' sx={{ minWidth: 100 }}>
              <InputLabel id='user-coupon-page-size'>페이지당</InputLabel>
              <Select
                labelId='user-coupon-page-size'
                value={userCouponsPageSize.toString()}
                label='페이지당'
                onChange={(event) => {
                  setUserCouponsPageSize(Number(event.target.value));
                  setUserCouponsPage(1);
                }}
              >
                {[10, 20, 50].map((size) => (
                  <MenuItem key={size} value={size.toString()}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {isUserCouponLoading ? (
          <Typography sx={{ py: 4, textAlign: 'center' }}>
            발급 내역을 불러오는 중입니다...
          </Typography>
        ) : isUserCouponError ? (
          <Alert severity='error'>발급 내역을 불러오지 못했습니다.</Alert>
        ) : issuedUserCoupons.length === 0 ? (
          <Typography sx={{ py: 4, textAlign: 'center' }}>발급된 쿠폰이 없습니다.</Typography>
        ) : (
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>유저</TableCell>
                  <TableCell>가게</TableCell>
                  <TableCell>상태</TableCell>
                  <TableCell>발급일</TableCell>
                  <TableCell>사용일</TableCell>
                  <TableCell>만료일</TableCell>
                  <TableCell>테이블 번호</TableCell>
                  <TableCell>포인트</TableCell>
                  <TableCell align='right'>작업</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {issuedUserCoupons.map((userCoupon) => (
                  <TableRow key={userCoupon.id} hover>
                    <TableCell>{userCoupon.id}</TableCell>
                    <TableCell>
                      <Stack spacing={0.5}>
                        <Typography variant='body2'>{userCoupon.nickname ?? '-'}</Typography>
                        <Typography variant='caption' color='text.secondary'>
                          ID: {userCoupon.userId}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {userCoupon.storeId ? (
                        <Stack spacing={0.5}>
                          <Typography variant='body2'>{userCoupon.storeName ?? '-'}</Typography>
                          <Typography variant='caption' color='text.secondary'>
                            ID: {userCoupon.storeId}
                          </Typography>
                        </Stack>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={USER_COUPON_STATUS_LABEL[userCoupon.status] ?? userCoupon.status}
                        size='small'
                        color={
                          userCoupon.status === 'AVAILABLE'
                            ? 'success'
                            : userCoupon.status === 'REQUESTED'
                              ? 'warning'
                              : 'default'
                        }
                      />
                    </TableCell>
                    <TableCell>{formatDateTime(userCoupon.createdDateAt)}</TableCell>
                    <TableCell>{formatDateTime(userCoupon.usedAt)}</TableCell>
                    <TableCell>{formatDate(userCoupon.expiredOn)}</TableCell>
                    <TableCell>{userCoupon.tableNumber ?? '-'}</TableCell>
                    <TableCell>{userCoupon.point ?? '-'}</TableCell>
                    <TableCell align='right'>
                      <Stack direction='row' spacing={1} justifyContent='flex-end'>
                        <Button
                          component={NextLink}
                          href={`/users/${userCoupon.userId}`}
                          size='small'
                          variant='text'
                        >
                          유저 상세
                        </Button>
                        {userCoupon.storeId && (
                          <Button
                            component={NextLink}
                            href={`/stores/${userCoupon.storeId}`}
                            size='small'
                            variant='text'
                          >
                            스토어 상세
                          </Button>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

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
          <Typography variant='body2'>
            총 {userCouponPageInfo?.totalCount ?? issuedUserCoupons.length}건
          </Typography>
          <Pagination
            count={userCouponPageInfo?.totalPages ?? 1}
            page={userCouponsPage}
            onChange={(_, newPage) => setUserCouponsPage(newPage)}
            color='primary'
            showFirstButton
            showLastButton
          />
        </Box>
      </Paper>

      <EditCouponDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={(payload) => updateMutation.mutate(payload)}
        loading={updateMutation.isPending}
        initialData={coupon}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleteMutation.isPending}
        title='쿠폰 삭제 확인'
        description={`정말로 '${coupon.name}' 쿠폰을 삭제하시겠습니까?`}
      />
    </Box>
  );
}
