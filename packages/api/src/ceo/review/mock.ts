import { GetReviewParams, GetReviewResponse, Review } from './type';

export const mockReviewListResponse = (params: GetReviewParams): GetReviewResponse => {
  const { pageNum, pageSize } = params;

  return {
    status: 'OK',
    data: {
      pageInfo: {
        pageNum: pageNum,
        pageSize: pageSize,
        totalCount: mockReviewList.length,
        totalPages: Math.ceil(mockReviewList.length / pageSize),
      },
      list: mockReviewList.slice((pageNum - 1) * pageSize, pageNum * pageSize),
    },
  };
};

export const mockEmptyReviewListResponse: GetReviewResponse = {
  status: 'OK',
  data: {
    pageInfo: {
      pageNum: 1,
      pageSize: 20,
      totalCount: 0,
      totalPages: 0,
    },
    list: [],
  },
};

const mockReviewList: Review[] = Array.from({ length: 80 }, (_, index) => ({
  id: index + 1,
  storeId: index + 1,
  writerId: index + 1,
  content:
    index % 3 === 0
      ? '잘먹었습니다. 감사합니다. 단골인데 항상 챙겨주시고 사장님도 너무 친절해요~^^ 어쩌구 저쩌구 너무 맛잇고 맛좋코 또 오고싶고 어쩌ㅇ구쩌구...잘먹었습니다. 감사합니다. 단골인데 항상 챙겨주시고 사장님도 너무 친절해요~^^ 어쩌구 저쩌구 너무 맛잇고 맛좋코 또 오고싶고 어쩌ㅇ구쩌구...잘먹었습니다. 감사합니다. 단골인데 항상 챙겨주시고 사장님도 너무 친절해요~^^ 어쩌구 저쩌구 너무 맛잇고 맛좋코 또 오고싶고 어쩌ㅇ구쩌구...'
      : '분위기와 가격 모두 좋았읍니다~~~~~~~~~~!',
  visitPurposeType: index % 3 === 0 ? 'MEETING' : index % 3 === 1 ? 'DATE' : 'FRIEND',
  totalScore: index % 2 === 0 ? 3 : 5,
  tasteScore: index % 4 === 0 ? 2 : 3,
  moodScore: index % 5 === 0 ? 1 : 4,
  serviceScore: index % 3 === 0 ? 4 : 5,
}));
