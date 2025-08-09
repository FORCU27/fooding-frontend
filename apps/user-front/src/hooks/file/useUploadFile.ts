import { queryKeys } from '@repo/api/configs/query-keys';
import { fileApi } from '@repo/api/file';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUploadFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fileApi.upload,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.file.upload] });
    },
  });
};
