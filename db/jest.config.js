// for any MFE that is externalized by the webpack and import maps
// add mock impl mapping into moduleNameMapper.
// see example below for @template-ui/shared
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(j|t)sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|scss|png|jpg)$": "identity-obj-proxy",
    "@template-ui/main": "<rootDir>/src/__test-mocks__/main.js",
    "@template-ui/auth": "<rootDir>/src/__test-mocks__/auth.js",
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
  testMatch: ['<rootDir>/src/**/*.test.{tsx,ts}'],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/__test-mocks__/**/*",
    "!src/types/**/*",
  ],
  coverageReporters: ["clover", "json", "lcov", "text", "text-summary"],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 30,
      branches: 8,
      functions: 20,
      lines: 30,
    },
  },
};
