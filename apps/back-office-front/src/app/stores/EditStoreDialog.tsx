import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { AdminStoreResponse, AdminUpdateStoreRequest } from '@repo/api/stores';

import { StoreForm } from './StoreForm';

interface EditStoreDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AdminUpdateStoreRequest) => void;
  loading?: boolean;
  initialData?: AdminStoreResponse;
}

export function EditStoreDialog({ open, onClose, onSubmit, loading = false, initialData }: EditStoreDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>가게 수정</DialogTitle>
      <DialogContent>
        {initialData && (
          <StoreForm initialData={initialData} onSubmit={onSubmit} isLoading={loading} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>취소</Button>
      </DialogActions>
    </Dialog>
  );
} 