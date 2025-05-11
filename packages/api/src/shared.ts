import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import z, { ZodType } from 'zod';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const createApi = (apiClient: AxiosInstance) => ({
  get: async <TResponse = unknown>(url: string, config?: AxiosRequestConfig<unknown>) => {
    const response = await apiClient.get<TResponse>(url, config);
    return response.data;
  },
  post: async <TResponse = unknown, TData = unknown>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig<TData>,
  ) => {
    const response = await apiClient.post<TResponse>(url, data, config);
    return response.data;
  },
  put: async <TResponse = unknown, TData = unknown>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig<TData>,
  ) => {
    const response = await apiClient.put<TResponse>(url, data, config);
    return response.data;
  },
  patch: async <TResponse = unknown, TData = unknown>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig<TData>,
  ) => {
    const response = await apiClient.patch<TResponse>(url, data, config);
    return response.data;
  },
  postForm: async <TResponse = unknown, TData = unknown>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig<TData>,
  ) => {
    const response = await apiClient.postForm<TResponse>(url, data, config);
    return response.data;
  },
  patchForm: async <TResponse = unknown, TData = unknown>(
    url: string,
    data?: TData,
    config?: AxiosRequestConfig<TData>,
  ) => {
    const response = await apiClient.patchForm<TResponse>(url, data, config);
    return response.data;
  },
  delete: async <TResponse = unknown>(url: string, config?: AxiosRequestConfig<unknown>) => {
    const response = await apiClient.delete<TResponse>(url, config);
    return response.data;
  },
});

export const api = createApi(apiClient);

export const ApiResponse = <TData extends ZodType>(data: TData) =>
  z.object({
    status: z.string(),
    data: data,
  });
