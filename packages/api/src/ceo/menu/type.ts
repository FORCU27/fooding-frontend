import { z } from 'zod';

// 메뉴 아이템 스키마
export const MenuItemSchema = z.object({
  id: z.number(),
  storeId: z.number(),
  categoryId: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string().nullable(),
  imageUrl: z.string().nullable(),
  sortOrder: z.number(),
  isSignature: z.boolean(),
  isRecommend: z.boolean(),
});

// 메뉴 아이템 타입
export type MenuItem = z.infer<typeof MenuItemSchema>;

// 메뉴 목록 조회 응답 타입
export type GetMenuListResponse = {
  status: string;
  data: {
    list: MenuItem[];
    pageInfo: {
      pageNum: number;
      pageSize: number;
      totalCount: number;
      totalPages: number;
    };
  };
};

// 메뉴 목록 조회 파라미터
export type GetMenuListParams = {
  storeId: number;
  categoryId?: number;
  searchString?: string;
  pageNum?: number;
  pageSize?: number;
};

// 메뉴 생성 요청 바디
export const CreateMenuBody = z.object({
  storeId: z.number(),
  categoryId: z.number(),
  name: z.string().min(1, '메뉴명을 입력해주세요'),
  price: z.number().min(0, '가격은 0원 이상이어야 합니다'),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  sortOrder: z.number().optional(),
  isSignature: z.boolean().optional(),
  isRecommend: z.boolean().optional(),
});

export type CreateMenuBody = z.infer<typeof CreateMenuBody>;

// 메뉴 수정 요청 바디
export const UpdateMenuBody = z.object({
  categoryId: z.number().optional(),
  name: z.string().optional(),
  price: z.number().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  sortOrder: z.number().optional(),
  isSignature: z.boolean().optional(),
  isRecommend: z.boolean().optional(),
});

export type UpdateMenuBody = z.infer<typeof UpdateMenuBody>;

// 메뉴 상세 조회 응답 타입
export type GetMenuDetailResponse = {
  status: string;
  data: MenuItem;
};

// 메뉴 생성 응답 타입
export type CreateMenuResponse = {
  status: string;
  data: MenuItem;
};

// 메뉴 수정 응답 타입
export type UpdateMenuResponse = {
  status: string;
  data: MenuItem;
};