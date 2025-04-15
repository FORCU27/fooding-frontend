import baseConfig from "./base.js";
import pluginNext from "@next/eslint-plugin-next";

/** @type {import('eslint').Linter.Config} */
export default [
  ...baseConfig,
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
];

// {
//   extends: ["next/core-web-vitals", "eslint-config-next"],
// },
