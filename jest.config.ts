export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    ".css$": "<rootDir>/jest-config/style-mock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest-config/jest-dom.ts"],
};
