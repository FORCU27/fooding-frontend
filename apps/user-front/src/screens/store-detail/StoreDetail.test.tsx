import { renderWithProviders } from '@/tests/utils';
import { StoreDetailScreen } from './StoreDetail';
import { screen } from '@testing-library/dom';

describe('StoreDetailScreen', () => {
  test('가게 이름이 정상적으로 표시되어야 합니다.', async () => {
    renderWithProviders(<StoreDetailScreen params={{ storeId: 1 }} />);

    const storeName = await screen.findByTestId('store-name');
    expect(storeName).toBeInTheDocument();
  });
});
