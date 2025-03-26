module.exports = {
  verbose: true,
  testRegex: ['.*\\.test\\.ts$'],
  testPathIgnorePatterns: ['/node_modules/'],
  // Referred https://github.com/jest-community/jest-extended
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  moduleDirectories: ['node_modules'],
  preset: 'ts-jest',
  maxWorkers: '50%',
  coverageReporters: ['lcov'],
};
