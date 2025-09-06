'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Alert,
  CircularProgress,
  Stack,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  postApi,
  AdminPostResponse,
  AdminCreatePostRequest,
  AdminUpdatePostRequest,
  PostType,
} from '@repo/api/admin';

import { queryClient } from '../providers';
import { CreatePostDialog } from './CreatePostDialog';
import { EditPostDialog } from './EditPostDialog';
import { DeleteConfirmDialog } from '../stores/DeleteConfirmDialog';

const postTypeMap = {
  NOTICE: '공지사항',
  EVENT: '이벤트',
};

const postTypeColors = {
  NOTICE: 'info' as const,
  EVENT: 'success' as const,
};

export default function PostsPage() {
  const [selectedType, setSelectedType] = useState<PostType | 'ALL'>('ALL');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<AdminPostResponse | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<AdminPostResponse | null>(null);

  const queryKey = ['posts', selectedType === 'ALL' ? undefined : selectedType];
  
  const { data: postsResponse, isLoading, error } = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const result = await postApi.list(selectedType === 'ALL' ? undefined : selectedType);
        return result;
      } catch (err) {
        console.error('Error fetching posts:', err);
        throw err;
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: AdminCreatePostRequest) => postApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setIsCreateDialogOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: AdminUpdatePostRequest }) =>
      postApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setIsEditDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => postApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    },
    onSettled: () => {
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    },
  });

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedType(event.target.value as PostType | 'ALL');
  };

  const handleDeleteClick = (post: AdminPostResponse) => {
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (postToDelete) {
      deleteMutation.mutate(postToDelete.id);
    }
  };

  const handleEditClick = (post: AdminPostResponse) => {
    setSelectedPost(post);
    setIsEditDialogOpen(true);
  };

  if (isLoading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3 }}>
        <Alert severity="error">
          게시글 목록을 불러오는 중 오류가 발생했습니다.
          <br />
          에러: {(error as Error).message}
        </Alert>
      </Paper>
    );
  }

  const posts = postsResponse?.data || [];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          게시글 관리
        </Typography>
        <Button variant="contained" onClick={() => setIsCreateDialogOpen(true)}>
          게시글 작성
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select value={selectedType} onChange={handleTypeChange}>
            <MenuItem value="ALL">전체</MenuItem>
            <MenuItem value="NOTICE">공지사항</MenuItem>
            <MenuItem value="EVENT">이벤트</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {posts.length === 0 ? (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              등록된 게시글이 없습니다.
            </Typography>
          </Box>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>제목</TableCell>
                <TableCell>타입</TableCell>
                <TableCell>홈페이지</TableCell>
                <TableCell>POS</TableCell>
                <TableCell>CEO앱</TableCell>
                <TableCell>작성일</TableCell>
                <TableCell>작업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post: AdminPostResponse) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2" noWrap sx={{ maxWidth: 200 }}>
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 200 }}>
                        {post.content}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={postTypeMap[post.type]} 
                      color={postTypeColors[post.type]}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={post.isVisibleOnHomepage ? '노출' : '비노출'} 
                      color={post.isVisibleOnHomepage ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={post.isVisibleOnPos ? '노출' : '비노출'} 
                      color={post.isVisibleOnPos ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={post.isVisibleOnCeo ? '노출' : '비노출'} 
                      color={post.isVisibleOnCeo ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleEditClick(post)}
                      >
                        수정
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteClick(post)}
                      >
                        삭제
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <CreatePostDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
        loading={createMutation.isPending}
      />

      <EditPostDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={(data) => selectedPost && updateMutation.mutate({ id: selectedPost.id, data })}
        loading={updateMutation.isPending}
        initialData={selectedPost}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleteMutation.isPending}
        title="게시글 삭제 확인"
        description={
          postToDelete 
            ? `정말로 '${postToDelete.title}' 게시글을 삭제하시겠습니까?` 
            : ''
        }
      />
    </Box>
  );
}