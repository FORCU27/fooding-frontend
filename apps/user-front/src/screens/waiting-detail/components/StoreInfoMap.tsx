'use client';

import clsx from 'clsx';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import useKakaoLoader from '@/hooks/map/useKakaoLoader';

type StoreInfoMapProps = {
  lat: number;
  lng: number;
  className?: string;
};

export const StoreInfoMap = ({ lat, lng, className }: StoreInfoMapProps) => {
  useKakaoLoader();

  return (
    <Map
      id='map'
      center={{
        lat,
        lng,
      }}
      style={{ width: '100%', height: '100%' }}
      className={clsx(className)}
      level={1}
    >
      <MapMarker position={{ lat, lng }} />
    </Map>
  );
};
