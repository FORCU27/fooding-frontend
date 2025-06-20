import { config } from '@repo/eslint-config/base';

export default [
  ...config,
  {
    ignores: ['**/*.stories.tsx'],
  },
];
