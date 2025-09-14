'use client';

import { useRouter } from 'next/navigation';

import { couponApiV2 } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import { Button } from '@repo/design-system/components/ceo';
import { useQuery } from '@tanstack/react-query';

import { useSelectedStoreId } from '@/hooks/useSelectedStoreId';

const CouponListPage = () => {
  const router = useRouter();
  const { selectedStoreId, isInitialized } = useSelectedStoreId();

  const { data: couponList, isLoading } = useQuery({
    queryKey: [queryKeys.ceo.coupon.list, selectedStoreId],
    queryFn: () => couponApiV2.getCouponList({ 
      storeId: selectedStoreId || 0,
      pageNum: 1,
      pageSize: 10,
      status: 'ACTIVE'
    }),
    enabled: !!selectedStoreId && isInitialized,
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ko-KR');
  };

  const formatDiscountValue = (type: string, value: number | null) => {
    if (!value) return '-';
    return type === 'PERCENT' ? `${value}%` : `${value.toLocaleString()}원`;
  };

  if (!isInitialized || isLoading) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-gray-600'>쿠폰 목록을 불러오는 중...</div>
      </div>
    );
  }

  if (!selectedStoreId) {
    return (
      <div className='flex items-center justify-center py-8'>
        <div className='text-gray-600'>스토어를 선택해주세요.</div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>쿠폰 관리</h1>
        <Button onClick={() => router.push('/reward/coupon/create')}>
          새 쿠폰 만들기
        </Button>
      </div>

      <div className='bg-white rounded-lg shadow'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                쿠폰명
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                혜택
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                할인값
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                발급/총수량
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                발급기간
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                상태
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                액션
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {couponList?.list && couponList.list.length > 0 ? (
              couponList.list.map((coupon) => (
                <tr key={coupon.id}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {coupon.name}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {coupon.benefitType === 'DISCOUNT' ? '할인' : '증정'}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {formatDiscountValue(coupon.discountType || '', coupon.discountValue)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {coupon.issuedQuantity}/{coupon.totalQuantity || '무제한'}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {formatDate(coupon.issueStartOn)} ~ {formatDate(coupon.issueEndOn)}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      coupon.status === 'ACTIVE' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {coupon.status === 'ACTIVE' ? '활성' : '비활성'}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <button
                      onClick={() => router.push(`/reward/coupon/${coupon.id}`)}
                      className='text-indigo-600 hover:text-indigo-900'
                    >
                      수정
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className='px-6 py-4 text-center text-sm text-gray-500'>
                  등록된 쿠폰이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {couponList?.pageInfo && couponList.pageInfo.totalPages > 1 && (
        <div className='flex justify-center mt-4'>
          <nav className='flex space-x-2'>
            {Array.from({ length: couponList.pageInfo.totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded ${
                  couponList.pageInfo.pageNum === i + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default CouponListPage;