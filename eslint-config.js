const { spellcheckerRule } = require("./cspell");

module.exports = {
    "root": true,
    "parser": "@typescript-eslint/parser",
    "plugins": [
      "@typescript-eslint",
      "prettier",
      "@cspell/eslint-plugin"
    ],
    "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier"
    ],
    "rules": {
      "no-console": 1,       // Means warning
      "prettier/prettier": 2, // Means error
      "@cspell/spellchecker": [1, spellcheckerRule]
    }
};
