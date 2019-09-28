module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "react"],
    extends: [
        "plugin:@typescript-eslint/recommended",
        "react-app",
        "eslint:recommended"
    ],
    rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/prefer-interface": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/array-type": "off",
        "no-console": ["error", { allow: ["warn", "error"] }],
        "@typescript-eslint/no-non-null-assertion": "off",
        "react-hooks/exhaustive-deps": "off",
        "no-debugger": "off"
    }
};
