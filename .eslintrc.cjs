/** @type {import("eslint").Linter.Config} */
module.exports = {
  plugins: ['solid', 'simple-import-sort', 'unused-imports'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:solid/recommended',
    'plugin:astro/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  settings: {
    tailwindcss: {
      callees: ['cx', 'cva']
    }
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_'
      }
    ],
    'no-console': 'error',
    'no-alert': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error'
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      }
    }
  ]
}
