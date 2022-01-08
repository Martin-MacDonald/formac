module.exports = {
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  verbose: true,
  testEnvironment: 'jsdom'
};
