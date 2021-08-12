module.exports = {
    roots: ['<rootDir>/lib', '<rootDir>/functions'],
    testMatch: ['**/*.test.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    }
};