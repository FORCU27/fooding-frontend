import { z } from 'zod/v4';

import { ApiResponse } from '../../shared';

export const REGULAR_HOLIDAY_TYPES = ['WEEKLY', 'MONTHLY'] as const;
export type RegularHolidayType = (typeof REGULAR_HOLIDAY_TYPES)[number];

export const DAY_OF_WEEK = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
] as const;
export type DayOfWeek = (typeof DAY_OF_WEEK)[number];

export type CreateStoreBody = {
  name: string;
};

export type CreateStorePointShopItemBody = {
  name: string;
  point: number;
  provideType: 'ALL' | 'REGULAR_CUSTOMER';
  conditions: string;
  totalQuantity: number;
  issueStartOn: string | null;
  issueEndOn: string | null;
  imageId?: string;
  isActive?: boolean;
};

export interface PointShopQuery {
  searchString?: string;
  pageNum?: number;
  pageSize?: number;
  isActive?: boolean;
  sortType?: string;
}

export const PointShop = z.object({
  id: z.number(),
  name: z.string(),
  point: z.number(),
  provideType: z.enum(['ALL', 'REGULAR_CUSTOMER']),
  conditions: z.string(),
  isActive: z.boolean(),
  totalQuantity: z.number(),
  issuedQuantity: z.number(),
  issueStartOn: z.string().nullable(),
  issueEndOn: z.string().nullable(),
  createdAt: z.string(),
  image: z
    .object({
      id: z.string(),
      name: z.string(),
      url: z.string(),
      size: z.number(),
    })
    .nullable(),
});

export type PointShop = z.infer<typeof PointShop>;

export const SubwayStation = z.object({
  id: z.number(),
  name: z.string(),
  line: z.string(),
  address: z.string(),
});

export const Store = z.object({
  id: z.number(),
  ownerId: z.number(),
  name: z.string(),
  regionId: z.string().nullable(),
  address: z.string(),
  addressDetail: z.string().nullable(),
  category: z.enum([
    'PORK',
    'MEAT',
    'CHICKEN',
    'JAPANESE',
    'WESTERN',
    'CHINESE',
    'KOREAN',
    'ASIAN',
    'LUNCHBOX_PORRIDGE',
    'CAFE_DESSERT',
    'BURGER',
    'SALAD',
    'SNACK',
    'SEAFOOD',
    'SIDE_DISH',
  ]),
  description: z.string(),
  contactNumber: z.string(),
  direction: z.string(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  visitCount: z.number(),
  reviewCount: z.number(),
  bookmarkCount: z.number(),
  stations: z.array(z.any()),
});

export type Store = z.infer<typeof Store>;

export const DailyOperatingTimeSchema = z.object({
  id: z.number(),
  dayOfWeek: z.enum(DAY_OF_WEEK),
  openTime: z.string().nullable(),
  closeTime: z.string().nullable(),
});

export const DailyBreakTimeSchema = z.object({
  id: z.number(),
  dayOfWeek: z.enum(DAY_OF_WEEK),
  breakStartTime: z.string().nullable(),
  breakEndTime: z.string().nullable(),
});

export const StoreOperatingHourSchema = z.object({
  id: z.number(),
  hasHoliday: z.boolean(),
  regularHolidayType: z.enum(REGULAR_HOLIDAY_TYPES).nullable(),
  regularHoliday: z.enum(DAY_OF_WEEK).nullable(),
  closedNationalHolidays: z.array(z.string()),
  customHolidays: z.array(z.string()),
  operatingNotes: z.string().nullable(),

  dailyOperatingTimes: z.array(DailyOperatingTimeSchema),
  dailyBreakTimes: z.array(DailyBreakTimeSchema),
});

export interface DailyOperatingTime {
  id?: number;
  dayOfWeek: DayOfWeek;
  openTime: string | null;
  closeTime: string | null;
}

export interface DailyBreakTime {
  id?: number;
  dayOfWeek: DayOfWeek;
  breakStartTime: string | null;
  breakEndTime: string | null;
}

export interface StoreOperatingHour {
  id: number;
  hasHoliday: boolean;
  regularHolidayType: RegularHolidayType | null;
  regularHoliday: DayOfWeek | null;
  closedNationalHolidays: string[];
  customHolidays: string[];
  operatingNotes: string | null;

  dailyOperatingTimes: DailyOperatingTime[];
  dailyBreakTimes: DailyBreakTime[];
}

export interface StoreOperatingHourBody {
  hasHoliday: boolean;
  regularHolidayType: RegularHolidayType | null;
  regularHoliday: DayOfWeek | null;
  closedNationalHolidays: string[];
  customHolidays: string[];
  operatingNotes: string;
  dailyOperatingTimes: DailyOperatingTime[];
  dailyBreakTimes: DailyBreakTime[];
}

export const GetStoreOperatingHourResponse = z.object({
  status: z.string(),
  data: StoreOperatingHourSchema,
});
export type StoreOperatingHourType = z.infer<typeof StoreOperatingHourSchema>;
export type GetStoreOperatingHourResponseType = z.infer<typeof GetStoreOperatingHourResponse>;

export const GetStoreResponse = ApiResponse(Store);
export const GetStoreListResponse = ApiResponse(z.array(Store));

export type GetStore = z.infer<typeof GetStoreResponse>;
export type GetStoreList = z.infer<typeof GetStoreListResponse>;

export const GetStorePointShopResponse = ApiResponse(PointShop);
export const GetStorePointShopListResponse = z.object({
  status: z.string().nullable(),
  data: z.object({
    list: z.array(PointShop),
    pageInfo: z.object({
      pageNum: z.number(),
      pageSize: z.number(),
      totalCount: z.number(),
      totalPages: z.number(),
    }),
  }),
});
export type GetStorePointShopStatusResponse = z.infer<typeof GetStorePointShopStatusResponse>;
export const GetStorePointShopStatusResponse = z.object({
  status: z.string(),
  data: z.null(),
});
export type GetStorePointShopNullResponse = z.infer<typeof GetStorePointShopNullResponse>;
export const GetStorePointShopNullResponse = z.object({
  status: z.string(),
  data: z.null(),
});

export type CreateStorePointShopResponse = z.infer<typeof CreateStorePointShopResponse>;
export const CreateStorePointShopResponse = z.object({
  status: z.string(),
  data: z.number(),
});

export type UpdateStoreBody = {
  name: Store['name'];
  regionId: Store['regionId'];
  address: Store['address'];
  addressDetail: Store['addressDetail'];
  category: Store['category'];
  description: Store['description'];
  contactNumber: Store['contactNumber'];
  direction: Store['direction'];
  latitude: Store['latitude'];
  longitude: Store['longitude'];
};

export const CeoStoreStatisticsResponse = z.object({
  totalSales: z.number(),
  totalSalesChangeRate: z.number(),
  totalVisitors: z.number(),
  visitorChangeRate: z.number(),
  annualTargetSalesRate: z.number(),
  currentWaitingCount: z.number(),
  expectedWaitingTime: z.number(),
  lastEntranceMinutesAgo: z.number(),
});

export type CeoStoreStatistics = z.infer<typeof CeoStoreStatisticsResponse>;

export const GetStoreStatisticsResponse = ApiResponse(CeoStoreStatisticsResponse);

export type GetStoreStatisticsParams = {
  storeId: number;
  date: string; // YYYY-MM-DD format
};
