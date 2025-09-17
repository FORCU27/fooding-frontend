'use client';

import NextLink from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import type React from 'react';

import { ArrowBack, Edit as EditIcon, Delete as DeleteIcon, OpenInFull } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  AdminBannerUpdateRequest,
  bannerApi,
} from '@repo/api/admin';
import { useMutation, useQuery } from '@tanstack/react-query';

import { queryClient } from '../../providers';
import { DeleteConfirmDialog } from '../DeleteConfirmDialog';
import { EditBannerDialog } from '../EditBannerDialog';

export default function BannerDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const bannerId = params?.id ?? '';

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  const {
    data: bannerResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['banner', bannerId],
    queryFn: () => bannerApi.retrieve(bannerId),
    enabled: Boolean(bannerId),
    staleTime: 5_000,
  });

  const banner = bannerResponse?.data;

  const updateMutation = useMutation({
    mutationFn: (payload: AdminBannerUpdateRequest) => bannerApi.update(bannerId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banner', bannerId] });
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      setIsEditDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => bannerApi.delete(bannerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      router.push('/banners');
    },
  });

  if (!bannerId) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity='error'>유효하지 않은 배너입니다.</Alert>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>배너 정보를 불러오는 중입니다...</Typography>
      </Box>
    );
  }

  if (isError || !banner) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity='error'>배너 정보를 불러오지 못했습니다.</Alert>
      </Box>
    );
  }

  const renderParameters = () => {
    if (!banner.parameters || Object.keys(banner.parameters as Record<string, unknown>).length === 0) {
      return <Typography variant='body2'>파라미터 없음</Typography>;
    }

    return (
      <Box
        component='pre'
        sx={{
          p: 2,
          borderRadius: 1,
          bgcolor: 'grey.100',
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'auto',
        }}
      >
        {JSON.stringify(banner.parameters, null, 2)}
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button component={NextLink} href='/banners' startIcon={<ArrowBack />} variant='outlined'>
          목록으로
        </Button>
        <Typography variant='h4' component='h1'>
          {banner.name}
        </Typography>
        <Chip
          label={banner.active ? '활성화' : '비활성화'}
          color={banner.active ? 'success' : 'default'}
          size='small'
          sx={{ ml: 1 }}
        />
        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
          <Button
            variant='outlined'
            startIcon={<EditIcon />}
            onClick={() => setIsEditDialogOpen(true)}
          >
            수정
          </Button>
          <Button
            variant='outlined'
            color='error'
            startIcon={<DeleteIcon />}
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            삭제
          </Button>
        </Box>
      </Box>

      {banner.imageUrl && (
        <Box
          component='img'
          src={banner.imageUrl}
          alt={`${banner.name} 배너 이미지`}
          sx={{
            width: '100%',
            maxHeight: 320,
            objectFit: 'cover',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        />
      )}

      {banner.imageUrl && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            size='small'
            variant='outlined'
            startIcon={<OpenInFull />}
            onClick={() => setIsImageDialogOpen(true)}
          >
            크게 보기
          </Button>
        </Box>
      )}

      <Paper sx={{ p: 3 }}>
        <Typography variant='h6' gutterBottom>
          기본 정보
        </Typography>
        <Stack spacing={2}>
          <DetailRow label='배너 ID' value={banner.id} />
          <DetailRow label='설명' value={banner.description} />
          <DetailRow label='서비스' value={banner.service ?? '지정되지 않음'} />
          <DetailRow label='노출 위치' value={banner.placement ?? '지정되지 않음'} />
          <DetailRow label='우선순위' value={banner.priority} />
          <DetailRow label='링크 타입' value={banner.linkType} />
          <DetailRow
            label='링크'
            value={banner.link ? (
              <Button component={NextLink} href={banner.link} target='_blank' rel='noopener noreferrer' variant='text' size='small'>
                {banner.link}
              </Button>
            ) : (
              '링크 없음'
            )}
          />
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant='h6' gutterBottom>
          파라미터
        </Typography>
        {renderParameters()}
      </Paper>

      <EditBannerDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={(data) => updateMutation.mutate(data)}
        loading={updateMutation.isPending}
        initialData={banner}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => deleteMutation.mutate()}
        loading={deleteMutation.isPending}
        title='배너 삭제 확인'
        description={`정말로 '${banner.name}' 배너를 삭제하시겠습니까?`}
      />

      <Dialog
        open={isImageDialogOpen}
        onClose={() => setIsImageDialogOpen(false)}
        maxWidth='lg'
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          배너 이미지
          <IconButton onClick={() => setIsImageDialogOpen(false)}>
            <DeleteIcon sx={{ visibility: 'hidden' }} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
          {banner.imageUrl ? (
            <Box
              component='img'
              src={banner.imageUrl}
              alt={`${banner.name} 원본 이미지`}
              sx={{ maxWidth: '100%', borderRadius: 2 }}
            />
          ) : (
            <Typography>이미지가 없습니다.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Box>
      <Typography variant='body2' color='text.secondary'>
        {label}
      </Typography>
      {typeof value === 'string' || typeof value === 'number' ? (
        <Typography variant='body1'>{value}</Typography>
      ) : (
        value
      )}
      <Divider sx={{ mt: 1 }} />
    </Box>
  );
}
