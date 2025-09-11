import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
  Chip,
  Alert,
  CircularProgress,
  Stack,
} from '@mui/material';
import { StoreServiceResponse, CreateStoreServiceRequest, storeServiceApi } from '@repo/api/admin';
import { useQuery, useMutation } from '@tanstack/react-query';

import { CreateStoreServiceDialog } from './CreateStoreServiceDialog';
import { queryClient } from '../../providers';
import { DeleteConfirmDialog } from '../DeleteConfirmDialog';

interface StoreServiceManagementProps {
  storeId: number;
}

const serviceTypeMap = {
  WAITING: '웨이팅',
  REWARD: '리워드',
};

export default function StoreServiceManagement({ storeId }: StoreServiceManagementProps) {
  const router = useRouter();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<StoreServiceResponse | null>(null);

  const queryKey = ['store-services', storeId];

  const {
    data: servicesResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const result = await storeServiceApi.getStoreServiceList({
          storeId,
        });
        return result;
      } catch (err) {
        console.error('Error fetching store services:', err);
        throw err;
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateStoreServiceRequest) => storeServiceApi.createStoreService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      setIsCreateDialogOpen(false);
    },
  });

  const activateMutation = useMutation({
    mutationFn: (id: number) => storeServiceApi.activateStoreService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const inactivateMutation = useMutation({
    mutationFn: (id: number) => storeServiceApi.inactivateStoreService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id, deletedBy }: { id: number; deletedBy: number }) =>
      storeServiceApi.deleteStoreService({ id, deletedBy }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      setDeleteDialogOpen(false);
      setServiceToDelete(null);
    },
    onSettled: () => {
      setDeleteDialogOpen(false);
      setServiceToDelete(null);
    },
  });

  const handleDeleteClick = (service: StoreServiceResponse) => {
    setServiceToDelete(service);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (serviceToDelete) {
      deleteMutation.mutate({ id: serviceToDelete.id, deletedBy: 1 }); // TODO: 실제 관리자 ID로 변경
    }
  };

  const handleToggleActivation = (service: StoreServiceResponse) => {
    if (service.activation) {
      inactivateMutation.mutate(service.id);
    } else {
      activateMutation.mutate(service.id);
    }
  };

  if (isLoading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}
        >
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3 }}>
        <Alert severity='error'>
          서비스 목록을 불러오는 중 오류가 발생했습니다.
          <br />
          에러: {error.message}
        </Alert>
      </Paper>
    );
  }

  const services = servicesResponse?.data.list || [];

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant='h6'>스토어 서비스 관리</Typography>
        <Button variant='contained' onClick={() => setIsCreateDialogOpen(true)}>
          서비스 등록
        </Button>
      </Box>

      {services.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant='body1' color='text.secondary'>
            등록된 서비스가 없습니다.
          </Typography>
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>서비스 타입</TableCell>
                <TableCell>상태</TableCell>
                <TableCell>가입일</TableCell>
                <TableCell>해지일</TableCell>
                <TableCell>작업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service: StoreServiceResponse) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <Chip
                      label={serviceTypeMap[service.type]}
                      color='primary'
                      variant='outlined'
                      onClick={() => router.push(`/stores/${storeId}/services/${service.id}`)}
                      sx={{ cursor: 'pointer' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={service.activation ? '활성' : '비활성'}
                      color={service.activation ? 'success' : 'error'}
                      size='small'
                    />
                  </TableCell>
                  <TableCell>{new Date(service.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {service.endedAt ? new Date(service.endedAt).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>
                    <Stack direction='row' spacing={1}>
                      <Button
                        variant='outlined'
                        size='small'
                        onClick={() => router.push(`/stores/${storeId}/services/${service.id}`)}
                      >
                        상세
                      </Button>
                      <Button
                        variant='outlined'
                        size='small'
                        color={service.activation ? 'warning' : 'success'}
                        onClick={() => handleToggleActivation(service)}
                        disabled={activateMutation.isPending || inactivateMutation.isPending}
                      >
                        {service.activation ? '비활성화' : '활성화'}
                      </Button>
                      <Button
                        variant='outlined'
                        color='error'
                        size='small'
                        onClick={() => handleDeleteClick(service)}
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
      )}

      <CreateStoreServiceDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={(data) => createMutation.mutate({ ...data, storeId })}
        loading={createMutation.isPending}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleteMutation.isPending}
        title='서비스 삭제 확인'
        description={
          serviceToDelete
            ? `정말로 '${serviceTypeMap[serviceToDelete.type]}' 서비스를 삭제하시겠습니까?`
            : ''
        }
      />
    </Paper>
  );
}
