'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { storePostApi } from '@repo/api/ceo';
import { toast, Toaster } from '@repo/design-system/components/b2c';

import NewsForm, { NewsFormSubmitPayload } from '../components/NewsForm';
import { useStore } from '@/context/StoreContext';
import { useUploadFile } from '@/hooks/useUploadFile';

const NewsCreatePage = () => {
  const router = useRouter();
  const { storeId } = useStore();
  const selectedStoreId = Number(storeId);
  const { mutateAsync: uploadFile } = useUploadFile();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (payload: NewsFormSubmitPayload) => {
    try {
      setLoading(true);

      let imageIds: string[] = [];

      if (payload.newFiles.length > 0) {
        const formData = new FormData();
        payload.newFiles.forEach((file) => formData.append('files', file));

        const uploadResult = await uploadFile(formData);
        imageIds = uploadResult.data.map((img) => img.id);
      }

      await storePostApi.createStorePost({
        storeId: selectedStoreId,
        title: payload.title,
        content: payload.content,
        isFixed: false,
        isNotice: payload.isNotice,
        isCommentAvailable: payload.isCommentAvailable,
        imageIds,
      });

      toast.success('소식이 등록되었습니다.');
      router.push('/my/regular/news');
    } catch {
      toast.error('등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NewsForm submitLabel='등록하기' onSubmit={handleCreate} loading={loading} />
      <Toaster />
    </>
  );
};

export default NewsCreatePage;
