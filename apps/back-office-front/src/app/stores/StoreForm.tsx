'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextField,
  Button,
  Stack,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  AdminStoreResponse,
  AdminCreateStoreRequest,
  AdminCreateStoreRequestSchema,
} from '@repo/api/admin';
import { userApi } from '@repo/api/admin';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

interface StoreFormProps {
  initialData?: AdminStoreResponse;
  onSubmit: (data: AdminCreateStoreRequest) => void;
  isLoading?: boolean;
}

export function StoreForm({ initialData, onSubmit, isLoading }: StoreFormProps) {
  const { data: usersResponse } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      userApi.getUserList({
        page: 0,
        size: 100,
        role: 'CEO',
      }),
  });
  const users = usersResponse?.data.list || [];

  const form = useForm<AdminCreateStoreRequest>({
    resolver: zodResolver(AdminCreateStoreRequestSchema),
    defaultValues: initialData || {
      ownerId: 0,
      name: '',
      regionId: '',
      address: '',
      category: '',
      description: '',
      contactNumber: '',
      direction: '',
      latitude: 0,
      longitude: 0,
      stations: [],
    },
  });

  return (
    <Box component='form' onSubmit={form.handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <FormControl required>
          <InputLabel id='user-select-label'>점주</InputLabel>
          <Select
            labelId='user-select-label'
            label='점주'
            value={initialData?.ownerId}
            onChange={(e) => form.setValue('ownerId', e.target.value)}
            disabled={!!initialData}
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.nickname} ({user.email})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label='가게명'
          error={!!form.formState.errors.name}
          helperText={form.formState.errors.name?.message}
          {...form.register('name')}
        />

<TextField
          fullWidth
          label='도시'
          error={!!form.formState.errors.regionId}
          helperText={form.formState.errors.regionId?.message}
          {...form.register('regionId')}
        />

        <TextField
          fullWidth
          label='주소'
          error={!!form.formState.errors.address}
          helperText={form.formState.errors.address?.message}
          {...form.register('address')}
        />

        <TextField
          fullWidth
          label='상세주소'
          error={!!form.formState.errors.addressDetail}
          helperText={form.formState.errors.addressDetail?.message}
          {...form.register('addressDetail')}
        />

        <TextField
          fullWidth
          label='카테고리'
          error={!!form.formState.errors.category}
          helperText={form.formState.errors.category?.message}
          {...form.register('category')}
        />

        <TextField
          fullWidth
          label='연락처'
          error={!!form.formState.errors.contactNumber}
          helperText={form.formState.errors.contactNumber?.message}
          {...form.register('contactNumber')}
        />

        <TextField
          fullWidth
          label='설명'
          error={!!form.formState.errors.description}
          helperText={form.formState.errors.description?.message}
          {...form.register('description')}
        />

        <TextField
          fullWidth
          label='찾아오는 길'
          error={!!form.formState.errors.direction}
          helperText={form.formState.errors.direction?.message}
          {...form.register('direction')}
        />

        <TextField
          fullWidth
          label='위도'
          type="number"
          error={!!form.formState.errors.latitude}
          helperText={form.formState.errors.latitude?.message}
          {...form.register('latitude', { valueAsNumber: true })}
        />

        <TextField
          fullWidth
          label='경도'
          type="number"
          error={!!form.formState.errors.longitude}
          helperText={form.formState.errors.longitude?.message}
          {...form.register('longitude', { valueAsNumber: true })}
        />

        <Button type='submit' variant='contained' disabled={isLoading} fullWidth>
          {isLoading ? '저장 중...' : '저장'}
        </Button>
      </Stack>
    </Box>
  );
}
