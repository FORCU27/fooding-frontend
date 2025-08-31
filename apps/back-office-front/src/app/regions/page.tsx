'use client';

import { useState } from 'react';

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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Link as MLink } from '@mui/material';
import { regionApi, AdminRegionResponse } from '@repo/api/admin';

export default function RegionsPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchString, setSearchString] = useState('');
  const [parentRegionId, setParentRegionId] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['regions', page, pageSize, searchString, parentRegionId],
    queryFn: () =>
      regionApi.getRegionList(page - 1, pageSize, {
        searchString: searchString || undefined,
        parentRegionId: parentRegionId || undefined,
      }),
  });

  const regions: AdminRegionResponse[] = data?.data.list ?? [];
  const pageInfo = data?.data.pageInfo;
  const totalPages = pageInfo?.totalPages || 1;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, gap: 2, alignItems: 'center' }}>
        <Typography variant='h4' component='h1'>
          Regions
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            size='small'
            placeholder='이름'
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
          />
          <TextField
            size='small'
            placeholder='Parent Region ID'
            value={parentRegionId}
            onChange={(e) => {
              setPage(1);
              setParentRegionId(e.target.value);
            }}
          />
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Parent</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Timezone</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Legal Code</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Level</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8}>Loading...</TableCell>
              </TableRow>
            ) : regions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align='center'>데이터가 없습니다</TableCell>
              </TableRow>
            ) : (
              regions.map((region) => (
                <TableRow key={region.id}>
                  <TableCell>
                    <MLink component={Link} href={`/regions/${region.id}`} underline='hover'>
                      {region.id}
                    </MLink>
                  </TableCell>
                  <TableCell>{region.parentRegionId ?? '-'}</TableCell>
                  <TableCell>{region.name}</TableCell>
                  <TableCell>{region.timezone}</TableCell>
                  <TableCell>{region.countryCode}</TableCell>
                  <TableCell>{region.legalCode}</TableCell>
                  <TableCell>{region.currency}</TableCell>
                  <TableCell>{region.level}</TableCell>
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
