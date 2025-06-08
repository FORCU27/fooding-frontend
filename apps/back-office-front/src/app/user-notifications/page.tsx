'use client';

import { useState } from 'react';

import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
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
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  userNotificationApi,
  UserNotificationResponse,
  CreateUserNotificationRequest,
} from '@repo/api/admin';
import { useQuery, useMutation } from '@tanstack/react-query';

import { CreateNotificationDialog } from './CreateNotificationDialog';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { queryClient } from '../providers';

export default function UserNotificationsPage() {
  const page = 0;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState<UserNotificationResponse | null>(
    null,
  );

  const { data: notificationsResponse, isLoading } = useQuery({
    queryKey: ['user-notifications', page],
    queryFn: () => userNotificationApi.getUserNotificationList(page),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateUserNotificationRequest) =>
      userNotificationApi.createUserNotification(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-notifications'] });
      setCreateDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => userNotificationApi.deleteUserNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-notifications'] });
      setDeleteDialogOpen(false);
      setNotificationToDelete(null);
    },
    onSettled: () => {
      setDeleteDialogOpen(false);
      setNotificationToDelete(null);
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id: number) => userNotificationApi.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-notifications'] });
    },
  });

  if (isLoading) return <div>Loading...</div>;

  const notifications = notificationsResponse?.data.list || [];

  const handleDeleteClick = (notification: UserNotificationResponse) => {
    setNotificationToDelete(notification);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (notificationToDelete) {
      deleteMutation.mutate(notificationToDelete.id);
    }
  };

  const handleMarkAsRead = (id: number) => {
    markAsReadMutation.mutate(id);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant='h4' component='h1'>
          사용자 알림 관리
        </Typography>
        <Button variant='contained' onClick={() => setCreateDialogOpen(true)}>
          알림 생성
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>사용자 ID</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>내용</TableCell>
              <TableCell>카테고리</TableCell>
              <TableCell>읽음 여부</TableCell>
              <TableCell>발송일시</TableCell>
              <TableCell>작업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((notification: UserNotificationResponse) => (
              <TableRow key={notification.id}>
                <TableCell>{notification.id}</TableCell>
                <TableCell>{notification.userId}</TableCell>
                <TableCell>{notification.title}</TableCell>
                <TableCell>{notification.content}</TableCell>
                <TableCell>
                  <Chip
                    label={notification.category === 'NOTIFICATION' ? '알림' : '이벤트'}
                    size='small'
                    color={notification.category === 'NOTIFICATION' ? 'primary' : 'success'}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={notification.read ? '읽음' : '안읽음'}
                    color={notification.read ? 'success' : 'default'}
                    size='small'
                  />
                </TableCell>
                <TableCell>{new Date(notification.sentAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {!notification.read && (
                      <Tooltip title='읽음 처리'>
                        <IconButton
                          size='small'
                          onClick={() => handleMarkAsRead(notification.id)}
                          disabled={markAsReadMutation.isPending}
                        >
                          <MarkEmailReadIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Button
                      variant='outlined'
                      color='error'
                      size='small'
                      onClick={() => handleDeleteClick(notification)}
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

      <CreateNotificationDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
        loading={createMutation.isPending}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleteMutation.isPending}
        title='알림 삭제 확인'
        description={
          notificationToDelete
            ? `정말로 '${notificationToDelete.title}' 알림을 삭제하시겠습니까?`
            : ''
        }
      />
    </Box>
  );
}
