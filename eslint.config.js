//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores([
    '.storybook/**',
    'eslint.config.js',
    'prettier.config.js',
    'vite.config.js',
  ]),
  ...tanstackConfig,
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      'eslint.config.js',
      'prettier.config.js',
      'vite.config.js',
    ],

    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': ['error'],
      'react-hooks/exhaustive-deps': ['error'],
      '@typescript-eslint/array-type': ['warn'],
      '@typescript-eslint/naming-convention': ['off'],
      '@typescript-eslint/no-unnecessary-condition': ['off'],
      '@typescript-eslint/prefer-for-of': ['off'],
      'no-shadow': ['off'],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
]);
