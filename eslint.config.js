import prettier from 'eslint-plugin-prettier'
import tsEslint from '@typescript-eslint/eslint-plugin'
import tailwindcss from 'eslint-plugin-tailwindcss'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    files: ['*.ts', '*.tsx'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsEslint,
      prettier: prettier,
      tailwindcss: tailwindcss,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    files: ['*.js', '*.jsx'],
    plugins: {
      prettier: prettier,
      tailwindcss: tailwindcss,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
]
