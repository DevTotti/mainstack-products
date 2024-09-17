module.exports = {
    roots: ['<rootDir>/test'],  // Ensure tests run from the 'test' folder
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
  };
  