module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "standard",
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    rules: {
        semi: ["error", "always"],
        quotes: ["error", "double"],
        indent: ["error", 4],
        "comma-dangle": ["error", "always-multiline"],
        "padded-blocks": ["error", "blocks"],
    },
};
