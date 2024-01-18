/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:solid/typescript',
    'plugin:prettier/recommended',
    'plugin:perfectionist/recommended-natural',
    // Moving astro later since prettier seem to cause issues with astro script blocks.
    'plugin:astro/recommended',
    'plugin:astro/jsx-a11y-recommended',
    'plugin:tailwindcss/recommended'
  ],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        extraFileExtensions: ['.astro'],
        parser: '@typescript-eslint/parser'
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
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname
  },
  plugins: ['solid', 'unused-imports'],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        disallowTypeAnnotations: true,
        fixStyle: 'separate-type-imports',
        prefer: 'type-imports'
      }
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        vars: 'all'
      }
    ],
    'no-alert': 'error',
    'no-console': 'error'
  },
  settings: {
    tailwindcss: {
      callees: ['cx', 'cva']
    }
  }
}
