'use client';

import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import {
  Box,
  Button,
  Paper,
  Typography,
  Stack,
  Chip,
  Grid,
} from '@mui/material';
import { notificationTemplateApi } from '@repo/api/admin';
import { useQuery } from '@tanstack/react-query';


export default function NotificationTemplateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: templateResponse, isLoading } = useQuery({
    queryKey: ['notification-template', id],
    queryFn: () => notificationTemplateApi.getNotificationTemplate(id),
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
          <Grid component='div'>
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
                <Typography variant="h6">{template.subject}</Typography>
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
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
