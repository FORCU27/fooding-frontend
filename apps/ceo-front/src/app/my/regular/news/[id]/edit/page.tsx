'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { storePostApi } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { toast, Toaster } from '@repo/design-system/components/b2c';
import { Spinner } from '@repo/design-system/components/ceo';
import { useQueryClient } from '@tanstack/react-query';

import NewsForm, { NewsFormInitialValue, NewsFormSubmitPayload } from '../../components/NewsForm';
import { useStore } from '@/context/StoreContext';
import { useUploadFile } from '@/hooks/useUploadFile';

const EditNewsPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { storeId } = useStore();
  const params = useParams();
  const postId = Number(params.id);

  const { mutateAsync: uploadFile } = useUploadFile();

  const [initialValue, setInitialValue] = useState<NewsFormInitialValue | null>(null);
  const [loading, setLoading] = useState(false);

  // 데이터 로드
  useEffect(() => {
    const load = async () => {
      const res = await storePostApi.getStorePostById(postId);
      const post = res.data;

      setInitialValue({
        title: post.title,
        content: post.content,
        isNotice: post.isNotice,
        isCommentAvailable: post.isCommentAvailable,
        images: post.images ?? [],
      });
    };

    load();
  }, [postId]);

  const handleEdit = async (payload: NewsFormSubmitPayload) => {
    try {
      setLoading(true);

      let newImageIds: string[] = [];

      // 신규 업로드 파일 처리
      if (payload.newFiles.length > 0) {
        const formData = new FormData();
        payload.newFiles.forEach((file) => formData.append('files', file));

        const uploadResult = await uploadFile(formData);
        newImageIds = uploadResult.data.map((img) => img.id);
      }

      await storePostApi.editStorePost(postId, {
        title: payload.title,
        content: payload.content,
        isFixed: false,
        isNotice: payload.isNotice,
        isCommentAvailable: payload.isCommentAvailable,
        imageIds: newImageIds,
        deleteImageIds: payload.deleteImageIds,
      });

      await queryClient.refetchQueries({
        queryKey: [queryKeys.ceo.storePost.list, storeId],
      });

      toast.success('소식이 수정되었습니다.');
      router.push('/my/regular/news');
    } catch {
      toast.error('수정에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!initialValue) return <Spinner size='lg' text='로딩 중...' />;

  return (
    <>
      <NewsForm
        initialValue={initialValue}
        submitLabel='수정하기'
        onSubmit={handleEdit}
        loading={loading}
      />
      <Toaster />
    </>
  );
};

export default EditNewsPage;
