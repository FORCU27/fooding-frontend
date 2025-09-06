/* eslint-disable @typescript-eslint/no-explicit-any */
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Chip,
} from '@mui/material';

interface RewardLog {
  id: number;
  storeId: number;
  storeName: string;
  phoneNumber: string;
  point: number;
  status: string;
  type: string;
  channel: string;
  memo?: string;
  createdAt: string;
  updatedAt: string;
}

export default function RewardLogsPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingLog, setEditingLog] = useState<RewardLog | null>(null);
  const [formData, setFormData] = useState({
    storeId: '',
    phoneNumber: '',
    point: '',
    status: '',
    type: '',
    channel: '',
    memo: '',
  });

  // Mock data - 실제로는 API에서 가져와야 함
  const mockData: RewardLog[] = [
    {
      id: 1,
      storeId: 1,
      storeName: '맛있는 치킨집',
      phoneNumber: '010-1234-5678',
      point: 1000,
      status: 'COMPLETED',
      type: 'EARN',
      channel: 'VISIT',
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
      status: 'PENDING',
      type: 'EARN',
      channel: 'REVIEW',
      memo: '리뷰 작성 적립',
      createdAt: '2024-01-02',
      updatedAt: '2024-01-02',
    },
  ];

  const statusOptions = ['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'];
  const typeOptions = ['EARN', 'USE', 'REFUND'];
  const channelOptions = ['VISIT', 'REVIEW', 'PURCHASE', 'EVENT'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'FAILED':
        return 'error';
      case 'CANCELLED':
        return 'default';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'EARN':
        return 'success';
      case 'USE':
        return 'info';
      case 'REFUND':
        return 'warning';
      default:
        return 'default';
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (log?: RewardLog) => {
    if (log) {
      setEditingLog(log);
      setFormData({
        storeId: log.storeId.toString(),
        phoneNumber: log.phoneNumber,
        point: log.point.toString(),
        status: log.status,
        type: log.type,
        channel: log.channel,
        memo: log.memo || '',
      });
    } else {
      setEditingLog(null);
      setFormData({
        storeId: '',
        phoneNumber: '',
        point: '',
        status: '',
        type: '',
        channel: '',
        memo: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingLog(null);
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
          로그 관리
        </Typography>
        <Button
          variant='contained'
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ backgroundColor: '#8b5cf6', '&:hover': { backgroundColor: '#7c3aed' } }}
        >
          로그 추가
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
                <TableCell>포인트</TableCell>
                <TableCell>상태</TableCell>
                <TableCell>타입</TableCell>
                <TableCell>채널</TableCell>
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
                  <TableCell>
                    <Chip label={`${row.point}P`} color='primary' variant='outlined' size='small' />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      color={getStatusColor(row.status) as any}
                      size='small'
                    />
                  </TableCell>
                  <TableCell>
                    <Chip label={row.type} color={getTypeColor(row.type) as any} size='small' />
                  </TableCell>
                  <TableCell>{row.channel}</TableCell>
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
        <DialogTitle>{editingLog ? '로그 수정' : '로그 추가'}</DialogTitle>
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
              label='포인트'
              type='number'
              value={formData.point}
              onChange={(e) => setFormData({ ...formData, point: e.target.value })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>상태</InputLabel>
              <Select
                value={formData.status}
                label='상태'
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>타입</InputLabel>
              <Select
                value={formData.type}
                label='타입'
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                {typeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>채널</InputLabel>
              <Select
                value={formData.channel}
                label='채널'
                onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
              >
                {channelOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            {editingLog ? '수정' : '추가'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
