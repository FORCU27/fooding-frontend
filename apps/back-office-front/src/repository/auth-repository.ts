import { httpClient } from '@/libs/http';

export const authRepository = {
  // // 추천 프로필 가져오기
  // register: () => {
  //   return new Promise<Profile[]>((resolve) => {
  //     setTimeout(() => {
  //       // 랜덤하게 프로필 순서 섞기
  //       const shuffled = [...mockProfiles].sort(() => Math.random() - 0.5);
  //       resolve(shuffled);
  //     }, 500); // 0.5초 지연
  //   });
  // },

  // 위치 업데이트
  login: async (credentials: { email: string; password: string }) => {
    const response = await httpClient.post<{ access_token: string }>(
      '/auth/login',
      credentials,
    );

    return response.data;
  },
};
