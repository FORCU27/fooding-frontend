import { useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { CreateUserNotificationRequest, UserNotificationType } from '@repo/api/admin';
import { userApi } from '@repo/api/admin';
import { useQuery } from '@tanstack/react-query';

interface CreateNotificationDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateUserNotificationRequest) => void;
  loading: boolean;
}

export function CreateNotificationDialog({
  open,
  onClose,
  onSubmit,
  loading,
}: CreateNotificationDialogProps) {
  const [formData, setFormData] = useState<CreateUserNotificationRequest>({
    userId: 0,
    title: '',
    content: '',
    category: UserNotificationType.NOTIFICATION,
  });

  const { data: usersResponse } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      userApi.getUserList({
        page: 0,
        size: 100,
      }),
    enabled: open, // 다이얼로그가 열릴 때만 조회
  });

  const users = usersResponse?.data.list || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>알림 생성</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl required>
              <InputLabel id='user-select-label'>사용자</InputLabel>
              <Select
                labelId='user-select-label'
                value={formData.userId || ''}
                label='사용자'
                onChange={(e) => setFormData({ ...formData, userId: Number(e.target.value) })}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.nickname} ({user.email})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl required>
              <InputLabel id='category-select-label'>카테고리</InputLabel>
              <Select
                labelId='category-select-label'
                value={formData.category}
                label='카테고리'
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <MenuItem value={UserNotificationType.NOTIFICATION}>알림</MenuItem>
                <MenuItem value={UserNotificationType.EVENT}>이벤트</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label='제목'
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <TextField
              label='내용'
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              multiline
              rows={4}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>취소</Button>
          <Button type='submit' variant='contained' disabled={loading}>
            {loading ? '생성 중...' : '생성'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
