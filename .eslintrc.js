module.exports = {
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'unused-imports'],
    extends: ['airbnb'],
    rules: {
        'eslint:recommended': [0],
        'plugin:@typescript-eslint/recommended': [0],
        'newline-before-return': [0],
        'newline-after-var': [0],
        'no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'error',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_'
            }
        ],
        'sort-imports': [
            'error',
            {
                ignoreDeclarationSort: true,
                ignoreCase: true
            }
        ],

        semi: [0],
        '@typescript-eslint/indent': ['error', 4],
        eqeqeq: [0],
        'prefer-const': [0],
        'no-const-assign': [0],
        'no-var': 'error',
        'comma-dangle': [
            'error',
            {
                arrays: 'never',
                objects: 'never',
                imports: 'never',
                exports: 'never',
                functions: 'never'
            }
        ],
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        'arrow-parens': [0],
        'no-console': 'off',
        indent: ['error', 4, { SwitchCase: 1 }],
        'no-underscore-dangle': 'off',
        'max-len': ['error', { code: 120, tabWidth: 4 }],
        'import/extensions': ['off'],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error'
    }
};
