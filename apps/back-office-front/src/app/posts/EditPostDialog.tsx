import { useState, useEffect } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  Box,
  Stack,
} from '@mui/material';
import { AdminUpdatePostRequest, AdminPostResponse, PostType } from '@repo/api/admin';

interface EditPostDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AdminUpdatePostRequest) => void;
  loading?: boolean;
  initialData: AdminPostResponse | null;
}

export function EditPostDialog({ open, onClose, onSubmit, loading, initialData }: EditPostDialogProps) {
  const [formData, setFormData] = useState<AdminUpdatePostRequest>({
    title: '',
    content: '',
    type: 'NOTICE',
    isVisibleOnHomepage: true,
    isVisibleOnPos: false,
    isVisibleOnCeo: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        content: initialData.content,
        type: initialData.type,
        isVisibleOnHomepage: initialData.isVisibleOnHomepage,
        isVisibleOnPos: initialData.isVisibleOnPos,
        isVisibleOnCeo: initialData.isVisibleOnCeo,
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

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>게시글 수정</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="제목"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              fullWidth
              slotProps={{ htmlInput: { maxLength: 50 } }}
              helperText={`${formData.title.length}/50`}
            />

            <TextField
              label="내용"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              required
              multiline
              rows={6}
              fullWidth
            />

            <FormControl>
              <FormLabel>게시글 타입</FormLabel>
              <RadioGroup
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as PostType }))}
                row
              >
                <FormControlLabel value="NOTICE" control={<Radio />} label="공지사항" />
                <FormControlLabel value="EVENT" control={<Radio />} label="이벤트" />
              </RadioGroup>
            </FormControl>

            <Box>
              <FormLabel component="legend" sx={{ mb: 2 }}>노출 설정</FormLabel>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <FormLabel>홈페이지 노출</FormLabel>
                  <Switch
                    checked={formData.isVisibleOnHomepage}
                    onChange={(e) => setFormData(prev => ({ ...prev, isVisibleOnHomepage: e.target.checked }))}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <FormLabel>POS 노출</FormLabel>
                  <Switch
                    checked={formData.isVisibleOnPos}
                    onChange={(e) => setFormData(prev => ({ ...prev, isVisibleOnPos: e.target.checked }))}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <FormLabel>CEO앱 노출</FormLabel>
                  <Switch
                    checked={formData.isVisibleOnCeo}
                    onChange={(e) => setFormData(prev => ({ ...prev, isVisibleOnCeo: e.target.checked }))}
                  />
                </Box>
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            취소
          </Button>
          <Button type="submit" variant="contained" disabled={loading || !formData.title || !formData.content}>
            수정
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
