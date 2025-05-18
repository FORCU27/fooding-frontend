import { useState, useEffect } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import { AdminUserResponse, AdminUpdateUserRequest } from '@repo/api/users';

interface EditUserDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AdminUpdateUserRequest) => void;
  loading: boolean;
  initialData?: AdminUserResponse;
}

export function EditUserDialog({
  open,
  onClose,
  onSubmit,
  loading,
  initialData,
}: EditUserDialogProps) {
  const [formData, setFormData] = useState<AdminUpdateUserRequest>({
    nickname: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nickname: initialData.nickname,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>사용자 정보 수정</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="닉네임"
              value={formData.nickname}
              onChange={(e) =>
                setFormData({ ...formData, nickname: e.target.value })
              }
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>취소</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? '저장 중...' : '저장'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 