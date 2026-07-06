import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { prisma } from "../../server/db.ts";

const makeGuessInput = z.object({
  seed: z.string(),
  username: z.string(),
  categoryIndex: z.number().int(),
  pokemonId: z.string(),
});

export const makeGuess = createServerFn({ method: "POST" })
  .validator(makeGuessInput)
  .handler(async ({ data }) => {
    const user = await prisma.user.findFirst({
      // TODO: Consolidated Users
      where: {
        name: data.username,
      },
    });

    if (!user) {
      throw Error("");
    }

    // TODO: Should account for regionals/megas/alternates
    return await prisma.userAnswer.create({
      data: {
        seed: data.seed,
        userId: user.id,
        categoryIndex: data.categoryIndex,
        pokemonId: data.pokemonId,
      },
    });
  });
