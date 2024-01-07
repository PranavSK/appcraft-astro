/** @type {import("eslint").Linter.Config} */
module.exports = {
  plugins: ['solid', 'simple-import-sort', 'unused-imports'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:solid/typescript',
    'plugin:prettier/recommended',
    // Moving astro later since prettier seem to cause issues with astro script blocks.
    'plugin:astro/recommended',
    'plugin:astro/jsx-a11y-recommended',
    'plugin:tailwindcss/recommended'
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
    'simple-import-sort/exports': 'error',
    // Support for eslint-plugin-prettier
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off'
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

        // Disable all solid rules for astro files
        'solid/components-return-once': 'off',
        'solid/event-handlers': 'off',
        'solid/imports': 'off',
        'solid/jsx-no-duplicate-props': 'off',
        'solid/jsx-no-script-url': 'off',
        'solid/jsx-no-undef': 'off',
        'solid/jsx-uses-vars': 'off',
        'solid/no-array-handlers': 'off',
        'solid/no-destructure': 'off',
        'solid/no-innerhtml': 'off',
        'solid/no-proxy-apis': 'off',
        'solid/no-react-deps': 'off',
        'solid/no-react-specific-props': 'off',
        'solid/no-unknown-namespaces': 'off',
        'solid/prefer-classlist': 'off',
        'solid/prefer-for': 'off',
        'solid/prefer-show': 'off',
        'solid/reactivity': 'off',
        'solid/self-closing-comp': 'off',
        'solid/style-prop': 'off'
      }
    }
  ]
}
