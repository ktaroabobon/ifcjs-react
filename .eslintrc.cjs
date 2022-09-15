module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-empty-function": ["off"],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "jsx" },
    ],
    "@typescript-eslint/ban-types": ["warn"],
    "react/jsx-key": ["error"],
    // propsの ({ hoge }) みたいな展開が怒られるの面倒なのでignore
    "react/prop-types": ["off"],
    "react/react-in-jsx-scope": ["off"],
    "react/jsx-uses-react": ["off"],
  },
};
