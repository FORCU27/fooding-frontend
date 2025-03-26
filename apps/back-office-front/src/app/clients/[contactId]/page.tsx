'use client';
import { useParams, useRouter } from 'next/navigation';

import styled from '@emotion/styled';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { NextPage } from 'next';
import useSWR from 'swr';

import { clientRepository } from '@/repository/client-repository';

const ClientInfo: NextPage = () => {
  const params = useParams();
  const router = useRouter();

  const { contactId } = params;
  const contactIdVal = typeof contactId === 'string' ? contactId : '';

  const { data: client, isLoading } = useSWR(['client', contactIdVal], () =>
    clientRepository.getById(contactIdVal),
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClientListClick = () => {
    router.push('/clients');
  };

  const handleEditClientClick = () => {
    router.push(`/clients/${contactId}/update`);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4, width: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!client) {
    return (
      <Box sx={{ p: 4, width: '100%', textAlign: 'center' }}>
        <Alert severity='error'>프로젝트를 찾을 수 없습니다.</Alert>
      </Box>
    );
  }

  return (
    <Wrapper>
      <Stack
        sx={{
          p: 3,
        }}
        spacing={3}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMobile ? 'center' : 'space-between',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 2 : 0,
          }}
        >
          <Typography variant={isMobile ? 'h5' : 'h4'} textAlign='center'>
            문의 상세
          </Typography>
          <Box sx={{ mr: 1 }}>
            <Typography variant='subtitle2' color='text.secondary'>
              수정일
            </Typography>
            <Typography>{client.updatedDate && formatDate(client.updatedDate)}</Typography>
            <Typography variant='subtitle2' color='text.secondary'>
              등록일
            </Typography>
            <Typography>{formatDate(client.createdDate)}</Typography>
          </Box>
        </Box>

        <Paper sx={{ p: 3, mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant='subtitle2' color='text.secondary'>
                    프로젝트 이름
                  </Typography>
                  <Typography>{client.projectName}</Typography>
                </Box>
                <Box>
                  <Typography variant='subtitle2' color='text.secondary'>
                    회사명
                  </Typography>
                  <Typography>{client.companyName}</Typography>
                </Box>
                <Box>
                  <Typography variant='subtitle2' color='text.secondary'>
                    예산
                  </Typography>
                  <Typography>{`${client.budget}원`}</Typography>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant='subtitle2' color='text.secondary'>
                    담당자 이름
                  </Typography>
                  <Typography>{client.name}</Typography>
                </Box>
                <Box>
                  <Typography variant='subtitle2' color='text.secondary'>
                    이메일
                  </Typography>
                  <Typography>{client.email}</Typography>
                </Box>
                <Box>
                  <Typography variant='subtitle2' color='text.secondary'>
                    연락처
                  </Typography>
                  <Typography>{client.mobile}</Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        <Paper
          sx={{
            p: 2,
          }}
        >
          <Typography variant='subtitle2' color='text.secondary' gutterBottom>
            프로젝트 설명
          </Typography>
          <Box
            sx={{
              backgroundColor: 'grey.50',
              p: 2,
              borderRadius: 1,
              minHeight: '100px', // 최소 높이 설정
              wordBreak: 'break-word', // 긴 단어 자동 줄바꿈
              whiteSpace: 'pre-wrap', // 개행 유지 및 줄바꿈 처리
              '& img': {
                maxWidth: '100%',
                height: 'auto',
              },
              '& p': {
                margin: '0.5em 0',
                lineHeight: 1.6,
              },
              '& h1, & h2, & h3, & h4, & h5, & h6': {
                margin: '1em 0 0.5em',
                lineHeight: 1.4,
              },
              '& ul, & ol': {
                marginLeft: 2,
                paddingLeft: 2,
              },
              '& li': {
                margin: '0.3em 0',
              },
              '& a': {
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              },
              '& pre': {
                whiteSpace: 'pre-wrap',
                fontFamily: 'inherit',
                margin: 0,
              },
            }}
          >
            <pre>{client.description}</pre>
          </Box>
        </Paper>

        <Grid item xs={12} sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant='outlined' onClick={handleClientListClick}>
              목록
            </Button>
            <Button variant='contained' onClick={handleEditClientClick}>
              수정
            </Button>
          </Box>
        </Grid>
      </Stack>
    </Wrapper>
  );
};

export default ClientInfo;

const Wrapper = styled.div`
  width: 100%;
  @media only screen and (max-width: 600px) {
    width: 90vw;
  }
`;
