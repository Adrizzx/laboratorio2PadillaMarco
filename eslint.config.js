const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: { ...globals.node }
    },
    rules: {
      semi: ['error', 'always'], // punto y coma obligatorio
      quotes: ['error', 'single'], // comillas simples
      eqeqeq: ['error', 'always'], // comparación estricta
      'no-unused-vars': 'error', // variables declaradas y no usadas
      'no-console': 'warn', // evitar console.log en el código final
      indent: ['error', 2], // sangría de dos espacios
      'prefer-const': 'error' // usar const cuando la variable no cambia
    }
  }
];
