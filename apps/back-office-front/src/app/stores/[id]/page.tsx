'use client';

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import type React from 'react';
import { useState, useEffect } from 'react';

import { ArrowBack, Edit, Delete } from '@mui/icons-material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Paper,
  Typography,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Tabs,
  Tab,
  IconButton,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Checkbox,
} from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import {
  storeApi,
  AdminStoreResponse,
  AdminUpdateStoreRequest,
  adminStorePostApi,
  AdminStorePostResponse,
  AdminStorePostCreateRequest,
  AdminStorePostUpdateRequest,
  adminStoreImageApi,
  AdminStoreImageResponse,
  AdminStoreImageCreateRequest,
  AdminStoreImageUpdateRequest,
  adminFileApi,
} from '@repo/api/admin';
import {
  adminPointShopApi,
  AdminPointShopResponse,
  AdminUpdatePointShopRequest,
  ProvideType,
} from '@repo/api/admin';
import {
  menuApi,
  AdminMenuResponse,
  AdminMenuCreateRequest,
  AdminMenuUpdateRequest,
  menuCategoryApi,
  AdminMenuCategoryResponse,
  AdminMenuCategoryCreateRequest,
  AdminMenuCategoryUpdateRequest,
  AdminCouponResponse,
  AdminCreateCouponRequest,
  AdminUpdateCouponRequest,
  couponApi,
} from '@repo/api/admin';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useQuery as useRQ, useMutation as useRMutation } from '@tanstack/react-query';

