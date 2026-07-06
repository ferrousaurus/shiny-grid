import { type Pokemon } from "./data/dex.tsx";
import { type Seed } from "./getCategories.ts";
import { type ReactNode } from "react";
import gen from "random-seed";

interface Category {
  id: string;
  label: string;
  icon?: ReactNode;
  test: (pokemon: Pokemon) => boolean;
}
export default Category;

const isOfType = (p: Pokemon, t: string) =>
  p?.types?.map((t) => t.type.name)?.includes(t);

const totalStat = (p: Pokemon) =>
  p.hp + p.attack + p.defense + p.specialAttack + p.specialDefense + p.speed;

function Type({ type }: { type: string }) {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex justify-center">
        <img
          alt={`${type} Type`}
          src={`/types/${type.toLowerCase()}.png`}
          width={64}
          height={64}
        />
      </div>
      <div className="text-center z-10 bg-slate-800 rounded">{type} Type</div>
    </div>
  );
}

// This is absolutely not a general solution to this problem
function Grid({ width, children }: { width: number; children: ReactNode }) {
  if (width % 2 === 1) {
    return <div className="grid grid-cols-3">{children}</div>;
  } else {
    return <div className="grid grid-cols-2">{children}</div>;
  }
}

function Generation({
  games,
}: {
  games: { version: string; extension?: string }[];
}) {
  return (
    <div className="flex flex-col">
      <Grid width={games.length}>
        {games.map(({ version, extension = "png" }) => (
          <img
            key={version}
            alt={version}
            src={`/boxart/${version}.${extension}`}
            width={48}
            height={48}
          />
        ))}
      </Grid>
      <div className="text-center z-10 bg-slate-800 rounded">
        Introduced in...
      </div>
    </div>
  );
}

export const categories: Record<
  string,
  { label: ReactNode; icon?: ReactNode }
