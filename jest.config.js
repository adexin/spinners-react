module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '.css$': '<rootDir>/jest-config/style-mock.js',
  },
};
