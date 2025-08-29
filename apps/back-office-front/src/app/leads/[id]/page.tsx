'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UploadIcon from '@mui/icons-material/Upload';
import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import { leadApi, UploadLeadRequest } from '@repo/api/admin';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState<UploadLeadRequest>({
    ownerId: 1, // 기본값 설정 (실제로는 사용자 선택이 필요)
    regionId: "KR-11", // 기본값 설정 (실제로는 지역 선택이 필요)
  });

  const leadId = params.id as string;

  const { data: lead, isLoading, error } = useQuery({
    queryKey: ['lead', leadId],
    queryFn: () => leadApi.getLead(leadId),
    enabled: !!leadId,
  });



  const uploadMutation = useMutation({
    mutationFn: (data: UploadLeadRequest) =>
      leadApi.uploadLead(leadId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      setUploadDialogOpen(false);
      setUploadForm({ ownerId: 1, regionId: "KR-11" });
      // 성공 후 리드 목록으로 이동
      router.push('/leads');
    },
  });

  const handleUpload = () => {
    uploadMutation.mutate(uploadForm);
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!lead) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>리드를 찾을 수 없습니다.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* 헤더 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push('/leads')}
            variant="outlined"
          >
            뒤로가기
          </Button>
          <Typography variant="h4" component="h1">
            리드 상세
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          onClick={() => setUploadDialogOpen(true)}
          color="primary"
        >
          Store로 업로드
        </Button>
      </Box>

      {/* 리드 정보 */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          기본 정보
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              ID
            </Typography>
            <Typography variant="body1">{lead.id}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              이름
            </Typography>
            <Typography variant="body1">{lead.name}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              연락처
            </Typography>
            <Typography variant="body1">{lead.phone}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              유입 경로
            </Typography>
            <Typography variant="body1">{lead.source ?? '-'}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              생성일
            </Typography>
            <Typography variant="body1">{lead.createdAt}</Typography>
          </Box>
        </Box>
      </Paper>

      {/* 업로드 다이얼로그 */}
      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Store로 업로드</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="소유자 ID"
                type="number"
                value={uploadForm.ownerId}
                onChange={(e) => setUploadForm({ ...uploadForm, ownerId: Number(e.target.value) })}
                required
              />
              <TextField
                fullWidth
                label="지역 ID"
                type="number"
                value={uploadForm.regionId}
                onChange={(e) => setUploadForm({ ...uploadForm, regionId: e.target.value })}
                required
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>취소</Button>
          <Button
            onClick={handleUpload}
            variant="contained"
            disabled={uploadMutation.isPending}
          >
            {uploadMutation.isPending ? '업로드 중...' : '업로드'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 에러 메시지 */}
      {uploadMutation.isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          업로드 중 오류가 발생했습니다.
        </Alert>
      )}
    </Box>
  );
}