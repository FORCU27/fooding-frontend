/* eslint-disable @next/next/no-img-element */
'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import useSWR from 'swr';

import DataGrid from '@/components/DataGrid';
import { projectRepository } from '@/repository/project-repository';

interface Filters {
  search: string;
}

interface Row {
  id: string;
  teamId: string;
  [key: string]: any; // 기타 필드 대응
}

export default function ProjectsPage() {
  const router = useRouter();
  const [, setSelected] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>({ search: '' });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const theme = useTheme();
  const isMoblie = useMediaQuery(theme.breakpoints.down('sm'));

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const formatImage = (imageUrl: string | null) => {
    if (!imageUrl) return '';

    return (
      <img
        src={imageUrl}
        alt='project'
        width={100}
        height={100}
        style={{ borderRadius: '15px' }}
      />
    );
  };

  const { data, isLoading } = useSWR(['projects', filters], () =>
    projectRepository.getList({ search: filters.search }),
  );

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const columns = [
    {
      id: 'thumbnailImageUrl',
      label: '썸네일',
      minWidth: 100,
      format: (value: string) => formatImage(value),
    },
    { id: 'teamName', label: '팀명', minWidth: 250 },
    { id: 'name', label: '프로젝트명', minWidth: 250 },
    {
      id: 'createdDate',
      label: '등록일',
      minWidth: 200,
      format: (value: string) => formatDate(value),
    },
    {
      id: 'updatedDate',
      label: '수정일',
      minWidth: 200,
      format: (value: string) => formatDate(value),
    },
  ];
  const moblieColumns = [
    {
      id: 'thumbnailImageUrl',
      label: '썸네일',
      minWidth: 100,
      format: (value: string) => formatImage(value),
    },
    { id: 'teamName', label: '팀명', minWidth: 250 },
    { id: 'name', label: '프로젝트명', minWidth: 250 },
  ];

  const Actions = () => (
    <Box
      sx={{
        display: 'flex',
        p: 1,
      }}
    >
      <TextField
        size='small'
        label='검색'
        name='search'
        value={filters.search}
        onChange={handleFilterChange}
        placeholder='프로젝트명 검색'
        sx={{ minWidth: isMoblie ? 120 : 300, m: '0 16px' }}
      />
      <Button
        variant='contained'
        startIcon={<AddIcon />}
        onClick={() => router.push('/projects/create')}
        sx={{ p: isMoblie ? 0 : 1 }}
      >
        {isMoblie ? '등록' : '프로젝트 등록'}
      </Button>
    </Box>
  );

  const handleRowClick = (row: Row) => {
    router.push(`/projects/${row.id}`);
  };

  const handleSnackbarClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Typography variant='h4' sx={{ mb: 4 }}>
        프로젝트 관리
      </Typography>

      <DataGrid
        columns={isMoblie ? moblieColumns : columns}
        rows={data?.data || []}
        loading={isLoading}
        selectable={isMoblie ? false : true}
        onSelectionChange={setSelected}
        actions={<Actions />}
        onRowClick={handleRowClick}
      />

      <Snackbar open={notification.open} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert severity={notification.severity}>{notification.message}</Alert>
      </Snackbar>
    </Box>
  );
}
