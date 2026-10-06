// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: [
      "dist/*",
      // Código web legado conservado solo como referencia: no forma parte
      // de la app React Native (usa react-dom y CSS, ausentes en Expo).
      "src/Main.jsx",
      "src/**/*.css",
    ],
  }
]);
