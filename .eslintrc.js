/** @type {import('eslint').Linter.Config} */
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "plugin:tailwindcss/recommended",
    "prettier"
  ],
  parserOptions: {
    "project": ["./tsconfig.json"]
  },
  rules: {
    "indent": ["error", 2],
    "semi": "error",
    "no-console": "warn",
    "arrow-body-style": ["warn", "as-needed"],
    // @typescript-eslint
    "@typescript-eslint/return-await": ["error", "in-try-catch"],
    "@typescript-eslint/no-duplicate-imports": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "args": "all",
        "argsIgnorePattern": "^_",
        "destructuredArrayIgnorePattern": "^_",
        "ignoreRestSiblings": false
      }
    ],
    //import
    "import/no-unresolved": "error",
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal"],
        "pathGroups": [{
          "pattern": "react",
          "group": "external",
          "position": "before"
        }],
        "pathGroupsExcludedImportTypes": ["react"],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ]
  },
};
