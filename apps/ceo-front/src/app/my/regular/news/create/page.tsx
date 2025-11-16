'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { storePostApi } from '@repo/api/ceo';
import {
  CardForm,
  Card,
  CardSubtitle,
  Input,
  TextArea,
  ImageUploader,
  Checkbox,
  Button,
} from '@repo/design-system/components/ceo';

import { useStore } from '@/context/StoreContext';
import { useUploadFile } from '@/hooks/useUploadFile';

const NewsCreatePage = () => {
  const router = useRouter();

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isNotice, setIsNotice] = useState(false);
  const [isCommentAvailable, setIsCommentAvailable] = useState(true);
  const [loading, setLoading] = useState(false);

  const { storeId } = useStore();
  const selectedStoreId = Number(storeId);

  const { mutateAsync: uploadFile } = useUploadFile();

  // base64 -> File 변환
  const dataURLtoFile = (dataurl: string, filename = 'upload.png') => {
    const arr = dataurl.split(',');
    const mime = arr[0]?.match(/:(.*?);/)![1];
    const bstr = atob(arr[1]!);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  // 이미지 변경 핸들러
  const handleImageChange = (images: string[]) => {
    setPreviewImages(images);

    const files = images.map((img, i) => dataURLtoFile(img, `news-${i + 1}.png`));
    setImageFiles(files);
  };

  // 생성 API 호출
  const handleCreate = async () => {
    try {
      setLoading(true);

      let imageIds: string[] = [];

      // 이미지 업로드가 있을 때만 업로드
      if (imageFiles.length > 0) {
        const formData = new FormData();
        imageFiles.forEach((file) => formData.append('files', file));

        const uploadResult = await uploadFile(formData);
        imageIds = uploadResult.data.map((img) => img.id);
      }

      await storePostApi.createStorePost({
        storeId: selectedStoreId,
        title,
        content,
        isFixed: false,
        isNotice,
        isCommentAvailable,
        imageIds,
      });

      alert('소식이 등록되었습니다.');
      router.push('/my/regular/news');
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || '등록 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardForm className='mb-[80px]'>
      <div className='headline-2'>소식 작성</div>

      <Card>
        <CardSubtitle label='제목'>
          <Input id='name' value={title} onChange={(e) => setTitle(e.target.value)} />
        </CardSubtitle>
      </Card>

      <Card>
        <CardSubtitle label='내용'>
          <TextArea
            placeholder='상품 또는 서비스를 소개하거나 이벤트를 알려보세요'
            id='contents'
            className='min-h-[200px]'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </CardSubtitle>
      </Card>

      <ImageUploader maxImages={4} images={previewImages} onChange={handleImageChange} />

      <Card>
        <CardSubtitle label='설정'>
          <div className='flex gap-[30px]'>
            <Checkbox
              labelText='공지사항 등록'
              checked={isNotice}
              onChange={(e) => setIsNotice(e.target.checked)}
            />
            <Checkbox
              labelText='댓글 비활성화'
              checked={!isCommentAvailable}
              onChange={(e) => setIsCommentAvailable(!e.target.checked)}
            />
          </div>
        </CardSubtitle>
      </Card>

      <div className='flex justify-center mt-10'>
        <Button onClick={handleCreate} disabled={loading}>
          {loading ? '등록 중...' : '등록하기'}
        </Button>
      </div>
    </CardForm>
  );
};

export default NewsCreatePage;
