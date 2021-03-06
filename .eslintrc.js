module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    // 'plugin:@typescript-eslint/eslint-plugin',
    // 'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': ['error', 'never'],
    // 分号
    'semi': ['warn', 'always'],
    // vue html < > 中的空格 不要
    'vue/html-closing-bracket-spacing': ['error', {
      'startTag': 'never',
      'endTag': 'never',
      'selfClosingTag': 'never',
    }],
    // vue data 必须是个函数
    'vue/no-shared-component-data': ['error'],
    'no-unused-vars': ['warn',
      { varsIgnorePattern: '.*', args: 'none' }
    ]
  }
}
