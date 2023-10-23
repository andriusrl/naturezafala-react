const assetsKey =
  "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$";

const config = {
  clearMocks: true,

  collectCoverage: true,

  coverageDirectory: "coverage",

  coveragePathIgnorePatterns: ["/node_modules/", "config/tests"],

  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "\\.svg$": "<rootDir>/src/config/tests/mocks/svg.ts",
    // [assetsKey]: "ts-jest",
    // "react-leaflet": "<rootDir>/src/test/__mocks __/reactLeafletMock.js",
  },

  roots: ["<rootDir>"],

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  testEnvironment: "jsdom",

  transform: {
    "^.+\\.tsx?$": "ts-jest",
    [assetsKey]: "ts-jest",
    "\\.svg$": "ts-jest",
  },
};

export default config;
