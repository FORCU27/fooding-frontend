'use client';

import { useEffect, useState } from 'react';

import {
  Card,
  CardSubtitle,
  CardForm,
  Input,
  TextArea,
  ImageUploader,
  Checkbox,
  Button,
} from '@repo/design-system/components/ceo';

export type NewsFormInitialValue = {
  title: string;
  content: string;
  isNotice: boolean;
  isCommentAvailable: boolean;
  images: { imageId: string; imageUrl: string }[];
};

export type NewsFormSubmitPayload = {
  title: string;
  content: string;
  isNotice: boolean;
  isCommentAvailable: boolean;
  imageIds: string[];
  deleteImageIds: string[]; // 삭제된 기존 이미지
  newFiles: File[]; // 신규 업로드 파일
};

interface Props {
  initialValue?: NewsFormInitialValue;
  onSubmit: (payload: NewsFormSubmitPayload) => void | Promise<void>;
  submitLabel: string;
  loading?: boolean;
}

export const NewsForm = ({ initialValue, onSubmit, submitLabel, loading }: Props) => {
  const [title, setTitle] = useState(initialValue?.title ?? '');
  const [content, setContent] = useState(initialValue?.content ?? '');
  const [isNotice, setIsNotice] = useState(initialValue?.isNotice ?? false);
  const [isCommentAvailable, setIsCommentAvailable] = useState(
    initialValue?.isCommentAvailable ?? true,
  );
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  // 기존 이미지
  const [existingImages, setExistingImages] = useState<{ imageId: string; imageUrl: string }[]>(
    initialValue?.images ?? [],
  );

  // 삭제된 기존 이미지 ID 목록
  const [deleteImageIds, setDeleteImageIds] = useState<string[]>([]);

  // 신규 이미지 File 목록
  const [newFiles, setNewFiles] = useState<File[]>([]);

  // ImageUploader에 표시될 preview 배열 (기존 + 신규)
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // 기존 이미지 + 신규 이미지로 preview 초기화
  useEffect(() => {
    if (initialValue) {
      const merged = [...(initialValue.images.map((img) => img.imageUrl) ?? [])];
      setPreviewImages(merged);
    }
  }, [initialValue]);

  // base64 -> File
  const dataURLtoFile = (dataurl: string, filename = 'upload.png') => {
    const arr = dataurl.split(',');
    const mime = arr[0]?.match(/:(.*?);/)![1];
    const bstr = atob(arr[1]!);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  // 이미지 변경 처리 (기존 이미지 + 신규 이미지)
  const handleImageChange = (images: string[]) => {
    const prev = previewImages;
    setPreviewImages(images);

    // 1) 기존 이미지 삭제 감지
    const removedExisting = existingImages.filter((img) => !images.includes(img.imageUrl));

    if (removedExisting.length > 0) {
      setDeleteImageIds((prev) => [...prev, ...removedExisting.map((i) => i.imageId)]);
      setExistingImages((prev) => prev.filter((img) => images.includes(img.imageUrl)));
    }

    // 2) 신규 업로드 감지 (base64)
    const newBase64Images = images.filter((img) => img.startsWith('data:image'));
    const prevBase64Images = prev.filter((img) => img.startsWith('data:image'));

    // 새로 추가된 base64
    const added = newBase64Images.filter((img) => !prevBase64Images.includes(img));

    // 제거된 base64
    const removed = prevBase64Images.filter((img) => !newBase64Images.includes(img));

    // File 추가
    if (added.length > 0) {
      const addedFiles = added.map((img, i) => dataURLtoFile(img, `news-new-${i + 1}.png`));
      setNewFiles((prev) => [...prev, ...addedFiles]);
    }

    // File 제거
    if (removed.length > 0) {
      setNewFiles((prev) =>
        prev.filter(
          (file) => !removed.some((r) => file.name.includes(r.slice(0, 20))), // rough match
        ),
      );
    }
  };

  const handleSubmit = () => {
    const newErrors: { title?: string; content?: string } = {};

    if (!title.trim()) {
      newErrors.title = '필수 입력 항목입니다.';
    }

    if (!content.trim()) {
      newErrors.content = '필수 입력 항목입니다.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({
      title,
      content,
      isNotice,
      isCommentAvailable,
      deleteImageIds,
      newFiles,
      imageIds: [],
    });
  };

  return (
    <CardForm className='mb-[80px]'>
      <Card>
        <CardSubtitle label='제목'>
          <Input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) {
                setErrors((prev) => ({ ...prev, title: undefined }));
              }
            }}
            aria-invalid={!!errors.title}
          />
          {errors.title && (
            <p className='text-error-red mt-1 text-[15px] font-medium'>{errors.title}</p>
          )}
        </CardSubtitle>
      </Card>

      <Card>
        <CardSubtitle label='내용'>
          <TextArea
            className='min-h-[200px]'
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (errors.content) {
                setErrors((prev) => ({ ...prev, content: undefined }));
              }
            }}
            aria-invalid={!!errors.content}
          />
          {errors.content && (
            <p className='text-error-red mt-1 text-[15px] font-medium'>{errors.content}</p>
          )}
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
        <Button disabled={loading} onClick={handleSubmit}>
          {loading ? '처리 중...' : submitLabel}
        </Button>
      </div>
    </CardForm>
  );
};

export default NewsForm;
