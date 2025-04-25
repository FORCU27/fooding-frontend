import axios, { AxiosInstance } from 'axios';

const BASE_URL = '<백엔드 API URL>';

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const createApi = (apiClient: AxiosInstance) => ({
  get: async <TResponse = unknown>(...args: Parameters<AxiosInstance['get']>) => {
    const response = await apiClient.get<TResponse>(...args);
    return response.data;
  },
  post: async <TResponse = unknown>(...args: Parameters<AxiosInstance['post']>) => {
    const response = await apiClient.post<TResponse>(...args);
    return response.data;
  },
  put: async <TResponse = unknown>(...args: Parameters<AxiosInstance['put']>) => {
    const response = await apiClient.put<TResponse>(...args);
    return response.data;
  },
  patch: async <TResponse = unknown>(...args: Parameters<AxiosInstance['patch']>) => {
    const response = await apiClient.patch<TResponse>(...args);
    return response.data;
  },
  postForm: async <TResponse = unknown>(...args: Parameters<AxiosInstance['postForm']>) => {
    const response = await apiClient.postForm<TResponse>(...args);
    return response.data;
  },
  patchForm: async <TResponse = unknown>(...args: Parameters<AxiosInstance['patchForm']>) => {
    const response = await apiClient.patchForm<TResponse>(...args);
    return response.data;
  },
  delete: async <TResponse = unknown>(...args: Parameters<AxiosInstance['delete']>) => {
    const response = await apiClient.delete<TResponse>(...args);
    return response.data;
  },
});

export const api = createApi(apiClient);
