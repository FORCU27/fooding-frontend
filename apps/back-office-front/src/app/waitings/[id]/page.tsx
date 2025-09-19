'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import {
  Box,
  Button,
  Paper,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  adminWaitingsApi,
  adminWaitingSettingsApi,
  AdminWaitingSettingResponse,
  AdminWaitingSettingCreateRequest,
  AdminWaitingSettingUpdateRequest,
} from '@repo/api/admin';
import { useQuery, useMutation } from '@tanstack/react-query';

import { queryClient } from '../../../components/Provider/providers';
import { DeleteConfirmDialog } from '../../stores/DeleteConfirmDialog';

export default function WaitingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const waitingId = Number(params.id);

  const { data: waiting } = useQuery({
    queryKey: ['adminWaitings', waitingId],
    queryFn: () => adminWaitingsApi.get(waitingId),
    enabled: !!waitingId,
  });

  const [page, setPage] = useState(1);
  const { data: settingsPage } = useQuery({
    queryKey: ['adminWaitingSettings', waitingId, page],
    queryFn: () => adminWaitingSettingsApi.list(page, 20, { waitingId }),
    enabled: !!waitingId,
  });

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selected, setSelected] = useState<AdminWaitingSettingResponse | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const createMutation = useMutation({
    mutationFn: (body: AdminWaitingSettingCreateRequest) => adminWaitingSettingsApi.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminWaitingSettings', waitingId] });
      setIsCreateOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: AdminWaitingSettingUpdateRequest }) =>
      adminWaitingSettingsApi.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminWaitingSettings', waitingId] });
      setIsEditOpen(false);
      setSelected(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminWaitingSettingsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminWaitingSettings', waitingId] });
      setIsDeleteOpen(false);
      setSelected(null);
    },
  });

  const settings: AdminWaitingSettingResponse[] = settingsPage?.data.list ?? [];
  const pageInfo = settingsPage?.data.pageInfo;

  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 2 }}>
        <Typography variant='h5'>웨이팅 상세</Typography>
        <Stack direction='row' spacing={1}>
          <Button onClick={() => router.push('/waitings')}>목록</Button>
          <Button variant='contained' onClick={() => setIsCreateOpen(true)}>
            세팅 추가
          </Button>
        </Stack>
      </Stack>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant='subtitle1' gutterBottom>
          기본 정보
        </Typography>
        <Stack direction='row' spacing={4}>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              ID
            </Typography>
            <Typography variant='body1'>{waiting?.data.id}</Typography>
          </Box>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              Store ID
            </Typography>
            <Typography variant='body1'>{waiting?.data.storeId}</Typography>
          </Box>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              Status
            </Typography>
            <Typography variant='body1'>{waiting?.data.status}</Typography>
          </Box>
        </Stack>
      </Paper>

      <Typography variant='h6' sx={{ mb: 1 }}>
        세팅 목록
      </Typography>
      <TableContainer component={Paper} variant='outlined'>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Label</TableCell>
              <TableCell>Min</TableCell>
              <TableCell>Max</TableCell>
              <TableCell>ETA(min)</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Entry Limit</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {settings.map((s) => (
              <TableRow key={s.id} hover>
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.label}</TableCell>
                <TableCell>{s.minimumCapacity ?? '-'}</TableCell>
                <TableCell>{s.maximumCapacity}</TableCell>
                <TableCell>{s.estimatedWaitingTimeMinutes ?? '-'}</TableCell>
                <TableCell>{s.isActive ? 'Y' : 'N'}</TableCell>
                <TableCell>{s.entryTimeLimitMinutes ?? '-'}</TableCell>
                <TableCell align='right'>
                  <Stack direction='row' spacing={1} justifyContent='flex-end'>
                    <Button
                      size='small'
                      onClick={() => {
                        setSelected(s);
                        setIsEditOpen(true);
                      }}
                    >
                      수정
                    </Button>
                    <Button
                      size='small'
                      color='error'
                      onClick={() => {
                        setSelected(s);
                        setIsDeleteOpen(true);
                      }}
                    >
                      삭제
                    </Button>
                  </Stack>
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

      {/* Create */}
      <SettingDialog
        open={isCreateOpen}
        title='세팅 추가'
        initial={{
          label: '',
          minimumCapacity: '',
          maximumCapacity: '',
          estimatedWaitingTimeMinutes: '',
          isActive: false,
          entryTimeLimitMinutes: '',
        }}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={(v) => {
          const payload: AdminWaitingSettingCreateRequest = {
            waitingId,
            label: v.label,
            minimumCapacity: v.minimumCapacity === '' ? undefined : Number(v.minimumCapacity),
            maximumCapacity: Number(v.maximumCapacity),
            estimatedWaitingTimeMinutes:
              v.estimatedWaitingTimeMinutes === ''
                ? undefined
                : Number(v.estimatedWaitingTimeMinutes),
            isActive: v.isActive,
            entryTimeLimitMinutes:
              v.entryTimeLimitMinutes === '' ? undefined : Number(v.entryTimeLimitMinutes),
          };
          createMutation.mutate(payload);
        }}
        loading={createMutation.isPending}
      />

      {/* Edit */}
      <SettingDialog
        open={isEditOpen}
        title='세팅 수정'
        initial={{
          label: selected?.label ?? '',
          minimumCapacity: selected?.minimumCapacity?.toString() ?? '',
          maximumCapacity: selected?.maximumCapacity?.toString() ?? '',
          estimatedWaitingTimeMinutes: selected?.estimatedWaitingTimeMinutes?.toString() ?? '',
          isActive: !!selected?.isActive,
          entryTimeLimitMinutes: selected?.entryTimeLimitMinutes?.toString() ?? '',
        }}
        onClose={() => {
          setIsEditOpen(false);
          setSelected(null);
        }}
        onSubmit={(v) => {
          if (!selected) return;
          const payload: AdminWaitingSettingUpdateRequest = {
            waitingId,
            label: v.label,
            minimumCapacity: Number(v.minimumCapacity || 0),
            maximumCapacity: Number(v.maximumCapacity || 0),
            estimatedWaitingTimeMinutes: Number(v.estimatedWaitingTimeMinutes || 0),
            isActive: v.isActive,
            entryTimeLimitMinutes: Number(v.entryTimeLimitMinutes || 0),
          };
          updateMutation.mutate({ id: selected.id, body: payload });
        }}
        loading={updateMutation.isPending}
      />

      <DeleteConfirmDialog
        open={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelected(null);
        }}
        onConfirm={() => {
          if (selected) deleteMutation.mutate(selected.id);
        }}
        loading={deleteMutation.isPending}
        title='삭제 확인'
        description='이 설정을 삭제하시겠습니까?'
      />
    </Box>
  );
}

