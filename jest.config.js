module.exports = {
  resetMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  unmockedModulePathPatterns: ["node_modules"],
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>/$1",
  }
};
