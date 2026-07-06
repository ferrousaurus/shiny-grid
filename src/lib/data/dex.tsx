import { type z } from "zod";
import { type PokemonValidator } from "./pokemon.ts";

export type Pokemon = z.infer<typeof PokemonValidator>;
