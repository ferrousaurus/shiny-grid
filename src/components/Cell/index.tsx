import { type Pokemon } from "../../lib/data/dex.tsx";
import PendingCell from "./PendingCell.tsx";
import LoadedCell from "./LoadedCell.tsx";
import { type CategoryId, tests } from "../../lib/categories.tsx";
import { useGuessContext } from "../../lib/contexts/GuessContext.ts";
import clsx from "clsx";

export interface CellProps {
  seed: string;
  index: number;
  pokedex: Pokemon[];
  initialGuess?: Pokemon;
  categoryIds: CategoryId[];
  percents: Map<string, number>;
}

export default function Cell({
  seed,
  index,
  pokedex,
  initialGuess,
  categoryIds,
  percents,
}: CellProps) {
  const [guesses] = useGuessContext();

  const pokemon = pokedex.find((p) => initialGuess?.id === p.id);

  if (!pokemon) {
    return (
      <PendingCell
        pokedex={pokedex.filter(
          (p) => !guesses.find((g) => g?.nationalDexId === p.nationalDexId),
        )}
        categoryIds={categoryIds}
        seed={seed}
        categoryIndex={index}
      />
    );
  }

  const isSuccess = categoryIds.every((c) => tests[c]?.(pokemon));
  const percent = percents.get(`${index}:${pokemon.id}`);

  return (
    <div className="w-full">
      <div
        className={clsx(
          "h-full flex flex-col justify-center items-center",
          isSuccess ? "bg-green-500" : "bg-red-500",
        )}
      >
        <LoadedCell guess={pokemon} percent={percent} />
      </div>
    </div>
  );
}