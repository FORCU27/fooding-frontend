import { config as baseConfig } from "./base.js";
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
      "react/prop-types": "off",
      "@next/next/no-img-element": "off",
    },
  },
];
