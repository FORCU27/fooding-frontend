'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
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
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ClickAwayListener,
  CircularProgress,
} from '@mui/material';
import { leadApi, UploadLeadRequest } from '@repo/api/admin';
import { userApi } from '@repo/api/admin';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { RegionSearchSelect } from '../../../components/RegionSearchSelect';

interface SearchOption {
  id: string | number;
  label: string;
}

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState<UploadLeadRequest>({
    ownerId: 1,
    regionId: 'KR-11',
  });

  // 검색 관련 상태
  const [ownerSearchTerm, setOwnerSearchTerm] = useState('');
  const [ownerSearchResults, setOwnerSearchResults] = useState<SearchOption[]>([]);
  const [showOwnerResults, setShowOwnerResults] = useState(false);
  const [isSearchingOwner, setIsSearchingOwner] = useState(false);

  const leadId = params.id as string;

  const { data: lead, isLoading } = useQuery({
    queryKey: ['lead', leadId],
    queryFn: () => leadApi.getLead(leadId),
    enabled: !!leadId,
  });

  // 사용자 검색
  const searchUsers = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setOwnerSearchResults([]);
      return;
    }

    setIsSearchingOwner(true);
    try {
      const response = await userApi.getUserList({
        page: 1,
        size: 10,
        searchString: searchTerm,
      });
      const results = response.data.list.map((user) => ({
        id: user.id,
        label: `${user.nickname || '이름 없음'} (${user.email})`,
      }));
      setOwnerSearchResults(results);
    } catch (error) {
      console.error('사용자 검색 실패:', error);
      setOwnerSearchResults([]);
    } finally {
      setIsSearchingOwner(false);
    }
  };


  const uploadMutation = useMutation({
    mutationFn: (data: UploadLeadRequest) => leadApi.uploadLead(leadId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      setUploadDialogOpen(false);
      setUploadForm({ ownerId: 1, regionId: 'KR-11' });
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
            variant='outlined'
          >
            뒤로가기
          </Button>
          <Typography variant='h4' component='h1'>
            리드 상세
          </Typography>
        </Box>
        <Button
          variant='contained'
          startIcon={<UploadIcon />}
          onClick={() => setUploadDialogOpen(true)}
          color='primary'
        >
          Store로 업로드
        </Button>
      </Box>

      {/* 리드 정보 */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          기본 정보
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <Box>
            <Typography variant='subtitle2' color='text.secondary'>
              ID
            </Typography>
            <Typography variant='body1'>{lead.id}</Typography>
          </Box>
          <Box>
            <Typography variant='subtitle2' color='text.secondary'>
              이름
            </Typography>
            <Typography variant='body1'>{lead.name}</Typography>
          </Box>
          <Box>
            <Typography variant='subtitle2' color='text.secondary'>
              연락처
            </Typography>
            <Typography variant='body1'>{lead.phone}</Typography>
          </Box>
          <Box>
            <Typography variant='subtitle2' color='text.secondary'>
              유입 경로
            </Typography>
            <Typography variant='body1'>{lead.source ?? '-'}</Typography>
          </Box>
          <Box>
            <Typography variant='subtitle2' color='text.secondary'>
              생성일
            </Typography>
            <Typography variant='body1'>{lead.createdAt}</Typography>
          </Box>
        </Box>
      </Paper>

      {/* 업로드 다이얼로그 */}
      <Dialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle>Store로 업로드</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* 소유자 검색 */}
              <Box sx={{ position: 'relative' }}>
                <TextField
                  fullWidth
                  label='소유자 검색'
                  placeholder='사용자 이름이나 이메일로 검색...'
                  value={ownerSearchTerm}
                  onChange={(e) => {
                    const value = e.target.value;
                    setOwnerSearchTerm(value);
                    searchUsers(value);
                    setShowOwnerResults(true);
                  }}
                  onFocus={() => setShowOwnerResults(true)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        {isSearchingOwner ? (
                          <CircularProgress size={20} />
                        ) : (
                          <SearchIcon fontSize='small' />
                        )}
                      </InputAdornment>
                    ),
                  }}
                  size='small'
                />
                {showOwnerResults && ownerSearchResults.length > 0 && (
                  <ClickAwayListener onClickAway={() => setShowOwnerResults(false)}>
                    <Paper
                      elevation={3}
                      sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        zIndex: 1300,
                        maxHeight: 200,
                        overflow: 'auto',
                      }}
                    >
                      <List dense>
                        {ownerSearchResults.map((option) => (
                          <ListItem
                            key={option.id}
                            onClick={() => {
                              setUploadForm({ ...uploadForm, ownerId: Number(option.id) });
                              setOwnerSearchTerm(option.label);
                              setShowOwnerResults(false);
                            }}
                            sx={{
                              cursor: 'pointer',
                              '&:hover': {
                                backgroundColor: 'action.hover',
                              },
                            }}
                          >
                            <ListItemText primary={option.label} />
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  </ClickAwayListener>
                )}
              </Box>

              {/* 지역 검색 */}
              <RegionSearchSelect
                value={uploadForm.regionId}
                onChange={(regionId: string) => {
                  setUploadForm({ ...uploadForm, regionId });
                }}
                label='지역 검색'
                size='small'
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>취소</Button>
          <Button onClick={handleUpload} variant='contained' disabled={uploadMutation.isPending}>
            {uploadMutation.isPending ? '업로드 중...' : '업로드'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 에러 메시지 */}
      {uploadMutation.isError && (
        <Alert severity='error' sx={{ mt: 2 }}>
          업로드 중 오류가 발생했습니다.
        </Alert>
      )}
    </Box>
  );
}
