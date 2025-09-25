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

export const StoreOperatingHour = z.object({
  id: z.number(),
  hasHoliday: z.boolean(),
  regularHolidayType: z.enum(REGULAR_HOLIDAY_TYPES),
  regularHoliday: z.enum(DAY_OF_WEEK),
  closedNationalHolidays: z.string().array(),
  customHolidays: z.string().array(),
  operatingNotes: z.string(),
  dailyOperatingTimes: z.object({
    dayOfWeek: z.enum(DAY_OF_WEEK),
    openTime: z.string(),
    closeTime: z.string(),
    breakStartTime: z.string(),
    breakEndTime: z.string(),
  }),
});

export const StoreOperatingHourBody = z.object({
  hasHoliday: z.boolean(),
  regularHolidayType: z.enum(REGULAR_HOLIDAY_TYPES),
  regularHoliday: z.enum(DAY_OF_WEEK).array(),
  closedNationalHolidays: z.string().array(),
  customHolidays: z.string().array(),
  operatingNotes: z.string(),
  dailyOperatingTimes: z.array(
    z.object({
      dayOfWeek: z.enum([
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
        'SUNDAY',
      ]),
      openTime: z.string(),
      closeTime: z.string(),
      breakStartTime: z.string(),
      breakEndTime: z.string(),
    }),
  ),
});

export const GetStoreOperatingHourResponse = ApiResponse(StoreOperatingHour);

export const GetStoreResponse = ApiResponse(Store);
export const GetStoreListResponse = ApiResponse(z.array(Store));

export type GetStore = z.infer<typeof GetStoreResponse>;
export type GetStoreList = z.infer<typeof GetStoreListResponse>;

export type StoreOperatingHourBody = z.infer<typeof StoreOperatingHourBody>;

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
