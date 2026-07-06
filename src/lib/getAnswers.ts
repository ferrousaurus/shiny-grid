import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { prisma } from "../server/db.ts";

const answersInput = z.object({
  seed: z.string(),
  username: z.string(),
});

export const getAnswers = createServerFn({ method: "GET" })
  .validator(answersInput)
  .handler(async ({ data }) => {
    const { seed, username } = data;
    return await prisma.userAnswer.findMany({
      where: {
        seed: seed,
        user: {
          name: username,
        },
      },
      select: {
        categoryIndex: true,
        pokemonId: true,
      },
    });
  });
