import { httpClient } from '@/libs/http';

export type FileAccess = 'public' | 'private';

export interface FileUploadResponse {
  id: string;
  url: string;
  name: string;
  size: number;
  type: string;
  access: FileAccess;
}

export interface FileUploadProgress {
  file: File;
  progress: number;
  uploaded?: FileUploadResponse;
  error?: string;
}

export const fileRepository = {
  async upload(file: File, access: FileAccess): Promise<FileUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await httpClient.post<FileUploadResponse>(
      `/files/upload?access=${access}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
          // Progress callback will be handled by the component
        },
      },
    );

    return response.data;
  },

  async getSignedUrl(fileId: string, expiresIn: number = 3600): Promise<string> {
    const response = await httpClient.get<{ url: string }>(
      `/files/${fileId}/url?expiresIn=${expiresIn}`,
    );
    return response.data.url;
  },
};
