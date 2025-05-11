import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { AdminCreateStoreRequest } from '@repo/api/stores';

import { StoreForm } from './StoreForm';

interface CreateStoreDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AdminCreateStoreRequest) => void;
  loading?: boolean;
}

export function CreateStoreDialog({ open, onClose, onSubmit, loading = false }: CreateStoreDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>새 가게 추가</DialogTitle>
      <DialogContent>
        <StoreForm onSubmit={onSubmit} isLoading={loading} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>취소</Button>
      </DialogActions>
    </Dialog>
  );
} 