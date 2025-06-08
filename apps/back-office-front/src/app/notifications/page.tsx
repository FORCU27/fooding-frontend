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
  Chip,
} from '@mui/material';
import { notificationApi, NotificationResponse } from '@repo/api/admin';
import { useQuery, useMutation } from '@tanstack/react-query';

import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { queryClient } from '../providers';

export default function NotificationsPage() {
  const page = 0;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState<NotificationResponse | null>(
    null,
  );

  const { data: notificationsResponse, isLoading } = useQuery({
    queryKey: ['notifications', page],
    queryFn: () => notificationApi.getNotificationList(page),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => notificationApi.deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      setDeleteDialogOpen(false);
      setNotificationToDelete(null);
    },
    onSettled: () => {
      setDeleteDialogOpen(false);
      setNotificationToDelete(null);
    },
  });

  if (isLoading) return <div>Loading...</div>;

  const notifications = notificationsResponse?.data.list || [];

  const handleDeleteClick = (notification: NotificationResponse) => {
    setNotificationToDelete(notification);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (notificationToDelete) {
      deleteMutation.mutate(notificationToDelete.id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'FAILED':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant='h4' component='h1'>
          알림 관리
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>발신자</TableCell>
              <TableCell>수신자</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>내용</TableCell>
              <TableCell>채널</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>발송일시</TableCell>
              <TableCell>읽은일시</TableCell>
              <TableCell>예약일시</TableCell>
              <TableCell>작업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>{notification.id}</TableCell>
                <TableCell>{notification.source}</TableCell>
                <TableCell>{notification.destinations.join(', ')}</TableCell>
                <TableCell>{notification.title}</TableCell>
                <TableCell>{notification.content}</TableCell>
                <TableCell>
                  <Chip label={notification.channel} size='small' />
                </TableCell>
                <TableCell>
                  <Chip
                    label={notification.status}
                    color={getStatusColor(notification.status)}
                    size='small'
                  />
                </TableCell>
                <TableCell>{new Date(notification.sentAt).toLocaleString()}</TableCell>
                <TableCell>
                  {notification.readAt ? new Date(notification.readAt).toLocaleString() : '-'}
                </TableCell>
                <TableCell>
                  {notification.scheduledAt
                    ? new Date(notification.scheduledAt).toLocaleString()
                    : '-'}
                </TableCell>
                <TableCell>
                  <Button
                    variant='outlined'
                    color='error'
                    size='small'
                    onClick={() => handleDeleteClick(notification)}
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
