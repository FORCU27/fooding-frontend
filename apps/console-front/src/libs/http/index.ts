import axios from 'axios';

import { env } from '@/config';

console.log('env.publicEnv.apiUrl', env.publicEnv.apiUrl);

const httpClient = axios.create({
  baseURL: env.publicEnv.apiUrl,
  timeout: 5000,
  withCredentials: true, // 쿠키 포함
});

// 요청 인터셉터 설정
httpClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const token = localStorage.getItem('access_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// 응답 인터셉터 추가
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  },
);

export { httpClient };
