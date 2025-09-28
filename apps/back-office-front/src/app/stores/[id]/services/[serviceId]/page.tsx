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
  adminWaitingSettingsApi,
  AdminWaitingSettingResponse,
  AdminWaitingSettingCreateRequest,
  AdminWaitingSettingUpdateRequest,
  adminStoreWaitingsApi,
  AdminStoreWaitingResponse,
  AdminStoreWaitingCreateRequest,
  AdminStoreWaitingUpdateRequest,
} from '@repo/api/admin';
import { useQuery, useMutation } from '@tanstack/react-query';

import { queryClient } from '../../../../../components/Provider/providers';

export default function StoreServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const storeId = Number(params.id);
  const serviceId = Number(params.serviceId);

  const {
    data: serviceRes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['store-service-detail', serviceId],
    queryFn: () => storeServiceApi.getStoreServiceDetail(serviceId),
    enabled: !!serviceId,
  });

  const service: StoreServiceResponse | undefined = serviceRes?.data;

  const [page, setPage] = useState(1);
  const { data: waitingSettingsPage } = useQuery({
    queryKey: ['admin-waiting-settings-by-service', serviceId, page],
    queryFn: () => adminWaitingSettingsApi.list(page, 20, { storeServiceId: serviceId }),
    enabled: !!serviceId && service?.type === 'WAITING',
  });

  const waitingSettings: AdminWaitingSettingResponse[] = waitingSettingsPage?.data.list ?? [];
  const pageInfo = waitingSettingsPage?.data.pageInfo;

  const [waitingPage, setWaitingPage] = useState(1);
  const { data: storeWaitingsPage } = useQuery({
    queryKey: ['admin-store-waitings', storeId, waitingPage],
    queryFn: () => adminStoreWaitingsApi.list(waitingPage, 20, { storeId }),
    enabled: !!storeId && service?.type === 'WAITING',
  });

  const storeWaitings: AdminStoreWaitingResponse[] = storeWaitingsPage?.data.list ?? [];
  const waitingPageInfo = storeWaitingsPage?.data.pageInfo;


  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selected, setSelected] = useState<AdminWaitingSettingResponse | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [isWaitingCreateOpen, setIsWaitingCreateOpen] = useState(false);
  const [isWaitingEditOpen, setIsWaitingEditOpen] = useState(false);
  const [selectedWaiting, setSelectedWaiting] = useState<AdminStoreWaitingResponse | null>(null);
  const [isWaitingDeleteOpen, setIsWaitingDeleteOpen] = useState(false);

  const createMutation = useMutation({
    mutationFn: (body: AdminWaitingSettingCreateRequest) => adminWaitingSettingsApi.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-waiting-settings-by-service', serviceId] });
      setIsCreateOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: AdminWaitingSettingUpdateRequest }) =>
      adminWaitingSettingsApi.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-waiting-settings-by-service', serviceId] });
      setIsEditOpen(false);
      setSelected(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => adminWaitingSettingsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-waiting-settings-by-service', serviceId] });
      setIsDeleteOpen(false);
      setSelected(null);
    },
  });

  const createWaitingMutation = useMutation({
    mutationFn: (body: AdminStoreWaitingCreateRequest) => adminStoreWaitingsApi.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-store-waitings', storeId] });
      setIsWaitingCreateOpen(false);
    },
  });

  const updateWaitingMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: AdminStoreWaitingUpdateRequest }) =>
      adminStoreWaitingsApi.update(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-store-waitings', storeId] });
      setIsWaitingEditOpen(false);
      setSelectedWaiting(null);
    },
  });

  const deleteWaitingMutation = useMutation({
    mutationFn: (id: number) => adminStoreWaitingsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-store-waitings', storeId] });
      setIsWaitingDeleteOpen(false);
      setSelectedWaiting(null);
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
        <Typography color='error'>상세 정보를 불러오지 못했습니다.</Typography>
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
      <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 2 }}>
        <Typography variant='h5'>스토어 서비스 상세</Typography>
        <Stack direction='row' spacing={1}>
          <Button onClick={() => router.push(`/stores/${storeId}`)}>스토어로 돌아가기</Button>
        </Stack>
      </Stack>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant='subtitle1' gutterBottom>
          기본 정보
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              서비스 ID
            </Typography>
            <Typography variant='body1'>{service.id}</Typography>
          </Box>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              스토어 ID
            </Typography>
            <Typography variant='body1'>{service.storeId}</Typography>
          </Box>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              스토어명
            </Typography>
            <Typography variant='body1'>{service.storeName}</Typography>
          </Box>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              타입
            </Typography>
            <Chip
              label={service.type}
              color={service.type === 'WAITING' ? 'primary' : 'default'}
              size='small'
            />
          </Box>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              상태
            </Typography>
            <Chip
              label={service.activation ? '활성' : '비활성'}
              color={service.activation ? 'success' : 'error'}
              size='small'
            />
          </Box>
        </Stack>
      </Paper>

      {service.type === 'WAITING' && (
        <>
          <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Typography variant='h6'>웨이팅 세팅 목록</Typography>
            <Button variant='contained' size='small' onClick={() => setIsCreateOpen(true)}>
              웨이팅 세팅 생성
            </Button>
          </Stack>
          <TableContainer component={Paper} variant='outlined'>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>라벨</TableCell>
                  <TableCell>최소 수용인원</TableCell>
                  <TableCell>최대 수용인원</TableCell>
                  <TableCell>예상 대기시간(분)</TableCell>
                  <TableCell>입장 제한시간(분)</TableCell>
                  <TableCell>상태</TableCell>
                  <TableCell>활성화</TableCell>
                  <TableCell align='right'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {waitingSettings.map((setting) => (
                  <TableRow key={setting.id} hover>
                    <TableCell>{setting.id}</TableCell>
                    <TableCell>{setting.label}</TableCell>
                    <TableCell>{setting.minimumCapacity ?? '-'}</TableCell>
                    <TableCell>{setting.maximumCapacity}</TableCell>
                    <TableCell>{setting.estimatedWaitingTimeMinutes ?? '-'}</TableCell>
                    <TableCell>{setting.entryTimeLimitMinutes ?? '-'}</TableCell>
                    <TableCell>
                      <Chip
                        label={setting.status}
                        color={
                          setting.status === 'WAITING_OPEN' ? 'success' :
                          setting.status === 'WAITING_CLOSE' ? 'error' :
                          setting.status === 'PAUSED' ? 'warning' : 'default'
                        }
                        size='small'
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={setting.isActive ? '활성' : '비활성'}
                        color={setting.isActive ? 'success' : 'error'}
                        size='small'
                      />
                    </TableCell>
                    <TableCell align='right'>
                      <Stack direction='row' spacing={1} justifyContent='flex-end'>
                        <Button
                          size='small'
                          onClick={() => {
                            setSelected(setting);
                            setIsEditOpen(true);
                          }}
                        >
                          수정
                        </Button>
                        <Button
                          size='small'
                          color='error'
                          onClick={() => {
                            setSelected(setting);
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

          {/* Create Dialog */}
          <WaitingSettingDialog
            open={isCreateOpen}
            title='웨이팅 세팅 생성'
            initial={{
              waitingId: serviceId,
              label: '',
              minimumCapacity: undefined,
              maximumCapacity: 0,
              estimatedWaitingTimeMinutes: undefined,
              isActive: true,
              entryTimeLimitMinutes: undefined,
              status: 'WAITING_CLOSE',
            }}
            onClose={() => setIsCreateOpen(false)}
            onSubmit={(values) => {
              const payload: AdminWaitingSettingCreateRequest = {
                storeServiceId: serviceId,
                label: values.label,
                minimumCapacity: values.minimumCapacity || undefined,
                maximumCapacity: values.maximumCapacity,
                estimatedWaitingTimeMinutes: values.estimatedWaitingTimeMinutes || undefined,
                isActive: values.isActive,
                entryTimeLimitMinutes: values.entryTimeLimitMinutes || undefined,
                status: values.status,
              };
              createMutation.mutate(payload);
            }}
            loading={createMutation.isPending}
          />

          {/* Edit Dialog */}
          <WaitingSettingDialog
            open={isEditOpen}
            title='웨이팅 세팅 수정'
            initial={{
              waitingId: serviceId,
              label: selected?.label ?? '',
              minimumCapacity: selected?.minimumCapacity ?? 0,
              maximumCapacity: selected?.maximumCapacity ?? 0,
              estimatedWaitingTimeMinutes: selected?.estimatedWaitingTimeMinutes ?? 0,
              isActive: selected?.isActive ?? true,
              entryTimeLimitMinutes: selected?.entryTimeLimitMinutes ?? 0,
              status: selected?.status ?? 'WAITING_CLOSE',
            }}
            onClose={() => {
              setIsEditOpen(false);
              setSelected(null);
            }}
            onSubmit={(values) => {
              if (!selected) return;
              const payload: AdminWaitingSettingUpdateRequest = {
                storeServiceId: serviceId,
                label: values.label,
                minimumCapacity: values.minimumCapacity ?? 0,
                maximumCapacity: values.maximumCapacity,
                estimatedWaitingTimeMinutes: values.estimatedWaitingTimeMinutes ?? 0,
                isActive: values.isActive,
                entryTimeLimitMinutes: values.entryTimeLimitMinutes ?? 0,
                status: values.status,
              };
              updateMutation.mutate({ id: selected.id, body: payload });
            }}
            loading={updateMutation.isPending}
          />

          {/* Delete Confirm */}
          <Dialog
            open={isDeleteOpen}
            onClose={() => {
              setIsDeleteOpen(false);
              setSelected(null);
            }}
          >
            <DialogTitle>삭제 확인</DialogTitle>
            <DialogActions>
              <Button
                onClick={() => {
                  setIsDeleteOpen(false);
                  setSelected(null);
                }}
              >
                취소
              </Button>
              <Button
                color='error'
                onClick={() => {
                  if (selected) deleteMutation.mutate(selected.id);
                }}
                disabled={deleteMutation.isPending}
              >
                삭제
              </Button>
            </DialogActions>
          </Dialog>

          {/* Store Waitings Section */}
          <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1, mt: 4 }}>
            <Typography variant='h6'>웨이팅 요청 목록</Typography>
            <Button variant='contained' size='small' onClick={() => setIsWaitingCreateOpen(true)}>
              웨이팅 요청 생성
            </Button>
          </Stack>
          <TableContainer component={Paper} variant='outlined'>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>사용자 ID</TableCell>
                  <TableCell>채널</TableCell>
                  <TableCell>성인</TableCell>
                  <TableCell>유아</TableCell>
                  <TableCell>유아용 의자</TableCell>
                  <TableCell>메모</TableCell>
                  <TableCell>생성일</TableCell>
                  <TableCell align='right'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {storeWaitings.map((waiting) => (
                  <TableRow key={waiting.id} hover>
                    <TableCell>{waiting.id}</TableCell>
                    <TableCell>{waiting.userId ?? '-'}</TableCell>
                    <TableCell>
                      <Chip
                        label={waiting.channel}
                        color={waiting.channel === 'ONLINE' ? 'primary' : 'default'}
                        size='small'
                      />
                    </TableCell>
                    <TableCell>{waiting.adultCount}</TableCell>
                    <TableCell>{waiting.infantCount}</TableCell>
                    <TableCell>{waiting.infantChairCount}</TableCell>
                    <TableCell>{waiting.memo ?? '-'}</TableCell>
                    <TableCell>{new Date(waiting.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell align='right'>
                      <Stack direction='row' spacing={1} justifyContent='flex-end'>
                        <Button
                          size='small'
                          onClick={() => {
                            setSelectedWaiting(waiting);
                            setIsWaitingEditOpen(true);
                          }}
                        >
                          수정
                        </Button>
                        <Button
                          size='small'
                          color='error'
                          onClick={() => {
                            setSelectedWaiting(waiting);
                            setIsWaitingDeleteOpen(true);
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
            <Button disabled={waitingPage <= 1} onClick={() => setWaitingPage((p) => Math.max(1, p - 1))}>
              이전
            </Button>
            <Button
              disabled={(waitingPageInfo?.totalPages ?? 1) <= waitingPage}
              onClick={() => setWaitingPage((p) => p + 1)}
            >
              다음
            </Button>
          </Box>

          {/* Store Waiting Create Dialog */}
          <StoreWaitingDialog
            open={isWaitingCreateOpen}
            title='웨이팅 요청 생성'
            initial={{
              userId: undefined,
              storeId: storeId,
              status: 'WAITING',
              channel: 'ONLINE',
              infantChairCount: 0,
              infantCount: 0,
              adultCount: 1,
              memo: '',
            }}
            onClose={() => setIsWaitingCreateOpen(false)}
            onSubmit={(values) => {
              const payload: AdminStoreWaitingCreateRequest = {
                userId: values.userId,
                storeId: values.storeId,
                status: values.status,
                channel: values.channel,
                infantChairCount: values.infantChairCount,
                infantCount: values.infantCount,
                adultCount: values.adultCount,
                memo: values.memo,
              };
              createWaitingMutation.mutate(payload);
            }}
            loading={createWaitingMutation.isPending}
          />

          {/* Store Waiting Edit Dialog */}
          <StoreWaitingDialog
            open={isWaitingEditOpen}
            title='웨이팅 요청 수정'
            initial={{
              userId: selectedWaiting?.userId ?? undefined,
              storeId: selectedWaiting?.storeId ?? storeId,
              status: selectedWaiting?.status ?? 'WAITING',
              channel: selectedWaiting?.channel ?? 'ONLINE',
              infantChairCount: selectedWaiting?.infantChairCount ?? 0,
              infantCount: selectedWaiting?.infantCount ?? 0,
              adultCount: selectedWaiting?.adultCount ?? 1,
              memo: selectedWaiting?.memo ?? '',
            }}
            onClose={() => {
              setIsWaitingEditOpen(false);
              setSelectedWaiting(null);
            }}
            onSubmit={(values) => {
              if (!selectedWaiting) return;
              const payload: AdminStoreWaitingUpdateRequest = {
                userId: values.userId,
                storeId: values.storeId,
                status: values.status,
                channel: values.channel,
                infantChairCount: values.infantChairCount,
                infantCount: values.infantCount,
                adultCount: values.adultCount,
                memo: values.memo,
              };
              updateWaitingMutation.mutate({ id: selectedWaiting.id, body: payload });
            }}
            loading={updateWaitingMutation.isPending}
          />

          {/* Store Waiting Delete Confirm */}
          <Dialog
            open={isWaitingDeleteOpen}
            onClose={() => {
              setIsWaitingDeleteOpen(false);
              setSelectedWaiting(null);
            }}
          >
            <DialogTitle>삭제 확인</DialogTitle>
            <DialogActions>
              <Button
                onClick={() => {
                  setIsWaitingDeleteOpen(false);
                  setSelectedWaiting(null);
                }}
              >
                취소
              </Button>
              <Button
                color='error'
                onClick={() => {
                  if (selectedWaiting) deleteWaitingMutation.mutate(selectedWaiting.id);
                }}
                disabled={deleteWaitingMutation.isPending}
              >
                삭제
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
}

type WaitingSettingFormValues = {
  waitingId: number;
  label: string;
  minimumCapacity?: number;
  maximumCapacity: number;
  estimatedWaitingTimeMinutes?: number;
  isActive: boolean;
  entryTimeLimitMinutes?: number;
  status: string;
};

type StoreWaitingFormValues = {
  userId?: number;
  storeId: number;
  status: string;
  channel: string;
  infantChairCount: number;
  infantCount: number;
  adultCount: number;
  memo?: string;
};

function WaitingSettingDialog({
  open,
  title,
  initial,
  onClose,
  onSubmit,
  loading,
}: {
  open: boolean;
  title: string;
  initial: WaitingSettingFormValues;
  onClose: () => void;
  onSubmit: (values: WaitingSettingFormValues) => void;
  loading: boolean;
}) {
  const [values, setValues] = useState<WaitingSettingFormValues>(initial);
  useEffect(() => {
    if (open) setValues(initial);
  }, [open, initial]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: 'grid', gap: 2, mt: 1 }}>
        <TextField
          label='라벨'
          value={values.label}
          onChange={(e) => setValues((prev) => ({ ...prev, label: e.target.value }))}
          fullWidth
          required
        />
        <TextField
          label='최소 수용인원'
          type='number'
          value={values.minimumCapacity || ''}
          onChange={(e) => setValues((prev) => ({ ...prev, minimumCapacity: e.target.value ? Number(e.target.value) : undefined }))}
          fullWidth
        />
        <TextField
          label='최대 수용인원'
          type='number'
          value={values.maximumCapacity}
          onChange={(e) => setValues((prev) => ({ ...prev, maximumCapacity: Number(e.target.value) }))}
          fullWidth
          required
        />
        <TextField
          label='예상 대기시간(분)'
          type='number'
          value={values.estimatedWaitingTimeMinutes || ''}
          onChange={(e) => setValues((prev) => ({ ...prev, estimatedWaitingTimeMinutes: e.target.value ? Number(e.target.value) : undefined }))}
          fullWidth
        />
        <TextField
          label='입장 제한시간(분)'
          type='number'
          value={values.entryTimeLimitMinutes || ''}
          onChange={(e) => setValues((prev) => ({ ...prev, entryTimeLimitMinutes: e.target.value ? Number(e.target.value) : undefined }))}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id='status-select'>상태</InputLabel>
          <Select
            labelId='status-select'
            label='상태'
            value={values.status}
            onChange={(e) => setValues((prev) => ({ ...prev, status: e.target.value }))}
          >
            <MenuItem value="WAITING_OPEN">웨이팅 오픈</MenuItem>
            <MenuItem value="WAITING_CLOSE">웨이팅 클로즈</MenuItem>
            <MenuItem value="PAUSED">일시정지</MenuItem>
            <MenuItem value="IMMEDIATE_ENTRY">즉시 입장</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id='is-active-select'>활성화</InputLabel>
          <Select
            labelId='is-active-select'
            label='활성화'
            value={values.isActive}
            onChange={(e) => setValues((prev) => ({ ...prev, isActive: e.target.value === 'true' }))}
          >
            <MenuItem value="true">활성</MenuItem>
            <MenuItem value="false">비활성</MenuItem>
          </Select>
        </FormControl>
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

function StoreWaitingDialog({
  open,
  title,
  initial,
  onClose,
  onSubmit,
  loading,
}: {
  open: boolean;
  title: string;
  initial: StoreWaitingFormValues;
  onClose: () => void;
  onSubmit: (values: StoreWaitingFormValues) => void;
  loading: boolean;
}) {
  const [values, setValues] = useState<StoreWaitingFormValues>(initial);
  useEffect(() => {
    if (open) setValues(initial);
  }, [open, initial]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: 'grid', gap: 2, mt: 1 }}>
        <TextField
          label='사용자 ID'
          type='number'
          value={values.userId || ''}
          onChange={(e) => setValues((prev) => ({ ...prev, userId: e.target.value ? Number(e.target.value) : undefined }))}
          fullWidth
        />
        <TextField
          label='스토어 ID'
          type='number'
          value={values.storeId}
          onChange={(e) => setValues((prev) => ({ ...prev, storeId: Number(e.target.value) }))}
          fullWidth
          required
        />
        <FormControl fullWidth>
          <InputLabel id='status-select'>상태</InputLabel>
          <Select
            labelId='status-select'
            label='상태'
            value={values.status}
            onChange={(e) => setValues((prev) => ({ ...prev, status: e.target.value }))}
          >
            <MenuItem value="WAITING">대기중</MenuItem>
            <MenuItem value="SEATED">입장완료</MenuItem>
            <MenuItem value="CANCELLED">취소됨</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id='channel-select'>채널</InputLabel>
          <Select
            labelId='channel-select'
            label='채널'
            value={values.channel}
            onChange={(e) => setValues((prev) => ({ ...prev, channel: e.target.value }))}
          >
            <MenuItem value="ONLINE">온라인</MenuItem>
            <MenuItem value="IN_PERSON">현장</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label='성인 수'
          type='number'
          value={values.adultCount}
          onChange={(e) => setValues((prev) => ({ ...prev, adultCount: Number(e.target.value) }))}
          fullWidth
          required
        />
        <TextField
          label='유아 수'
          type='number'
          value={values.infantCount}
          onChange={(e) => setValues((prev) => ({ ...prev, infantCount: Number(e.target.value) }))}
          fullWidth
        />
        <TextField
          label='유아용 의자 개수'
          type='number'
          value={values.infantChairCount}
          onChange={(e) => setValues((prev) => ({ ...prev, infantChairCount: Number(e.target.value) }))}
          fullWidth
        />
        <TextField
          label='메모'
          value={values.memo || ''}
          onChange={(e) => setValues((prev) => ({ ...prev, memo: e.target.value }))}
          fullWidth
          multiline
          rows={3}
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
