module.exports = {
  root: true,
  ignorePatterns: ['coverage/'],
  extends: ['airbnb', 'airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
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
};
