import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    plugins: {
      "simple-import-sort": simpleImportSort
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1. Side effect imports (например, globals.css)
            ["^\\u0000"],

            // 2. React и внешние пакеты
            ["^react", "^next", "^@?\\w"],

            // 3. Алиасы
            ["^@/app"],
            ["^@/features"],
            ["^@/shared"],

            // 4. Родительские импорты
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],

            // 5. Текущая директория
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],

            // 6. Стили
            ["\\.css$", "\\.scss$"]
          ]
        }
      ],
      "simple-import-sort/exports": "error"
    }
  },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"])
]);

export default eslintConfig;
