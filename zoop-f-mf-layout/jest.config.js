module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '\\.(svg|png)': '<rootDir>/src/utils/tests/fileMock.ts',
  },
};
