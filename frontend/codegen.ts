import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  ignoreNoDocuments: true,
  schema: "http://localhost:3000/graphql",
  documents: ["src/shared/graphql/**/*.graphql", "src/features/**/*.graphql"],
  generates: {
    "src/__generated__/output.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
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
