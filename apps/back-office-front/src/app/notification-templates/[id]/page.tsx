'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import {
  Box,
  Button,
  Paper,
  Typography,
  Stack,
  Chip,
  Divider,
  Grid,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { notificationTemplateApi, AdminNotificationTemplateResponse } from '@repo/api/admin';

export default function NotificationTemplateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: templateResponse, isLoading } = useQuery({
    queryKey: ['notification-template', id],
    queryFn: () => notificationTemplateApi.getById(id),
  });

  const template = templateResponse?.data;

  if (isLoading) return <div>Loading...</div>;
  if (!template) return <div>알림 양식을 찾을 수 없습니다.</div>;

  const handleEdit = () => {
    router.push(`/notification-templates/${id}/edit`);
  };

  const handleBack = () => {
    router.push('/notification-templates');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant='h4' component='h1'>
          알림 양식 상세
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant='outlined' onClick={handleBack}>
            목록으로
          </Button>
          <Button variant='contained' onClick={handleEdit}>
            수정
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  ID
                </Typography>
                <Typography variant="body1">{template.id}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  제목
                </Typography>
                <Typography variant="h6">{template.title}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  알림 타입
                </Typography>
                <Chip
                  label={template.type}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  활성화 상태
                </Typography>
                <Chip
                  label={template.isActive ? '활성' : '비활성'}
                  color={template.isActive ? 'success' : 'default'}
                  size="small"
                />
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  생성일
                </Typography>
                <Typography variant="body1">
                  {new Date(template.createdAt).toLocaleString()}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  수정일
                </Typography>
                <Typography variant="body1">
                  {new Date(template.updatedAt).toLocaleString()}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                내용
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {template.content}
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
