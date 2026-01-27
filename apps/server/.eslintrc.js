/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/index.js"],
  env: {
    node: true,
    es2021: true
  },
  // Override parser for JS files if necessary, or ensure we ignore TS specific rules that conflict
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off" 
      }
    }
  ]
};
