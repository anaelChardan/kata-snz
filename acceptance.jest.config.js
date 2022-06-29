/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testMatch: ['**/*.acceptance.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
