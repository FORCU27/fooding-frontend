'use client';

import { useState, useEffect } from 'react';
import type React from 'react';

import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Chip,
  TextField,
  Switch,
} from '@mui/material';
import { Link } from '@mui/material';
import { bannerApi, AdminBannerResponse, AdminBannerCreateRequest, AdminBannerUpdateRequest } from '@repo/api/admin';
import { useQuery, useMutation } from '@tanstack/react-query';

import { CreateBannerDialog } from './CreateBannerDialog';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { EditBannerDialog } from './EditBannerDialog';
import { queryClient } from '../providers';

type Banner = AdminBannerResponse;

export default function BannersPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState<Banner | null>(null);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data: bannersResponse, isLoading } = useQuery({
    queryKey: ['banners', page, pageSize, debouncedSearch, activeFilter],
    queryFn: () =>
      bannerApi.list({
        page: page - 1,
        size: pageSize,
        name: debouncedSearch || undefined,
        active: activeFilter === 'all' ? undefined : activeFilter === 'active',
      }),
  });

  const createMutation = useMutation({
    mutationFn: (data: AdminBannerCreateRequest) => bannerApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      setIsCreateDialogOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: AdminBannerUpdateRequest }) =>
      bannerApi.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      setIsEditDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => bannerApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      setDeleteDialogOpen(false);
      setBannerToDelete(null);
    },
    onSettled: () => {
      setDeleteDialogOpen(false);
      setBannerToDelete(null);
    },
  });

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    setPageSize(Number(event.target.value));
    setPage(1);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setPage(1);
      setDebouncedSearch(search);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const banners = bannersResponse?.data?.list || [];
  const pageInfo = bannersResponse?.data?.pageInfo;
  const totalPages = pageInfo?.totalPages || 1;

  const handleDeleteClick = (banner: Banner) => {
    setBannerToDelete(banner);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (bannerToDelete) {
      deleteMutation.mutate(bannerToDelete.id);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant='h4' component='h1'>
          배너 관리
        </Typography>
        <Button variant='contained' onClick={() => setIsCreateDialogOpen(true)}>
          새 배너 추가
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          placeholder="배너명 검색"
          size="small"
          sx={{ flex: 1, minWidth: 240 }}
        />

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <Select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
          >
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="active">활성화</MenuItem>
            <MenuItem value="inactive">비활성화</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          onClick={() => {
            setPage(1);
            setDebouncedSearch(search);
          }}
        >
          검색
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>설명</TableCell>
              <TableCell>활성화</TableCell>
              <TableCell>우선순위</TableCell>
              <TableCell>링크 타입</TableCell>
              <TableCell>링크</TableCell>
              <TableCell>작업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banners.map((banner: Banner) => (
              <TableRow key={banner.id}>
                <TableCell>{banner.id}</TableCell>
                <TableCell>{banner.name}</TableCell>
                <TableCell>{banner.description}</TableCell>
                <TableCell>
                  <Switch checked={banner.active} disabled size="small" />
                </TableCell>
                <TableCell>{banner.priority}</TableCell>
                <TableCell>
                  <Chip
                    label={banner.linkType}
                    color={banner.linkType === 'INTERNAL' ? 'primary' : 'secondary'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {banner.link ? (
                    <Link href={banner.link} target="_blank" underline="hover">
                      {banner.link.length > 30 ? `${banner.link.substring(0, 30)}...` : banner.link}
                    </Link>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant='outlined'
                      size='small'
                      onClick={() => {
                        setSelectedBanner(banner);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      수정
                    </Button>
                    <Button
                      variant='outlined'
                      color='error'
                      size='small'
                      onClick={() => handleDeleteClick(banner)}
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

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2">
            페이지당 행 수:
          </Typography>
          <FormControl size="small" sx={{ minWidth: 80 }}>
            <Select
              value={pageSize}
              onChange={handlePageSizeChange}
              displayEmpty
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="body2">
            총 {pageInfo?.totalCount || 0}개 항목
          </Typography>
        </Box>
        
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>

      <CreateBannerDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
        loading={createMutation.isPending}
      />

      <EditBannerDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={(data) =>
          selectedBanner && updateMutation.mutate({ id: selectedBanner.id, body: data })
        }
        loading={updateMutation.isPending}
        initialData={selectedBanner || undefined}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleteMutation.isPending}
        title='배너 삭제 확인'
        description={bannerToDelete ? `정말로 '${bannerToDelete.name}' 배너를 삭제하시겠습니까?` : ''}
      />
    </Box>
  );
}