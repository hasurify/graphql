module.exports = {
  overwrite: true,
  schema: [
    {
      'http://localhost:8090/v1/graphql': {
        headers: {
          'x-hasura-admin-secret': 'helloworld',
        },
      },
    },
  ],
  documents: [
    './src/graphql/**/*.tsx',
    './src/graphql/**/*.ts',
    './src/graphql/**/*.graphql',
  ],
  generates: {
    './src/shared/generated.ts': {
      documents: [],
      plugins: ['typescript', 'typescript-operations'],
      config: {
        preResolveTypes: true,
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        enumsAsTypes: true,
        constEnums: true,
        namingConvention: {
          transformUnderscore: true,
        },
      },
    },
    './src/shared/schema.json': {
      plugins: ['introspection'],
    },
    './src/shared/schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
};
