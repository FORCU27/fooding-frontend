'use client';

import { useState } from 'react';

import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { adminWaitingLogApi, AdminWaitingLogResponse } from '@repo/api/admin';
import { useQuery, useMutation } from '@tanstack/react-query';

import { queryClient } from '../../components/Provider/providers';

export default function WaitingLogsPage() {
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: ['adminWaitingLogs', page],
    queryFn: () => adminWaitingLogApi.getList(page, 20),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminWaitingLogApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminWaitingLogs'] });
    },
  });

  const logs: AdminWaitingLogResponse[] = data?.data.list ?? [];
  const pageInfo = data?.data.pageInfo;

  return (
    <Box>
      <Typography variant='h5' sx={{ mb: 2 }}>
        웨이팅 로그
      </Typography>
      <TableContainer component={Paper} variant='outlined'>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>StoreWaiting ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id} hover>
                <TableCell>{log.id}</TableCell>
                <TableCell>{log.storeWaitingId}</TableCell>
                <TableCell>
                  <Chip label={log.type} size='small' />
                </TableCell>
                <TableCell align='right'>
                  <Button size='small' color='error' onClick={() => deleteMutation.mutate(log.id)}>
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
        <Button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
          이전
        </Button>
        <Button
          disabled={(pageInfo?.totalPages ?? 1) <= page}
          onClick={() => setPage((p) => p + 1)}
        >
          다음
        </Button>
      </Box>
    </Box>
  );
}
