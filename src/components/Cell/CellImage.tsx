import { type Pokemon } from "../../lib/data/dex.tsx";

export default function CellImage({ pokemon }: { pokemon: Pokemon }) {
  return (
    <>
      <img
        alt={pokemon.name}
        src={pokemon.imageUrl ?? ""}
        width={128}
        height={128}
      />
      <div className="bg-slate-800 bg-opacity-60 px-2 rounded">
        {pokemon.name}
      </div>
    </>
  );
}