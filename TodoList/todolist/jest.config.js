module.exports = {
    testEnvironment: 'jsdom', // Use jsdom as the test environment
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Use Babel for transforming JSX
    },
    moduleDirectories: ['node_modules', '.'],
    moduleNameMapper: {
    "^react(.*)$": "<rootDir>/node_modules/react$1"}
  };
  