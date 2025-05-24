import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { renderWithProviders } from './utils';
import { Example } from './Example';

describe('Example', () => {
  renderWithProviders(<Example />);

  test('정상적으로 렌더링되어야 합니다.', () => {
    expect(screen.getByText('컴포넌트')).toBeInTheDocument();
  });
});
