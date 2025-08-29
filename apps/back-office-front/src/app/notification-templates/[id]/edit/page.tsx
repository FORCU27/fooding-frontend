'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  Box,
  Button,
  Paper,
  Typography,
  Stack,
} from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';

import { NotificationTemplateForm } from '../../NotificationTemplateForm';
import { queryClient } from '../../../providers';

import { notificationTemplateApi, AdminNotificationTemplateResponse, AdminUpdateNotificationTemplateRequest } from '@repo/api/admin';

export default function EditNotificationTemplatePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: templateResponse, isLoading } = useQuery({
    queryKey: ['notification-template', id],
    queryFn: () => notificationTemplateApi.getById(id),
  });

  const updateMutation = useMutation({
    mutationFn: (data: AdminUpdateNotificationTemplateRequest) =>
      notificationTemplateApi.updateNotificationTemplate({ id, body: data }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['notification-template', id] });
      queryClient.invalidateQueries({ queryKey: ['notification-templates'] });
      router.push(`/notification-templates/${id}`);
    },
  });

  const template = templateResponse?.data;

  if (isLoading) return <div>Loading...</div>;
  if (!template) return <div>알림 양식을 찾을 수 없습니다.</div>;

  const handleSubmit = (data: AdminUpdateNotificationTemplateRequest) => {
    updateMutation.mutate(data);
  };

  const handleCancel = () => {
    router.push(`/notification-templates/${id}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant='h4' component='h1'>
          알림 양식 수정
        </Typography>
        <Button variant='outlined' onClick={handleCancel}>
          취소
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <NotificationTemplateForm
          initialData={template}
          onSubmit={handleSubmit}
          isLoading={updateMutation.isPending}
        />
      </Paper>
    </Box>
  );
}
