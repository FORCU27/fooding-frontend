'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  Stack,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';

import {
  adminWaitingsApi,
  AdminWaitingResponse,
  AdminWaitingCreateRequest,
  AdminWaitingUpdateRequest,
  AdminWaitingStatus,
} from '@repo/api/admin';

import { queryClient } from '../providers';
import { DeleteConfirmDialog } from '../stores/DeleteConfirmDialog';

const STATUS_OPTIONS: AdminWaitingStatus[] = [
  'WAITING_OPEN',
  'IMMEDIATE_ENTRY',
  'PAUSED',
  'WAITING_CLOSE',
];

export default function AdminWaitingsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [storeIdFilter, setStoreIdFilter] = useState<number | ''>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selected, setSelected] = useState<AdminWaitingResponse | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ['adminWaitings', page, storeIdFilter || undefined, statusFilter || undefined],
    queryFn: () =>
      adminWaitingsApi.list(page, 20, {
        storeId: storeIdFilter === '' ? undefined : Number(storeIdFilter),
        status: statusFilter || undefined,
      }),
  });

  const createMutation = useMutation({
    mutationFn: (body: AdminWaitingCreateRequest) => adminWaitingsApi.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminWaitings'] });
      setIsCreateOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: AdminWaitingUpdateRequest }) =>
      adminWaitingsApi.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminWaitings'] });
      setIsEditOpen(false);
      setSelected(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminWaitingsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminWaitings'] });
      setIsDeleteOpen(false);
      setSelected(null);
    },
  });

  const list: AdminWaitingResponse[] = data?.data.list ?? [];
  const pageInfo = data?.data.pageInfo;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">웨이팅 관리</Typography>
        <Button variant="contained" onClick={() => setIsCreateOpen(true)}>웨이팅 생성</Button>
      </Box>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
          label="Store ID"
          size="small"
          value={storeIdFilter}
          onChange={(e) => {
            const val = e.target.value;
            const n = Number(val);
            setStoreIdFilter(val === '' ? '' : isNaN(n) ? '' : n);
            setPage(1);
          }}
          sx={{ width: 160 }}
        />
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="waiting-status">상태</InputLabel>
          <Select
            labelId="waiting-status"
            label="상태"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          >
            <MenuItem value="">전체</MenuItem>
            {STATUS_OPTIONS.map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Store ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item) => (
              <TableRow
                key={item.id}
                hover
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  router.push(`/waitings/${item.id}`);
                }}
              >
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.storeId}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button size="small" onClick={() => { setSelected(item); setIsEditOpen(true); }}>수정</Button>
                    <Button size="small" color="error" onClick={() => { setSelected(item); setIsDeleteOpen(true); }}>삭제</Button>
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
        initial={{ storeId: '', status: '' }}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={(values) => {
          if (!values.storeId || !values.status) return;
          const payload: AdminWaitingCreateRequest = { storeId: Number(values.storeId), status: values.status as AdminWaitingStatus };
          createMutation.mutate(payload);
        }}
        loading={createMutation.isPending}
      />

      {/* Edit Dialog */}
      <WaitingDialog
        open={isEditOpen}
        title="웨이팅 수정"
        initial={{ storeId: selected?.storeId?.toString() ?? '', status: selected?.status ?? '' }}
        onClose={() => { setIsEditOpen(false); setSelected(null); }}
        onSubmit={(values) => {
          if (!selected) return;
          if (!values.storeId || !values.status) return;
          const payload: AdminWaitingUpdateRequest = { storeId: Number(values.storeId), status: values.status as AdminWaitingStatus };
          updateMutation.mutate({ id: selected.id, body: payload });
        }}
        loading={updateMutation.isPending}
      />

      <DeleteConfirmDialog
        open={isDeleteOpen}
        onClose={() => { setIsDeleteOpen(false); setSelected(null); }}
        onConfirm={() => { if (selected) deleteMutation.mutate(selected.id); }}
        loading={deleteMutation.isPending}
        title="삭제 확인"
        description="해당 웨이팅을 삭제하시겠습니까?"
      />
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
}: {
  open: boolean;
  title: string;
  initial: WaitingFormValues;
  onClose: () => void;
  onSubmit: (values: WaitingFormValues) => void;
  loading: boolean;
}) {
  const [values, setValues] = useState<WaitingFormValues>(initial);
  
  // keep initial in sync when opening with different row
  React.useEffect(() => {
    if (open) setValues(initial);
  }, [open, initial]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: 'grid', gap: 2, mt: 1 }}>
        <TextField
          label="Store ID"
          value={values.storeId}
          onChange={(e) => setValues((prev) => ({ ...prev, storeId: e.target.value }))}
          fullWidth
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
