export * from './type';

import { api } from '../shared';
import { FileUploadResponse } from './type';

export const fileApi = {
  upload: async (body: FormData) => {
    const response = await api.post('/file-upload', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return FileUploadResponse.parse(response);
  },
};
