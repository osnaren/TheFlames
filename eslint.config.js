/* eslint-disable import/no-extraneous-dependencies */
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...compat.extends(
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    plugins: {
      react,
      prettier,
      import: importPlugin,
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        alias: {
          map: [
            ['@', './'],
            ['@src', './src'],
            ['@os/theflames-src', './src'],
            ['@assets', './src/assets'],
            ['@styles', './src/styles'],
            ['@components', './src/components'],
            ['@features', './src/features'],
            ['@lib', './src/lib'],
            ['@hooks', './src/lib/hooks'],
            ['@services', './src/lib/services'],
            ['@constants', './src/lib/constants'],
            ['@utils', './src/lib/utils'],
            ['@utilities', './src/utilities'],
            ['@pages', './src/pages'],
            ['@types', './src/types'],
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          project: './tsconfig.json',
        },
      },
    },

    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': 'off',
      'import/prefer-default-export': 'off',
      'no-console': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-underscore-dangle': ['error', { allow: ['__dirname', '__filename'] }],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      // Fix JSX in TSX files warning
      'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    },
  },
];
