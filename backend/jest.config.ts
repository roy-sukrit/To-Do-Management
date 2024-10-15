// jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['**/__test__/**/*.test.ts'], // Matches test files in __test__ folder
  collectCoverage: true,
  coverageDirectory: 'coverage',
};

export default config;
