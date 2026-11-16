module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.js"],
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov", "json-summary"]
}