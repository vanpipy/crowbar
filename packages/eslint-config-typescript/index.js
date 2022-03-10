module.exports = {
  env: {
    node: true,
    es6: true,
  },
  plugins: ['prettier'],
  extends: [
    'standard',
    'prettier'
  ],
  rules: {
    'prettier/prettier': ['error', {
      singleQuote: true,
      printWidth: 100
    }],
  },
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'standard-with-typescript',
        'prettier'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        project: './tsconfig.json'
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off'
      }
    }
  ]
}
