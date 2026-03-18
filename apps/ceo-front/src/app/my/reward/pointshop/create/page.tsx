/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRouter } from 'next/navigation';

import { CreateStorePointShopItemBody } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { toast, Toaster } from '@repo/design-system/components/b2c';
import { useQueryClient } from '@tanstack/react-query';

import PointShopForm from '../components/PointShopForm';
import { useStore } from '@/context/StoreContext';
import { useCreateStorePointShopItem } from '@/hooks/store/useCreateStorePointShopItem';
import { useUploadFile } from '@/hooks/useUploadFile';

const PointShopCreatePage = () => {
  const { storeId } = useStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const selectedStoreId = Number(storeId);
  const { mutateAsync: uploadFile } = useUploadFile();
  const { mutateAsync: createItem, isPending: isCreating } =
    useCreateStorePointShopItem(selectedStoreId);

  const handleSubmit = async (
    data: CreateStorePointShopItemBody & { file?: File | null; dateRange?: Date[] | null },
  ) => {
    try {
      if (data.file) {
        const formData = new FormData();
        formData.append('files', data.file);

        const uploadResult = await uploadFile(formData);
        data.imageId = uploadResult.data[0]?.id || '';
      }
      await createItem(data);
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.ceo.pointShop.list, selectedStoreId],
      });

      toast.success('포인트샵 상품이 등록되었습니다.');
      router.push('/my/reward/pointshop');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || '등록에 실패했습니다.');
    }
  };

  return (
    <>
      <PointShopForm onSubmit={handleSubmit} isSubmitting={isCreating} />
      <Toaster />
    </>
  );
};

export default PointShopCreatePage;
