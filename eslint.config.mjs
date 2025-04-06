import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    plugins: { js },
    extends: ["js/recommended"],
    settings: {
      react: {
        version: "detect", 
      },
    },
    rules: {
      "react/prop-types": "off", 
      "react/react-in-jsx-scope": "off", 
      "@typescript-eslint/no-floating-promises": "off", 
      "@typescript-eslint/explicit-function-return-type": "off", 
      "@typescript-eslint/no-misused-promises": "off", 
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);