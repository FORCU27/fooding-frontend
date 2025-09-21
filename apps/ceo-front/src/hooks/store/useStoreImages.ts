import {
  ImageTag,
  PustStoreImageParams,
  PutStoreMainImageParams,
  storeImageApi,
} from '@repo/api/ceo';
import { CreateStoreImageParams } from '@repo/api/ceo';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useStoreImages = (storeId: number, tag?: ImageTag | null) => {
  return useQuery({
    queryKey: ['storeImages', storeId, tag],
    queryFn: () => {
      if (!storeId) throw new Error('no storeId');
      return storeImageApi.getImages(storeId, {
        pageNum: 1,
        pageSize: 20,
        searchString: '',
        tag: tag ?? null,
        isMain: false,
      });
    },
    enabled: !!storeId,
  });
};

export const useCreateImage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ storeId, body }: { storeId: number; body: CreateStoreImageParams }) =>
      storeImageApi.createImage(storeId, body),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ['storeImages', variables.storeId] });
    },
  });
};

export const useDeleteImage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ storeId, photoId }: { storeId: number; photoId: number }) =>
      storeImageApi.deleteImage(storeId, photoId),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ['storeImages', variables.storeId] });
    },
  });
};

export const useEditImage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      storeId,
      photoId,
      body,
    }: {
      storeId: number;
      photoId: number;
      body: PustStoreImageParams;
    }) => storeImageApi.putImage(storeId, photoId, body),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ['storeImages', variables.storeId] });
    },
  });
};

export const useRegisterMainImage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      storeId,
      photoId,
      body,
    }: {
      storeId: number;
      photoId: number;
      body: PutStoreMainImageParams;
    }) => storeImageApi.putMainImage(storeId, photoId, body),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ['storeImages', variables.storeId] });
    },
  });
};
