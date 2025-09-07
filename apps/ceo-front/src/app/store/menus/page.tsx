'use client';

import { useState, useEffect } from 'react';

import {
  CardForm,
  Card,
  MenuBoard,
  Button,
  AddCategoryDialog,
  EditCategoryDialog,
  MenuButton,
} from '@repo/design-system/components/ceo';

import { useCreateMenuCategory } from '@/hooks/menu-category/useCreateMenuCategory';
import { useDeleteMenuCategory } from '@/hooks/menu-category/useDeleteMenuCategory';
import { useGetMenuCategories } from '@/hooks/menu-category/useGetMenuCategories';
import { useSortMenuCategories } from '@/hooks/menu-category/useSortMenuCategories';
import { useUpdateMenuCategory } from '@/hooks/menu-category/useUpdateMenuCategory';
import { useSelectedStoreId } from '@/hooks/useSelectedStoreId';

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
  const { data: menuCategories, isLoading: isLoadingCategories } =
    useGetMenuCategories(selectedStoreId);
  const createCategoryMutation = useCreateMenuCategory();
  const sortCategoriesMutation = useSortMenuCategories();
  const updateCategoryMutation = useUpdateMenuCategory(selectedStoreId);
  const deleteCategoryMutation = useDeleteMenuCategory(selectedStoreId);

  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<{ id: string; name: string } | null>(null);

  // API 데이터로 카테고리 초기화
  useEffect(() => {
    if (menuCategories) {
      console.log('API에서 받은 카테고리:', menuCategories);
      // sortOrder로 정렬
      const sortedCategories = [...menuCategories].sort((a, b) => a.sortOrder - b.sortOrder);
      const mappedCategories: Category[] = sortedCategories.map((cat) => ({
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

    // 드래그 앤 드롭으로 순서 변경시 바로 API 호출
    const categoryIds = newCategories.map((cat) => parseInt(cat.id));
    sortCategoriesMutation.mutate(
      { menuCategoryIds: categoryIds },
      {
        onSuccess: () => {
          console.log('카테고리 순서 저장 완료');
        },
        onError: (error) => {
          console.error('카테고리 순서 저장 실패:', error);
          // 실패시 이전 상태로 복구
          setCategories(categories);
        },
      },
    );
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
          // alert('카테고리가 등록되었습니다.');
        },
        onError: (error) => {
          console.error('카테고리 등록 실패:', error);
          // alert('카테고리 등록에 실패했습니다.');
        },
      },
    );
  };

  const handleEditCategory = (categoryId: string, categoryName: string) => {
    setEditingCategory({ id: categoryId, name: categoryName });
  };

  const handleUpdateCategory = (newName: string) => {
    if (!editingCategory) return;

    updateCategoryMutation.mutate(
      { categoryId: parseInt(editingCategory.id), categoryName: newName },
      {
        onSuccess: () => {
          // 로컬 상태 업데이트
          setCategories((prev) =>
            prev.map((cat) => (cat.id === editingCategory.id ? { ...cat, name: newName } : cat)),
          );
          setEditingCategory(null);
          // alert('카테고리가 수정되었습니다.');
        },
        onError: () => {
          // alert('카테고리 수정에 실패했습니다.');
        },
      },
    );
  };

  const handleDeleteCategory = () => {
    if (!editingCategory) return;

    deleteCategoryMutation.mutate(parseInt(editingCategory.id), {
      onSuccess: () => {
        // 로컬 상태에서도 제거
        setCategories((prev) => prev.filter((cat) => cat.id !== editingCategory.id));
        setEditingCategory(null);
        // alert('카테고리가 삭제되었습니다.');
      },
      onError: () => {
        // alert(message);
      },
    });
  };

  const handleSave = () => {
    if (!selectedStoreId) return;
  };

  // 로딩 상태 처리
  if (isLoadingStoreId || isLoadingCategories) {
    return <div>메뉴 정보를 불러오는 중...</div>;
  }

  if (!selectedStoreId) {
    return (
      <div>
        가게를 선택해주세요. <a href='/store/select'>가게 선택하기</a>
      </div>
    );
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
          onEditCategory={handleEditCategory}
        />
      </Card>

      {editingCategory && (
        <EditCategoryDialog
          open={!!editingCategory}
          onOpenChange={(open) => {
            if (!open) setEditingCategory(null);
          }}
          categoryName={editingCategory.name}
          onSave={handleUpdateCategory}
          onDelete={handleDeleteCategory}
        />
      )}

      <div className='flex justify-center mb-17'>
        <Button type='button' onClick={handleSave}>
          저장
        </Button>
      </div>
    </CardForm>
  );
};

export default MenusPage;
