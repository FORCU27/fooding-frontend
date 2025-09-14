import { useQuery } from '@tanstack/react-query';

export const useSelectedStore = () => {
  return useQuery({
    queryKey: ['selectedStore'],
    queryFn: async () => {
      const res = await fetch('/api/store/select');
      console.log('res', res);
      if (!res.ok) throw new Error('스토어 조회 실패');
      return res.json();
    },
  });
};
