import { z } from 'zod';

// 이미지 스키마
export const ImageSchema = z.object({
  id: z.string(),
  url: z.string(),
});

// 메뉴 아이템 스키마
export const MenuItemSchema = z.object({
  id: z.number(),
  storeId: z.number(),
  categoryId: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string().nullable(),
  images: z.array(ImageSchema).optional(), // images 배열로 변경
  imageUrls: z.array(z.string()).optional(), // 하위 호환성 유지
  imageUrl: z.string().nullable().optional(), // 하위 호환성 유지
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
  price: z.number().min(0, '가격은 0원 이상이어야 합니다').optional(),
  description: z.string().min(1, '메뉴 설명을 입력해주세요'),
  imageIds: z.array(z.string()), // 필수 필드 (빈 배열 가능)
  sortOrder: z.number(),
  isSignature: z.boolean(),
  isRecommend: z.boolean(),
});

export type CreateMenuBody = z.infer<typeof CreateMenuBody>;

// 메뉴 수정 요청 바디
export const UpdateMenuBody = z.object({
  storeId: z.number(),
  categoryId: z.number(),
  name: z.string().min(1, '메뉴명을 입력해주세요'),
  price: z.number().min(0, '가격은 0원 이상이어야 합니다').optional(),
  description: z.string().min(1, '메뉴 설명을 입력해주세요'),
  imageIds: z.array(z.string()), // imageUrl에서 imageIds 배열로 변경
  sortOrder: z.number(),
  isSignature: z.boolean(),
  isRecommend: z.boolean(),
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

// 메뉴 정렬 요청 바디
export type SortMenusBody = {
  menuIds: number[];
};

// 메뉴 정렬 응답 타입
export type SortMenusResponse = {
  status: string;
  data: null;
};