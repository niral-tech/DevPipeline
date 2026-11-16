// Flat ESLint config (ESLint 9+). Keep this at the repository root as eslint.config.js.
//
// WHY THE globals BLOCKS EXIST
// Flat config does not guess. Unlike the old .eslintrc "env" system, nothing here is inferred
// from your dependencies: if you do not tell ESLint that `require`, `console`, `__dirname`,
// `test` and `expect` exist, the no-undef rule reports every one of them as an error.
// That is the correct behaviour — a linter should not assume which runtime you are targeting —
// but it does mean the globals have to be declared explicitly, once, here.
module.exports = [
  // 1. Never lint generated output. Jest writes an HTML coverage report full of third-party
  //    JavaScript, and `npm run build` writes dist/. Neither is yours to lint.
  {
    ignores: ["coverage/**", "dist/**", "node_modules/**"]
  },

  // 2. Application and tooling code: CommonJS modules running on Node.
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        Buffer: "readonly",
        module: "writable",
        require: "readonly",
        exports: "writable"
      }
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error"
    }
  },

  // 3. Test files additionally get the globals Jest injects at run time.
  //    Jest defines these itself; ESLint has no way to know that, so we say so.
  {
    files: ["test/**/*.js", "**/*.test.js"],
    languageOptions: {
      globals: {
        describe: "readonly",
        test: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        jest: "readonly"
      }
    }
  }
];