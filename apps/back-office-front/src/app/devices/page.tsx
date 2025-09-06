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
  TextField,
  Chip,
} from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  deviceApi,
  AdminDeviceResponse,
  RetrieveDeviceRequest,
} from '@repo/api/admin';

import { queryClient } from '../providers';

export default function DevicesPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [storeId, setStoreId] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data: devicesResponse, isLoading } = useQuery({
    queryKey: ['devices', page, pageSize, debouncedSearch, storeId, userId],
    queryFn: () =>
      deviceApi.getDeviceList({
        page: page,
        size: pageSize,
        searchString: debouncedSearch || undefined,
        storeId: storeId ? parseInt(storeId) : undefined,
        userId: userId ? parseInt(userId) : undefined,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deviceApi.deleteDevice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
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

  const handleDeleteClick = async (id: number) => {
    if (confirm('정말로 이 디바이스를 삭제하시겠습니까?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const devices = devicesResponse?.data.list || [];
  const pageInfo = devicesResponse?.data.pageInfo;
  const totalPages = pageInfo?.totalPages || 1;

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'IOS':
        return 'primary';
      case 'ANDROID':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant='h4' component='h1'>
          디바이스 관리
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          placeholder="디바이스명 또는 패키지명 검색"
          size="small"
          sx={{ flex: 1, minWidth: 240 }}
        />

        <TextField
          value={storeId}
          onChange={(e) => setStoreId(e.target.value)}
          placeholder="가게 ID"
          size="small"
          sx={{ minWidth: 120 }}
          type="number"
        />

        <TextField
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="사용자 ID"
          size="small"
          sx={{ minWidth: 120 }}
          type="number"
        />

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
              <TableCell>플랫폼</TableCell>
              <TableCell>디바이스명</TableCell>
              <TableCell>OS 버전</TableCell>
              <TableCell>패키지명</TableCell>
              <TableCell>설치일</TableCell>
              <TableCell>마지막 접속</TableCell>
              <TableCell>작업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.map((device) => (
              <TableRow key={device.id}>
                <TableCell>{device.id}</TableCell>
                <TableCell>
                  <Chip
                    label={device.platform}
                    color={getPlatformColor(device.platform) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>{device.name}</TableCell>
                <TableCell>{device.osVersion}</TableCell>
                <TableCell>{device.packageName}</TableCell>
                <TableCell>{new Date(device.installedAt).toLocaleDateString('ko-KR')}</TableCell>
                <TableCell>{new Date(device.lastConnectedAt).toLocaleDateString('ko-KR')}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant='outlined'
                      color='error'
                      size='small'
                      onClick={() => handleDeleteClick(device.id)}
                      disabled={deleteMutation.isPending}
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
    </Box>
  );
}