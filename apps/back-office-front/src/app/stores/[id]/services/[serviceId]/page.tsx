'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import {
  Box,
  Paper,
  Typography,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import {
  storeServiceApi,
  StoreServiceResponse,
  adminWaitingsApi,
  AdminWaitingResponse,
  AdminWaitingCreateRequest,
  AdminWaitingUpdateRequest,
  AdminWaitingStatus,
} from '@repo/api/admin';
import { useQuery, useMutation } from '@tanstack/react-query';

import { queryClient } from '../../../../providers';

export default function StoreServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const storeId = Number(params.id);
  const serviceId = Number(params.serviceId);

  const { data: serviceRes, isLoading, error } = useQuery({
    queryKey: ['store-service-detail', serviceId],
    queryFn: () => storeServiceApi.getStoreServiceDetail(serviceId),
    enabled: !!serviceId,
  });

  const service: StoreServiceResponse | undefined = serviceRes?.data;

  const [page, setPage] = useState(1);
  const { data: waitingPage } = useQuery({
    queryKey: ['admin-waitings-by-store', storeId, page],
    queryFn: () => adminWaitingsApi.list(page, 20, { storeId }),
    enabled: !!storeId && service?.type === 'WAITING',
  });

  const waitings: AdminWaitingResponse[] = waitingPage?.data.list ?? [];
  const pageInfo = waitingPage?.data.pageInfo;

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selected, setSelected] = useState<AdminWaitingResponse | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const createMutation = useMutation({
    mutationFn: (body: AdminWaitingCreateRequest) => adminWaitingsApi.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-waitings-by-store', storeId] });
      setIsCreateOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: AdminWaitingUpdateRequest }) =>
      adminWaitingsApi.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-waitings-by-store', storeId] });
      setIsEditOpen(false);
      setSelected(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminWaitingsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-waitings-by-store', storeId] });
      setIsDeleteOpen(false);
      setSelected(null);
    },
  });

  if (isLoading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>로딩 중...</Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography color="error">상세 정보를 불러오지 못했습니다.</Typography>
      </Paper>
    );
  }

  if (!service) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>서비스 정보를 찾을 수 없습니다.</Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5">스토어 서비스 상세</Typography>
        <Stack direction="row" spacing={1}>
          <Button onClick={() => router.push(`/stores/${storeId}`)}>스토어로 돌아가기</Button>
        </Stack>
      </Stack>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>기본 정보</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
          <Box>
            <Typography variant="body2" color="text.secondary">서비스 ID</Typography>
            <Typography variant="body1">{service.id}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">스토어 ID</Typography>
            <Typography variant="body1">{service.storeId}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">스토어명</Typography>
            <Typography variant="body1">{service.storeName}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">타입</Typography>
            <Chip label={service.type} color={service.type === 'WAITING' ? 'primary' : 'default'} size="small" />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">상태</Typography>
            <Chip label={service.activation ? '활성' : '비활성'} color={service.activation ? 'success' : 'error'} size="small" />
          </Box>
        </Stack>
      </Paper>

      {service.type === 'WAITING' && (
        <>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h6">웨이팅 목록</Typography>
            <Button variant="contained" size="small" onClick={() => setIsCreateOpen(true)}>웨이팅 생성</Button>
          </Stack>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {waitings.map((w) => (
                  <TableRow key={w.id} hover>
                    <TableCell>{w.id}</TableCell>
                    <TableCell>{w.status}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button size="small" onClick={() => router.push(`/waitings/${w.id}`)}>상세</Button>
                        <Button size="small" onClick={() => { setSelected(w); setIsEditOpen(true); }}>수정</Button>
                        <Button size="small" color="error" onClick={() => { setSelected(w); setIsDeleteOpen(true); }}>삭제</Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
            <Button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>이전</Button>
            <Button disabled={(pageInfo?.totalPages ?? 1) <= page} onClick={() => setPage((p) => p + 1)}>다음</Button>
          </Box>

          {/* Create Dialog */}
          <WaitingDialog
            open={isCreateOpen}
            title="웨이팅 생성"
            initial={{ storeId: String(storeId), status: '' }}
            disableStoreId
            onClose={() => setIsCreateOpen(false)}
            onSubmit={(values) => {
              if (!values.status) return;
              const payload: AdminWaitingCreateRequest = { storeId, status: values.status as AdminWaitingStatus };
              createMutation.mutate(payload);
            }}
            loading={createMutation.isPending}
          />

          {/* Edit Dialog */}
          <WaitingDialog
            open={isEditOpen}
            title="웨이팅 수정"
            initial={{ storeId: String(storeId), status: selected?.status ?? '' }}
            disableStoreId
            onClose={() => { setIsEditOpen(false); setSelected(null); }}
            onSubmit={(values) => {
              if (!selected || !values.status) return;
              const payload: AdminWaitingUpdateRequest = { storeId, status: values.status as AdminWaitingStatus };
              updateMutation.mutate({ id: selected.id, body: payload });
            }}
            loading={updateMutation.isPending}
          />

          {/* Delete Confirm */}
          <Dialog open={isDeleteOpen} onClose={() => { setIsDeleteOpen(false); setSelected(null); }}>
            <DialogTitle>삭제 확인</DialogTitle>
            <DialogActions>
              <Button onClick={() => { setIsDeleteOpen(false); setSelected(null); }}>취소</Button>
              <Button color="error" onClick={() => { if (selected) deleteMutation.mutate(selected.id); }} disabled={deleteMutation.isPending}>삭제</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
}

type WaitingFormValues = {
  storeId: string;
  status: string;
};

function WaitingDialog({
  open,
  title,
  initial,
  onClose,
  onSubmit,
  loading,
  disableStoreId,
}: {
  open: boolean;
  title: string;
  initial: WaitingFormValues;
  onClose: () => void;
  onSubmit: (values: WaitingFormValues) => void;
  loading: boolean;
  disableStoreId?: boolean;
}) {
  const [values, setValues] = useState<WaitingFormValues>(initial);
  useEffect(() => { if (open) setValues(initial); }, [open, initial]);

  const STATUS_OPTIONS: AdminWaitingStatus[] = [
    'WAITING_OPEN',
    'IMMEDIATE_ENTRY',
    'PAUSED',
    'WAITING_CLOSE',
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: 'grid', gap: 2, mt: 1 }}>
        <TextField
          label="Store ID"
          value={values.storeId}
          onChange={(e) => setValues((prev) => ({ ...prev, storeId: e.target.value }))}
          fullWidth
          disabled={disableStoreId}
        />
        <FormControl fullWidth>
          <InputLabel id="waiting-status-select">상태</InputLabel>
          <Select
            labelId="waiting-status-select"
            label="상태"
            value={values.status}
            onChange={(e) => setValues((prev) => ({ ...prev, status: e.target.value }))}
          >
            {STATUS_OPTIONS.map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={() => onSubmit(values)} variant="contained" disabled={loading}>
          {loading ? '저장 중...' : '저장'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
