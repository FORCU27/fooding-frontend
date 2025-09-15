import { useEffect, useState } from 'react';

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
import { AdminReportResponse, AdminUpdateReportRequest, ReportStatus } from '@repo/api/admin';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AdminUpdateReportRequest) => void;
  loading: boolean;
  initialData?: AdminReportResponse;
}

export function EditReportDialog({ open, onClose, onSubmit, loading, initialData }: Props) {
  const [form, setForm] = useState<AdminUpdateReportRequest>({ memo: '', status: undefined, chargerId: undefined });

  useEffect(() => {
    if (initialData) {
      setForm({
        memo: initialData.memo ?? '',
        status: initialData.status,
        chargerId: initialData.chargerId ?? undefined,
      });
    }
  }, [initialData]);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>신고 수정</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>상태</InputLabel>
              <Select
                label="상태"
                value={(form.status as ReportStatus) || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as ReportStatus }))}
              >
                <MenuItem value="REPORTED">접수</MenuItem>
                <MenuItem value="PROCESS">진행</MenuItem>
                <MenuItem value="SUCCESS">완료</MenuItem>
                <MenuItem value="DENY">반려</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="담당자 ID"
              type="number"
              value={form.chargerId ?? ''}
              onChange={(e) => setForm((prev) => ({ ...prev, chargerId: Number(e.target.value) }))}
              fullWidth
            />

            <TextField
              label="메모"
              multiline
              rows={3}
              value={form.memo ?? ''}
              onChange={(e) => setForm((prev) => ({ ...prev, memo: e.target.value }))}
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

