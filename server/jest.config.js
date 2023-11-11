/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'],
  clearMocks: true,
  forceExit: true,
  setupFiles: ['<rootDir>/.jest/setEnv.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'reports/coverage',
  testTimeout: 5000,
};
