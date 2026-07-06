import { type Pokemon } from "../../lib/data/dex.tsx";

export interface LoadedCellProps {
  guess: Pokemon;
  percent?: number;
}

export default function LoadedCell({ guess, percent }: LoadedCellProps) {
  const p = percent === undefined ? NaN : Math.floor(percent * 100);

  return (
    <>
      {!isNaN(p) && (
        <div className="justify-top absolute rounded bg-slate-800 bg-opacity-60 px-8 py-2">
          {p}%
        </div>
      )}
      <img
        alt={guess.name}
        src={guess.imageUrl ?? ""}
        width={128}
        height={128}
      />
      <div className="rounded bg-slate-800 bg-opacity-60 px-2">
        {guess.name}
      </div>
    </>
  );
}