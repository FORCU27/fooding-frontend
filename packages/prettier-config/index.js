const config = { 
    printWidth: 100, 
    singleQuote: true, 
    jsxSingleQuote: true, 
    plugins: ['@trivago/prettier-plugin-sort-imports'], 
    importOrderSeparation: true,
    importOrderSortSpecifiers: true, 
    importOrder: [
        '^react$',
        '^next',
        '<THIRD_PARTY_MODULES>',
        '^@repo/(.*)$',
        '^@/(.*)$',
        '^[./]',
      ],
};

export default config;
