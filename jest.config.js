module.exports = {
    preset: 'ts-jest',      // Use ts-jest preset for handling TypeScript
    testEnvironment: 'node', // Set test environment to node for backend testing
    verbose: true,          // Enable verbose output for test results
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',  // Use ts-jest to transform TypeScript files
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore node_modules and dist folder
    collectCoverage: true,  // Enable code coverage
    coverageDirectory: './coverage', // Output directory for code coverage
    moduleFileExtensions: ['ts', 'js', 'json'], // Recognize .ts, .js, and .json file extensions
    testTimeout: 20000,
    globalSetup: './src/test/setup.ts'
  };
  