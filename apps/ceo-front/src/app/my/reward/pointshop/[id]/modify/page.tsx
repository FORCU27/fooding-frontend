/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useParams, useRouter } from 'next/navigation';

import { CreateStorePointShopItemBody, storeApi } from '@repo/api/ceo';
import { EmptyState } from '@repo/design-system/components/b2c';

import PointShopForm from '../../components/PointShopForm';
import { useStore } from '@/context/StoreContext';
import { useGetStorePointShop } from '@/hooks/store/useGetStorePointShop';
import { useUploadFile } from '@/hooks/useUploadFile';

const PointShopModifyPage = () => {
  const { storeId } = useStore();
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { data: pointShopItem } = useGetStorePointShop({
    storeId,
    id: id,
  });

  const selectedStoreId = storeId;
  const { mutateAsync: uploadFile } = useUploadFile();

  const handleSubmit = async (data: CreateStorePointShopItemBody & { file?: File | null }) => {
    try {
      if (data.file) {
        const formData = new FormData();
        formData.append('files', data.file);

        const uploadResult = await uploadFile(formData);
        data.imageId = uploadResult.data[0]?.id || '';
      }

      await storeApi.updateStorePointShopItem(selectedStoreId, id, data);
      alert('포인트샵 상품이 수정되었습니다.');
      router.push(`/my/reward/pointshop/${id}`);
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || '등록 실패');
    }
  };

  if (!pointShopItem) return <EmptyState title='포인트샵 아이템 정보가 없습니다.' />;

  return (
    <PointShopForm
      onSubmit={handleSubmit}
      originValue={{
        ...pointShopItem,
        image: pointShopItem.image ?? undefined,
      }}
    />
  );
};

export default PointShopModifyPage;
