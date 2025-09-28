import { Button } from '@repo/design-system/components/b2c';
import { FoodingIcon } from '@repo/design-system/icons';

export const EmptyStoreState = () => {
  return (
    <div>
      <FoodingIcon className='text-[#111111]/10 w-[82px] h-[102px]' />
      <h1>앗! 조건에 맞는 매장이 없어요.</h1>
      <ol>
        <li>더 일반적인 검색어로 검색해 보세요.</li>
        <li>문장이 아닌 단어로 검색해 보세요.</li>
        <li>설정된 필터를 확인하고 변경해 보세요.</li>
      </ol>
      <Button variant='outlined'>신규 업체 등록</Button>
    </div>
  );
};
