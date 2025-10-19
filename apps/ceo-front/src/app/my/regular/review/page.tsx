'use client';

import { CardForm } from '@repo/design-system/components/ceo';

import { ReviewCard } from './components/ReviewCard';

const ReviewPage = () => {
  return (
    <CardForm className=''>
      <div className='headline-2'>리뷰</div>
      <ReviewCard
        author='민수엄마'
        date='2025.10.10'
        rating={3}
        content='잘먹었습니다. 감사합니다. 단골인데 항상 챙겨주시고 사장님도 너무 친절해요~^^ 어쩌구 저쩌구 너무 맛잇고 맛좋코 또 오고싶고 어쩌ㅇ구쩌구...잘먹었습니다. 감사합니다. 단골인데 항상 챙겨주시고 사장님도 너무 친절해요~^^ 어쩌구 저쩌구 너무 맛잇고 맛좋코 또 오고싶고 어쩌ㅇ구쩌구...잘먹었습니다. 감사합니다. 단골인데 항상 챙겨주시고 사장님도 너무 친절해요~^^ 어쩌구 저쩌구 너무 맛잇고 맛좋코 또 오고싶고 어쩌ㅇ구쩌구...'
      />
      <ReviewCard
        author='훈이엄마'
        date='2025.10.08'
        rating={4}
        content='잘먹었습니다. 감사합니다. 단골인데 항상 챙겨주시고 사장님도 너무 친절해요~^^ 어쩌구 저쩌구 너무 맛잇고 맛좋코 또 오고싶고 어쩌ㅇ구쩌구...잘먹었습니다. 감사합니다. 단골인데 항상 챙겨주시고 사장님도 너무 친절해요~^^ 어쩌구 저쩌구 너무 맛잇고 맛좋코 또 오고싶고 어쩌ㅇ구쩌구...잘먹었습니다. 감사합니다. 단골인데 항상 챙겨주시고 사장님도 너무 친절해요~^^ 어쩌구 저쩌구 너무 맛잇고 맛좋코 또 오고싶고 어쩌ㅇ구쩌구...'
      />
    </CardForm>
  );
};

export default ReviewPage;
