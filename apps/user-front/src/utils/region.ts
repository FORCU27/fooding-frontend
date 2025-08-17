import { Region } from '@repo/api/user';

export type Province = {
  label: string;
  id: string;
  districts: string[];
};

/**
 * @description 지역형식을 특정 형식으로 변환합니다
 *
 * @example
 * "서울특별시" → "서울"
 *"서울특별시 종로구" → "종로구"
 */

export const formatProvinces = (list: Region[] | undefined): Province[] => {
  if (!list) return [];

  return list
    .filter((region) => region.level === 1)
    .map((province) => ({
      label: province.name.replace(/특별시|광역시|도$/, ''),
      id: province.id,
      districts: list
        .filter((r) => r.parentRegionId === province.id && r.level === 2)
        .map((d) => d.name.replace(/^.*\s/, '')),
    }));
};
