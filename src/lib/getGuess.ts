import { prisma } from "../server/db.ts";

export default async function getGuess({
  seed,
  categoryIndex,
  pokemonId,
}: {
  seed: string;
  categoryIndex: number;
  pokemonId: string;
}) {
  const [totalGuesses, guesses] = await Promise.all([
    prisma.userAnswer.count({
      where: {
        seed: seed,
        categoryIndex: categoryIndex,
      },
    }),
    prisma.userAnswer.count({
      where: {
        seed: seed,
        categoryIndex: categoryIndex,
        pokemonId: pokemonId,
      },
    }),
  ]);

  return { percent: guesses / totalGuesses };
}
