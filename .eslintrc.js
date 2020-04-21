module.exports = {
  extends: ['airbnb-typescript'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'react/jsx-props-no-spreading': ['error', {
      html: 'ignore',
      exceptions: ['Component'],
    }],
    'react/jsx-sort-props': ['error'],
    'import/order': ['error'],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
}
