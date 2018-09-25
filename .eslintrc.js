module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'node': true
  },
  'extends': ['eslint:recommended', 'airbnb-base'],
  'parserOptions': {
    'sourceType': 'module',
    'parser': 'babel-eslint',
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'quotes': [
      'error',
      'single'
    ],
    'linebreak-style': 'off',
    'semi': 'off',
    'no-console': 'off',
    'object-curly-newline': 'off',
  }
}