type SettingValues = {
  label: string;
  minimumCapacity: string;
  maximumCapacity: string;
  estimatedWaitingTimeMinutes: string;
  isActive: boolean;
  entryTimeLimitMinutes: string;
};

function SettingDialog({
  open,
  title,
  initial,
  onClose,
  onSubmit,
  loading,
}: {
  open: boolean;
  title: string;
  initial: SettingValues;
  onClose: () => void;
  onSubmit: (values: SettingValues) => void;
  loading: boolean;
}) {
  const [values, setValues] = useState<SettingValues>(initial);
  useEffect(() => {
    if (open) setValues(initial);
  }, [open, initial]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: 'grid', gap: 2, mt: 1 }}>
        <TextField
          label='Label'
          value={values.label}
          onChange={(e) => setValues((v) => ({ ...v, label: e.target.value }))}
          fullWidth
        />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label='Min'
            value={values.minimumCapacity}
            onChange={(e) => setValues((v) => ({ ...v, minimumCapacity: e.target.value }))}
            fullWidth
          />
          <TextField
            label='Max'
            value={values.maximumCapacity}
            onChange={(e) => setValues((v) => ({ ...v, maximumCapacity: e.target.value }))}
            fullWidth
          />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label='ETA(min)'
            value={values.estimatedWaitingTimeMinutes}
            onChange={(e) =>
              setValues((v) => ({ ...v, estimatedWaitingTimeMinutes: e.target.value }))
            }
            fullWidth
          />
          <TextField
            label='Entry Limit'
            value={values.entryTimeLimitMinutes}
            onChange={(e) => setValues((v) => ({ ...v, entryTimeLimitMinutes: e.target.value }))}
            fullWidth
          />
        </Stack>
        <FormControlLabel
          control={
            <Switch
              checked={values.isActive}
              onChange={(e) => setValues((v) => ({ ...v, isActive: e.target.checked }))}
            />
          }
          label='Active'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={() => onSubmit(values)} variant='contained' disabled={loading}>
          {loading ? '저장 중...' : '저장'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
