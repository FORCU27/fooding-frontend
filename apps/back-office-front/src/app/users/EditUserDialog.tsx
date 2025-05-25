import { useState, useEffect } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
    phoneNumber: '',
    gender: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nickname: initialData.nickname || '',
        phoneNumber: initialData.phoneNumber || '',
        gender: initialData.gender,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>사용자 정보 수정</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label='닉네임'
              value={formData.nickname}
              onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
              required
            />
            <TextField
              label='전화번호'
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
            <FormControl required>
              <InputLabel id='gender-select-label'>성별</InputLabel>
              <Select
                labelId='gender-select-label'
                value={formData.gender ?? 'NONE'}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                required
              >
                <MenuItem value={'NONE'}>NONE</MenuItem>
                <MenuItem value={'MALE'}>MALE</MenuItem>
                <MenuItem value={'FEMALE'}>FEMALE</MenuItem>
                <MenuItem value={'OTHER'}>OTHER</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>취소</Button>
          <Button type='submit' variant='contained' disabled={loading}>
            {loading ? '저장 중...' : '저장'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
