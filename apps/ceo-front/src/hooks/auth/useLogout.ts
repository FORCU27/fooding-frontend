import { useMutation } from '@tanstack/react-query';

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      return await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
  });
};
