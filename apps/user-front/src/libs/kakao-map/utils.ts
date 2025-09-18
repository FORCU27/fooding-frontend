import { env } from '@/configs/env';

const KAKAO_KEY = env.KAKAO_JS_KEY;

export const getKakaoMapDirectionUrl = ({
  latitude,
  longitude,
  name,
}: {
  latitude: number;
  longitude: number;
  name: string;
}) => {
  const encodedName = encodeURIComponent(name);
  return `https://map.kakao.com/link/to/${encodedName},${latitude},${longitude}`;
};

export const openKakaoMapDirection = ({
  latitude,
  longitude,
  name,
}: {
  latitude: number;
  longitude: number;
  name: string;
}) => {
  const url = getKakaoMapDirectionUrl({ latitude, longitude, name });

  window.open(url, '_blank');
};

export const kakaoMapScriptSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&libraries=services,clusterer&autoload=false`;
