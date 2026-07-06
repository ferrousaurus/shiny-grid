import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "deno run -A prisma/seed.ts",
  },
  datasource: {
    url: Deno.env.get("DATABASE_URL"),
  },
});
