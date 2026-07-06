import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const getEnv = (key: string): string | undefined => {
  const d = (globalThis as any).Deno;
  return typeof d !== "undefined" ? d.env.get(key) : undefined;
};

/**
 * Server-side env resolution.
 *
 * In TanStack Start (Vite), `import.meta.env` only exposes `VITE_*`-prefixed
 * vars (plus built-ins like `MODE`/`DEV`/`PROD`). Server-only secrets such as
 * `DATABASE_URL`, `AUTH_SECRET`, provider credentials, and even
 * `NODE_ENV` are NOT on `import.meta.env` and must be read from `import.meta.env`.
 * Only the client-exposed var (`VITE_API_URL`) is sourced from
 * `import.meta.env` so it gets baked into the client bundle.
 */
export const env = createEnv({
  server: {
    AUTH_SECRET: z.string().min(1),
    AUTH_URL: z.string().url(),

    APPLE_ID: z.string().optional(),
    APPLE_SECRET: z.string().optional(),

    DISCORD_CLIENT_ID: z.string().optional(),
    DISCORD_CLIENT_SECRET: z.string().optional(),

    FACEBOOK_CLIENT_ID: z.string().optional(),
    FACEBOOK_CLIENT_SECRET: z.string().optional(),

    GITHUB_CLIENT_ID: z.string().optional(),
    GITHUB_CLIENT_SECRET: z.string().optional(),

    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),

    TWITCH_CLIENT_ID: z.string().optional(),
    TWITCH_CLIENT_SECRET: z.string().optional(),
  },

  client: {
    VITE_API_URL: z.string().url(),
  },

  clientPrefix: "VITE_",

  runtimeEnv: {
    // Client-only: sourced from Vite's `import.meta.env` (baked into bundle).
    VITE_API_URL: import.meta.env.VITE_API_URL,

    // Server-only: `import.meta.env`, NOT `import.meta.env`.
    AUTH_SECRET: getEnv("AUTH_SECRET"),
    AUTH_URL: getEnv("AUTH_URL"),

    APPLE_ID: getEnv("APPLE_ID"),
    APPLE_SECRET: getEnv("APPLE_SECRET"),

    DISCORD_CLIENT_ID: getEnv("DISCORD_CLIENT_ID"),
    DISCORD_CLIENT_SECRET: getEnv("DISCORD_CLIENT_SECRET"),

    FACEBOOK_CLIENT_ID: getEnv("FACEBOOK_CLIENT_ID"),
    FACEBOOK_CLIENT_SECRET: getEnv("FACEBOOK_CLIENT_SECRET"),

    GITHUB_CLIENT_ID: getEnv("GITHUB_CLIENT_ID"),
    GITHUB_CLIENT_SECRET: getEnv("GITHUB_CLIENT_SECRET"),

    GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID"),
    GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET"),

    TWITCH_CLIENT_ID: getEnv("TWITCH_CLIENT_ID"),
    TWITCH_CLIENT_SECRET: getEnv("TWITCH_CLIENT_SECRET"),
  },

  skipValidation:
    import.meta.env.SKIP_ENV_VALIDATION === "true" || typeof window !== "undefined" || import.meta.env.SSR === false,
});
