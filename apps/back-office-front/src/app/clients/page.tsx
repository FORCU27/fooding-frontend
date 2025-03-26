'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

import {
  Alert,
  Box,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import useSWR from 'swr';

import DataGrid from '@/components/DataGrid';
import { clientRepository } from '@/repository/client-repository';

interface Filters {
  search: string;
}

interface Row {
  contactId: string;
  projectName: string;
  companyName: string;
  name: string;
  email: string;
  mobile: string;
  budget?: string;
  description?: string | null;
  createdDate: string;
  updatedDate?: string | null;
  [key: string]: any; // 기타 필드 대응
}

export default function ContactsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
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

  const { data, isLoading } = useSWR(['clients', filters], () =>
    clientRepository.getList({ search: filters.search }),
  );

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const columns = [
    { id: 'contactId', label: 'id', minWidth: 30 },
    { id: 'projectName', label: '프로젝트명', minWidth: 100 },
    { id: 'companyName', label: '회사명', minWidth: 100 },
    { id: 'name', label: '이름', minWidth: 50 },
    { id: 'email', label: '이메일', minWidth: 100 },
    { id: 'mobile', label: '전화번호', minWidth: 100 },
    {
      id: 'budget',
      label: '예산',
      minWidth: 150,
      format: (value: any) => `${value}원`,
    },
    { id: 'description', label: '설명', minWidth: 100 },
    {
      id: 'updatedDate',
      label: '수정일',
      minWidth: 100,
      format: (value: string) => formatDate(value),
    },
    {
      id: 'createdDate',
      label: '등록일',
      minWidth: 100,
      format: (value: string) => formatDate(value),
    },
  ];
  const moblieColumns = [
    { id: 'contactId', label: 'id', minWidth: 30 },
    { id: 'projectName', label: '프로젝트명', minWidth: 100 },
    { id: 'companyName', label: '회사명', minWidth: 100 },
    { id: 'email', label: '이메일', minWidth: 100 },
    {
      id: 'budget',
      label: '예산',
      minWidth: 150,
      format: (value: any) => `${value}원`,
    },
  ];

  const Actions = () => (
    <TextField
      size='small'
      label='고객 검색'
      name='search'
      value={filters.search}
      onChange={handleFilterChange}
      sx={{ minWidth: 200, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
    />
  );

  const handleRowClick = (row: Row) => {
    router.push(`/clients/${row.contactId}`);
  };

  const handleCloseSnackbar = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h4' sx={{ mb: 4 }}>
        고객 관리
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
