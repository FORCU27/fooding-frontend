import { useState, useEffect } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { AdminUpdateReviewRequest, AdminReviewResponse, VisitPurposeType } from '@repo/api/admin';

interface EditReviewDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AdminUpdateReviewRequest) => void;
  loading: boolean;
  initialData?: AdminReviewResponse;
}

const visitPurposeOptions: { value: VisitPurposeType; label: string }[] = [
  { value: 'BUSINESS', label: '업무' },
  { value: 'FAMILY', label: '가족' },
  { value: 'DATE', label: '데이트' },
  { value: 'FRIEND', label: '친구' },
  { value: 'ALONE', label: '혼자' },
  { value: 'EVENT', label: '이벤트' },
  { value: 'MEETING', label: '모임' },
];

export function EditReviewDialog({ open, onClose, onSubmit, loading, initialData }: EditReviewDialogProps) {
  const [formData, setFormData] = useState({
    serviceScore: 0,
    moodScore: 0,
    tasteScore: 0,
    totalScore: 0,
    content: '',
    visitPurposeType: 'BUSINESS' as VisitPurposeType,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        serviceScore: initialData.serviceScore,
        moodScore: initialData.moodScore,
        tasteScore: initialData.tasteScore,
        totalScore: initialData.totalScore,
        content: initialData.content,
        visitPurposeType: initialData.visitPurposeType,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleClose = () => {
    onClose();
  };

  const calculateTotalScore = () => {
    const total = (formData.serviceScore + formData.moodScore + formData.tasteScore) / 3;
    setFormData(prev => ({ ...prev, totalScore: Math.round(total * 10) / 10 }));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>리뷰 수정</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <Box>
              <Typography variant="body2" color="textSecondary">
                작성자 ID: {initialData?.writerId} | 가게 ID: {initialData?.storeId}
              </Typography>
            </Box>

            <Box>
              <Typography component="legend">서비스 점수</Typography>
              <Rating
                value={formData.serviceScore}
                onChange={(_, newValue) => {
                  setFormData(prev => ({ ...prev, serviceScore: newValue || 0 }));
                  setTimeout(calculateTotalScore, 0);
                }}
                precision={0.5}
              />
              <Typography variant="caption">({formData.serviceScore}점)</Typography>
            </Box>

            <Box>
              <Typography component="legend">분위기 점수</Typography>
              <Rating
                value={formData.moodScore}
                onChange={(_, newValue) => {
                  setFormData(prev => ({ ...prev, moodScore: newValue || 0 }));
                  setTimeout(calculateTotalScore, 0);
                }}
                precision={0.5}
              />
              <Typography variant="caption">({formData.moodScore}점)</Typography>
            </Box>

            <Box>
              <Typography component="legend">맛 점수</Typography>
              <Rating
                value={formData.tasteScore}
                onChange={(_, newValue) => {
                  setFormData(prev => ({ ...prev, tasteScore: newValue || 0 }));
                  setTimeout(calculateTotalScore, 0);
                }}
                precision={0.5}
              />
              <Typography variant="caption">({formData.tasteScore}점)</Typography>
            </Box>

            <Box>
              <Typography component="legend">총점</Typography>
              <Rating
                value={formData.totalScore}
                readOnly
                precision={0.1}
              />
              <Typography variant="caption">({formData.totalScore}점)</Typography>
            </Box>

            <FormControl fullWidth>
              <InputLabel>방문목적</InputLabel>
              <Select
                value={formData.visitPurposeType}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  visitPurposeType: e.target.value as VisitPurposeType 
                }))}
                label="방문목적"
              >
                {visitPurposeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="리뷰 내용"
              multiline
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? '수정 중...' : '수정'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}