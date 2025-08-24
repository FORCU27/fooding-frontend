'use client';

import { useState } from 'react';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MoreVertical } from 'lucide-react';

import { MenuBadgeList, type BadgeType } from './MenuBadge';
import { MenuButton } from './MenuButton';
import { ChevronsLeftRightIcon, ChevronsUpDownIcon } from '../../icons';
import { cn } from '../../utils/cn';

// Use a default placeholder image URL instead of importing PNG
const menuItemImg = '/images/menu-item-placeholder.png';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  badges?: BadgeType[];
};

export type Category = {
  id: string;
  name: string;
  items: MenuItem[];
};

type MenuBoardProps = {
  categories: Category[];
  onCategoriesChange: (categories: Category[]) => void;
  onSave?: (categories: Category[]) => void;
};

const SortableCategory = ({ category, index }: { category: Category; index: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: category.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex-shrink-0 px-[27px] py-[17px] pb-1 border-b-2 flex items-center flex-col',
        index === 0 ? 'border-b-blue-500' : 'border-b-transparent',
        isDragging && 'opacity-50',
      )}
    >
      <button {...attributes} {...listeners} className='cursor-grab hover:bg-gray-100 p-1 rounded'>
        <ChevronsLeftRightIcon className='h-4 w-4 text-gray-400' />
      </button>
      <span
        className={cn(
          'subtitle-2 cursor-pointer',
          index === 0 ? 'text-fooding-purple' : 'hover:fooding-purple',
        )}
      >
        {category.name}
      </span>
    </div>
  );
};

