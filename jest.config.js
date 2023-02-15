const path = require('path');
module.exports = {
  rootDir: path.resolve(__dirname),
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  // 别名设置
  moduleNameMapper: {
    '^/@/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // 测试文件
  testMatch: ['<rootDir>/tests/unit/*.spec.ts?(x)'],
  setupFiles: ['<rootDir>/jest.init.js'],
  "snapshotSerializers": [
    // 快照的序列化工具
    "<rootDir>/node_modules/jest-serializer-vue"
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  "coverageThreshold": {
    "global": {
      "branches": 90,
      "functions": 90,
      "statements": 90
    }
  }
};
