import { GetRecommendedKeywordsResponse } from './type';

export const mockRecommendedKeywords: GetRecommendedKeywordsResponse = {
  status: 'OK',
  data: [
    '고기',
    '고기집',
    '고기뷔페',
    '고기국수',
    '고기국밥',
    '고기만두',
    '고기요리',
    '고기집맛집',
    '고기집추천',
    '고기집베스트',
    '고기집리스트',
    '고기집순위',
    '고기집예약',
    '고기집할인',
  ],
};

export const mockEmptyRecommendedKeywords: GetRecommendedKeywordsResponse = {
  status: 'OK',
  data: [],
};
