import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { AdminCreateNotificationTemplateRequest } from '@repo/api/admin';

import { NotificationTemplateForm } from './NotificationTemplateForm';

interface CreateNotificationTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AdminCreateNotificationTemplateRequest) => void;
  loading?: boolean;
}

export function CreateNotificationTemplateDialog({
  open,
  onClose,
  onSubmit,
  loading = false,
}: CreateNotificationTemplateDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>새 알림 양식 추가</DialogTitle>
      <DialogContent>
        <NotificationTemplateForm onSubmit={onSubmit} isLoading={loading} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
}
