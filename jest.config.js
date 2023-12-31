/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['dist'],
  resolver: 'jest-ts-webcompat-resolver',
  coveragePathIgnorePatterns: [
    'src/app.ts',
    'src/index.ts',
    'src/entities/*.ts',
    'src/types/*.ts',
    'src/repos/users/users.mongo.model.ts',
    'src/router/users.router.ts',
    'src/repos/votes/votes.mongo.model.ts',
    'src/repos/offers/offers.mongo.model.ts',
    'src/router/offers.router.ts',
  ],
};
