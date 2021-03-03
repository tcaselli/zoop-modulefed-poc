module.exports = {
  extends: ['alloy', 'alloy/react', 'alloy/typescript', 'plugin:react-hooks/recommended', 'plugin:cypress/recommended'],
  plugins: ['@com.mgmtp.dbshop/dbshop'],
  env: { jest: true },
  globals: {},
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@com.mgmtp.dbshop/dbshop/no-local-set-cart': 'error',
    '@typescript-eslint/no-invalid-void-type': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
