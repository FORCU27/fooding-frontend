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
  Pagination,
  Alert,
  CircularProgress,
  Link,
} from '@mui/material';
import {
  AdminCreateUserRequest,
  AdminUpdateUserRequest,
  AdminUserResponse,
  userApi,
} from '@repo/api/admin';
import { useQuery, useMutation } from '@tanstack/react-query';

import { DeleteConfirmDialog } from '@/app/notifications/DeleteConfirmDialog';
import { queryClient } from '@/app/providers';
import { CreateUserDialog } from '@/app/users/CreateUserDialog';
import { EditUserDialog } from '@/app/users/EditUserDialog';

type Role = 'USER' | 'CEO' | 'ADMIN';

const roleMap: Record<Role, { queryKey: string; label: string }> = {
  USER: { queryKey: 'users', label: '유저' },
  CEO: { queryKey: 'ceos', label: '점주' },
  ADMIN: { queryKey: 'managers', label: '관리자' },
};

export default function UserList({ role }: { role: Role }) {
  const [page, setPage] = useState(1);
  const size = 10;
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUserResponse | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<AdminUserResponse | null>(null);

  const queryKey = [roleMap[role].queryKey ?? 'unknown', page];
  const roleName = roleMap[role].label;
  const { data: usersResponse, isLoading, error } = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const result = await userApi.getUserList({
          page,
          size,
          role,
        });
        return result;
      } catch (err) {
        console.error('Error in queryFn:', err);
        throw err;
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: AdminCreateUserRequest) => userApi.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      setIsCreateDialogOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: AdminUpdateUserRequest }) =>
      userApi.updateUser({ id, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      setIsEditDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => userApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    },
    onSettled: () => {
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    },
  });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    console.error('UserList Error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    });
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          사용자 목록을 불러오는 중 오류가 발생했습니다.
          <br />
          에러: {error.message}
        </Alert>
      </Box>
    );
  }

  const users = usersResponse?.data.list || [];
  const pageInfo = usersResponse?.data.pageInfo;

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
        <Typography variant='h4' component='h1'>
          {roleName} 관리
        </Typography>
        <Button variant='contained' onClick={() => setIsCreateDialogOpen(true)}>
          {roleName} 생성
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
              <TableCell>성별</TableCell>
              <TableCell>가입방식</TableCell>
              <TableCell>가입일</TableCell>
              <TableCell>마지막 로그인</TableCell>
              <TableCell>작업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: AdminUserResponse) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <Link 
                    href={`/users/${user.id}`} 
                    underline="hover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.email}
                  </Link>
                </TableCell>
                <TableCell>{user.nickname || '-'}</TableCell>
                <TableCell>{user.phoneNumber || '-'}</TableCell>
                <TableCell>
                  {user.gender === 'NONE' ? '-' : user.gender === 'MALE' ? '남성' : '여성'}
                </TableCell>
                <TableCell>
                  {user.provider === 'GOOGLE' ? '구글' : 
                   user.provider === 'FOODING' ? '푸딩' : 
                   user.provider === 'APPLE' ? '애플' : 
                   user.provider === 'KAKAO' ? '카카오' : user.provider}
                </TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  {user.lastLoggedInAt ? new Date(user.lastLoggedInAt).toLocaleString() : '-'}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant='outlined'
                      size='small'
                      onClick={() => {
                        setSelectedUser(user);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      수정
                    </Button>
                    <Button
                      variant='outlined'
                      color='error'
                      size='small'
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

      {pageInfo && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={pageInfo.totalPages}
            page={page}
            onChange={(_, newPage) => setPage(newPage)}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      <CreateUserDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
        loading={createMutation.isPending}
        role={role}
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
        title={`${roleName} 삭제 확인`}
        description={
          userToDelete ? `정말로 '${userToDelete.email}' ${roleName}를 삭제하시겠습니까?` : ''
        }
      />
    </Box>
  );
}
