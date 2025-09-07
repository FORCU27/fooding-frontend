'use client';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';

import { ArrowBack, Edit, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Paper,
  Typography,
  Chip,
  Stack,
} from '@mui/material';
import {
  AdminUserResponse,
  AdminUpdateUserRequest,
  userApi,
} from '@repo/api/admin';
import { useQuery, useMutation } from '@tanstack/react-query';

import { queryClient } from '../../providers';
import { DeleteConfirmDialog } from '../DeleteConfirmDialog';
import { EditUserDialog } from '../EditUserDialog';

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const userId = Number(params.id);
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUserResponse | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<AdminUserResponse | null>(null);

  const { data: userResponse, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userApi.getUser(userId),
    enabled: !!userId,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: AdminUpdateUserRequest }) =>
      userApi.updateUser({ id, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsEditDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => userApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      router.push('/users');
    },
  });

  const handleDeleteClick = (user: AdminUserResponse) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      deleteMutation.mutate(userToDelete.id);
    }
  };

  console.log(error);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;
  if (!userResponse?.data) return <div>User not found</div>;


  const user = userResponse.data;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '정보 없음';
    return new Date(dateString).toLocaleString('ko-KR');
  };

  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'MALE': return '남성';
      case 'FEMALE': return '여성';
      case 'NONE': return '미선택';
      default: return gender;
    }
  };

  const getProviderText = (provider: string) => {
    switch (provider) {
      case 'GOOGLE': return 'Google';
      case 'FOODING': return 'Fooding';
      case 'APPLE': return 'Apple';
      case 'KAKAO': return 'Kakao';
      default: return provider;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* 헤더 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.push('/users')}
          variant="outlined"
        >
          목록으로
        </Button>
        <Typography variant="h4" component="h1">
          {user.nickname || user.email}
        </Typography>
        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Edit />}
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
            startIcon={<Delete />}
            onClick={() => handleDeleteClick(user)}
          >
            삭제
          </Button>
        </Box>
      </Box>

      {/* 기본 정보 */}
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            기본 정보
          </Typography>
          <Stack spacing={2}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                사용자 ID
              </Typography>
              <Typography variant="body1">{user.id}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                이메일
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                닉네임
              </Typography>
              <Typography variant="body1">{user.nickname || '미설정'}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                전화번호
              </Typography>
              <Typography variant="body1">{user.phoneNumber || '미설정'}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                성별
              </Typography>
              <Typography variant="body1">{getGenderText(user.gender)}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                가입 경로
              </Typography>
              <Chip label={getProviderText(user.provider)} color="primary" />
            </Box>
          </Stack>
        </Paper>

        {/* 약관 동의 정보 */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            약관 동의
          </Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                이용약관 동의
              </Typography>
              <Chip 
                label={user.termsAgreed ? '동의' : '미동의'} 
                color={user.termsAgreed ? 'success' : 'default'} 
                size="small"
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                개인정보처리방침 동의
              </Typography>
              <Chip 
                label={user.privacyPolicyAgreed ? '동의' : '미동의'} 
                color={user.privacyPolicyAgreed ? 'success' : 'default'} 
                size="small"
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                마케팅 수신 동의
              </Typography>
              <Chip 
                label={user.marketingConsent ? '동의' : '미동의'} 
                color={user.marketingConsent ? 'success' : 'default'} 
                size="small"
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                푸시 알림 동의
              </Typography>
              <Chip 
                label={user.pushAgreed ? '동의' : '미동의'} 
                color={user.pushAgreed ? 'success' : 'default'} 
                size="small"
              />
            </Box>
          </Stack>
        </Paper>

        {/* 활동 정보 */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            활동 정보
          </Typography>
          <Stack spacing={2}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                가입일
              </Typography>
              <Typography variant="body1">{formatDate(user.createdAt)}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                마지막 로그인
              </Typography>
              <Typography variant="body1">{formatDate(user.lastLoggedInAt)}</Typography>
            </Box>
          </Stack>
        </Paper>
      </Stack>

      {/* 수정 다이얼로그 */}
      <EditUserDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={(data) =>
          selectedUser && updateMutation.mutate({ id: selectedUser.id, body: data })
        }
        loading={updateMutation.isPending}
        initialData={selectedUser || undefined}
      />

      {/* 삭제 확인 다이얼로그 */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleteMutation.isPending}
        title="사용자 삭제 확인"
        description={userToDelete ? `정말로 '${userToDelete.nickname || userToDelete.email}' 사용자를 삭제하시겠습니까?` : ''}
      />
    </Box>
  );
}
