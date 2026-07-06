import { useState, type ReactNode } from "react";
import { type Pokemon } from "../lib/data/dex.tsx";

import Cell from "./Cell/index.tsx";
import { type CategoryId } from "../lib/categories.tsx";
import CategoryLabel from "./CategoryLabel/index.tsx";
import { GuessContext } from "../lib/contexts/GuessContext.ts";

interface Answer {
  categoryIndex: number;
  pokemonId: string;
}

export interface GridProps {
  header: ReactNode;
  dex: Pokemon[];
  seed: string;
  categoryIds: CategoryId[];
  username?: string;
  initialAnswers: Answer[];
  percents: Map<string, number>;
}

const rows = [...Array(3).keys()]
  .map((i) => ({ index: i * 3, cat2: i + 3 }))
  .map((r) =>
    [...Array(3).keys()].map((i) => ({
      index: i + r.index,
      cat1: i,
      cat2: r.cat2,
    })),
  );

function parseInitialAnswers(initialAnswers: Answer[], dex: Pokemon[]) {
  const ia = [];
  for (const { categoryIndex, pokemonId } of initialAnswers) {
    const found = dex.find(({ id }) => id === pokemonId);
    if (found) {
      ia[categoryIndex] = found;
    }
  }
  return ia;
}

export default function App({
  header,
  dex,
  seed,
  categoryIds,
  initialAnswers,
  percents,
}: GridProps) {
  const guessState = useState(parseInitialAnswers(initialAnswers, dex));

  const [guesses] = guessState;

  return (
    <div className="flex flex-col">
      {header}
      <div className="flex justify-center">
        <div className="grid grid-cols-4">
          <GuessContext.Provider value={guessState}>
            <div className="h-32" />
            <CategoryLabel category={categoryIds[0]!} />
            <CategoryLabel category={categoryIds[1]!} />
            <CategoryLabel category={categoryIds[2]!} />
            <div className="h-32">
              <CategoryLabel category={categoryIds[3]!} />
            </div>
            {rows[0]?.map((c) => (
              <Cell
                key={c.index}
                seed={seed}
                index={c.index}
                initialGuess={guesses[c.index]}
                categoryIds={[categoryIds[c.cat1]!, categoryIds[c.cat2]!]}
                pokedex={dex}
                percents={percents}
              />
            ))}
            <div className="h-32">
              <CategoryLabel category={categoryIds[4]!} />
            </div>
            {rows[1]?.map((c) => (
              <Cell
                key={c.index}
                seed={seed}
                index={c.index}
                initialGuess={guesses[c.index]}
                categoryIds={[categoryIds[c.cat1]!, categoryIds[c.cat2]!]}
                pokedex={dex}
                percents={percents}
              />
            ))}
            <div className="h-32">
              <CategoryLabel category={categoryIds[5]!} />
            </div>
            {rows[2]?.map((c) => (
              <Cell
                key={c.index}
                seed={seed}
                index={c.index}
                initialGuess={guesses[c.index]}
                categoryIds={[categoryIds[c.cat1]!, categoryIds[c.cat2]!]}
                pokedex={dex}
                percents={percents}
              />
            ))}
          </GuessContext.Provider>
        </div>
      </div>
    </div>
  );
}