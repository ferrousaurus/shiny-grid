import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "deno run -A prisma/seed.ts",
  },
  datasource: {
    url: env("POSTGRES_PRISMA_URL") || env("DATABASE_URL"),
  },
});
