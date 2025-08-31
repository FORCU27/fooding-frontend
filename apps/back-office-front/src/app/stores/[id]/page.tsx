'use client';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';

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
} from '@mui/material';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField
} from '@mui/material';
import {
  storeApi,
  AdminStoreResponse,
  AdminUpdateStoreRequest,
} from '@repo/api/admin';
import { menuApi, AdminMenuResponse, AdminMenuCreateRequest, AdminMenuUpdateRequest, menuCategoryApi, AdminMenuCategoryResponse, AdminMenuCategoryCreateRequest, AdminMenuCategoryUpdateRequest } from '@repo/api/admin';
import { fileApi } from '@repo/api/file';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useQuery as useRQ, useMutation as useRMutation } from '@tanstack/react-query';

import { queryClient } from '../../providers';
import { DeleteConfirmDialog } from '../DeleteConfirmDialog';
import { EditStoreDialog } from '../EditStoreDialog';
import StoreServiceManagement from './StoreServiceManagement';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`store-tabpanel-${index}`}
      aria-labelledby={`store-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
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

  const { data: storeResponse, isLoading, error } = useQuery({
    queryKey: ['store', storeId],
    queryFn: () => storeApi.getStore(storeId),
    enabled: !!storeId,
  });

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
  const [menuPage, setMenuPage] = useState(1);
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<AdminMenuResponse | null>(null);
  // Categories state
  const [categoryPage, setCategoryPage] = useState(1);
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<AdminMenuCategoryResponse | null>(null);

  const { data: menuList } = useRQ({
    queryKey: ['menus', storeId, menuPage],
    queryFn: () => menuApi.getMenuList(menuPage - 1, 10, { storeId }),
    enabled: !!storeId,
  });

  const { data: categoryList } = useRQ({
    queryKey: ['menuCategories', storeId, categoryPage],
    queryFn: () => menuCategoryApi.getCategoryList(categoryPage - 1, 50, { storeId }),
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
    mutationFn: ({ id, body }: { id: number; body: AdminMenuUpdateRequest }) => menuApi.updateMenu(id, body),
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
    mutationFn: ({ id, body }: { id: number; body: AdminMenuCategoryUpdateRequest }) => menuCategoryApi.updateCategory(id, body),
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading store</div>;
  if (!storeResponse?.data) return <div>Store not found</div>;

  const store = storeResponse.data;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* 헤더 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.push('/stores')}
          variant="outlined"
        >
          목록으로
        </Button>
        <Typography variant="h4" component="h1">
          {store.name}
        </Typography>
        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => {
              setSelectedStore(store);
              setIsEditDialogOpen(true);
            }}
          >
            수정
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={() => handleDeleteClick(store)}
          >
            삭제
          </Button>
        </Box>
      </Box>

      {/* 탭 네비게이션 */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="store management tabs">
          <Tab label="기본 정보" />
          <Tab label="메뉴 카테고리 관리" />
          <Tab label="메뉴 관리" />
          <Tab label="서비스 관리" />
          <Tab label="상태 관리" />
        </Tabs>
      </Box>

      {/* 기본 정보 탭 */}
      <TabPanel value={activeTab} index={0}>
        <Stack spacing={3}>
          {/* 기본 정보 */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              기본 정보
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  가게 ID
                </Typography>
                <Typography variant="body1">{store.id}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  점주 ID
                </Typography>
                <Typography variant="body1">{store.ownerId}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  가게명
                </Typography>
                <Typography variant="body1">{store.name}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  카테고리
                </Typography>
                <Chip label={store.category} color="primary" />
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  설명
                </Typography>
                <Typography variant="body1">
                  {store.description || '설명 없음'}
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {/* 위치 정보 */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              위치 정보
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  지역 ID
                </Typography>
                <Typography variant="body1">
                  {store.regionId || '지정되지 않음'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  주소
                </Typography>
                <Typography variant="body1">
                  {store.address || '주소 없음'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  상세 주소
                </Typography>
                <Typography variant="body1">
                  {store.addressDetail || '상세 주소 없음'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  위도
                </Typography>
                <Typography variant="body1">
                  {store.latitude || '위도 없음'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  경도
                </Typography>
                <Typography variant="body1">
                  {store.longitude || '경도 없음'}
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {/* 연락처 및 기타 정보 */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              연락처 및 기타
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  연락처
                </Typography>
                <Typography variant="body1">
                  {store.contactNumber || '연락처 없음'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  찾아오는 길
                </Typography>
                <Typography variant="body1">
                  {store.direction || '안내 없음'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  지하철역
                </Typography>
                <Typography variant="body1">
                  {store.stations.length > 0 ? store.stations.join(', ') : '지하철역 정보 없음'}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </TabPanel>

      {/* 메뉴 카테고리 관리 탭 */}
      <TabPanel value={activeTab} index={1}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">메뉴 카테고리 관리</Typography>
            <Button variant="contained" onClick={() => setIsCreateCategoryOpen(true)}>새 카테고리 추가</Button>
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
                        <Button size="small" variant="outlined" onClick={() => { setSelectedCategory(c); setIsEditCategoryOpen(true); }}>수정</Button>
                        <Button size="small" variant="outlined" color="error" onClick={() => deleteCategoryMutation.mutate(c.id)}>삭제</Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>

      {/* 메뉴 관리 탭 */}
      <TabPanel value={activeTab} index={2}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">메뉴 관리</Typography>
            <Button variant="contained" onClick={() => setIsCreateMenuOpen(true)}>새 메뉴 추가</Button>
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
                        <Button size="small" variant="outlined" onClick={() => { setSelectedMenu(m); setIsEditMenuOpen(true); }}>수정</Button>
                        <Button size="small" variant="outlined" color="error" onClick={() => deleteMenuMutation.mutate(m.id)}>삭제</Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>

      {/* 서비스 관리 탭 */}
      <TabPanel value={activeTab} index={3}>
        <StoreServiceManagement storeId={storeId} />
      </TabPanel>

      {/* 상태 관리 탭 */}
      <TabPanel value={activeTab} index={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            상태 관리
          </Typography>
          <Stack spacing={2}>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleStatusAction('approve', '승인')}
              fullWidth
            >
              승인
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => handleStatusAction('reject', '거부')}
              fullWidth
            >
              거부
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => handleStatusAction('suspend', '일시정지')}
              fullWidth
            >
              일시정지
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleStatusAction('close', '폐업')}
              fullWidth
            >
              폐업
            </Button>
            <Button
              variant="contained"
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
        open={isCreateMenuOpen}
        title="메뉴 생성"
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
          open={isEditMenuOpen}
          title="메뉴 수정"
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
          onClose={() => { setIsEditMenuOpen(false); setSelectedMenu(null); }}
          onSubmit={(values) => updateMenuMutation.mutate({ id: selectedMenu.id, body: values })}
          categories={(categoryList?.data.list ?? []).map((c) => ({ id: c.id, name: c.name }))}
          loading={updateMenuMutation.isPending}
        />
      )}

      {/* 카테고리 생성 다이얼로그 */}
      <CategoryDialog
        open={isCreateCategoryOpen}
        title="카테고리 생성"
        initial={{ storeId, name: '', description: '', sortOrder: ((categoryList?.data.list?.length) ?? 0) + 1 }}
        onClose={() => setIsCreateCategoryOpen(false)}
        onSubmit={(values) => createCategoryMutation.mutate(values)}
        loading={createCategoryMutation.isPending}
      />

      {/* 카테고리 수정 다이얼로그 */}
      {selectedCategory && (
        <CategoryDialog
          open={isEditCategoryOpen}
          title="카테고리 수정"
          initial={{ storeId, name: selectedCategory.name, description: selectedCategory.description ?? '', sortOrder: selectedCategory.sortOrder }}
          onClose={() => { setIsEditCategoryOpen(false); setSelectedCategory(null); }}
          onSubmit={(values) => updateCategoryMutation.mutate({ id: selectedCategory.id, body: values })}
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
            variant="contained"
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

      {/* 삭제 확인 다이얼로그 */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleteMutation.isPending}
        title="가게 삭제 확인"
        description={storeToDelete ? `정말로 '${storeToDelete.name}' 가게를 삭제하시겠습니까?` : ''}
      />
    </Box>
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

  const handleChange = (key: keyof MenuFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValues((prev) => ({
      ...prev,
      [key]: key === 'price' || key === 'sortOrder' || key === 'categoryId' ? Number(val) : val,
    }));
  };

  const handleBoolChange = (key: keyof MenuFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [key]: e.target.checked } as any));
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
      const res = await fileApi.upload(form);
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
        <TextField label="카테고리" select SelectProps={{ native: true }} value={values.categoryId} onChange={handleChange('categoryId')} fullWidth>
          <option value={0}>카테고리 선택</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </TextField>
        <TextField label="이름" value={values.name} onChange={handleChange('name')} fullWidth />
        <TextField label="가격" type="number" value={values.price} onChange={handleChange('price')} fullWidth />
        <TextField label="설명" value={values.description} onChange={handleChange('description')} fullWidth />
        
        {/* 이미지 업로드 및 미리보기 */}
        <Box>
          <Typography variant="body2" color={values.imageId ? 'text.secondary' : 'error'} sx={{ mb: 1 }}>
            메뉴 이미지 업로드 (필수)
          </Typography>
          
          {!values.imageId ? (
            <Button variant="outlined" component="label" disabled={uploading}>
              {uploading ? '업로드 중…' : '이미지 선택 및 업로드'}
              <input type="file" hidden accept="image/*" onChange={handleUpload} />
            </Button>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button variant="outlined" component="label" disabled={uploading}>
                {uploading ? '업로드 중…' : '이미지 변경'}
                <input type="file" hidden accept="image/*" onChange={handleUpload} />
              </Button>
              <IconButton 
                color="error" 
                onClick={handleRemoveImage}
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
          
          {uploadedFileName && (
            <Typography variant="caption" sx={{ ml: 2 }}>
              {uploadedFileName}
            </Typography>
          )}
          
          {/* 이미지 미리보기 */}
          {previewUrl && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <img 
                src={previewUrl} 
                alt="미리보기" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '200px', 
                  objectFit: 'contain',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }} 
              />
            </Box>
          )}
          
          {!values.imageId && (
            <Typography variant="caption" color="error" display="block" sx={{ mt: 0.5 }}>
              이미지를 업로드해야 저장할 수 있습니다.
            </Typography>
          )}
        </Box>
        
        <TextField label="정렬" type="number" value={values.sortOrder} onChange={handleChange('sortOrder')} fullWidth />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <label>
            <input type="checkbox" checked={values.isSignature} onChange={handleBoolChange('isSignature')} /> 대표
          </label>
          <label>
            <input type="checkbox" checked={values.isRecommend} onChange={handleBoolChange('isRecommend')} /> 추천
          </label>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={() => onSubmit(values)} variant="contained" disabled={loading || uploading || !values.imageId}>
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

  const handleChange = (key: keyof CategoryFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <TextField label="이름" value={values.name} onChange={handleChange('name')} fullWidth />
        <TextField label="설명" value={values.description} onChange={handleChange('description')} fullWidth />
        <TextField label="정렬" type="number" value={values.sortOrder} onChange={handleChange('sortOrder')} fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={() => onSubmit(values)} variant="contained" disabled={loading}>
          {loading ? '저장 중...' : '저장'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
