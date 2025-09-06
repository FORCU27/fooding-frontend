'use client';

import { useState } from 'react';

import { Add, Edit, Delete } from '@mui/icons-material';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
} from '@mui/material';

interface RewardPoint {
  id: number;
  storeId: number;
  storeName: string;
  phoneNumber: string;
  userId?: number;
  userName?: string;
  point: number;
  memo?: string;
  createdAt: string;
  updatedAt: string;
}

export default function RewardPointsPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPoint, setEditingPoint] = useState<RewardPoint | null>(null);
  const [formData, setFormData] = useState({
    storeId: '',
    phoneNumber: '',
    userId: '',
    point: '',
    memo: '',
  });

  // Mock data - 실제로는 API에서 가져와야 함
  const mockData: RewardPoint[] = [
    {
      id: 1,
      storeId: 1,
      storeName: '맛있는 치킨집',
      phoneNumber: '010-1234-5678',
      userId: 1,
      userName: '홍길동',
      point: 1000,
      memo: '첫 방문 적립',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: 2,
      storeId: 2,
      storeName: '신선한 피자집',
      phoneNumber: '010-9876-5432',
      point: 500,
      memo: '리뷰 작성 적립',
      createdAt: '2024-01-02',
      updatedAt: '2024-01-02',
    },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (point?: RewardPoint) => {
    if (point) {
      setEditingPoint(point);
      setFormData({
        storeId: point.storeId.toString(),
        phoneNumber: point.phoneNumber,
        userId: point.userId?.toString() || '',
        point: point.point.toString(),
        memo: point.memo || '',
      });
    } else {
      setEditingPoint(null);
      setFormData({
        storeId: '',
        phoneNumber: '',
        userId: '',
        point: '',
        memo: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPoint(null);
  };

  const handleSubmit = () => {
    // TODO: API 호출 로직 구현
    console.log('Submit:', formData);
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      // TODO: API 호출 로직 구현
      console.log('Delete:', id);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant='h4' sx={{ fontWeight: 600, color: '#1e293b' }}>
          포인트 관리
        </Typography>
        <Button
          variant='contained'
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ backgroundColor: '#3b82f6', '&:hover': { backgroundColor: '#2563eb' } }}
        >
          포인트 추가
        </Button>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>가게명</TableCell>
                <TableCell>전화번호</TableCell>
                <TableCell>사용자</TableCell>
                <TableCell>포인트</TableCell>
                <TableCell>메모</TableCell>
                <TableCell>생성일</TableCell>
                <TableCell>작업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.storeName}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row.userName || '-'}</TableCell>
                  <TableCell>
                    <Chip label={`${row.point}P`} color='primary' variant='outlined' size='small' />
                  </TableCell>
                  <TableCell>{row.memo || '-'}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>
                    <IconButton size='small' onClick={() => handleOpenDialog(row)}>
                      <Edit />
                    </IconButton>
                    <IconButton size='small' onClick={() => handleDelete(row.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={mockData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='sm' fullWidth>
        <DialogTitle>{editingPoint ? '포인트 수정' : '포인트 추가'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label='가게 ID'
              value={formData.storeId}
              onChange={(e) => setFormData({ ...formData, storeId: e.target.value })}
              fullWidth
            />
            <TextField
              label='전화번호'
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              fullWidth
            />
            <TextField
              label='사용자 ID (선택사항)'
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              fullWidth
            />
            <TextField
              label='포인트'
              type='number'
              value={formData.point}
              onChange={(e) => setFormData({ ...formData, point: e.target.value })}
              fullWidth
            />
            <TextField
              label='메모'
              value={formData.memo}
              onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
              fullWidth
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>취소</Button>
          <Button onClick={handleSubmit} variant='contained'>
            {editingPoint ? '수정' : '추가'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
