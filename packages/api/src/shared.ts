import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { z } from 'zod/v4';

import { STORAGE_KEYS } from './configs/storageKeys';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

// 요청 인터셉터 설정
apiClient.interceptors.request.use(
  async (response) => {
    const accessToken = Cookies.get(STORAGE_KEYS.ACCESS_TOKEN);
    if (accessToken) {
      response.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 설정
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

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

export const ApiResponse = <TData extends z.ZodType>(data: TData) =>
  z.object({
    status: z.string(),
    data,
  });

export type PageInfo = z.infer<typeof PageInfo>;
export const PageInfo = z.object({
  pageNum: z.number(),
  pageSize: z.number(),
  totalCount: z.number(),
  totalPages: z.number(),
});

export const PageResponse = <TListItem extends z.ZodType>(listItem: TListItem) =>
  ApiResponse(
    z.object({
      list: z.array(listItem),
      pageInfo: PageInfo,
    }),
  );

export const SORT_TYPES = [
  'RECENT',
  'AVERAGE_RATING',
  'VISIT',
  'REVIEW',
  'RECENT',
  'AVERAGE_RATING',
  'POPULARITY',
] as const;
export type SortType = (typeof SORT_TYPES)[number];

export const SORT_DIRECTIONS = ['ASCENDING', 'DESCENDING'] as const;
export type SortDirection = (typeof SORT_DIRECTIONS)[number];
