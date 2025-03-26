import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import _import from 'eslint-plugin-import';
import onlyWarn from 'eslint-plugin-only-warn';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const baseConfig = compat.config({
  extends: [
    'next/core-web-vitals',
    'eslint-config-next',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
});

const eslintConfig = [
  {
    ignores: [
      'dist/**/*',
      'node_modules/**/*',
      '.next/**/*',
      '.github/**/*',
      '**/*.test.js',
      '**/*.test.ts',
      '**/*.test.tsx',
    ],
  },
  ...baseConfig,
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: _import,
      prettier,
      'only-warn': onlyWarn,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
      react: {
        version: 'detect',
      },
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          jsxSingleQuote: true,
          quoteProps: 'as-needed',
          endOfLine: 'lf',
        },
      ],
      quotes: ['warn', 'single'],
      indent: 'off',
      'no-tabs': 'off',
      'no-console': 'warn',
      'no-shadow': 'off',
      'no-restricted-exports': 'off',
      'no-param-reassign': 'off',

      'no-use-before-define': [
        'error',
        {
          functions: false,
          classes: true,
          variables: false,
          allowNamedExports: false,
        },
      ],

      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      'react/jsx-no-constructed-context-values': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/no-unstable-nested-components': 'off',

      'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],

      'react/function-component-definition': [
        'error',
        {
          namedComponents: ['arrow-function', 'function-declaration'],
        },
      ],

      'import/prefer-default-export': 'off',
      'import/no-unresolved': 'off',
      'import/extensions': ['error', 'never'],
      'import/no-anonymous-default-export': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          peerDependencies: true,
        },
      ],

      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          groups: [
            ['builtin', 'external'],
            ['internal', 'parent', 'sibling', 'index'],
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: 'next/*',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
      'default-param-last': 'off',
      'arrow-body-style': 'off',
      'operator-linebreak': 'off',
      'implicit-arrow-linebreak': 'off',
      'template-tag-spacing': ['error', 'never'],
      'class-methods-use-this': 'off',
      'next/no-page-custom-font': 'off',
      'next/no-html-link-for-pages': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-duplicate-enum-values': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
];

export default eslintConfig;