import { queryClient } from '../../../components/Provider/providers';
import { DeleteConfirmDialog } from '../DeleteConfirmDialog';
import { EditStoreDialog } from '../EditStoreDialog';
import StoreServiceManagement from './StoreServiceManagement';
import { TagCheckboxGroup, StoreImageTag } from '../../../components/TagCheckboxGroup';
import { TagInput } from '../../../components/TagInput';
import { CreateCouponDialog } from '../../coupons/CreateCouponDialog';
import { EditCouponDialog } from '../../coupons/EditCouponDialog';
import {
  BENEFIT_TYPE_LABEL,
  COUPON_STATUS_LABEL,
  COUPON_TYPE_LABEL,
  DISCOUNT_TYPE_LABEL,
  PROVIDE_TYPE_LABEL,
} from '../../coupons/options';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`store-tabpanel-${index}`}
      aria-labelledby={`store-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function StoreDetailPage() {
  const router = useRouter();
  const params = useParams();
  const storeId = Number(params.id);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<AdminStoreResponse | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState<AdminStoreResponse | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [statusAction, setStatusAction] = useState<string>('');
  const [statusActionName, setStatusActionName] = useState<string>('');
  const [activeTab, setActiveTab] = useState(0);
  // Point Shop state
  const [pointShopPage] = useState(1);
  const [pointShopIsActive, setPointShopIsActive] = useState<boolean>(true);
  const [isCreatePointShopOpen, setIsCreatePointShopOpen] = useState(false);
  const [isEditPointShopOpen, setIsEditPointShopOpen] = useState(false);
  const [selectedPointShop, setSelectedPointShop] = useState<AdminPointShopResponse | null>(null);
  const [storeCouponPage, setStoreCouponPage] = useState(1);
  const [storeCouponPageSize, setStoreCouponPageSize] = useState(10);
  const [storeCouponStatusFilter, setStoreCouponStatusFilter] = useState<'all' | 'ACTIVE' | 'INACTIVE'>('all');
  const [isCreateStoreCouponOpen, setIsCreateStoreCouponOpen] = useState(false);
  const [isEditStoreCouponOpen, setIsEditStoreCouponOpen] = useState(false);
  const [selectedStoreCoupon, setSelectedStoreCoupon] = useState<AdminCouponResponse | null>(null);
  const [deleteStoreCouponDialogOpen, setDeleteStoreCouponDialogOpen] = useState(false);
  const [storeCouponToDelete, setStoreCouponToDelete] = useState<AdminCouponResponse | null>(null);

  const {
    data: storeResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['store', storeId],
    queryFn: () => storeApi.getStore(storeId),
    enabled: !!storeId,
  });

  const {
    data: storeCouponsResponse,
    isLoading: isStoreCouponsLoading,
  } = useQuery({
    queryKey: ['store-coupons', storeId, storeCouponPage, storeCouponPageSize, storeCouponStatusFilter],
    queryFn: () =>
      couponApi.list({
        pageNum: storeCouponPage,
        pageSize: storeCouponPageSize,
        storeId,
        status: storeCouponStatusFilter === 'all' ? undefined : storeCouponStatusFilter,
      }),
    enabled: !!storeId,
    staleTime: 5_000,
  });

  const storeCoupons = storeCouponsResponse?.data.list ?? [];
  const storeCouponsPageInfo = storeCouponsResponse?.data.pageInfo;

  // 디버깅을 위한 로그
  console.log('API Response:', storeResponse);
  console.log('Store Data:', storeResponse?.data);
  console.log('Error:', error);

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: AdminUpdateStoreRequest }) =>
      storeApi.updateStore({ id, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['store', storeId] });
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      setIsEditDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => storeApi.deleteStore(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      router.push('/stores');
    },
  });

  const statusMutation = useMutation({
    mutationFn: (action: string) => {
      switch (action) {
        case 'approve':
          return storeApi.approveStore(storeId);
        case 'reject':
          return storeApi.rejectStore(storeId);
        case 'suspend':
          return storeApi.suspendStore(storeId);
        case 'close':
          return storeApi.closeStore(storeId);
        case 'pending':
          return storeApi.setPendingStore(storeId);
        default:
          throw new Error('Unknown action');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['store', storeId] });
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      setStatusDialogOpen(false);
    },
  });

  const createStoreCouponMutation = useMutation({
    mutationFn: (payload: AdminCreateCouponRequest) => couponApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['store-coupons', storeId] });
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      setIsCreateStoreCouponOpen(false);
    },
  });

  const updateStoreCouponMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: AdminUpdateCouponRequest }) => couponApi.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['store-coupons', storeId] });
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      setIsEditStoreCouponOpen(false);
      setSelectedStoreCoupon(null);
    },
  });

  const deleteStoreCouponMutation = useMutation({
    mutationFn: (id: number) => couponApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['store-coupons', storeId] });
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      setDeleteStoreCouponDialogOpen(false);
      setStoreCouponToDelete(null);
    },
    onSettled: () => {
      setDeleteStoreCouponDialogOpen(false);
      setStoreCouponToDelete(null);
    },
  });

  const handleStatusAction = (action: string, actionName: string) => {
    setStatusAction(action);
    setStatusActionName(actionName);
    setStatusDialogOpen(true);
  };

  const handleStatusConfirm = () => {
    statusMutation.mutate(statusAction);
  };

  const handleDeleteClick = (store: AdminStoreResponse) => {
    setStoreToDelete(store);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (storeToDelete) {
      deleteMutation.mutate(storeToDelete.id);
    }
  };

  // Menus state and queries
  const [menuPage] = useState(1);
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<AdminMenuResponse | null>(null);
  // Categories state
  const [categoryPage] = useState(1);
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<AdminMenuCategoryResponse | null>(null);

  // Posts (소식) state
  const [postPage] = useState(1);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isEditPostOpen, setIsEditPostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<AdminStorePostResponse | null>(null);

  // Images state
  const [imagePage] = useState(1);
  const [isCreateImageOpen, setIsCreateImageOpen] = useState(false);
  const [isEditImageOpen, setIsEditImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<AdminStoreImageResponse | null>(null);

  const { data: menuList } = useRQ({
    queryKey: ['menus', storeId, menuPage],
    queryFn: () => menuApi.getMenuList(menuPage, 10, { storeId }),
    enabled: !!storeId,
  });

  const { data: categoryList } = useRQ({
    queryKey: ['menuCategories', storeId, categoryPage],
    queryFn: () => menuCategoryApi.getCategoryList(categoryPage, 50, { storeId }),
    enabled: !!storeId,
  });

  const { data: imageList } = useRQ({
    queryKey: ['storeImages', storeId, imagePage],
    queryFn: () => adminStoreImageApi.getList(storeId, imagePage, 20),
    enabled: !!storeId,
  });

  // Point shop list
  const { data: pointShopList } = useRQ({
    queryKey: ['pointShop', storeId, pointShopPage, pointShopIsActive],
    queryFn: () => adminPointShopApi.list(storeId, pointShopPage, 10, pointShopIsActive),
    enabled: !!storeId,
  });

  // Store posts query
  const { data: postList } = useRQ({
    queryKey: ['adminStorePosts', storeId, postPage],
    queryFn: () => adminStorePostApi.getList(storeId, postPage, 10),
    enabled: !!storeId,
  });

  const createMenuMutation = useRMutation({
    mutationFn: (body: AdminMenuCreateRequest) => menuApi.createMenu(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus', storeId] });
      setIsCreateMenuOpen(false);
    },
  });

  const updateMenuMutation = useRMutation({
    mutationFn: ({ id, body }: { id: number; body: AdminMenuUpdateRequest }) =>
      menuApi.updateMenu(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus', storeId] });
      setIsEditMenuOpen(false);
      setSelectedMenu(null);
    },
  });

  const deleteMenuMutation = useRMutation({
    mutationFn: (id: number) => menuApi.deleteMenu(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus', storeId] });
    },
  });

  // Category mutations
  const createCategoryMutation = useRMutation({
    mutationFn: (body: AdminMenuCategoryCreateRequest) => menuCategoryApi.createCategory(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuCategories', storeId] });
      setIsCreateCategoryOpen(false);
    },
  });

  const updateCategoryMutation = useRMutation({
    mutationFn: ({ id, body }: { id: number; body: AdminMenuCategoryUpdateRequest }) =>
      menuCategoryApi.updateCategory(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuCategories', storeId] });
      setIsEditCategoryOpen(false);
      setSelectedCategory(null);
    },
  });

  const deleteCategoryMutation = useRMutation({
    mutationFn: (id: number) => menuCategoryApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuCategories', storeId] });
    },
  });

  // Post (소식) mutations
  const createPostMutation = useRMutation({
    mutationFn: (body: Omit<AdminStorePostCreateRequest, 'storeId'>) =>
      adminStorePostApi.create(storeId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminStorePosts', storeId] });
      setIsCreatePostOpen(false);
    },
  });

  const updatePostMutation = useRMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: number;
      body: Omit<AdminStorePostUpdateRequest, 'storeId'>;
    }) => adminStorePostApi.update(storeId, id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminStorePosts', storeId] });
      setIsEditPostOpen(false);
      setSelectedPost(null);
    },
  });

  const deletePostMutation = useRMutation({
    mutationFn: (id: number) => adminStorePostApi.delete(storeId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminStorePosts', storeId] });
    },
  });

  // Image mutations
  const createImageMutation = useRMutation({
    mutationFn: (body: AdminStoreImageCreateRequest) => adminStoreImageApi.create(storeId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storeImages', storeId] });
      setIsCreateImageOpen(false);
    },
  });

  const updateImageMutation = useRMutation({
    mutationFn: ({ id, body }: { id: number; body: AdminStoreImageUpdateRequest }) =>
      adminStoreImageApi.update(storeId, id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storeImages', storeId] });
      setIsEditImageOpen(false);
      setSelectedImage(null);
    },
  });

  const deleteImageMutation = useRMutation({
    mutationFn: (id: number) => adminStoreImageApi.delete(storeId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storeImages', storeId] });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading store</div>;
  if (!storeResponse?.data) return <div>Store not found</div>;

  const store = storeResponse.data;
  const formatDate = (value?: string | null) => (value ? value : '-');
  const formatDiscountValue = (coupon: AdminCouponResponse) =>
    coupon.discountType === 'PERCENT'
      ? `${coupon.discountValue}%`
      : `${coupon.discountValue.toLocaleString()}원`;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* 헤더 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Button startIcon={<ArrowBack />} onClick={() => router.push('/stores')} variant='outlined'>
          목록으로
        </Button>
        <Typography variant='h4' component='h1'>
          {store.name}
        </Typography>
        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
          <Button
            variant='outlined'
            startIcon={<Edit />}
            onClick={() => {
              setSelectedStore(store);
              setIsEditDialogOpen(true);
            }}
          >
            수정
          </Button>
          <Button
            variant='outlined'
            color='error'
            startIcon={<Delete />}
            onClick={() => handleDeleteClick(store)}
          >
            삭제
          </Button>
        </Box>
      </Box>

      {/* 탭 네비게이션 */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label='store management tabs'>
          <Tab label='기본 정보' />
          <Tab label='메뉴' />
          <Tab label='사진' />
          <Tab label='소식' />
          <Tab label='서비스' />
          <Tab label='쿠폰' />
          <Tab label='상태 관리' />
          <Tab label='포인트샵' />
        </Tabs>
      </Box>

      {/* 기본 정보 탭 */}
      <TabPanel value={activeTab} index={0}>
        <Stack spacing={3}>
          {/* 기본 정보 */}
          <Paper sx={{ p: 3 }}>
            <Typography variant='h6' gutterBottom>
              기본 정보
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  가게 ID
                </Typography>
                <Typography variant='body1'>{store.id}</Typography>
              </Box>
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  점주 ID
                </Typography>
                <Button
                  variant='text'
                  color='primary'
                  onClick={() => router.push(`/users/${store.ownerId}`)}
                  sx={{
                    p: 0,
                    minWidth: 'auto',
                    textTransform: 'none',
                    justifyContent: 'flex-start',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {store.ownerId}
                </Button>
              </Box>
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  가게명
                </Typography>
                <Typography variant='body1'>{store.name}</Typography>
              </Box>
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  카테고리
                </Typography>
                <Chip label={store.category} color='primary' />
              </Box>
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  설명
                </Typography>
                <Typography variant='body1'>{store.description || '설명 없음'}</Typography>
              </Box>
            </Stack>
          </Paper>

          {/* 위치 정보 */}
          <Paper sx={{ p: 3 }}>
            <Typography variant='h6' gutterBottom>
              위치 정보
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  지역 ID
                </Typography>
                <Typography variant='body1'>{store.regionId || '지정되지 않음'}</Typography>
              </Box>
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  주소
                </Typography>
                <Typography variant='body1'>{store.address || '주소 없음'}</Typography>
              </Box>
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  상세 주소
                </Typography>
                <Typography variant='body1'>{store.addressDetail || '상세 주소 없음'}</Typography>
              </Box>
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  위도
                </Typography>
                <Typography variant='body1'>{store.latitude || '위도 없음'}</Typography>
              </Box>
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  경도
                </Typography>
                <Typography variant='body1'>{store.longitude || '경도 없음'}</Typography>
              </Box>
            </Stack>
          </Paper>

          {/* 연락처 및 기타 정보 */}
          <Paper sx={{ p: 3 }}>
            <Typography variant='h6' gutterBottom>
              연락처 및 기타
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  연락처
                </Typography>
                <Typography variant='body1'>{store.contactNumber || '연락처 없음'}</Typography>
              </Box>
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  찾아오는 길
                </Typography>
                <Typography variant='body1'>{store.direction || '안내 없음'}</Typography>
              </Box>
              <Box>
                <Typography variant='body2' color='text.secondary'>
                  지하철역
                </Typography>
                <Typography variant='body1'>
                  {store.stations.length > 0 ? store.stations.join(', ') : '지하철역 정보 없음'}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </TabPanel>

      {/* 포인트샵 탭 */}
      <TabPanel value={activeTab} index={7}>
        <Stack spacing={3}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
              <Typography variant='h6'>포인트샵 상품</Typography>
              <Chip
                label={pointShopIsActive ? '판매중' : '판매중지'}
                color={pointShopIsActive ? 'primary' : 'default'}
              />
              <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                <Button variant='outlined' onClick={() => setPointShopIsActive((v) => !v)}>
                  {pointShopIsActive ? '중지 상품 보기' : '판매중 상품 보기'}
                </Button>
                <Button variant='contained' onClick={() => setIsCreatePointShopOpen(true)}>
                  등록
                </Button>
              </Box>
            </Box>
            <TableContainer component={Paper} variant='outlined'>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>상품명</TableCell>
                    <TableCell>포인트</TableCell>
                    <TableCell>대상</TableCell>
                    <TableCell>조건</TableCell>
                    <TableCell>총수량</TableCell>
                    <TableCell>발급</TableCell>
                    <TableCell>시작일</TableCell>
                    <TableCell>종료일</TableCell>
                    <TableCell>상태</TableCell>
                    <TableCell align='right'>액션</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pointShopList?.data.list.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.point}</TableCell>
                      <TableCell>{item.provideType}</TableCell>
                      <TableCell>{item.conditions || '-'}</TableCell>
                      <TableCell>{item.totalQuantity ?? '-'}</TableCell>
                      <TableCell>{item.issuedQuantity}</TableCell>
                      <TableCell>{item.issueStartOn || '-'}</TableCell>
                      <TableCell>{item.issueEndOn || '-'}</TableCell>
                      <TableCell>
                        <Chip
                          label={item.isActive ? '판매중' : '중지'}
                          color={item.isActive ? 'success' : 'default'}
                        />
                      </TableCell>
                      <TableCell align='right'>
                        <Stack direction='row' spacing={1} justifyContent='flex-end'>
                          {item.isActive ? (
                            <Button
                              size='small'
                              variant='outlined'
                              onClick={async () => {
                                await adminPointShopApi.inactivate(item.id);
                                queryClient.invalidateQueries({ queryKey: ['pointShop', storeId] });
                              }}
                            >
                              중지
                            </Button>
                          ) : (
                            <Button
                              size='small'
                              variant='outlined'
                              onClick={async () => {
                                await adminPointShopApi.activate(item.id);
                                queryClient.invalidateQueries({ queryKey: ['pointShop', storeId] });
                              }}
                            >
                              판매
                            </Button>
                          )}
                          <Button
                            size='small'
                            variant='outlined'
                            onClick={() => {
                              setSelectedPointShop(item);
                              setIsEditPointShopOpen(true);
                            }}
                          >
                            수정
                          </Button>
                          <Button
                            size='small'
                            color='error'
                            variant='outlined'
                            onClick={async () => {
                              await adminPointShopApi.delete(item.id);
                              queryClient.invalidateQueries({ queryKey: ['pointShop', storeId] });
                            }}
                          >
                            삭제
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                  {pointShopList && pointShopList.data.list.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={11} align='center'>
                        데이터가 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Stack>

        {/* 등록 다이얼로그 */}
        <PointShopDialog
          open={isCreatePointShopOpen}
          onClose={() => setIsCreatePointShopOpen(false)}
          mode='create'
          onSubmit={async (body) => {
            await adminPointShopApi.create({ ...body, storeId });
            setIsCreatePointShopOpen(false);
            queryClient.invalidateQueries({ queryKey: ['pointShop', storeId] });
          }}
        />

        {/* 수정 다이얼로그 */}
        <PointShopDialog
          open={isEditPointShopOpen}
          onClose={() => {
            setIsEditPointShopOpen(false);
            setSelectedPointShop(null);
          }}
          mode='edit'
          initial={selectedPointShop || undefined}
          onSubmit={async (body) => {
            if (!selectedPointShop) return;
            await adminPointShopApi.update(selectedPointShop.id, body);
            setIsEditPointShopOpen(false);
            setSelectedPointShop(null);
            queryClient.invalidateQueries({ queryKey: ['pointShop', storeId] });
          }}
        />
      </TabPanel>

      {/* 메뉴 탭 (카테고리 + 메뉴) */}
      <TabPanel value={activeTab} index={1}>
        {/* 카테고리 관리 섹션 */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant='h6'>메뉴 카테고리 관리</Typography>
            <Button variant='contained' onClick={() => setIsCreateCategoryOpen(true)}>
              새 카테고리 추가
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>이름</TableCell>
                  <TableCell>설명</TableCell>
                  <TableCell>정렬</TableCell>
                  <TableCell>작업</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(categoryList?.data.list ?? []).map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.id}</TableCell>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.description}</TableCell>
                    <TableCell>{c.sortOrder}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size='small'
                          variant='outlined'
                          onClick={() => {
                            setSelectedCategory(c);
                            setIsEditCategoryOpen(true);
                          }}
                        >
                          수정
                        </Button>
                        <Button
                          size='small'
                          variant='outlined'
                          color='error'
                          onClick={() => deleteCategoryMutation.mutate(c.id)}
                        >
                          삭제
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* 메뉴 관리 섹션 */}
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant='h6'>메뉴 관리</Typography>
            <Button variant='contained' onClick={() => setIsCreateMenuOpen(true)}>
              새 메뉴 추가
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>이름</TableCell>
                  <TableCell>가격</TableCell>
                  <TableCell>카테고리ID</TableCell>
                  <TableCell>정렬</TableCell>
                  <TableCell>대표</TableCell>
                  <TableCell>추천</TableCell>
                  <TableCell>작업</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(menuList?.data.list ?? []).map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>{m.id}</TableCell>
                    <TableCell>{m.name}</TableCell>
                    <TableCell>{m.price}</TableCell>
                    <TableCell>{m.categoryId}</TableCell>
                    <TableCell>{m.sortOrder}</TableCell>
                    <TableCell>{m.isSignature ? 'Y' : 'N'}</TableCell>
                    <TableCell>{m.isRecommend ? 'Y' : 'N'}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size='small'
                          variant='outlined'
                          onClick={() => {
                            setSelectedMenu(m);
                            setIsEditMenuOpen(true);
                          }}
                        >
                          수정
                        </Button>
                        <Button
                          size='small'
                          variant='outlined'
                          color='error'
                          onClick={() => deleteMenuMutation.mutate(m.id)}
                        >
                          삭제
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>

      {/* 사진 관리 탭 */}
      <TabPanel value={activeTab} index={2}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant='h6'>사진 관리</Typography>
            <Button variant='contained' onClick={() => setIsCreateImageOpen(true)}>
              새 이미지 추가
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>이미지</TableCell>
                  <TableCell>태그</TableCell>
                  <TableCell>정렬</TableCell>
                  <TableCell>대표</TableCell>
                  <TableCell>작업</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(imageList?.data.list ?? []).map((img) => (
                  <TableRow key={img.id}>
                    <TableCell>{img.id}</TableCell>
                    <TableCell>
                      <img
                        src={img.imageUrl}
                        alt={`image-${img.id}`}
                        style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 4 }}
                      />
                    </TableCell>
                    <TableCell>{Array.isArray(img.tags) ? img.tags.join(', ') : ''}</TableCell>
                    <TableCell>{img.sortOrder}</TableCell>
                    <TableCell>{img.isMain ? 'Y' : 'N'}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size='small'
                          variant='outlined'
                          onClick={() => {
                            setSelectedImage(img);
                            setIsEditImageOpen(true);
                          }}
                        >
                          수정
                        </Button>
                        <Button
                          size='small'
                          variant='outlined'
                          color='error'
                          onClick={() => deleteImageMutation.mutate(img.id)}
                        >
                          삭제
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Create/Edit Dialogs for Images */}
        <ImageDialog
          open={isCreateImageOpen}
          title='이미지 추가'
          initial={{ imageUrl: '', sortOrder: 0, tags: [] as StoreImageTag[], isMain: false }}
          onClose={() => setIsCreateImageOpen(false)}
          onSubmit={async (values) => {
            // 1) 생성하고 ID를 받아온 뒤
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const res: any = await createImageMutation.mutateAsync({
              storeId,
              imageUrl: values.imageUrl,
              sortOrder: values.sortOrder,
              tags: values.tags,
            });
            const newId = res?.data as number | undefined;
            // 2) 체크박스가 선택된 경우 대표이미지 설정 API 호출
            if (newId && values.isMain === true) {
              await adminStoreImageApi.updateMain(newId, { isMain: true });
            }
            // 목록 갱신 및 다이얼로그 닫기
            queryClient.invalidateQueries({ queryKey: ['storeImages', storeId] });
            setIsCreateImageOpen(false);
          }}
          loading={createImageMutation.isPending}
        />

        <ImageDialog
          open={isEditImageOpen}
          title='이미지 수정'
          initial={{
            imageUrl: selectedImage?.imageUrl ?? '',
            sortOrder: selectedImage?.sortOrder ?? 0,
            tags: (selectedImage?.tags as StoreImageTag[] | undefined) ?? [],
            isMain: selectedImage?.isMain ?? false,
          }}
          onClose={() => {
            setIsEditImageOpen(false);
            setSelectedImage(null);
          }}
          onSubmit={async (values) => {
            if (!selectedImage) return;
            await updateImageMutation.mutateAsync({
              id: selectedImage.id,
              body: {
                imageUrl: values.imageUrl || undefined,
                sortOrder: values.sortOrder,
                tags: values.tags,
              },
            });
            // 대표이미지 상태를 체크박스 값으로 설정 (true/false)
            await adminStoreImageApi.updateMain(selectedImage.id, { isMain: !!values.isMain });
            queryClient.invalidateQueries({ queryKey: ['storeImages', storeId] });
            setIsEditImageOpen(false);
            setSelectedImage(null);
          }}
          loading={updateImageMutation.isPending}
        />
      </TabPanel>

      {/* 소식 탭 */}
      <TabPanel value={activeTab} index={3}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant='h6'>소식</Typography>
            <Button variant='contained' onClick={() => setIsCreatePostOpen(true)}>
              새 소식 추가
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>제목</TableCell>
                  <TableCell>태그</TableCell>
                  <TableCell>상단고정</TableCell>
                  <TableCell>작업</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(postList?.data.list ?? []).map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.id}</TableCell>
                    <TableCell>{p.title}</TableCell>
                    <TableCell>{(p.tags ?? []).join(', ')}</TableCell>
                    <TableCell>{p.isFixed ? 'Y' : 'N'}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size='small'
                          variant='outlined'
                          onClick={() => {
                            setSelectedPost(p);
                            setIsEditPostOpen(true);
                          }}
                        >
                          수정
                        </Button>
                        <Button
                          size='small'
                          variant='outlined'
                          color='error'
                          onClick={() => deletePostMutation.mutate(p.id)}
                        >
                          삭제
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Create/Edit Dialogs for Posts */}
        <PostDialog
          open={isCreatePostOpen}
          title='소식 추가'
          initial={{ title: '', content: '', tags: [], isFixed: false }}
          onClose={() => setIsCreatePostOpen(false)}
          onSubmit={(values) =>
            createPostMutation.mutate({
              title: values.title,
              content: values.content,
              tags: values.tags,
              isFixed: values.isFixed,
            })
          }
          loading={createPostMutation.isPending}
        />

        <PostDialog
          open={isEditPostOpen}
          title='소식 수정'
          initial={{
            title: selectedPost?.title ?? '',
            content: selectedPost?.content ?? '',
            tags: selectedPost?.tags ?? [],
            isFixed: selectedPost?.isFixed ?? false,
          }}
          onClose={() => {
            setIsEditPostOpen(false);
            setSelectedPost(null);
          }}
          onSubmit={(values) => {
            if (!selectedPost) return;
            updatePostMutation.mutate({
              id: selectedPost.id,
              body: {
                title: values.title,
                content: values.content,
                tags: values.tags,
                isFixed: values.isFixed,
              },
            });
          }}
          loading={updatePostMutation.isPending}
        />
      </TabPanel>

      {/* 서비스 관리 탭 */}
      <TabPanel value={activeTab} index={4}>
        <StoreServiceManagement storeId={storeId} />
      </TabPanel>

      {/* 쿠폰 관리 탭 */}
      <TabPanel value={activeTab} index={5}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2, flexWrap: 'wrap' }}>
            <Typography variant='h6'>쿠폰 관리</Typography>
            <Button variant='contained' onClick={() => setIsCreateStoreCouponOpen(true)}>
              쿠폰 생성
            </Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
            <FormControl size='small' sx={{ minWidth: 160 }}>
              <InputLabel id='store-coupon-status-filter'>상태</InputLabel>
              <Select
                labelId='store-coupon-status-filter'
                value={storeCouponStatusFilter}
                label='상태'
                onChange={(event: SelectChangeEvent<'all' | 'ACTIVE' | 'INACTIVE'>) => {
                  setStoreCouponStatusFilter(event.target.value as 'all' | 'ACTIVE' | 'INACTIVE');
                  setStoreCouponPage(1);
                }}
              >
                <MenuItem value='all'>전체</MenuItem>
                <MenuItem value='ACTIVE'>활성화</MenuItem>
                <MenuItem value='INACTIVE'>비활성화</MenuItem>
              </Select>
            </FormControl>
            <FormControl size='small' sx={{ minWidth: 120 }}>
              <InputLabel id='store-coupon-page-size'>페이지당</InputLabel>
              <Select
                labelId='store-coupon-page-size'
                value={storeCouponPageSize.toString()}
                label='페이지당'
                onChange={(event: SelectChangeEvent<string>) => {
                  setStoreCouponPageSize(Number(event.target.value));
                  setStoreCouponPage(1);
                }}
              >
                {[10, 20, 50].map((size) => (
                  <MenuItem key={size} value={size.toString()}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {isStoreCouponsLoading ? (
            <Typography sx={{ py: 4, textAlign: 'center' }}>쿠폰을 불러오는 중입니다...</Typography>
          ) : storeCoupons.length === 0 ? (
            <Typography sx={{ py: 4, textAlign: 'center' }}>등록된 쿠폰이 없습니다.</Typography>
          ) : (
            <TableContainer>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>쿠폰명</TableCell>
                    <TableCell>혜택</TableCell>
                    <TableCell>기간</TableCell>
                    <TableCell>발급 수량</TableCell>
                    <TableCell>상태</TableCell>
                    <TableCell align='right'>작업</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {storeCoupons.map((coupon) => (
                    <TableRow key={coupon.id} hover>
                      <TableCell>{coupon.id}</TableCell>
                      <TableCell>{coupon.name}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          <Typography variant='body2'>
                            {BENEFIT_TYPE_LABEL[coupon.benefitType] ?? coupon.benefitType}
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            {COUPON_TYPE_LABEL[coupon.type] ?? coupon.type} / {PROVIDE_TYPE_LABEL[coupon.provideType] ?? coupon.provideType}
                          </Typography>
                          <Typography variant='caption' color='primary'>
                            {`${DISCOUNT_TYPE_LABEL[coupon.discountType] ?? coupon.discountType} / ${formatDiscountValue(coupon)}`}
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
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                          <Button
                            size='small'
                            component={NextLink}
                            href={`/coupons/${coupon.id}`}
                            variant='text'
                          >
                            상세
                          </Button>
                          <Button
                            size='small'
                            variant='outlined'
                            onClick={() => {
                              setSelectedStoreCoupon(coupon);
                              setIsEditStoreCouponOpen(true);
                            }}
                          >
                            수정
                          </Button>
                          <Button
                            size='small'
                            variant='outlined'
                            color='error'
                            onClick={() => {
                              setStoreCouponToDelete(coupon);
                              setDeleteStoreCouponDialogOpen(true);
                            }}
                          >
                            삭제
                          </Button>
                        </Box>
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
            <Typography variant='body2'>총 {storeCouponsPageInfo?.totalCount ?? storeCoupons.length}개</Typography>
            <Pagination
              count={storeCouponsPageInfo?.totalPages ?? 1}
              page={storeCouponPage}
              onChange={(_: React.ChangeEvent<unknown>, page: number) => setStoreCouponPage(page)}
              color='primary'
              showFirstButton
              showLastButton
            />
          </Box>
        </Paper>
      </TabPanel>

      {/* 상태 관리 탭 */}
      <TabPanel value={activeTab} index={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant='h6' gutterBottom>
            상태 관리
          </Typography>
          <Stack spacing={2}>
            <Button
              variant='contained'
              color='success'
              onClick={() => handleStatusAction('approve', '승인')}
              fullWidth
            >
              승인
            </Button>
            <Button
              variant='contained'
              color='warning'
              onClick={() => handleStatusAction('reject', '거부')}
              fullWidth
            >
              거부
            </Button>
            <Button
              variant='contained'
              color='info'
              onClick={() => handleStatusAction('suspend', '일시정지')}
              fullWidth
            >
              일시정지
            </Button>
            <Button
              variant='contained'
              color='error'
              onClick={() => handleStatusAction('close', '폐업')}
              fullWidth
            >
              폐업
            </Button>
            <Button
              variant='contained'
              onClick={() => handleStatusAction('pending', '심사중')}
              fullWidth
            >
              심사중으로 변경
            </Button>
          </Stack>
        </Paper>
      </TabPanel>

      {/* 메뉴 생성 다이얼로그 */}
      <MenuDialog
        key={`create-menu-${isCreateMenuOpen}`}
        open={isCreateMenuOpen}
        title='메뉴 생성'
        initial={{
          storeId,
          categoryId: 0,
          name: '',
          price: 0,
          description: '',
          imageId: '',
          sortOrder: 0,
          isSignature: false,
          isRecommend: false,
        }}
        onClose={() => setIsCreateMenuOpen(false)}
        onSubmit={(values) => createMenuMutation.mutate(values)}
        categories={(categoryList?.data.list ?? []).map((c) => ({ id: c.id, name: c.name }))}
        loading={createMenuMutation.isPending}
      />

      {/* 메뉴 수정 다이얼로그 */}
      {selectedMenu && (
        <MenuDialog
          key={`edit-menu-${selectedMenu.id}-${isEditMenuOpen}`}
          open={isEditMenuOpen}
          title='메뉴 수정'
          initial={{
            storeId,
            categoryId: selectedMenu.categoryId,
            name: selectedMenu.name,
            price: Number(selectedMenu.price),
            description: selectedMenu.description,
            imageId: '',
            sortOrder: selectedMenu.sortOrder,
            isSignature: selectedMenu.isSignature,
            isRecommend: selectedMenu.isRecommend,
          }}
          onClose={() => {
            setIsEditMenuOpen(false);
            setSelectedMenu(null);
          }}
          onSubmit={(values) => updateMenuMutation.mutate({ id: selectedMenu.id, body: values })}
          categories={(categoryList?.data.list ?? []).map((c) => ({ id: c.id, name: c.name }))}
          loading={updateMenuMutation.isPending}
        />
      )}

      {/* 카테고리 생성 다이얼로그 */}
      <CategoryDialog
        key={`create-category-${isCreateCategoryOpen}`}
        open={isCreateCategoryOpen}
        title='카테고리 생성'
        initial={{
          storeId,
          name: '',
          description: '',
          sortOrder: (categoryList?.data.list?.length ?? 0) + 1,
        }}
        onClose={() => setIsCreateCategoryOpen(false)}
        onSubmit={(values) => createCategoryMutation.mutate(values)}
        loading={createCategoryMutation.isPending}
      />

      {/* 카테고리 수정 다이얼로그 */}
      {selectedCategory && (
        <CategoryDialog
          key={`edit-category-${selectedCategory.id}-${isEditCategoryOpen}`}
          open={isEditCategoryOpen}
          title='카테고리 수정'
          initial={{
            storeId,
            name: selectedCategory.name,
            description: selectedCategory.description ?? '',
            sortOrder: selectedCategory.sortOrder,
          }}
          onClose={() => {
            setIsEditCategoryOpen(false);
            setSelectedCategory(null);
          }}
          onSubmit={(values) =>
            updateCategoryMutation.mutate({ id: selectedCategory.id, body: values })
          }
          loading={updateCategoryMutation.isPending}
        />
      )}

      {/* 상태 변경 확인 다이얼로그 */}
      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)}>
        <DialogTitle>상태 변경 확인</DialogTitle>
        <DialogContent>
          <DialogContentText>
            정말로 이 가게를 <strong>{statusActionName}</strong> 상태로 변경하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>취소</Button>
          <Button
            onClick={handleStatusConfirm}
            variant='contained'
            disabled={statusMutation.isPending}
          >
            {statusMutation.isPending ? '처리 중...' : '확인'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 수정 다이얼로그 */}
      <EditStoreDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={(data) =>
          selectedStore && updateMutation.mutate({ id: selectedStore.id, body: data })
        }
        loading={updateMutation.isPending}
        initialData={selectedStore || undefined}
      />

      <CreateCouponDialog
        open={isCreateStoreCouponOpen}
        onClose={() => setIsCreateStoreCouponOpen(false)}
        onSubmit={(payload) => createStoreCouponMutation.mutate(payload)}
        loading={createStoreCouponMutation.isPending}
        fixedStoreId={storeId}
      />

      {selectedStoreCoupon && (
        <EditCouponDialog
          open={isEditStoreCouponOpen}
          onClose={() => {
            setIsEditStoreCouponOpen(false);
            setSelectedStoreCoupon(null);
          }}
          onSubmit={(payload) => {
            if (selectedStoreCoupon) {
              updateStoreCouponMutation.mutate({ id: selectedStoreCoupon.id, body: payload });
            }
          }}
          loading={updateStoreCouponMutation.isPending}
          initialData={selectedStoreCoupon}
          fixedStoreId={storeId}
        />
      )}

      <DeleteConfirmDialog
        open={deleteStoreCouponDialogOpen}
        onClose={() => {
          setDeleteStoreCouponDialogOpen(false);
          setStoreCouponToDelete(null);
        }}
        onConfirm={() => {
          if (storeCouponToDelete) {
            deleteStoreCouponMutation.mutate(storeCouponToDelete.id);
          }
        }}
        loading={deleteStoreCouponMutation.isPending}
        title='쿠폰 삭제 확인'
        description={storeCouponToDelete ? `정말로 '${storeCouponToDelete.name}' 쿠폰을 삭제하시겠습니까?` : ''}
      />

      {/* 삭제 확인 다이얼로그 */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleteMutation.isPending}
        title='가게 삭제 확인'
        description={storeToDelete ? `정말로 '${storeToDelete.name}' 가게를 삭제하시겠습니까?` : ''}
      />
    </Box>
  );
}

type PointShopDialogProps = {
  open: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  initial?: AdminPointShopResponse;
  onSubmit: (body: AdminUpdatePointShopRequest) => Promise<void> | void;
};

function PointShopDialog({ open, onClose, mode, initial, onSubmit }: PointShopDialogProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [point, setPoint] = useState<number>(initial?.point ?? 0);
  const [provideType, setProvideType] = useState<ProvideType>(
    (initial?.provideType as ProvideType) ?? 'ALL',
  );
  const [conditions, setConditions] = useState<string>(initial?.conditions ?? '');
  const [totalQuantity, setTotalQuantity] = useState<string>(
    initial?.totalQuantity != null ? String(initial.totalQuantity) : '',
  );
  const [issueStartOn, setIssueStartOn] = useState<string>(initial?.issueStartOn ?? '');
  const [issueEndOn, setIssueEndOn] = useState<string>(initial?.issueEndOn ?? '');

  // Reset form when dialog opens/closes or initial changes
  useEffect(() => {
    if (open) {
      setName(initial?.name ?? '');
      setPoint(initial?.point ?? 0);
      setProvideType((initial?.provideType as ProvideType) ?? 'ALL');
      setConditions(initial?.conditions ?? '');
      setTotalQuantity(initial?.totalQuantity != null ? String(initial.totalQuantity) : '');
      setIssueStartOn(initial?.issueStartOn ?? '');
      setIssueEndOn(initial?.issueEndOn ?? '');
    }
  }, [open, initial]);

  const provideTypeOptions: ProvideType[] = ['ALL', 'REGULAR_CUSTOMER'];

  const handleSubmit = async () => {
    const body: AdminUpdatePointShopRequest = {
      name,
      point: Number(point) || 0,
      provideType,
      conditions: conditions || undefined,
      totalQuantity: totalQuantity === '' ? null : Number(totalQuantity),
      issueStartOn: issueStartOn || null,
      issueEndOn: issueEndOn || null,
    } as unknown as AdminUpdatePointShopRequest;
    await onSubmit(body);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{mode === 'create' ? '포인트샵 상품 등록' : '포인트샵 상품 수정'}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label='상품명'
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label='포인트'
            type='number'
            value={point}
            onChange={(e) => setPoint(Number(e.target.value))}
            fullWidth
          />
          <TextField
            label='대상'
            select
            fullWidth
            value={provideType}
            onChange={(e) => setProvideType(e.target.value as ProvideType)}
            SelectProps={{ native: true }}
          >
            {provideTypeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </TextField>
          <TextField
            label='조건'
            value={conditions}
            onChange={(e) => setConditions(e.target.value)}
            fullWidth
            multiline
            minRows={2}
          />
          <TextField
            label='총 수량 (빈값=무제한)'
            type='number'
            value={totalQuantity}
            onChange={(e) => setTotalQuantity(e.target.value)}
            fullWidth
          />
          <Stack direction='row' spacing={2}>
            <TextField
              label='시작일'
              type='date'
              value={issueStartOn || ''}
              onChange={(e) => setIssueStartOn(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label='종료일'
              type='date'
              value={issueEndOn || ''}
              onChange={(e) => setIssueEndOn(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button variant='contained' onClick={handleSubmit}>
          {mode === 'create' ? '등록' : '수정'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type MenuFormValues = {
  storeId: number;
  categoryId: number;
  name: string;
  price: number;
  description: string;
  imageId: string;
  sortOrder: number;
  isSignature: boolean;
  isRecommend: boolean;
};

function MenuDialog({
  open,
  title,
  initial,
  onClose,
  onSubmit,
  loading,
  categories,
}: {
  open: boolean;
  title: string;
  initial: MenuFormValues;
  onClose: () => void;
  onSubmit: (values: MenuFormValues) => void;
  loading: boolean;
  categories: { id: number; name: string }[];
}) {
  const [values, setValues] = useState<MenuFormValues>(initial);
  const [uploading, setUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');

  // initial 값이 변경될 때 폼 초기화
  useEffect(() => {
    setValues(initial);
    setUploadedFileName('');
    setPreviewUrl('');
  }, [initial]);

  const handleChange = (key: keyof MenuFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValues((prev) => ({
      ...prev,
      [key]: key === 'price' || key === 'sortOrder' || key === 'categoryId' ? Number(val) : val,
    }));
  };

  const handleBoolChange =
    (key: keyof MenuFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [key]: e.target.checked }));
    };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file) return;

    setUploading(true);
    try {
      const form = new FormData();
      form.append('files', file);
      const res = await adminFileApi.upload(form);
      const first = res.data?.[0];
      if (first?.id) {
        setValues((prev) => ({ ...prev, imageId: first.id }));
        setUploadedFileName(first.name ?? file.name);

        // 미리보기 URL 생성
        if (first.url) {
          setPreviewUrl(first.url);
        } else {
          // URL이 없는 경우 FileReader로 로컬 미리보기
          const reader = new FileReader();
          reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        }
      }
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemoveImage = () => {
    setValues((prev) => ({ ...prev, imageId: '' }));
    setUploadedFileName('');
    setPreviewUrl('');
  };

  const handleClose = () => {
    // 다이얼로그 닫을 때 상태 초기화
    setValues(initial);
    setUploadedFileName('');
    setPreviewUrl('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: 'grid', gap: 2, mt: 1 }}>
        <TextField
          label='카테고리'
          select
          SelectProps={{ native: true }}
          value={values.categoryId}
          onChange={handleChange('categoryId')}
          fullWidth
        >
          <option value={0}>카테고리 선택</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </TextField>
        <TextField label='이름' value={values.name} onChange={handleChange('name')} fullWidth />
        <TextField
          label='가격'
          type='number'
          value={values.price}
          onChange={handleChange('price')}
          fullWidth
        />
        <TextField
          label='설명'
          value={values.description}
          onChange={handleChange('description')}
          fullWidth
        />

        {/* 이미지 업로드 및 미리보기 */}
        <Box>
          <Typography
            variant='body2'
            color={values.imageId ? 'text.secondary' : 'error'}
            sx={{ mb: 1 }}
          >
            메뉴 이미지 업로드 (필수)
          </Typography>

          {!values.imageId ? (
            <Button variant='outlined' component='label' disabled={uploading}>
              {uploading ? '업로드 중…' : '이미지 선택 및 업로드'}
              <input type='file' hidden accept='image/*' onChange={handleUpload} />
            </Button>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button variant='outlined' component='label' disabled={uploading}>
                {uploading ? '업로드 중…' : '이미지 변경'}
                <input type='file' hidden accept='image/*' onChange={handleUpload} />
              </Button>
              <IconButton color='error' onClick={handleRemoveImage} size='small'>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}

          {uploadedFileName && (
            <Typography variant='caption' sx={{ ml: 2 }}>
              {uploadedFileName}
            </Typography>
          )}

          {/* 이미지 미리보기 */}
          {previewUrl && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <img
                src={previewUrl}
                alt='미리보기'
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  objectFit: 'contain',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                }}
              />
            </Box>
          )}

          {!values.imageId && (
            <Typography variant='caption' color='error' display='block' sx={{ mt: 0.5 }}>
              이미지를 업로드해야 저장할 수 있습니다.
            </Typography>
          )}
        </Box>

        <TextField
          label='정렬'
          type='number'
          value={values.sortOrder}
          onChange={handleChange('sortOrder')}
          fullWidth
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <label>
            <input
              type='checkbox'
              checked={values.isSignature}
              onChange={handleBoolChange('isSignature')}
            />{' '}
            대표
          </label>
          <label>
            <input
              type='checkbox'
              checked={values.isRecommend}
              onChange={handleBoolChange('isRecommend')}
            />{' '}
            추천
          </label>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button
          onClick={() => onSubmit(values)}
          variant='contained'
          disabled={loading || uploading || !values.imageId}
        >
          {loading ? '저장 중...' : '저장'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type CategoryFormValues = {
  storeId: number;
  name: string;
  description: string;
  sortOrder: number;
};

function CategoryDialog({
  open,
  title,
  initial,
  onClose,
  onSubmit,
  loading,
}: {
  open: boolean;
  title: string;
  initial: CategoryFormValues;
  onClose: () => void;
  onSubmit: (values: CategoryFormValues) => void;
  loading: boolean;
}) {
  const [values, setValues] = useState<CategoryFormValues>(initial);

  // initial 값이 변경될 때 폼 초기화
  useEffect(() => {
    setValues(initial);
  }, [initial]);

  const handleChange =
    (key: keyof CategoryFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setValues((prev) => ({
        ...prev,
        [key]: key === 'sortOrder' ? Number(val) : val,
      }));
    };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: 'grid', gap: 2, mt: 1 }}>
        <TextField label='이름' value={values.name} onChange={handleChange('name')} fullWidth />
        <TextField
          label='설명'
          value={values.description}
          onChange={handleChange('description')}
          fullWidth
        />
        <TextField
          label='정렬'
          type='number'
          value={values.sortOrder}
          onChange={handleChange('sortOrder')}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={() => onSubmit(values)} variant='contained' disabled={loading}>
          {loading ? '저장 중...' : '저장'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type ImageFormValues = {
  imageUrl: string;
  sortOrder: number;
  tags: StoreImageTag[];
  isMain?: boolean;
};

function ImageDialog({
  open,
  title,
  initial,
  onClose,
  onSubmit,
  loading,
}: {
  open: boolean;
  title: string;
  initial: ImageFormValues;
  onClose: () => void;
  onSubmit: (values: ImageFormValues) => void;
  loading: boolean;
}) {
  const [values, setValues] = useState<ImageFormValues>(initial);
  const [uploading, setUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>(initial.imageUrl ?? '');

  useEffect(() => {
    setValues(initial);
    setPreviewUrl(initial.imageUrl ?? '');
    setUploadedFileName('');
  }, [initial]);

  const handleChange = (key: keyof Omit<ImageFormValues, 'tags' | 'isMain'>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setValues(
        (prev) =>
          ({
            ...prev,
            [key]: key === 'sortOrder' ? Number(val) : val,
          }) as ImageFormValues,
      );
    };

  const handleBoolChange = (key: keyof Pick<ImageFormValues, 'isMain'>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setValues((prev) => ({ ...prev, [key]: checked }));
    };

  const handleTagsChange = (tags: StoreImageTag[]) => {
    setValues((prev) => ({ ...prev, tags }));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file) return;

    setUploading(true);
    try {
      const form = new FormData();
      form.append('files', file);
      const res = await adminFileApi.upload(form);
      const first = res.data?.[0];
      if (first?.url) {
        setValues((prev) => ({ ...prev, imageUrl: first.url }));
        setUploadedFileName(first.name ?? file.name);
        setPreviewUrl(first.url);
      }
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemoveImage = () => {
    setValues((prev) => ({ ...prev, imageUrl: '' }));
    setUploadedFileName('');
    setPreviewUrl('');
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: 'grid', gap: 2, mt: 1 }}>
        <Box>
          <Typography variant='body2' color='text.secondary'>
            이미지 업로드
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
            <Button variant='outlined' component='label' disabled={uploading}>
              {uploading ? '업로드 중...' : '파일 선택'}
              <input type='file' hidden accept='image/*' onChange={handleUpload} />
            </Button>
            {!!values.imageUrl && (
              <Button variant='outlined' color='warning' onClick={handleRemoveImage}>
                이미지 제거
              </Button>
            )}
          </Box>
          {uploadedFileName && (
            <Typography variant='caption' sx={{ ml: 2 }}>
              {uploadedFileName}
            </Typography>
          )}
          {previewUrl && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <img
                src={previewUrl}
                alt='미리보기'
                style={{
                  maxWidth: '100%',
                  maxHeight: 200,
                  objectFit: 'contain',
                  border: '1px solid #ddd',
                  borderRadius: 4,
                }}
              />
            </Box>
          )}
          {!values.imageUrl && (
            <Typography variant='caption' color='error' display='block' sx={{ mt: 0.5 }}>
              이미지를 업로드해야 저장할 수 있습니다.
            </Typography>
          )}
        </Box>

        <TextField
          label='정렬'
          type='number'
          value={values.sortOrder}
          onChange={handleChange('sortOrder')}
          fullWidth
        />
        <TagCheckboxGroup
          value={values.tags}
          onChange={handleTagsChange}
          label='태그'
          fullWidth
        />
        <FormControlLabel
          control={<Checkbox checked={!!values.isMain} onChange={handleBoolChange('isMain')} />}
          label='대표 이미지로 지정'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button
          onClick={() => onSubmit(values)}
          variant='contained'
          disabled={loading || uploading || !values.imageUrl}
        >
          {loading ? '저장 중...' : '저장'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type PostFormValues = {
  title: string;
  content: string;
  tags: string[];
  isFixed: boolean;
};

function PostDialog({
  open,
  title,
  initial,
  onClose,
  onSubmit,
  loading,
}: {
  open: boolean;
  title: string;
  initial: PostFormValues;
  onClose: () => void;
  onSubmit: (values: PostFormValues) => void;
  loading: boolean;
}) {
  const [values, setValues] = useState<PostFormValues>(initial);

  // keep initial in sync when editing different rows
  useEffect(() => {
    setValues(initial);
  }, [initial]);

  const handleChange =
    (key: keyof Omit<PostFormValues, 'isFixed' | 'tags'>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setValues((prev) => ({ ...prev, [key]: val }));
    };

  const handleTagsChange = (tags: string[]) => {
    setValues((prev) => ({ ...prev, tags }));
  };

  const handleBoolChange = (key: 'isFixed') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setValues((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: 'grid', gap: 2, mt: 1 }}>
        <TextField label='제목' value={values.title} onChange={handleChange('title')} fullWidth />
        <TextField
          label='내용'
          value={values.content}
          onChange={handleChange('content')}
          fullWidth
          multiline
          minRows={4}
        />
        <TagInput
          value={values.tags}
          onChange={handleTagsChange}
          label='태그'
          placeholder='태그를 입력하고 엔터를 누르세요'
          fullWidth
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <label>
            <input
              type='checkbox'
              checked={values.isFixed}
              onChange={handleBoolChange('isFixed')}
            />{' '}
            상단 고정
          </label>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={() => onSubmit(values)} variant='contained' disabled={loading}>
          {loading ? '저장 중...' : '저장'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
