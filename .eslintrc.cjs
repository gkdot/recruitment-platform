// apps/web/.eslintrc.cjs
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
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
    plugins: [
      'react',
      'react-hooks',
      'jsx-a11y',
      '@typescript-eslint',
    ],
    rules: {
      // example: allow .tsx without React import in scope
      'react/react-in-jsx-scope': 'off',
    },
  }
  