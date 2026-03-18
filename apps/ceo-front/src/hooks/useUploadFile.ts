import { queryKeys } from '@repo/api/configs/query-keys';
import { fileApi } from '@repo/api/file';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUploadFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fileApi.upload,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.file.upload] });
    },
    onError: (error: unknown) => {
      let message = '이미지 업로드에 실패했습니다.';

      if (error instanceof AxiosError) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      alert(message);
    },
  });
};
