module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["react", "react-refresh", "react-hooks", "@typescript-eslint", "prettier"],
  rules: {
    // for react
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-key": "error",
    "react/display-name": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "react/no-unstable-nested-components": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

    // for eslint
    "no-useless-return": "error",
    "no-unused-vars": "warn",
    "no-console": "warn",
    "no-duplicate-imports": "error",
    "array-callback-return": "error",

    complexity: ["error", 15],
    semi: ["error", "always"],

    // for typescript eslint
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "typeLike",
        format: ["PascalCase"],
      },
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",

    // an other rules
    "no-restricted-syntax": [
      "error",
      {
        selector: "Literal[value=/domain.com/i]",
        message: "Do not use hardcoded URLs. Use environment variables instead.",
      },
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name=/^(log|info|trace)$/]",
        message:
          "Only use console.info, console.trace, and console.log for development or debugging purposes.",
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        moduleDirectory: ["node_modules", "src/"],
        extensions: [".ts", ".tsx"],
      },
    },
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["dist", ".eslintrc.cjs", "commitlint.config.cjs", "vite.config.ts"],
};