> = {
  WaterType: {
    label: "Water Type",
    icon: <Type type="Water" />,
  },
  NormalType: {
    label: "Normal Type",
    icon: <Type type="Normal" />,
  },
  FireType: {
    label: "Fire Type",
    icon: <Type type="Fire" />,
  },
  FightingType: {
    label: "Fighting Type",
    icon: <Type type="Fighting" />,
  },
  FlyingType: {
    label: "Flying Type",
    icon: <Type type="Flying" />,
  },
  GrassType: {
    label: "Grass Type",
    icon: <Type type="Grass" />,
  },
  PoisonType: {
    label: "Poison Type",
    icon: <Type type="Poison" />,
  },
  ElectricType: {
    label: "Electric Type",
    icon: <Type type="Electric" />,
  },
  GroundType: {
    label: "Ground Type",
    icon: <Type type="Ground" />,
  },
  PsychicType: {
    label: "Psychic Type",
    icon: <Type type="Psychic" />,
  },
  RockType: {
    label: "Rock Type",
    icon: <Type type="Rock" />,
  },
  IceType: {
    label: "Ice Type",
    icon: <Type type="Ice" />,
  },
  BugType: {
    label: "Bug Type",
    icon: <Type type="Bug" />,
  },
  DragonType: {
    label: "Dragon Type",
    icon: <Type type="Dragon" />,
  },
  GhostType: {
    label: "Ghost Type",
    icon: <Type type="Ghost" />,
  },
  DarkType: {
    label: "Dark Type",
    icon: <Type type="Dark" />,
  },
  SteelType: {
    label: "Steel Type",
    icon: <Type type="Steel" />,
  },
  FairyType: {
    label: "Fairy Type",
    icon: <Type type="Fairy" />,
  },
  LowHp: {
    label: "HP ≤ 70",
  },
  HighHp: {
    label: "HP ≥ 110",
  },
  LowAtk: {
    label: "Attack ≤ 70",
  },
  HighAtk: {
    label: "Attack ≥ 110",
  },
  LowDef: {
    label: "Defense ≤ 70",
  },
  HighDef: {
    label: "Defense ≥ 110",
  },
  LowSpA: {
    label: "Special Attack ≤ 70",
  },
  HighSpA: {
    label: "Special Attack ≥ 110",
  },
  LowSpD: {
    label: "Special Defense ≤ 70",
  },
  HighSpD: {
    label: "Special Defense ≥ 110",
  },
  LowSpe: {
    label: "Speed ≤ 70",
  },
  HighSpe: {
    label: "Speed ≥ 110",
  },
  LowTotal: {
    label: "Total ≤ 260",
  },
  HighTotal: {
    label: "Total ≥ 600",
  },
  Generation1: {
    label: "Generation 1",
    icon: (
      <Generation
        games={[{ version: "red" }, { version: "blue" }, { version: "yellow" }]}
      />
    ),
  },
  Generation2: {
    label: "Generation 2",
    icon: (
      <Generation
        games={[
          { version: "gold" },
          { version: "silver" },
          { version: "crystal" },
        ]}
      />
    ),
  },
  Generation3: {
    label: "Generation 3",
    icon: (
      <Generation
        games={[
          { version: "ruby" },
          { version: "sapphire" },
          { version: "emerald", extension: "jpg" },
        ]}
      />
    ),
  },
  Generation4: {
    label: "Generation 4",
    icon: (
      <Generation
        games={[
          { version: "diamond", extension: "jpg" },
          { version: "pearl", extension: "jpg" },
          { version: "platinum" },
          { version: "heartgold", extension: "jpg" },
          { version: "soulsilver", extension: "jpg" },
        ]}
      />
    ),
  },
  Generation5: {
    label: "Generation 5",
    icon: (
      <Generation
        games={[
          { version: "black" },
          { version: "white" },
          { version: "black2" },
          { version: "white2" },
        ]}
      />
    ),
  },
  Generation6: {
    label: "Generation 6",
    icon: (
      <Generation
        games={[
          { version: "x" },
          { version: "y" },
          { version: "omegaruby" },
          { version: "alphasapphire" },
        ]}
      />
    ),
  },
  Generation7: {
    label: "Generation 7",
    icon: (
      <Generation
        games={[
          { version: "sun" },
          { version: "moon" },
          { version: "ultrasun" },
          { version: "ultramoon" },
        ]}
      />
    ),
  },
  Generation8: {
    label: "Generation 8",
    icon: (
      <Generation
        games={[
          { version: "sword" },
          { version: "shield" },
          { version: "legendsarceus" },
          { version: "brilliantdiamond" },
          { version: "shiningpearl" },
        ]}
      />
    ),
  },
  Generation9: {
    label: "Generation 9",
    icon: (
      <Generation games={[{ version: "scarlet" }, { version: "violet" }]} />
    ),
  },
} as const;

export type CategoryId = keyof typeof categories;

export const tests: Record<CategoryId, (pokemon: Pokemon) => boolean> = {
  WaterType: (p) => isOfType(p, "Water"),
  NormalType: (p) => isOfType(p, "Normal"),
  FireType: (p) => isOfType(p, "Fire"),
  FightingType: (p) => isOfType(p, "Fighting"),
  FlyingType: (p) => isOfType(p, "Flying"),
  GrassType: (p) => isOfType(p, "Grass"),
  PoisonType: (p) => isOfType(p, "Poison"),
  ElectricType: (p) => isOfType(p, "Electric"),
  GroundType: (p) => isOfType(p, "Ground"),
  PsychicType: (p) => isOfType(p, "Psychic"),
  RockType: (p) => isOfType(p, "Rock"),
  IceType: (p) => isOfType(p, "Ice"),
  BugType: (p) => isOfType(p, "Bug"),
  DragonType: (p) => isOfType(p, "Dragon"),
  GhostType: (p) => isOfType(p, "Ghost"),
  DarkType: (p) => isOfType(p, "Dark"),
  SteelType: (p) => isOfType(p, "Steel"),
  FairyType: (p) => isOfType(p, "Fairy"),
  LowHp: (p) => p.hp <= 70,
  HighHp: (p) => p.hp >= 110,
  LowAtk: (p) => p.attack <= 70,
  HighAtk: (p) => p.attack >= 110,
  LowDef: (p) => p.defense <= 70,
  HighDef: (p) => p.defense >= 110,
  LowSpA: (p) => p.specialAttack <= 70,
  HighSpA: (p) => p.specialAttack >= 110,
  LowSpD: (p) => p.specialDefense <= 70,
  HighSpD: (p) => p.specialDefense >= 110,
  LowSpe: (p) => p.speed <= 70,
  HighSpe: (p) => p.speed >= 110,
  LowTotal: (p) => totalStat(p) <= 260,
  HighTotal: (p) => totalStat(p) >= 600,
  Generation1: (p) => p.generationIntroducedIn.name === 1,
  Generation2: (p) => p.generationIntroducedIn.name === 2,
  Generation3: (p) => p.generationIntroducedIn.name === 3,
  Generation4: (p) => p.generationIntroducedIn.name === 4,
  Generation5: (p) => p.generationIntroducedIn.name === 5,
  Generation6: (p) => p.generationIntroducedIn.name === 6,
  Generation7: (p) => p.generationIntroducedIn.name === 7,
  Generation8: (p) => p.generationIntroducedIn.name === 8,
  Generation9: (p) => p.generationIntroducedIn.name === 9,
};

