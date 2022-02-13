module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    quotes: ["error", "double"],
    "max-len": ["error", { "ignoreStrings": true }],
    "new-cap": "off",
  },
  parserOptions: {
    "ecmaVersion": 8,
    "sourceType": "module"
  },
};
