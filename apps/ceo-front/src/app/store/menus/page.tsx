'use client';

import { useState, useEffect } from 'react';
import { 
  CardForm, 
  Card, 
  MenuBoard, 
  Button,
  AddCategoryDialog,
  MenuButton
} from '@repo/design-system/components/ceo';
import { useSelectedStoreId } from '@/hooks/useSelectedStoreId';
import { useGetMenuCategories } from '@/hooks/menu-category/useGetMenuCategories';
import { useCreateMenuCategory } from '@/hooks/menu-category/useCreateMenuCategory';
import { useSortMenuCategories } from '@/hooks/menu-category/useSortMenuCategories';

type BadgeType = '대표' | '추천' | '신규';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  badges?: BadgeType[];
};

type Category = {
  id: string;
  name: string;
  items: MenuItem[];
};

const MenusPage = () => {
  const { selectedStoreId, isLoading: isLoadingStoreId } = useSelectedStoreId();
  const { data: menuCategories, isLoading: isLoadingCategories } = useGetMenuCategories(selectedStoreId);
  const createCategoryMutation = useCreateMenuCategory();
  const sortCategoriesMutation = useSortMenuCategories();
  
  const [categories, setCategories] = useState<Category[]>([]);

  // API 데이터로 카테고리 초기화
  useEffect(() => {
    if (menuCategories) {
      console.log('API에서 받은 카테고리:', menuCategories);
      // sortOrder로 정렬
      const sortedCategories = [...menuCategories].sort((a, b) => a.sortOrder - b.sortOrder);
      const mappedCategories: Category[] = sortedCategories.map(cat => ({
        id: cat.id.toString(),
        name: cat.name,
        items: [], // TODO: 메뉴 아이템 API 연동 후 실제 데이터로 변경
      }));
      console.log('정렬된 카테고리:', mappedCategories);
      setCategories(mappedCategories);
    }
  }, [menuCategories]);

  const handleCategoriesChange = (newCategories: Category[]) => {
    setCategories(newCategories);
    console.log('카테고리 변경:', newCategories);
  };

  const handleAddCategory = (name: string) => {
    if (!selectedStoreId) return;

    createCategoryMutation.mutate(
      { storeId: selectedStoreId, categoryName: name },
      {
        onSuccess: (data) => {
          // API 성공 후 로컬 상태 업데이트
          const newCategory: Category = {
            id: data.data.toString(),
            name,
            items: [],
          };
          setCategories([...categories, newCategory]);
          alert('카테고리가 등록되었습니다.');
        },
        onError: (error) => {
          console.error('카테고리 등록 실패:', error);
          alert('카테고리 등록에 실패했습니다.');
        },
      }
    );
  };

  const handleSave = () => {
    if (!selectedStoreId || categories.length === 0) return;
    
    // 카테고리 ID를 숫자로 변환하여 정렬 API 호출
    const categoryIds = categories.map(cat => parseInt(cat.id));
    console.log('카테고리 정렬 순서:', categoryIds);
    
    sortCategoriesMutation.mutate(
      { menuCategoryIds: categoryIds },
      {
        onSuccess: () => {
          alert('메뉴가 저장되었습니다.');
        },
        onError: (error) => {
          console.error('메뉴 저장 실패:', error);
          alert('메뉴 저장에 실패했습니다.');
        },
      }
    );
  };

  // 로딩 상태 처리
  if (isLoadingStoreId || isLoadingCategories) {
    return <div>메뉴 정보를 불러오는 중...</div>;
  }

  if (!selectedStoreId) {
    return <div>가게를 선택해주세요. <a href="/store/select">가게 선택하기</a></div>;
  }

  return (
    <CardForm className='p-grid-margin' onSubmit={(e) => e.preventDefault()}>
      <div className='headline-2'>메뉴</div>
      
      <Card className='pt-7 pb-6'>
        <div className='flex flex-row justify-end gap-2 mb-4 px-4'>
          <AddCategoryDialog 
            onAdd={handleAddCategory}
            trigger={<MenuButton>카테고리 등록</MenuButton>}
          />
          <MenuButton>메뉴 추가</MenuButton>
        </div>
        <MenuBoard 
          categories={categories}
          onCategoriesChange={handleCategoriesChange}
          onSave={handleSave}
        />
      </Card>

      <div className='flex justify-center mb-17'>
        <Button 
          type='button' 
          onClick={handleSave}
          disabled={sortCategoriesMutation.isPending || categories.length === 0}
        >
          {sortCategoriesMutation.isPending ? '저장 중...' : '저장'}
        </Button>
      </div>
    </CardForm>
  );
};

export default MenusPage;
