module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  parserOptions:  {
    sourceType:  'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    "no-console": "error",
    "max-len": ['error', 120, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: false,
      ignoreTemplateLiterals: false,
    }],
    "comma-dangle": ["error", {
      "arrays": "only-multiline",
      "objects": "only-multiline",
      "imports": "only-multiline",
      "exports": "only-multiline",
      "functions": "only-multiline"
    }]
  },
  settings:  {
    react:  {
      version:  'detect',
    },
  },
};
