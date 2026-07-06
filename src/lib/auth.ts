import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { env } from "../env.ts";
import { prisma } from "../server/db.ts";

/**
 * Only include a social provider when both its client id + secret are present,
 * mirroring the old next-auth `providers` map behaviour.
 */
const socialProviders: Record<string, unknown> = {};

if (env.APPLE_ID && env.APPLE_SECRET) {
  socialProviders.apple = {
    clientId: env.APPLE_ID,
    clientSecret: env.APPLE_SECRET,
  };
}
if (env.DISCORD_CLIENT_ID && env.DISCORD_CLIENT_SECRET) {
  socialProviders.discord = {
    clientId: env.DISCORD_CLIENT_ID,
    clientSecret: env.DISCORD_CLIENT_SECRET,
  };
}
if (env.FACEBOOK_CLIENT_ID && env.FACEBOOK_CLIENT_SECRET) {
  socialProviders.facebook = {
    clientId: env.FACEBOOK_CLIENT_ID,
    clientSecret: env.FACEBOOK_CLIENT_SECRET,
  };
}
if (env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
  };
}
if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
  };
}
if (env.TWITCH_CLIENT_ID && env.TWITCH_CLIENT_SECRET) {
  socialProviders.twitch = {
    clientId: env.TWITCH_CLIENT_ID,
    clientSecret: env.TWITCH_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: env.AUTH_SECRET,
  baseURL: env.AUTH_URL,
  socialProviders,
  // Prisma models are PascalCased (idiomatic); map Better-Auth's default
  // lowercase table names onto them.
  user: { modelName: "User" },
  session: { modelName: "Session" },
  account: { modelName: "Account" },
  verification: { modelName: "Verification" },
  plugins: [tanstackStartCookies()],
});

export type Session = typeof auth.$Infer.Session;