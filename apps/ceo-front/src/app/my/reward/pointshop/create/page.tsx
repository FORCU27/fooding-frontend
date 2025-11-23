/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRouter } from 'next/navigation';

import { CreateStorePointShopItemBody, storeApi } from '@repo/api/ceo';
import { toast } from '@repo/design-system/components/b2c';

import PointShopForm from '../components/PointShopForm';
import { useStore } from '@/context/StoreContext';
import { useUploadFile } from '@/hooks/useUploadFile';

const PointShopCreatePage = () => {
  const { storeId } = useStore();
  const router = useRouter();

  const selectedStoreId = Number(storeId);
  const { mutateAsync: uploadFile } = useUploadFile();

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

      await storeApi.createStorePointShopItem(selectedStoreId, data);
      toast.success('포인트샵 상품이 등록되었습니다.');
      router.push('/my/reward/pointshop');
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || '등록 실패');
    }
  };

  return <PointShopForm onSubmit={handleSubmit} />;
};

export default PointShopCreatePage;
