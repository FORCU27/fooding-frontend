'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextField,
  Button,
  Stack,
  Box,
} from '@mui/material';
import { AdminNotificationTemplateResponse, AdminCreateNotificationTemplateRequest } from '@repo/api/admin';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// 스키마 정의
const NotificationTemplateSchema = z.object({
  subject: z.string().min(1, '제목을 입력해주세요'),
  content: z.string().min(1, '내용을 입력해주세요'),
  type: z.string().min(1, '타입을 선택해주세요'),
//   isActive: z.boolean(),
});

interface NotificationTemplateFormProps {
  initialData?: AdminNotificationTemplateResponse;
  onSubmit: (data: AdminCreateNotificationTemplateRequest) => void;
  isLoading?: boolean;
}

export function NotificationTemplateForm({ initialData, onSubmit, isLoading }: NotificationTemplateFormProps) {
  const form = useForm<AdminCreateNotificationTemplateRequest>({
    resolver: zodResolver(NotificationTemplateSchema),
    defaultValues: initialData || {
      subject: '',
      content: '',
      type: '',
    //   isActive: true,
    },
  });

  return (
    <Box component='form' onSubmit={form.handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label='제목'
          error={!!form.formState.errors.subject}
          helperText={form.formState.errors.subject?.message}
          {...form.register('subject')}
        />

        <TextField
          fullWidth
          label='내용'
          multiline
          rows={4}
          error={!!form.formState.errors.content}
          helperText={form.formState.errors.content?.message}
          {...form.register('content')}
        />

        <TextField
          fullWidth
          label='타입'
          error={!!form.formState.errors.content}
          helperText={form.formState.errors.content?.message}
          {...form.register('type')}
        />

        <Button type='submit' variant='contained' disabled={isLoading} fullWidth>
          {isLoading ? '저장 중...' : '저장'}
        </Button>
      </Stack>
    </Box>
  );
}