const SortableMenuItems = ({
  categoryId,
  items,
  onItemsReorder,
}: {
  categoryId: string;
  items: MenuItem[];
  onItemsReorder: (categoryId: string, items: MenuItem[]) => void;
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      onItemsReorder(categoryId, newItems);
    }
    setActiveId(null);
  };

  const activeItem = activeId ? items.find((item) => item.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        <div className='space-y-2 mb-4'>
          {items.map((item) => (
            <SortableMenuItem key={item.id} item={item} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeItem ? (
          <div className='bg-white rounded-lg border-2 border-blue-500 p-3 shadow-lg'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <img
                  src={activeItem.image || menuItemImg}
                  alt={activeItem.name}
                  className='w-16 h-16 rounded object-cover'
                />
                <div>
                  <div className='flex items-center gap-2'>
                    <span className='font-medium'>{activeItem.name}</span>
                    <MenuBadgeList badges={activeItem.badges} />
                  </div>
                  <div className='text-sm text-gray-500'>{activeItem.description}</div>
                </div>
              </div>
              <div className='text-orange-600 font-semibold'>
                {activeItem.price.toLocaleString()}원
              </div>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

const SortableMenuItem = ({ item }: { item: MenuItem }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(' rounded-lg p-3 flex items-center gap-3', isDragging && 'shadow-lg')}
    >
      <button {...attributes} {...listeners} className='cursor-grab hover:bg-gray-200 p-1 rounded'>
        <ChevronsUpDownIcon className='h-4 w-4 text-gray-400' />
      </button>

      <img
        src={item.image || menuItemImg}
        alt={item.name}
        className='w-16 h-16 rounded object-cover'
      />

      <div className='flex-1'>
        <div className='flex items-center gap-2'>
          <span className='font-medium'>{item.name}</span>
          <MenuBadgeList badges={item.badges} />
        </div>
        <div className='text-sm text-gray-500'>{item.description}</div>
      </div>

      <div className='text-orange-600 font-semibold'>{item.price.toLocaleString()}원</div>

      <button className='p-2 hover:bg-gray-200 rounded'>
        <MoreVertical className='h-4 w-4 text-gray-600' />
      </button>
    </div>
  );
};

export const MenuBoard = ({
  categories: initialCategories,
  onCategoriesChange,
}: MenuBoardProps) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    initialCategories[0]?.id || null,
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = categories.findIndex((cat) => cat.id === active.id);
      const newIndex = categories.findIndex((cat) => cat.id === over.id);
      const newCategories = arrayMove(categories, oldIndex, newIndex);
      setCategories(newCategories);
      onCategoriesChange(newCategories);
    }
    setActiveId(null);
  };

  // Removed unused handlers - to be implemented when needed
  /* const handleEditCategory = (categoryId: string, name: string) => {
    const newCategories = categories.map((cat) => (cat.id === categoryId ? { ...cat, name } : cat));
    setCategories(newCategories);
    onCategoriesChange(newCategories);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const newCategories = categories.filter((cat) => cat.id !== categoryId);
    setCategories(newCategories);
    onCategoriesChange(newCategories);
  };

  const handleAddMenuItem = (categoryId: string, item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `item-${Date.now()}`,
    };
    const newCategories = categories.map((cat) =>
      cat.id === categoryId ? { ...cat, items: [...cat.items, newItem] } : cat,
    );
    setCategories(newCategories);
    onCategoriesChange(newCategories);
  }; */

  // Removed unused handlers - to be implemented when needed
  /* const handleEditMenuItem = (categoryId: string, itemId: string, item: Partial<MenuItem>) => {
    const newCategories = categories.map((cat) =>
      cat.id === categoryId
        ? {
            ...cat,
            items: cat.items.map((i) => (i.id === itemId ? { ...i, ...item } : i)),
          }
        : cat,
    );
    setCategories(newCategories);
    onCategoriesChange(newCategories);
  };

  const handleDeleteMenuItem = (categoryId: string, itemId: string) => {
    const newCategories = categories.map((cat) =>
      cat.id === categoryId ? { ...cat, items: cat.items.filter((i) => i.id !== itemId) } : cat,
    );
    setCategories(newCategories);
    onCategoriesChange(newCategories);
  }; */

  const handleItemsReorder = (categoryId: string, items: MenuItem[]) => {
    const newCategories = categories.map((cat) =>
      cat.id === categoryId ? { ...cat, items } : cat,
    );
    setCategories(newCategories);
    onCategoriesChange(newCategories);
  };

  const activeCategory = activeId ? categories.find((cat) => cat.id === activeId) : null;
  const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);

  return (
    <div className='w-[800px] bg-white'>
      <div className='w-full'>
        <div className='flex flex-row justify-end gap-2'>
          {/* <MenuButton icon=<ChevronsUpDownIcon />>카테로기 순서</MenuButton> */}
          <MenuButton className=''>카테고리 등록</MenuButton>
          <MenuButton className=''>메뉴 추가</MenuButton>
        </div>
        {/* Header with buttons */}
        {/* <div className='flex items-center justify-between mb-6 px-4'>
          <div className='flex gap-2'>
            <Button variant='secondary' className='flex items-center gap-2'>
              <GripVertical className='h-4 w-4' />
              카테고리 순서
            </Button>
            <AddCategoryDialog onAdd={handleAddCategory} />
            {selectedCategory && (
              <AddMenuItemDialog
                onAdd={(item) => handleAddMenuItem(selectedCategoryId!, item)}
                trigger={
                  <Button className='flex items-center gap-2'>
                    <Plus className='h-4 w-4' />
                    메뉴추가
                  </Button>
                }
              />
            )}
          </div>
        </div> */}

        {/* Category tabs */}
        <div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={categories.map((cat) => cat.id)}
              strategy={horizontalListSortingStrategy}
            >
              <div className='flex overflow-x-auto border-b-1 border-gray-300'>
                {categories.map((category, index) => (
                  <div
                    key={category.id}
                    onClick={() => setSelectedCategoryId(category.id)}
                    className='relative'
                  >
                    <SortableCategory
                      category={category}
                      index={selectedCategoryId === category.id ? 0 : index + 1}
                    />
                  </div>
                ))}
              </div>
            </SortableContext>
            <DragOverlay>
              {activeCategory ? (
                <div className='px-4 py-2 bg-white shadow-lg rounded'>
                  <span className='font-medium'>{activeCategory.name}</span>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>

        {/* Menu items for selected category */}
        {selectedCategory && (
          <div className='pt-[26px]'>
            <SortableMenuItems
              categoryId={selectedCategory.id}
              items={selectedCategory.items}
              onItemsReorder={handleItemsReorder}
            />
          </div>
        )}
      </div>
    </div>
  );
};
