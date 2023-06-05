/** @type {import('@jest/types').Config.InitialOptions} */
const nextJest = require("next/jest");

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({
    dir: "./",
});

// Any custom config you want to pass to Jest
const customJestConfig = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // 각각의 테스트 전에 실행할 모듈을 경로
    moduleDirectories: ["node_modules", "<rootDir>/"],
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1", // tsconfig에서 절대경로 사용 시에 jest가 인식하도록 경로 매핑
    },
};

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
module.exports = createJestConfig(customJestConfig);
