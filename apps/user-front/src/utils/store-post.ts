/**
 * 가게 소식 태그의 색상
 */
export const getStorePostTagColor = (tag: string): 'red' | 'gray' => {
  if (tag === '대표') {
    return 'red';
  }

  return 'gray';
};
