import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { 
    languageOptions: { 
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true }
      },
      globals: {
        document: true,
        window: true,
        test: true,
        expect: true,
        localStorage: true,
        URLSearchParams: true,
        process: true
      }
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: 'React|App' }]
    }
  },
  pluginJs.configs.recommended,
  {
    plugins: { react: pluginReact, "react-hooks": pluginReactHooks },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
      // Enable the hooks plugin and keep exhaustive-deps as a warning by default (can adjust per-file)
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
  }
]
