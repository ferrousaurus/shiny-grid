import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import getGuess from "../getGuess.ts";

const guessInput = z.object({
  seed: z.string(),
  categoryIndex: z.number().int(),
  pokemonId: z.string(),
});

/**
 * Single-cell guess percentage (kept for ad-hoc use; the route loader uses the
 * batched variant below).
 */
export const getGuessPercent = createServerFn({ method: "GET" })
  .validator(guessInput)
  .handler(async ({ data }) => await getGuess(data));

const percentsInput = z.object({
  seed: z.string(),
  answers: z.array(
    z.object({
      categoryIndex: z.number().int(),
      pokemonId: z.string(),
    }),
  ),
});

/**
 * Batched variant used by the `$seed` / `$seed/$username` route loaders to
 * fetch guess percentages for every pre-filled cell in a single pass.
 */
export const getGuessPercents = createServerFn({ method: "GET" })
  .validator(percentsInput)
  .handler(async ({ data }) => await Promise.all(data.answers.map((a) => getGuess({ seed: data.seed, ...a }))));
