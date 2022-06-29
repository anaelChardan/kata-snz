/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testMatch: ['**/*.integration.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
