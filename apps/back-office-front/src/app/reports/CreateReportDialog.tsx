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
import { AdminCreateReportRequest, ReportTargetType } from '@repo/api/admin';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AdminCreateReportRequest) => void;
  loading: boolean;
}

export function CreateReportDialog({ open, onClose, onSubmit, loading }: Props) {
  const [form, setForm] = useState<AdminCreateReportRequest>({
    referenceId: 0,
    targetType: 'REVIEW',
    description: '',
    memo: '',
    reporterId: 0,
  });

  const handleClose = () => {
    setForm({ referenceId: 0, targetType: 'REVIEW', description: '', memo: '', reporterId: 0 });
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>신고 생성</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>대상</InputLabel>
              <Select
                label="대상"
                value={form.targetType}
                onChange={(e) => setForm((prev) => ({ ...prev, targetType: e.target.value as ReportTargetType }))}
              >
                <MenuItem value="REVIEW">리뷰</MenuItem>
                <MenuItem value="POST">게시글</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="참조 ID"
              type="number"
              value={form.referenceId}
              onChange={(e) => setForm((prev) => ({ ...prev, referenceId: Number(e.target.value) }))}
              required
              fullWidth
            />

            <TextField
              label="신고자 ID"
              type="number"
              value={form.reporterId}
              onChange={(e) => setForm((prev) => ({ ...prev, reporterId: Number(e.target.value) }))}
              required
              fullWidth
            />

            <TextField
              label="설명"
              multiline
              rows={3}
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              required
              fullWidth
            />

            <TextField
              label="메모"
              multiline
              rows={2}
              value={form.memo}
              onChange={(e) => setForm((prev) => ({ ...prev, memo: e.target.value }))}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? '생성 중...' : '생성'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

