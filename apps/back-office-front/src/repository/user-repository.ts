import { httpClient } from '@/libs/http';

export const userRepository = {
  getSelf() {
    return httpClient.get<{ id: string; email: string; nickname: string }>('/users/me');
  },
};
