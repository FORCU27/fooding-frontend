'use client';

import { useMemo, useState } from 'react';

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  MenuItem,
  Paper,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  AdminCreateReportRequest,
  AdminReportResponse,
  AdminUpdateReportRequest,
  ReportStatus,
  ReportTargetType,
  reportApi,
} from '@repo/api/admin';
import { useMutation, useQuery } from '@tanstack/react-query';

import { queryClient } from '../providers';
import { CreateReportDialog } from './CreateReportDialog';
import { EditReportDialog } from './EditReportDialog';
import { DeleteConfirmDialog } from '../stores/DeleteConfirmDialog';

const statusLabel: Record<ReportStatus, string> = {
  REPORTED: '접수',
  PROCESS: '진행',
  SUCCESS: '완료',
  DENY: '반려',
};

const statusColor: Record<ReportStatus, 'default' | 'info' | 'warning' | 'success' | 'error'> = {
  REPORTED: 'info',
  PROCESS: 'warning',
  SUCCESS: 'success',
  DENY: 'error',
};

const targetLabel: Record<ReportTargetType, string> = {
  REVIEW: '리뷰',
  POST: '게시글',
};

export default function ReportsPage() {
  const [pageNum, setPageNum] = useState(1);
  const pageSize = 10;

  const [statusFilter, setStatusFilter] = useState<ReportStatus | 'ALL'>('ALL');
  const [targetFilter, setTargetFilter] = useState<ReportTargetType | 'ALL'>('ALL');

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selected, setSelected] = useState<AdminReportResponse | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toDelete, setToDelete] = useState<AdminReportResponse | null>(null);

  const queryKey = useMemo(
    () => ['reports', pageNum, pageSize, statusFilter, targetFilter],
    [pageNum, pageSize, statusFilter, targetFilter],
  );

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: async () => {
      const result = await reportApi.list({
        pageNum,
        pageSize,
        status: statusFilter === 'ALL' ? undefined : statusFilter,
        targetType: targetFilter === 'ALL' ? undefined : targetFilter,
      });
      return result;
    },
  });

  const createMutation = useMutation({
    mutationFn: (body: AdminCreateReportRequest) => reportApi.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      setIsCreateOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: AdminUpdateReportRequest }) =>
      reportApi.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      setIsEditOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id, deletedBy }: { id: number; deletedBy: number }) =>
      reportApi.delete({ id, deletedBy }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      setDeleteOpen(false);
      setToDelete(null);
    },
    onSettled: () => {
      setDeleteOpen(false);
      setToDelete(null);
    },
  });

  const approveMutation = useMutation({
    mutationFn: ({ id, chargerId }: { id: number; chargerId: number }) =>
      reportApi.approve(id, chargerId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reports'] }),
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, chargerId }: { id: number; chargerId: number }) =>
      reportApi.reject(id, chargerId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reports'] }),
  });

  const successMutation = useMutation({
    mutationFn: ({ id, chargerId }: { id: number; chargerId: number }) =>
      reportApi.success(id, chargerId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reports'] }),
  });

  if (isLoading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3 }}>
        <Alert severity="error">
          신고 목록을 불러오는 중 오류가 발생했습니다.
          <br />
          에러: {(error as Error).message}
        </Alert>
      </Paper>
    );
  }

  const list = data?.data.list ?? [];
  const pageInfo = data?.data.pageInfo;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          신고 관리
        </Typography>
        <Button variant="contained" onClick={() => setIsCreateOpen(true)}>
          신고 생성
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>상태</InputLabel>
          <Select value={statusFilter} label="상태" onChange={(e: SelectChangeEvent<string>) => setStatusFilter(e.target.value as ReportStatus | 'ALL')}>
            <MenuItem value="ALL">전체</MenuItem>
            <MenuItem value="REPORTED">접수</MenuItem>
            <MenuItem value="PROCESS">진행</MenuItem>
            <MenuItem value="SUCCESS">완료</MenuItem>
            <MenuItem value="DENY">반려</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>대상</InputLabel>
          <Select value={targetFilter} label="대상" onChange={(e: SelectChangeEvent<string>) => setTargetFilter(e.target.value as ReportTargetType | 'ALL')}>
            <MenuItem value="ALL">전체</MenuItem>
            <MenuItem value="REVIEW">리뷰</MenuItem>
            <MenuItem value="POST">게시글</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>대상</TableCell>
              <TableCell>참조 ID</TableCell>
              <TableCell>신고자</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>담당자</TableCell>
              <TableCell>설명</TableCell>
              <TableCell>메모</TableCell>
              <TableCell>작업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item: AdminReportResponse) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  <Chip label={targetLabel[item.targetType]} size="small" />
                </TableCell>
                <TableCell>{item.referenceId}</TableCell>
                <TableCell>
                  <Typography variant="body2">{item.reporterName || '-'} ({item.reporterId})</Typography>
                </TableCell>
                <TableCell>
                  <Chip label={statusLabel[item.status]} color={statusColor[item.status]} size="small" />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{item.chargerName || '-'} {item.chargerId ? `(${item.chargerId})` : ''}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.memo || '-'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" size="small" onClick={() => { setSelected(item); setIsEditOpen(true); }}>수정</Button>
                    <Button variant="outlined" color="error" size="small" onClick={() => { setToDelete(item); setDeleteOpen(true); }}>삭제</Button>
                    <Button variant="outlined" size="small" onClick={() => approveMutation.mutate({ id: item.id, chargerId: 1 })}>승인</Button>
                    <Button variant="outlined" size="small" color="warning" onClick={() => rejectMutation.mutate({ id: item.id, chargerId: 1 })}>반려</Button>
                    <Button variant="outlined" size="small" color="success" onClick={() => successMutation.mutate({ id: item.id, chargerId: 1 })}>완료</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {pageInfo && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={pageInfo.totalPages}
            page={pageNum}
            onChange={(_, newPage) => setPageNum(newPage)}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      <CreateReportDialog
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
        loading={createMutation.isPending}
      />

      <EditReportDialog
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={(data) => selected && updateMutation.mutate({ id: selected.id, body: data })}
        loading={updateMutation.isPending}
        initialData={selected || undefined}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => toDelete && deleteMutation.mutate({ id: toDelete.id, deletedBy: 1 })}
        loading={deleteMutation.isPending}
        title="신고 삭제 확인"
        description={toDelete ? `정말로 ID ${toDelete.id} 신고를 삭제하시겠습니까?` : ''}
      />
    </Box>
  );
}

