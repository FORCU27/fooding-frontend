import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import _import from "eslint-plugin-import";
import onlyWarn from "eslint-plugin-only-warn";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const baseExtends = compat.config({
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
});

/** @type {import('eslint').Linter.Config} */
export default [
  {
    ignores: [
      "dist/**/*",
      "node_modules/**/*",
      ".next/**/*",
      ".github/**/*",
      "**/*.test.js",
      "**/*.test.ts",
      "**/*.test.tsx",
    ],
  },
  ...baseExtends,
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      import: _import,
      prettier,
      "only-warn": onlyWarn,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser },
    },
    settings: {
      "import/resolver": { typescript: {} },
      react: { version: "detect" },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-use-before-define": [
        "error",
        {
          functions: false,
          classes: true,
          variables: false,
          allowNamedExports: false,
        },
      ],

      "react/jsx-filename-extension": [
        2,
        { extensions: [".js", ".jsx", ".ts", ".tsx"] },
      ],

      "react/function-component-definition": [
        "error",
        { namedComponents: ["arrow-function", "function-declaration"] },
      ],

      "import/extensions": ["error", "never"],
      "import/no-extraneous-dependencies": [
        "error",
        { devDependencies: true, peerDependencies: true },
      ],

      "import/order": [
        "error",
        {
          "newlines-between": "always",
          groups: [
            ["builtin", "external"],
            ["internal", "parent", "sibling", "index"],
          ],
          pathGroups: [
            { pattern: "react", group: "builtin", position: "before" },
            { pattern: "next/*", group: "external", position: "before" },
            { pattern: "@/**", group: "internal" },
          ],
          alphabetize: { order: "asc", caseInsensitive: true },
          pathGroupsExcludedImportTypes: ["builtin"],
        },
      ],
    },
  },
];
