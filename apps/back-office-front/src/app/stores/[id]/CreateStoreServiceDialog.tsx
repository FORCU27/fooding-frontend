import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
} from '@mui/material';
import { CreateStoreServiceRequest, StoreServiceType } from '@repo/api/admin';

interface CreateStoreServiceDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<CreateStoreServiceRequest, 'storeId'>) => void;
  loading: boolean;
}

const serviceTypeOptions: { value: StoreServiceType; label: string }[] = [
  { value: 'WAITING', label: '웨이팅' },
  { value: 'REWARD', label: '리워드' },
];

export function CreateStoreServiceDialog({ 
  open, 
  onClose, 
  onSubmit, 
  loading 
}: CreateStoreServiceDialogProps) {
  const [formData, setFormData] = useState({
    type: 'WAITING' as StoreServiceType,
    userId: 1, // TODO: 실제 관리자 ID로 변경
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData({
      type: 'WAITING',
      userId: 1,
    });
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>스토어 서비스 등록</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <FormControl fullWidth required>
              <InputLabel>서비스 타입</InputLabel>
              <Select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  type: e.target.value as StoreServiceType 
                }))}
                label="서비스 타입"
              >
                {serviceTypeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="등록자 ID"
              type="number"
              value={formData.userId}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                userId: Number(e.target.value) 
              }))}
              required
              fullWidth
              helperText="서비스를 등록하는 관리자의 ID를 입력하세요"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? '등록 중...' : '등록'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}