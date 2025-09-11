import { useState, useEffect } from 'react';

import { useGetRegionList } from '@/hooks/regions/useGetRegionList';
import { formatProvinces } from '@/utils/region';

type Province = {
  label: string;
  id: string;
  districts: string[];
};

export const useProvinceDistricts = () => {
  const { data: provinceData } = useGetRegionList({ level: 1 }); // 시/도
  const provinces = formatProvinces(provinceData?.list);

  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);

  // 선택된 시/도 id 기반으로 하위 구 fetch
  const { data: districtData } = useGetRegionList({
    level: 2,
    parentRegionId: selectedProvince?.id,
  });

  const districts = districtData?.list.map((d) => d.name.replace(/^.*\s/, '')) ?? [];

  // 선택된 시/도 변경 시 첫 구 자동 선택 가능
  useEffect(() => {
    if (!selectedProvince && provinces.length > 0) {
      if (!provinces[0]) return;
      setSelectedProvince(provinces[0]);
    }
  }, [provinces, selectedProvince]);

  return { provinces, selectedProvince, setSelectedProvince, districts };
};
