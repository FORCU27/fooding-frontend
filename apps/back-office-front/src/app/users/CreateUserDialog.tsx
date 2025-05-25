import { useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { AdminCreateUserRequest } from '@repo/api/users';

interface CreateUserDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AdminCreateUserRequest) => void;
  loading: boolean;
  role: string;
}

export function CreateUserDialog({
  open,
  onClose,
  onSubmit,
  loading,
  role,
}: CreateUserDialogProps) {
  const [formData, setFormData] = useState<AdminCreateUserRequest>({
    email: '',
    password: '',
    nickname: '',
    phoneNumber: '',
    gender: 'NONE',
    role,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>사용자 생성</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label='이메일'
              type='email'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <TextField
              label='비밀번호'
              type='password'
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
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
              placeholder='010-1234-5678'
            />
            <FormControl required>
              <InputLabel id='gender-select-label'>성별</InputLabel>
              <Select
                labelId='gender-select-label'
                label='성별'
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
            {loading ? '생성 중...' : '생성'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
