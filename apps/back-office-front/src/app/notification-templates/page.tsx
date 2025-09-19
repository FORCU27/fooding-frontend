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
  Pagination,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { Link } from '@mui/material';
import {
  notificationTemplateApi,
  AdminNotificationTemplateResponse,
  AdminCreateNotificationTemplateRequest,
  AdminUpdateNotificationTemplateRequest,
} from '@repo/api/admin';
import { useQuery, useMutation } from '@tanstack/react-query';

import { CreateNotificationTemplateDialog } from './CreateNotificationTemplateDialog';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { EditNotificationTemplateDialog } from './EditNotificationTemplateDialog';
import { queryClient } from '../../components/Provider/providers';

export default function NotificationTemplatesPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<AdminNotificationTemplateResponse | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] =
    useState<AdminNotificationTemplateResponse | null>(null);

  const { data: templatesResponse, isLoading } = useQuery({
    queryKey: ['notification-templates', page, pageSize],
    queryFn: () => notificationTemplateApi.getNotificationTemplateList(page, pageSize),
  });

  const createMutation = useMutation({
    mutationFn: (data: AdminCreateNotificationTemplateRequest) =>
      notificationTemplateApi.createNotificationTemplate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-templates'] });
      setIsCreateDialogOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: AdminUpdateNotificationTemplateRequest }) =>
      notificationTemplateApi.updateNotificationTemplate({ id, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-templates'] });
      setIsEditDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => notificationTemplateApi.deleteNotificationTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-templates'] });
      setDeleteDialogOpen(false);
      setTemplateToDelete(null);
    },
    onSettled: () => {
      setDeleteDialogOpen(false);
      setTemplateToDelete(null);
    },
  });

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    setPageSize(Number(event.target.value));
    setPage(1);
  };

  if (isLoading) return <div>Loading...</div>;

  const templates = templatesResponse?.data.list || [];
  const pageInfo = templatesResponse?.data.pageInfo;
  const totalPages = pageInfo?.totalPages || 1;

  const handleDeleteClick = (template: AdminNotificationTemplateResponse) => {
    setTemplateToDelete(template);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (templateToDelete) {
      deleteMutation.mutate(templateToDelete.id);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant='h4' component='h1'>
          알림 양식 관리
        </Typography>
        <Button variant='contained' onClick={() => setIsCreateDialogOpen(true)}>
          새 알림 양식 추가
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>내용</TableCell>
              <TableCell>타입</TableCell>
              <TableCell>작업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {templates.map((template) => (
              <TableRow key={template.id}>
                <TableCell>{template.id}</TableCell>
                <TableCell>
                  <Link href={`/notification-templates/${template.id}`} underline='hover'>
                    {template.subject}
                  </Link>
                </TableCell>
                <TableCell>{template.content}</TableCell>
                <TableCell>{template.type}</TableCell>
                {/* <TableCell>
                  <Typography
                    variant="body2"
                    color={template.isActive ? 'success.main' : 'text.secondary'}
                  >
                    {template.isActive ? '활성' : '비활성'}
                  </Typography>
                </TableCell> */}
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant='outlined'
                      size='small'
                      onClick={() => {
                        setSelectedTemplate(template);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      수정
                    </Button>
                    <Button
                      variant='outlined'
                      color='error'
                      size='small'
                      onClick={() => handleDeleteClick(template)}
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

      {/* 페이징 컨트롤 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant='body2'>페이지당 행 수:</Typography>
          <FormControl size='small' sx={{ minWidth: 80 }}>
            <Select value={pageSize} onChange={handlePageSizeChange} displayEmpty>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
          <Typography variant='body2'>총 {pageInfo?.totalCount || 0}개 항목</Typography>
        </Box>

        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color='primary'
          showFirstButton
          showLastButton
        />
      </Box>

      <CreateNotificationTemplateDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={(data: AdminCreateNotificationTemplateRequest) => createMutation.mutate(data)}
        loading={createMutation.isPending}
      />

      <EditNotificationTemplateDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={(data: AdminUpdateNotificationTemplateRequest) =>
          selectedTemplate && updateMutation.mutate({ id: selectedTemplate.id, body: data })
        }
        loading={updateMutation.isPending}
        initialData={selectedTemplate || undefined}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleteMutation.isPending}
        title='알림 양식 삭제 확인'
        description={
          templateToDelete
            ? `정말로 '${templateToDelete.subject}' 알림 양식을 삭제하시겠습니까?`
            : ''
        }
      />
    </Box>
  );
}
