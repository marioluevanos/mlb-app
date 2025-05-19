//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config';

export default [
  ...tanstackConfig,
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      'eslint.config.js',
      'prettier.config.js',
      'vite.config.js',
    ],
    rules: {
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
];
