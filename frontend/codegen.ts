import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  schema: "http://localhost:4200/graphql",
  documents: ["src/shared/graphql/**/*.graphql", "src/features/**/*.graphql"],
  generates: {
    "src/__generated__/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false
      },
      config: {
        enumsAsConst: true,
        reactApolloVersion: 3,
        apolloReactHooksImportFrom: "@apollo/client/react"
      }
    },
    "schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
