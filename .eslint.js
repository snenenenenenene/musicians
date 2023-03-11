module.exports = {
  root: true,
  extends: '@react-native-community',
  env: {
    es2020: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', '@typescript-eslint/tslint'],
  rules: {
    'react-native/no-inline-styles': 'off',
    'no-multiple-empty-lines': 'off',
    'no-dupe-class-members': 'off',
    'padded-blocks': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    indent: ['error', 2],
    semi: ['error', 'never'],
    'prettier/prettier': ['off'],
    'no-shadow': 'off',
    'no-unused-vars': 'off',
  },
};
