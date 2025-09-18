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
  Pagination,
  Alert,
  CircularProgress,
  Chip,
  Rating,
} from '@mui/material';
import {
  AdminReviewResponse,
  AdminCreateReviewRequest,
  AdminUpdateReviewRequest,
  reviewApi,
} from '@repo/api/admin';
import { useQuery, useMutation } from '@tanstack/react-query';

import { CreateReviewDialog } from './CreateReviewDialog';
import { EditReviewDialog } from './EditReviewDialog';
import { DeleteConfirmDialog } from '../notifications/DeleteConfirmDialog';
import { queryClient } from '@/components/Provider/providers';

const visitPurposeTypeMap = {
  BUSINESS: '업무',
  FAMILY: '가족',
  DATE: '데이트',
  FRIEND: '친구',
  ALONE: '혼자',
  EVENT: '이벤트',
  MEETING: '모임',
};

export default function ReviewList() {
  const [page, setPage] = useState(0);
  const size = 10;
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<AdminReviewResponse | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<AdminReviewResponse | null>(null);

  const queryKey = ['reviews', page];
  const {
    data: reviewsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        console.log('Fetching reviews with params:', { page, size });
        const result = await reviewApi.getReviewList({
          page,
          size,
        });
        console.log('API Response:', result);
        return result;
      } catch (err) {
        console.error('Error in queryFn:', err);
        throw err;
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: AdminCreateReviewRequest) => reviewApi.createReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      setIsCreateDialogOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: AdminUpdateReviewRequest }) =>
      reviewApi.updateReview({ id, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      setIsEditDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id, deletedBy }: { id: number; deletedBy: number }) =>
      reviewApi.deleteReview({ id, deletedBy }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      setDeleteDialogOpen(false);
      setReviewToDelete(null);
    },
    onSettled: () => {
      setDeleteDialogOpen(false);
      setReviewToDelete(null);
    },
  });

  if (isLoading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    console.error('ReviewList Error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    });
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity='error'>
          리뷰 목록을 불러오는 중 오류가 발생했습니다.
          <br />
          에러: {error.message}
        </Alert>
      </Box>
    );
  }

  const reviews = reviewsResponse?.data.list || [];
  const pageInfo = reviewsResponse?.data.pageInfo;

  const handleDeleteClick = (review: AdminReviewResponse) => {
    setReviewToDelete(review);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (reviewToDelete) {
      deleteMutation.mutate({ id: reviewToDelete.id, deletedBy: 1 }); // TODO: 실제 관리자 ID로 변경
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant='h4' component='h1'>
          리뷰 관리
        </Typography>
        <Button variant='contained' onClick={() => setIsCreateDialogOpen(true)}>
          리뷰 생성
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>작성자 ID</TableCell>
              <TableCell>가게 ID</TableCell>
              <TableCell>총점</TableCell>
              <TableCell>서비스</TableCell>
              <TableCell>분위기</TableCell>
              <TableCell>맛</TableCell>
              <TableCell>방문목적</TableCell>
              <TableCell>내용</TableCell>
              <TableCell>작업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review: AdminReviewResponse) => (
              <TableRow key={review.id}>
                <TableCell>{review.id}</TableCell>
                <TableCell>{review.writerId}</TableCell>
                <TableCell>{review.storeId}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating value={review.totalScore} readOnly size='small' />
                    <Typography variant='body2'>({review.totalScore.toFixed(1)})</Typography>
                  </Box>
                </TableCell>
                <TableCell>{review.serviceScore.toFixed(1)}</TableCell>
                <TableCell>{review.moodScore.toFixed(1)}</TableCell>
                <TableCell>{review.tasteScore.toFixed(1)}</TableCell>
                <TableCell>
                  <Chip
                    label={visitPurposeTypeMap[review.visitPurposeType]}
                    size='small'
                    variant='outlined'
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    sx={{
                      maxWidth: 200,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {review.content || '-'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant='outlined'
                      size='small'
                      onClick={() => {
                        setSelectedReview(review);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      수정
                    </Button>
                    <Button
                      variant='outlined'
                      color='error'
                      size='small'
                      onClick={() => handleDeleteClick(review)}
                    >
                      삭제
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {pageInfo && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={pageInfo.totalPages}
            page={page + 1}
            onChange={(_, newPage) => setPage(newPage - 1)}
            color='primary'
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      <CreateReviewDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
        loading={createMutation.isPending}
      />

      <EditReviewDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={(data) =>
          selectedReview && updateMutation.mutate({ id: selectedReview.id, body: data })
        }
        loading={updateMutation.isPending}
        initialData={selectedReview || undefined}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleteMutation.isPending}
        title='리뷰 삭제 확인'
        description={
          reviewToDelete ? `정말로 ID ${reviewToDelete.id} 리뷰를 삭제하시겠습니까?` : ''
        }
      />
    </Box>
  );
}
