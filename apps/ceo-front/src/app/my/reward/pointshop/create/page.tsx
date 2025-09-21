'use client';

import { CreateStorePointShopItemBody } from '@repo/api/ceo';

import PointShopForm from '../components/PointShopForm';

const PointShopCreatePage = () => {
  const handleSubmit = async (data: CreateStorePointShopItemBody) => {
    // const selectedStoreId = Number(Cookies.get(STORAGE_KEYS.SELECTED_STORE_ID) ?? '1');

    try {
      // const selectedStoreId = Number(Cookies.get(STORAGE_KEYS.SELECTED_STORE_ID) ?? '1');
      // await storeApi.createStorePointShopItem(selectedStoreId, data);
      alert('포인트샵 상품이 등록되었습니다.');
      console.log('등록 데이터:', data);
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || '등록 실패');
    }
  };

  return <PointShopForm onSubmit={handleSubmit} />;
};

export default PointShopCreatePage;
