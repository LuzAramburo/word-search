module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "max-len": ["error", { code: 120 }],
    "semi": ["warn", "always"],
    "comma-dangle": ["warn", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "never",
      "exports": "always-multiline",
      "functions": "always-multiline"
    },
    ],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "quotes": ["error", "single"],
    "object-curly-spacing": ["error", "always"],
    "indent": ["error", 2],
    "no-trailing-spaces": "error",
    "react/react-in-jsx-scope": "off",
    "react/jsx-max-props-per-line": [1, { "when": "multiline" }]
  },
}
