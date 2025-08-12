// apps/web/.eslintrc.cjs
module.exports = {
    root: true,
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier', // must be last to override ESLint rules that conflict with Prettier
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: [
      'react',
      'react-hooks',
      'jsx-a11y',
      '@typescript-eslint',
    ],
    rules: {
      'react/react-in-jsx-scope': 'off'
    },
  }
  