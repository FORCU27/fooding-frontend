'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextField,
  Button,
  Stack,
  Box,
  FormControlLabel,
  Switch,
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
      city: '',
      address: '',
      category: '',
      description: '',
      priceCategory: '',
      eventDescription: '',
      contactNumber: '',
      direction: '',
      information: '',
      isParkingAvailable: false,
      isNewOpen: false,
      isTakeOut: false,
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
          error={!!form.formState.errors.city}
          helperText={form.formState.errors.city?.message}
          {...form.register('city')}
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
          label='카테고리'
          error={!!form.formState.errors.category}
          helperText={form.formState.errors.category?.message}
          {...form.register('category')}
        />

        <TextField
          fullWidth
          label='가격대'
          error={!!form.formState.errors.priceCategory}
          helperText={form.formState.errors.priceCategory?.message}
          {...form.register('priceCategory')}
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
          label='영업 정보'
          error={!!form.formState.errors.information}
          helperText={form.formState.errors.information?.message}
          {...form.register('information')}
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
          label='이벤트 설명'
          error={!!form.formState.errors.eventDescription}
          helperText={form.formState.errors.eventDescription?.message}
          {...form.register('eventDescription')}
        />

        <TextField
          fullWidth
          label='찾아오는 길'
          error={!!form.formState.errors.direction}
          helperText={form.formState.errors.direction?.message}
          {...form.register('direction')}
        />

        <FormControlLabel
          control={
            <Switch
              {...form.register('isParkingAvailable')}
              checked={form.watch('isParkingAvailable')}
            />
          }
          label='주차 가능'
        />

        <FormControlLabel
          control={<Switch {...form.register('isNewOpen')} checked={form.watch('isNewOpen')} />}
          label='신규 오픈'
        />

        <FormControlLabel
          control={<Switch {...form.register('isTakeOut')} checked={form.watch('isTakeOut')} />}
          label='포장 가능'
        />

        <Button type='submit' variant='contained' disabled={isLoading} fullWidth>
          {isLoading ? '저장 중...' : '저장'}
        </Button>
      </Stack>
    </Box>
  );
}
