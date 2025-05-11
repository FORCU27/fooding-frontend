'use client';

import { useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { storeApi, AdminStoreResponse, AdminCreateStoreRequest, AdminUpdateStoreRequest } from '@repo/api/stores';
import { useQuery, useMutation } from '@tanstack/react-query';

import { CreateStoreDialog } from './CreateStoreDialog';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { EditStoreDialog } from './EditStoreDialog';
import { queryClient } from '../providers';

export default function StoresPage() {
  const [page, setPage] = useState(0);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<AdminStoreResponse | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState<AdminStoreResponse | null>(null);

  const { data: storesResponse, isLoading } = useQuery({
    queryKey: ['stores', page],
    queryFn: () => storeApi.getStoreList(page),
  });


  const createMutation = useMutation({
    mutationFn: (data: AdminCreateStoreRequest) => storeApi.createStore(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      setIsCreateDialogOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: AdminUpdateStoreRequest }) =>
      storeApi.updateStore({ id, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      setIsEditDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => storeApi.deleteStore(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      setDeleteDialogOpen(false);
      setStoreToDelete(null);
    },
    onSettled: () => {
      setDeleteDialogOpen(false);
      setStoreToDelete(null);
    },
  });

  if (isLoading) return <div>Loading...</div>;

  const stores = storesResponse?.data.list || [];

  const handleDeleteClick = (store: AdminStoreResponse) => {
    setStoreToDelete(store);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (storeToDelete) {
      deleteMutation.mutate(storeToDelete.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setStoreToDelete(null);
        },
        onSettled: () => {
          setDeleteDialogOpen(false);
          setStoreToDelete(null);
        },
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          가게 관리
        </Typography>
        <Button
          variant="contained"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          새 가게 추가
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>도시</TableCell>
              <TableCell>주소</TableCell>
              <TableCell>카테고리</TableCell>
              <TableCell>연락처</TableCell>
              <TableCell>작업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores.map((store: AdminStoreResponse) => (
              <TableRow key={store.id}>
                <TableCell>{store.id}</TableCell>
                <TableCell>{store.name}</TableCell>
                <TableCell>{store.city}</TableCell>
                <TableCell>{store.address}</TableCell>
                <TableCell>{store.category}</TableCell>
                <TableCell>{store.contactNumber}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setSelectedStore(store);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      수정
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteClick(store)}
                    >
                      삭제
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateStoreDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
        loading={createMutation.isPending}
      />

      <EditStoreDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={(data) =>
          selectedStore && updateMutation.mutate({ id: selectedStore.id, body: data })
        }
        loading={updateMutation.isPending}
        initialData={selectedStore || undefined}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleteMutation.isPending}
        title="가게 삭제 확인"
        description={storeToDelete ? `정말로 '${storeToDelete.name}' 가게를 삭제하시겠습니까?` : ''}
      />
    </Box>
  );
} 