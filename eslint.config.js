import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { reactRefresh } from 'eslint-plugin-react-refresh';

export default tseslint.config(
  { ignores: ['dist'] },
  reactRefresh.configs.vite({ allowConstantExport: true }),
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...reactHooks.configs['recommended-latest'].rules,
      // TODO: New v7 rules flagging patterns that need dedicated refactoring
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'max-len': ['error', { ignorePattern: 'd="([\\s\\S]*?)"', code: 120 }],
      'semi': ['warn', 'always'],
      'comma-dangle': [
        'warn',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'never',
          exports: 'always-multiline',
          functions: 'always-multiline',
        },
      ],
      'comma-spacing': ['error', { before: false, after: true }],
      'quotes': ['error', 'single'],
      'object-curly-spacing': ['error', 'always'],
      'indent': ['error', 2],
      'no-trailing-spaces': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-max-props-per-line': [1, { when: 'multiline' }],
      'react/self-closing-comp': ['error', { component: true, html: true }],
    },
  },
);
