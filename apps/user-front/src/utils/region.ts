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

  // 시/도(레벨 1) 먼저 필터링
  const provinces = list.filter((region) => region.level === 1);

  return provinces.map((province) => ({
    label: province.name.replace(/특별시|광역시$/, ''),
    id: province.id,
    districts: list
      .filter((r) => r.parentRegionId === province.id)
      .map((d) => d.name.replace(new RegExp(`^${province.name}\\s`), '')),
  }));
};

export type ProvinceMap = Record<string, string[]>;

/**
 * @description 지역 리스트를 "시/도": ["구1", "구2", ...] 형태로 변환
 */
export const formatProvinceMap = (list: Region[] | undefined): ProvinceMap => {
  if (!list) return {};

  const provinces = list.filter((region) => region.level === 1);

  const result: ProvinceMap = {};

  provinces.forEach((province) => {
    const label = province.name.replace(/특별시|광역시|도$/, '');

    const districts = list
      .filter((r) => r.parentRegionId === province.id)
      .map((d) => d.name.replace(new RegExp(`^${province.name}\\s`), ''));

    result[label] = districts;
  });

  return result;
};
