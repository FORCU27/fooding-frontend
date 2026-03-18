import {
  ImagesSortType,
  ImageTag,
  PustStoreImageParams,
  PutStoreMainImageParams,
  storeImageApi,
} from '@repo/api/ceo';
import { CreateStoreImageParams } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useStoreImages = ({
  storeId,
  sortType = 'RECENT',
  page = 1,
  tag = null,
}: {
  storeId: number;
  sortType: ImagesSortType;
  page: number;
  tag?: ImageTag | null;
}) => {
  return useQuery({
    queryKey: [queryKeys.ceo.store.images, storeId, sortType, page, tag],
    queryFn: () => {
      if (!storeId) throw new Error('no storeId');
      return storeImageApi.getImages(storeId, {
        pageNum: page,
        pageSize: 20,
        sortType,
        searchString: '',
        tag: tag ?? null,
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
      qc.invalidateQueries({ queryKey: [queryKeys.ceo.store.images, variables.storeId] });
    },
  });
};

export const useDeleteImage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ storeId, photoId }: { storeId: number; photoId: number }) =>
      storeImageApi.deleteImage(storeId, photoId),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: [queryKeys.ceo.store.images, variables.storeId] });
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
      qc.invalidateQueries({ queryKey: [queryKeys.ceo.store.images, variables.storeId] });
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
      qc.invalidateQueries({ queryKey: [queryKeys.ceo.store.images, variables.storeId] });
    },
  });
};
