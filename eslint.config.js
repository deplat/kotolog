import prettier from 'eslint-plugin-prettier'
import tsEslint from '@typescript-eslint/eslint-plugin'
import tailwindcss from 'eslint-plugin-tailwindcss'
import tsParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import next from '@next/eslint-plugin-next'
import importPlugin from 'eslint-plugin-import'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default [
  {
    files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsEslint,
      prettier,
      tailwindcss,
      react,
      '@next/next': next,
      import: importPlugin,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      // Prettier rules
      'prettier/prettier': 'error',

      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warns about unused variables except if prefixed with "_"
      '@typescript-eslint/consistent-type-imports': 'warn', // Enforces the use of type-only imports for TypeScript

      // React rules
      'react/jsx-key': 'error',
      'react/react-in-jsx-scope': 'off',

      // Next.js rules
      '@next/next/no-img-element': 'warn',
      '@next/next/no-html-link-for-pages': ['warn', './app'],

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error', // Checks rules of hooks
      'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies

      // Tailwind CSS rules (optional settings in tailwind.config.ts)
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off',

      // Import plugin rules
      'import/order': [
        'warn',
        {
          groups: [['builtin', 'external'], 'internal', ['sibling', 'parent'], 'index', 'object'],
          'newlines-between': 'always',
        },
      ],
      'import/newline-after-import': 'off',
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'error',

      // Accessibility rules
      'jsx-a11y/anchor-is-valid': 'warn', // Ensure anchor links are valid
      'jsx-a11y/alt-text': 'warn', // Ensure images have alt text
      'jsx-a11y/no-autofocus': 'warn', // Avoid auto-focus for accessibility
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
      tailwindcss: {
        config: './tailwindcss.config.ts',
      },
    },
  },
]
