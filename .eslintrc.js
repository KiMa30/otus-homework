module.exports = {
  env: {
    'codeceptjs/codeceptjs': true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['standard', 'prettier'],
  plugins: ['codeceptjs'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['tests/**/*.test.js'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      env: {
        jest: true,
      },
    },
    {
      files: [
      'step_definitions/*.js',
      'bdd_tests/**/*.js',
      ],
      extends: ['plugin:codeceptjs/recommended'],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // "codeceptjs/no-actor-in-scenario": 2
  },

  globals: {
    Given: 'readonly',
    When: 'readonly',
    Then: 'readonly',
    Дано: 'readonly',
    Когда: 'readonly',
    Тогда: 'readonly',
  },
}
