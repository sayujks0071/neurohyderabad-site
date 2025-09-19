import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      ecmaVersion: 2021,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
