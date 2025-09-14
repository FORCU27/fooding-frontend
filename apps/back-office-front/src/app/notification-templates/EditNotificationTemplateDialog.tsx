import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { AdminNotificationTemplateResponse, AdminUpdateNotificationTemplateRequest } from '@repo/api/admin';

import { NotificationTemplateForm } from './NotificationTemplateForm';

interface EditNotificationTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AdminUpdateNotificationTemplateRequest) => void;
  loading?: boolean;
  initialData?: AdminNotificationTemplateResponse;
}

export function EditNotificationTemplateDialog({
  open,
  onClose,
  onSubmit,
  loading = false,
  initialData,
}: EditNotificationTemplateDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>알림 양식 수정</DialogTitle>
      <DialogContent>
        {initialData && (
          <NotificationTemplateForm initialData={initialData} onSubmit={onSubmit} isLoading={loading} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
}
