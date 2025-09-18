import { FileUploadResponse } from '../../file';
import { api } from '../../shared';

const ENDPOINT = '/admin/file-upload';

export const adminFileApi = {
  upload: async (body: FormData) => {
    const response = await api.post(ENDPOINT, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return FileUploadResponse.parse(response);
  },
};
