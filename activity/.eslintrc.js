module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'object-curly-newline': 0,
    'no-shadow': 0,
    'no-param-reassign': 0,
    'react/prop-types': 0,
    'react/jsx-filename-extension': 0,
  },
};