const isInvalidType = (codes: CategoryId[]) =>
  (codes.includes("NormalType") && codes.includes("IceType")) ||
  (codes.includes("NormalType") && codes.includes("BugType")) ||
  (codes.includes("NormalType") && codes.includes("RockType")) ||
  (codes.includes("NormalType") && codes.includes("SteelType")) ||
  (codes.includes("FireType") && codes.includes("FairyType")) ||
  (codes.includes("IceType") && codes.includes("PoisonType")) ||
  (codes.includes("GroundType") && codes.includes("FairyType")) ||
  (codes.includes("BugType") && codes.includes("DragonType")) ||
  (codes.includes("RockType") && codes.includes("GhostType")) ||
  (codes.includes("DarkType") && codes.includes("Generation1")) ||
  (codes.includes("FireType") && codes.includes("HighHp")) ||
  (codes.includes("BugType") && codes.includes("HighHp")) ||
  (codes.includes("ElectricType") && codes.includes("HighSpD")) ||
  (codes.includes("GroundType") && codes.includes("FightingType"));

const isInvalidStat = (codes: CategoryId[]) =>
  (codes.includes("LowHp") && codes.includes("HighHp")) ||
  (codes.includes("LowAtk") && codes.includes("HighAtk")) ||
  (codes.includes("LowDef") && codes.includes("HighDef")) ||
  (codes.includes("LowSpA") && codes.includes("HighSpA")) ||
  (codes.includes("LowSpD") && codes.includes("HighSpD")) ||
  (codes.includes("LowSpe") && codes.includes("HighSpe")) ||
  (codes.includes("LowTotal") && codes.includes("HighTotal")) ||
  (codes.includes("LowTotal") && codes.some((c) => c.startsWith("High")));

// Check for invalid type combos
const isInvalidCombo = (codes: CategoryId[]) =>
  codes[0] === codes[1] ||
  isInvalidType(codes) ||
  isInvalidStat(codes) ||
  codes.every((c) => c.startsWith("Generation"));

const isInvalidGrid = (categories: CategoryId[]) =>
  new Set(categories).size !== categories.length ||
  [
    [categories[0]!, categories[3]!],
    [categories[0]!, categories[4]!],
    [categories[0]!, categories[5]!],
    [categories[1]!, categories[3]!],
    [categories[1]!, categories[4]!],
    [categories[1]!, categories[5]!],
    [categories[2]!, categories[3]!],
    [categories[2]!, categories[4]!],
    [categories[2]!, categories[5]!],
  ].some((c) => isInvalidCombo(c));

const hardcodedGrids: Record<Seed, CategoryId[]> = {
  "2024-03-30": [
    "WaterType",
    "LowAtk",
    "Generation2",
    "ElectricType",
    "LowDef",
    "HighHp",
  ],
};

export const getCategories: (seed: Seed) => CategoryId[] = (seed) => {
  const hardcoded = hardcodedGrids[seed];
  if (hardcoded !== undefined) {
    return hardcoded;
  }
  const rand = gen.create(seed);
  const catIds = Object.keys(categories);
  const cats = [...Array(6).keys()].map(() => catIds[rand(catIds.length)]!);

  return isInvalidGrid(cats) ? getCategories(`${seed}X`) : cats;
};
