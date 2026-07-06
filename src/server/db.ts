import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { PrismaClient } from "../../prisma/generated/client.ts";

const pool = new pg.Pool();

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
});
