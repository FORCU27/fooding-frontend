import { storeImageApi } from '@repo/api/ceo';
import { CreateStoreImageParams } from '@repo/api/ceo';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useStoreImages = (storeId?: number) => {
  return useQuery({
    queryKey: ['storeImages', storeId],
    queryFn: () => {
      if (!storeId) throw new Error('no storeId');
      return storeImageApi.getImages(storeId, {
        pageNum: 1,
        pageSize: 20,
        searchString: '',
        tag: 'PRICE_TAG',
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
