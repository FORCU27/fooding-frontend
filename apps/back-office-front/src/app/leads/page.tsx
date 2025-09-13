'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
  TextField,
  InputAdornment,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { leadApi } from '@repo/api/admin';
import { useQuery } from '@tanstack/react-query';

export default function LeadsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [uploadFilter, setUploadFilter] = useState<'false' | 'true' | 'all'>('false');

  const { data, isLoading, error } = useQuery({
    queryKey: ['leads', page, pageSize, search, uploadFilter],
    queryFn: () => leadApi.getLeadList(page, pageSize, search, uploadFilter),
  });

  // 에러 로깅 추가
  if (error) {
    console.error('Leads query error:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      cause: error.cause,
      stack: error.stack,
    });
  }

  const leads = data?.data.list ?? [];
  const pageInfo = data?.data.pageInfo;
  const totalPages = pageInfo?.totalPages || 1;

  const handleFilterChange = (newFilter: 'false' | 'true' | 'all') => {
    setUploadFilter(newFilter);
    setPage(1);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant='h4' component='h1'>
          Lead
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl size='small' sx={{ minWidth: 120 }}>
            <InputLabel>업로드 상태</InputLabel>
            <Select
              value={uploadFilter}
              label='업로드 상태'
              onChange={(e) => handleFilterChange(e.target.value as 'false' | 'true' | 'all')}
            >
              <MenuItem value='false'>미업로드</MenuItem>
              <MenuItem value='true'>업로드됨</MenuItem>
              <MenuItem value='all'>전체</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size='small'
            placeholder='검색'
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon fontSize='small' />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>연락처</TableCell>
              <TableCell>유입 경로</TableCell>
              <TableCell>생성일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            ) : leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align='center'>
                  데이터가 없습니다
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <Button
                      onClick={() => router.push(`/leads/${lead.id}`)}
                      sx={{ textDecoration: 'underline', color: 'primary.main' }}
                    >
                      {lead.id}
                    </Button>
                  </TableCell>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>{lead.source ?? '-'}</TableCell>
                  <TableCell>{lead.createdAt}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
          color='primary'
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
}
