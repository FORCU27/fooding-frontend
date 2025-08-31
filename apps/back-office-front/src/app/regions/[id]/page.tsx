'use client';

import Link from 'next/link';
import { useState, use } from 'react';

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
  Divider,
  Chip,
  Link as MLink,
  TextField,
  InputAdornment,
} from '@mui/material';
import { regionApi, AdminRegionResponse } from '@repo/api/admin';
import { useQuery } from '@tanstack/react-query';

export default function RegionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchString, setSearchString] = useState('');

  const { data: regionDetail } = useQuery({
    queryKey: ['region', id],
    queryFn: () => regionApi.getRegion(id),
  });

  const { data: childList } = useQuery({
    queryKey: ['regions', 'children', id, page, pageSize, searchString],
    queryFn: () => regionApi.getRegionList(page - 1, pageSize, { 
      parentRegionId: id,
      searchString: searchString || undefined,
    }),
  });

  const region = regionDetail?.data;
  const children: AdminRegionResponse[] = childList?.data.list ?? [];
  const pageInfo = childList?.data.pageInfo;
  const totalPages = pageInfo?.totalPages || 1;

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant='h4' component='h1'>
          Region: {region?.name || id}
        </Typography>
        {region && (
          <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip label={`ID: ${region.id}`} />
            <Chip label={`Parent: ${region.parentRegionId ?? '-'}`} />
            <Chip label={`Timezone: ${region.timezone}`} />
            <Chip label={`Country: ${region.countryCode}`} />
            <Chip label={`LegalCode: ${region.legalCode}`} />
            <Chip label={`Currency: ${region.currency}`} />
            <Chip label={`Level: ${region.level}`} />
          </Box>
        )}
      </Box>

      <Divider />

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant='h6'>하위 지역</Typography>
          <TextField
            size='small'
            placeholder='이름으로 검색'
            value={searchString}
            onChange={(e) => {
              setPage(1);
              setSearchString(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon fontSize='small' />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250 }}
          />
        </Box>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Timezone</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Level</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {children.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align='center'>
                    {searchString ? '검색 결과가 없습니다' : '하위 지역이 없습니다'}
                  </TableCell>
                </TableRow>
              ) : (
                children.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <MLink component={Link} href={`/regions/${c.id}`} underline='hover'>
                        {c.id}
                      </MLink>
                    </TableCell>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.timezone}</TableCell>
                    <TableCell>{c.countryCode}</TableCell>
                    <TableCell>{c.level}</TableCell>
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
    </Box>
  );
}

