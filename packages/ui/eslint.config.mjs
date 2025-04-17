import baseConfig from '@repo/eslint-config/base';

export default [
  ...baseConfig,
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    ignores: ['**/*.config.js', '!**/eslint.config.js'],
    settings: {
      'import/resolver': {
        typescript: {},
      },

      react: {
        version: 'detect',
      },
    },
  },
];
