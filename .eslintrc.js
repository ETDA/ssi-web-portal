module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'off'
  },
  globals: {
    $nuxt: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      legacyDecorators: true
    }
  }
}
