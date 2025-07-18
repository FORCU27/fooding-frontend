import { getStorePostTagColor } from './store-post';

describe('getStorePostTagColor', () => {
  test('대표 태그는 빨간색이어야 합니다.', () => {
    const color = getStorePostTagColor('대표');
    expect(color).toBe('red');
  });

  test('나머지 모든 태그는 회색이어야 합니다.', () => {
    const color = getStorePostTagColor('기타');
    expect(color).toBe('gray');
  });
});
