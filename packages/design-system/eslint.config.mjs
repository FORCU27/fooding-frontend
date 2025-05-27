import eslintConfig from '@repo/eslint-config/next';

export default [
  ...eslintConfig,
  {
    ignores: ['**/*.stories.tsx'],
  },
];
