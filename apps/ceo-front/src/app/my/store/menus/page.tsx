'use client';

import { useState, useEffect, useRef } from 'react';

import { menuApi, type MenuItem as ApiMenuItem } from '@repo/api/ceo';
import { queryKeys } from '@repo/api/configs/query-keys';
import {
  CardForm,
  Card,
  MenuBoard,
  Button,
  AddCategoryDialog,
  EditCategoryDialog,
  MenuButton,
} from '@repo/design-system/components/ceo';
import { useQueries } from '@tanstack/react-query';

import AddMenuDialog from './AddMenuDialog';
import DeleteMenuDialog from './DeleteMenuDialog';
import { useCreateMenuCategory } from '@/hooks/menu-category/useCreateMenuCategory';
import { useDeleteMenuCategory } from '@/hooks/menu-category/useDeleteMenuCategory';
import { useGetMenuCategories } from '@/hooks/menu-category/useGetMenuCategories';
import { useSortMenuCategories } from '@/hooks/menu-category/useSortMenuCategories';
import { useUpdateMenuCategory } from '@/hooks/menu-category/useUpdateMenuCategory';
import { useDeleteMenu } from '@/hooks/menu/useDeleteMenu';
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

  // 현재 선택된 카테고리 상태 관리
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // 모든 카테고리의 메뉴를 미리 불러오기 (캐시 활용)
  const menuQueries = useQueries({
    queries:
      menuCategories?.map((category) => ({
        queryKey: [
          queryKeys.ceo.menu.list,
          {
            storeId: selectedStoreId,
            categoryId: category.id,
            pageNum: 1,
            pageSize: 100,
          },
        ],
        queryFn: () =>
          menuApi.getMenuList({
            storeId: selectedStoreId || 0,
            categoryId: category.id,
            pageNum: 1,
            pageSize: 100,
          }),
        enabled: !!selectedStoreId && !!menuCategories,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      })) || [],
  });

  // 현재 선택된 카테고리의 메뉴 데이터
  const selectedCategoryIndex =
    menuCategories?.findIndex((cat) => cat.id === selectedCategoryId) ?? -1;
  const menuData =
    selectedCategoryIndex >= 0 ? menuQueries[selectedCategoryIndex]?.data : undefined;

  // sortOrder가 가장 낮은 카테고리를 기본 선택
  useEffect(() => {
    if (menuCategories && menuCategories.length > 0 && !selectedCategoryId) {
      // sortOrder로 정렬하여 첫 번째 카테고리 선택
      const sortedCategories = [...menuCategories].sort((a, b) => a.sortOrder - b.sortOrder);
      const firstCategory = sortedCategories[0];
      if (firstCategory) {
        setSelectedCategoryId(firstCategory.id);
      }
    }
  }, [menuCategories, selectedCategoryId]);

  const createCategoryMutation = useCreateMenuCategory();
  const sortCategoriesMutation = useSortMenuCategories();
  const updateCategoryMutation = useUpdateMenuCategory(selectedStoreId);
  const deleteCategoryMutation = useDeleteMenuCategory(selectedStoreId);
  const deleteMenuMutation = useDeleteMenu();

  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<{ id: string; name: string } | null>(null);
  const [showAddMenuDialog, setShowAddMenuDialog] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<{
    id: number;
    categoryId: number;
    name: string;
    price: number;
    description: string;
    isSignature: boolean;
    isRecommend: boolean;
    imageUrls?: string[];
  } | null>(null);
  const [deletingMenuItem, setDeletingMenuItem] = useState<{
    id: number;
    name: string;
  } | null>(null);

  // 모든 카테고리의 메뉴 데이터를 캐시 (렌더링과 무관하게 유지)
  const menuCacheRef = useRef<Record<number, MenuItem[]>>({});

  // API 데이터로 카테고리 및 메뉴 초기화
  useEffect(() => {
    if (menuCategories) {
      // sortOrder로 정렬
      const sortedCategories = [...menuCategories].sort((a, b) => a.sortOrder - b.sortOrder);

      // 현재 선택된 카테고리의 메뉴 데이터가 있으면 캐시에 저장
      if (selectedCategoryId && menuData) {
        const menuItems = menuData.list.map((menu: ApiMenuItem) => ({
          id: menu.id.toString(),
          name: menu.name,
          description: menu.description || '',
          price: menu.price,
          image: menu.imageUrls?.[0] || menu.imageUrl || undefined, // imageUrls 배열의 첫 번째 이미지 사용
          badges: [
            ...(menu.isSignature ? ['대표' as BadgeType] : []),
            ...(menu.isRecommend ? ['추천' as BadgeType] : []),
          ].filter(Boolean) as BadgeType[],
        }));

        // sortOrder로 정렬
        menuItems.sort((a, b) => {
          const menuA = menuData.list.find((m: ApiMenuItem) => m.id.toString() === a.id);
          const menuB = menuData.list.find((m: ApiMenuItem) => m.id.toString() === b.id);
          return (menuA?.sortOrder || 0) - (menuB?.sortOrder || 0);
        });

        menuCacheRef.current[selectedCategoryId] = menuItems;
      }

      const mappedCategories: Category[] = sortedCategories.map((cat) => {
        // 캐시에서 메뉴 가져오기
        const cachedMenuItems = menuCacheRef.current[cat.id] || [];

        // 선택된 카테고리만 메뉴 표시 (캐시된 데이터 우선 사용)
        if (selectedCategoryId === cat.id) {
          // 새 데이터가 있으면 사용, 없으면 캐시 사용
          if (menuData) {
            return {
              id: cat.id.toString(),
              name: cat.name,
              items: menuCacheRef.current[cat.id] || [],
            };
          }
          return {
            id: cat.id.toString(),
            name: cat.name,
            items: cachedMenuItems,
          };
        }

        // 선택되지 않은 카테고리는 빈 배열
        return {
          id: cat.id.toString(),
          name: cat.name,
          items: [],
        };
      });
      setCategories(mappedCategories);
    }
  }, [menuCategories, menuData, selectedCategoryId]);

  const handleCategoriesChange = (newCategories: Category[]) => {
    setCategories(newCategories);

    // 드래그 앤 드롭으로 순서 변경시 바로 API 호출
    const categoryIds = newCategories.map((cat) => parseInt(cat.id));
    sortCategoriesMutation.mutate(
      { menuCategoryIds: categoryIds },
      {
        onSuccess: () => {
          // console.log('카테고리 순서 저장 완료');
        },
        onError: () => {
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

  // 초기 로딩 상태 처리 (카테고리 로딩 중일 때만)
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
          <MenuButton onClick={() => setShowAddMenuDialog(true)}>메뉴 추가</MenuButton>
        </div>
        <MenuBoard
          categories={categories}
          onCategoriesChange={handleCategoriesChange}
          onSave={handleSave}
          onEditCategory={handleEditCategory}
          onCategorySelect={(categoryId) => setSelectedCategoryId(Number(categoryId))}
          selectedCategoryId={selectedCategoryId?.toString()}
          onEditMenuItem={(categoryId, itemId) => {
            // 메뉴 데이터 찾기
            const categoryData = menuQueries.find((q, index) =>
              menuCategories?.[index]?.id === parseInt(categoryId)
            )?.data;

            const menuItem = categoryData?.list.find(menu => menu.id === parseInt(itemId));

            if (menuItem) {
              setEditingMenuItem({
                id: menuItem.id,
                categoryId: parseInt(categoryId),
                name: menuItem.name,
                price: menuItem.price,
                description: menuItem.description || '',
                isSignature: menuItem.isSignature,
                isRecommend: menuItem.isRecommend,
                imageUrls: menuItem.imageUrls || [],
              });
            }
          }}
          onDeleteMenuItem={(categoryId, itemId) => {
            // 메뉴 데이터 찾기
            const categoryData = menuQueries.find((q, index) =>
              menuCategories?.[index]?.id === parseInt(categoryId)
            )?.data;

            const menuItem = categoryData?.list.find(menu => menu.id === parseInt(itemId));

            if (menuItem) {
              setDeletingMenuItem({
                id: menuItem.id,
                name: menuItem.name,
              });
            }
          }}
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

      {/* <div className='flex justify-center mb-17'>
        <Button type='button' onClick={handleSave}>
          저장
        </Button>
      </div> */}

      {/* 메뉴 추가 다이얼로그 */}
      {showAddMenuDialog && selectedCategoryId && (
        <AddMenuDialog
          open={showAddMenuDialog}
          onOpenChange={setShowAddMenuDialog}
          categoryId={selectedCategoryId}
        />
      )}

      {/* 메뉴 수정 다이얼로그 */}
      {editingMenuItem && (
        <AddMenuDialog
          open={!!editingMenuItem}
          onOpenChange={(open) => !open && setEditingMenuItem(null)}
          categoryId={editingMenuItem.categoryId}
          menuItem={editingMenuItem}
          mode="edit"
        />
      )}

      {/* 메뉴 삭제 확인 다이얼로그 */}
      {deletingMenuItem && (
        <DeleteMenuDialog
          open={!!deletingMenuItem}
          onOpenChange={(open) => !open && setDeletingMenuItem(null)}
          menuName={deletingMenuItem.name}
          isDeleting={deleteMenuMutation.isPending}
          onConfirm={() => {
            deleteMenuMutation.mutate(deletingMenuItem.id, {
              onSuccess: () => {
                setDeletingMenuItem(null);
              },
              onError: (error) => {
                console.error('메뉴 삭제 실패:', error);
                alert('메뉴 삭제에 실패했습니다.');
              },
            });
          }}
        />
      )}
    </CardForm>
  );
};

export default MenusPage;
