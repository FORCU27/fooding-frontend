import { eslintConfig } from "@repo/eslint-config";

export default [
  ...eslintConfig,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    ignores: ["**/*.config.js", "!**/eslint.config.js"],
    settings: {
      "import/resolver": {
        typescript: {},
      },

      react: {
        version: "detect",
      },
    },
  },
];
