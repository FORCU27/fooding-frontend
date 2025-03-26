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
import { applicationRepository } from '@/repository/application-repository';

interface Filters {
  search: string;
}

interface Row {
  id: string;
  projectId: string;
  name: string;
  [key: string]: any; // 기타 필드 대응
}

export default function PortfoliosPage() {
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

  const { data, isLoading } = useSWR(['applications', filters], () =>
    applicationRepository.getList({ search: filters.search }),
  );

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const columns = [
    { id: 'projectName', label: '프로젝트명', minWidth: 150 },
    { id: 'name', label: '앱명', minWidth: 150 },
    { id: 'platform', label: '플랫폼', minWidth: 100 },
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
    { id: 'projectName', label: '프로젝트명', minWidth: 100 },
    { id: 'name', label: '앱명', minWidth: 100 },
    { id: 'platform', label: '플랫폼', minWidth: 100 },
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
        placeholder='검색'
        sx={{ minWidth: isMoblie ? 120 : 300, m: '0 16px' }}
      />
      <Button
        variant='contained'
        startIcon={<AddIcon />}
        onClick={() => router.push('/applications/create')}
        sx={{ p: isMoblie ? 0 : 1 }}
      >
        {isMoblie ? '등록' : '앱 등록'}
      </Button>
    </Box>
  );

  const handleRowClick = (row: Row) => {
    router.push(`/applications/${row.id}`);
  };

  const handleCloseSnackbar = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Typography variant='h4' sx={{ mb: 4 }}>
        앱 관리
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

      <Snackbar open={notification.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert severity={notification.severity}>{notification.message}</Alert>
      </Snackbar>
    </Box>
  );
}
