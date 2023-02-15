module.exports = {
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser" /* 解析ts语法 */,
    ecmaVersion: 2018,
    sourceType: "module",
  },
  extends: [
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-strongly-recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    // "prettier/prettier": "error",
    "import/no-unresolved": 0,
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/no-unused-vars": ["off"],
  },
  // "plugins": ["prettier"],
  settings: {
    "import/resolver": {
      alias: {
        map: [["/@", "./src/"]],
        extensions: ['', ".ts", ".js", ".jsx", ".json", ".vue"],
      },
    },
  },
};
