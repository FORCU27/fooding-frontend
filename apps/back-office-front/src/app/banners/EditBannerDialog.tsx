'use client';

import { useState, useEffect } from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Box,
} from '@mui/material';
import { AdminBannerUpdateRequest } from '@repo/api/admin';

interface Banner {
  id: string;
  name: string;
  description: string;
  active: boolean;
  priority: number;
  link?: string;
  linkType: 'INTERNAL' | 'EXTERNAL';
}

interface EditBannerDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AdminBannerUpdateRequest) => void;
  loading?: boolean;
  initialData?: Banner;
}

export function EditBannerDialog({ open, onClose, onSubmit, loading, initialData }: EditBannerDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    active: true,
    priority: 0,
    link: '',
    linkType: 'INTERNAL' as 'INTERNAL' | 'EXTERNAL',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData && open) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        active: initialData.active,
        priority: initialData.priority,
        link: initialData.link || '',
        linkType: initialData.linkType,
      });
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '이름은 필수입니다';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = '설명은 필수입니다';
    }

    if (formData.priority < 0) {
      newErrors.priority = '우선순위는 0 이상이어야 합니다';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        ...formData,
        link: formData.link.trim() || undefined,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      active: true,
      priority: 0,
      link: '',
      linkType: 'INTERNAL',
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>배너 수정</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="이름"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              required
            />
            
            <TextField
              label="설명"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              error={!!errors.description}
              helperText={errors.description}
              fullWidth
              multiline
              rows={3}
              required
            />

            <TextField
              label="우선순위"
              type="number"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
              error={!!errors.priority}
              helperText={errors.priority}
              fullWidth
              required
            />

            <FormControl fullWidth>
              <InputLabel>링크 타입</InputLabel>
              <Select
                value={formData.linkType}
                label="링크 타입"
                onChange={(e) => setFormData({ ...formData, linkType: e.target.value as 'INTERNAL' | 'EXTERNAL' })}
              >
                <MenuItem value="INTERNAL">내부</MenuItem>
                <MenuItem value="EXTERNAL">외부</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="링크"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              fullWidth
              placeholder={formData.linkType === 'EXTERNAL' ? 'https://example.com' : '/path'}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                />
              }
              label="활성화"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            취소
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? '저장 중...' : '저장'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
