'use client';

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
} from '@mui/material';
import { userApi, AdminUserResponse, AdminUpdateUserRequest, AdminCreateUserRequest } from '@repo/api/users';
import { useQuery, useMutation } from '@tanstack/react-query';

import { CreateUserDialog } from './CreateUserDialog';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { EditUserDialog } from './EditUserDialog';
import { queryClient } from '../providers';

export default function UsersPage() {
  const [page, setPage] = useState(0);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUserResponse | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<AdminUserResponse | null>(null);

  const { data: usersResponse, isLoading } = useQuery({
    queryKey: ['users', page],
    queryFn: () => userApi.getUserList(page),
  });

  const createMutation = useMutation({
    mutationFn: (data: AdminCreateUserRequest) => userApi.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsCreateDialogOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: AdminUpdateUserRequest }) =>
      userApi.updateUser({ id, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsEditDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => userApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    },
    onSettled: () => {
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    },
  });

  if (isLoading) return <div>Loading...</div>;

  const users = usersResponse?.data.list || [];

  const handleDeleteClick = (user: AdminUserResponse) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      deleteMutation.mutate(userToDelete.id);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          사용자 관리
        </Typography>
        <Button
          variant="contained"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          사용자 생성
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>이메일</TableCell>
              <TableCell>닉네임</TableCell>
              <TableCell>전화번호</TableCell>
              <TableCell>가입일</TableCell>
              <TableCell>마지막 로그인</TableCell>
              <TableCell>작업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: AdminUserResponse) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.nickname}</TableCell>
                <TableCell>{user.phoneNumber || '-'}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                <TableCell>{user.lastLoggedInAt ? new Date(user.lastLoggedInAt).toLocaleString() : '-'}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setSelectedUser(user);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      수정
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteClick(user)}
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

      <CreateUserDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
        loading={createMutation.isPending}
      />

      <EditUserDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={(data) =>
          selectedUser && updateMutation.mutate({ id: selectedUser.id, body: data })
        }
        loading={updateMutation.isPending}
        initialData={selectedUser || undefined}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleteMutation.isPending}
        title="사용자 삭제 확인"
        description={userToDelete ? `정말로 '${userToDelete.email}' 사용자를 삭제하시겠습니까?` : ''}
      />
    </Box>
  );
}
