import dex from "./dex.json" with { type: "json" };
import forms from "./forms.json" with { type: "json" };
import mega from "./mega.json" with { type: "json" };
import regional from "./regional.json" with { type: "json" };

import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import pg from "pg";
import { PrismaClient } from "./generated/client.ts";

const pool = new pg.Pool();
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter, log: [] });

async function main() {
  await prisma.userAnswer.deleteMany();

  await prisma.pokemonGame.deleteMany();

  await prisma.game.deleteMany();

  await prisma.pokemonAbility.deleteMany();
  await prisma.pokemonType.deleteMany();
  await prisma.pokemonEggGroup.deleteMany();

  await prisma.pokemon.deleteMany();

  await prisma.type.deleteMany();
  await prisma.ability.deleteMany();
  await prisma.eggGroup.deleteMany();
  await prisma.generation.deleteMany();

  const gens = [
    {
      name: 1,
      pokemonGames: [
        {
          name: "Red",
          boxartUrl: "/boxart/red.png",
        },
        {
          name: "Blue",
          boxartUrl: "/boxart/blue.png",
        },
        {
          name: "Yellow",
          boxartUrl: "/boxart/yellow.png",
        },
      ],
    },
    {
      name: 2,
      pokemonGames: [
        {
          name: "Gold",
          boxartUrl: "/boxart/gold.png",
        },
        {
          name: "Silver",
          boxartUrl: "/boxart/silver.png",
        },
        {
          name: "Crystal",
          boxartUrl: "/boxart/crystal.png",
        },
      ],
    },
    {
      name: 3,
      pokemonGames: [
        {
          name: "Ruby",
          boxartUrl: "/boxart/ruby.png",
        },
        {
          name: "Sapphire",
          boxartUrl: "/boxart/sapphire.png",
        },
        {
          name: "Emerald",
          boxartUrl: "/boxart/emerald.jpg",
        },
        {
          name: "FireRed",
          boxartUrl: "/boxart/firered.png",
        },
        {
          name: "LeafGreen",
          boxartUrl: "/boxart/leafgreen.png",
        },
      ],
    },
    {
      name: 4,
      pokemonGames: [
        {
          name: "Diamond",
          boxartUrl: "/boxart/diamond.jpg",
        },
        {
          name: "Pearl",
          boxartUrl: "/boxart/pearl.jpg",
        },
        {
          name: "Platinum",
          boxartUrl: "/boxart/platinum.png",
        },
        {
          name: "HeartGold",
          boxartUrl: "/boxart/heartgold.jpg",
        },
        {
          name: "SoulSilver",
          boxartUrl: "/boxart/soulsilver.jpg",
        },
      ],
    },
    {
      name: 5,
      pokemonGames: [
        {
          name: "Black",
          boxartUrl: "/boxart/black.png",
        },
        {
          name: "White",
          boxartUrl: "/boxart/white.png",
        },
        {
          name: "Black 2",
          boxartUrl: "/boxart/black2.png",
        },
        {
          name: "White 2",
          boxartUrl: "/boxart/white2.png",
        },
      ],
    },
    {
      name: 6,
      pokemonGames: [
        {
          name: "X",
          boxartUrl: "/boxart/x.png",
        },
        {
          name: "Y",
          boxartUrl: "/boxart/y.png",
        },
        {
          name: "Omega Ruby",
          boxartUrl: "/boxart/omegaruby.png",
        },
        {
          name: "Alpha Sapphire",
          boxartUrl: "/boxart/alphasapphire.png",
        },
      ],
    },
    {
      name: 7,
      pokemonGames: [
        {
          name: "Sun",
          boxartUrl: "/boxart/sun.png",
        },
        {
          name: "Moon",
          boxartUrl: "/boxart/moon.png",
        },
        {
          name: "Ultra Sun",
          boxartUrl: "/boxart/ultrasun.png",
        },
        {
          name: "Ultra Moon",
          boxartUrl: "/boxart/ultramoon.png",
        },
      ],
    },
    {
      name: 8,
      pokemonGames: [
        {
          name: "Sword",
          boxartUrl: "/boxart/sword.png",
        },
        {
          name: "Shield",
          boxartUrl: "/boxart/shield.png",
        },
        {
          name: "Brilliant Diamond",
          boxartUrl: "/boxart/brilliantdiamond.png",
        },
        {
          name: "Shining Pearl",
          boxartUrl: "/boxart/shiningpearl.png",
        },
        {
          name: "Legends Arceus",
          boxartUrl: "/boxart/arceus.png",
        },
      ],
    },
    {
      name: 9,
      pokemonGames: [
        {
          name: "Scarlet",
          boxartUrl: "/boxart/scarlet.png",
        },
        {
          name: "Violet",
          boxartUrl: "/boxart/violet.png",
        },
      ],
    },
  ];

  for (const g of gens) {
    await prisma.generation.create({
      data: {
        name: g.name,
        games: {
          create: g.pokemonGames.map((pg) => ({
            name: pg.name,
            boxartUrl: pg.boxartUrl,
          })),
        },
      },
    });
  }

  function genById(id: number) {
    if (id >= 1 && id < 152) {
      return 1;
    } else if (id >= 152 && id <= 251) {
      return 2;
    } else if (id >= 252 && id < 387) {
      return 3;
    } else if (id >= 387 && id < 494) {
      return 4;
    } else if (id >= 494 && id < 650) {
      return 5;
    } else if (id >= 650 && id < 722) {
      return 6;
    } else if (id >= 722 && id < 810) {
      return 7;
    } else if (id >= 810 && id < 906) {
      return 8;
    } else if (id >= 906 && id < 1011) {
      return 9;
    }
    return 0;
  }

  for (const p of dex) {
    await prisma.pokemon
      .create({
        data: {
          kind: "POKEMON",
          nationalDexId: p.Nat,
          name: p.Pokemon,
          hp: p.HP,
          attack: p.Atk,
          defense: p.Def,
          specialAttack: p.SpA,
          specialDefense: p.SpD,
          speed: p.Spe,
          generationIntroducedIn: {
            connectOrCreate: {
              where: { name: genById(p.Nat) },
              create: {
                name: genById(p.Nat),
              },
            },
          },
          evWorth: p["EV Worth"],
          gender: p.Gender,
          evolve: p.Evolve,
          catchRate: p.Catch,
          imageUrl: `/sprites/${("000" + p.Nat).slice(-4)}.png`,

          types: {
            create: [
              {
                type: {
                  connectOrCreate: {
                    where: { name: p["Type I"] },
                    create: {
                      name: p["Type I"],
                      generationIntroduced: {
                        connect: {
                          name: 1,
                        },
                      },
                    },
                  },
                },
              },
              {
                type: {
                  connectOrCreate: {
                    where: { name: p["Type II"] },
                    create: {
                      name: p["Type II"],
                      generationIntroduced: {
                        connect: {
                          name: 1,
                        },
                      },
                    },
                  },
                },
              },
            ].filter((t) => t.type.connectOrCreate.where.name !== ""),
          },

          abilities: {
            create: [
              {
                isHidden: false,
                ability: {
                  connectOrCreate: {
                    where: { name: p["Ability I"] },
                    create: { name: p["Ability I"] },
                  },
                },
              },
              {
                isHidden: false,
                ability: {
                  connectOrCreate: {
                    where: { name: p["Ability II"] },
                    create: { name: p["Ability II"] },
                  },
                },
              },
              {
                isHidden: true,
                ability: {
                  connectOrCreate: {
                    where: { name: p["Hidden Ability"] },
                    create: { name: p["Hidden Ability"] },
                  },
                },
              },
            ].filter((a) => a.ability.connectOrCreate.where.name !== ""),
          },

          eggGroups: {
            create: [
              {
                eggGroup: {
                  connectOrCreate: {
                    where: { name: p["Egg Group I"] },
                    create: { name: p["Egg Group I"] },
                  },
                },
              },
              {
                eggGroup: {
                  connectOrCreate: {
                    where: { name: p["Egg Group II"] },
                    create: { name: p["Egg Group II"] },
                  },
                },
              },
            ].filter((e) => e.eggGroup.connectOrCreate.where.name !== ""),
          },
        },
      })
      .then(({ id }) => console.log(id));
  }

  for (const p of mega) {
    await prisma.pokemon
      .create({
        data: {
          kind: "MEGA",
          nationalDexId: p.Nat,
          name: p.Pokemon,
          hp: p.HP,
          attack: p.Atk,
          defense: p.Def,
          specialAttack: p.SpA,
          specialDefense: p.SpD,
          speed: p.Spe,
          generationIntroducedIn: {
            connectOrCreate: {
              where: { name: genById(p.Nat) },
              create: {
                name: genById(p.Nat),
              },
            },
          },

          imageUrl: `/sprites/${("000" + p.Nat).slice(-4)}_01.png`,

          types: {
            create: [
              {
                type: {
                  connectOrCreate: {
                    where: { name: p["Type I"] },
                    create: {
                      name: p["Type I"],
                      generationIntroduced: {
                        connect: {
                          name: 1,
                        },
                      },
                    },
                  },
                },
              },
              {
                type: {
                  connectOrCreate: {
                    where: { name: p["Type II"] },
                    create: {
                      name: p["Type II"],
                      generationIntroduced: {
                        connect: {
                          name: 1,
                        },
                      },
                    },
                  },
                },
              },
            ].filter((t) => t.type.connectOrCreate.where.name !== ""),
          },

          abilities: {
            create: [
              {
                isHidden: false,
                ability: {
                  connectOrCreate: {
                    where: { name: p["Ability I"] },
                    create: { name: p["Ability I"] },
                  },
                },
              },
            ].filter((a) => a.ability.connectOrCreate.where.name !== ""),
          },
        },
      })
      .then(({ id }) => console.log(id));
  }

  for (const p of regional) {
    await prisma.pokemon
      .create({
        data: {
          kind: "POKEMON",
          nationalDexId: p.Nat,
          name: p.Pokemon,
          hp: p.HP,
          attack: p.Atk,
          defense: p.Def,
          specialAttack: p.SpA,
          specialDefense: p.SpD,
          speed: p.Spe,
          generationIntroducedIn: {
            connectOrCreate: {
              where: { name: genById(p.Nat) },
              create: {
                name: genById(p.Nat),
              },
            },
          },
          evWorth: p["EV Worth"],
          gender: p.Gender,
          evolve: p.Evolve,

          imageUrl: `/sprites/${("000" + p.Nat).slice(-4)}_01.png`,

          types: {
            create: [
              {
                type: {
                  connectOrCreate: {
                    where: { name: p["Type I"] },
                    create: {
                      name: p["Type I"],
                      generationIntroduced: {
                        connect: {
                          name: 1,
                        },
                      },
                    },
                  },
                },
              },
              {
                type: {
                  connectOrCreate: {
                    where: { name: p["Type II"] },
                    create: {
                      name: p["Type II"],
                      generationIntroduced: {
                        connect: {
                          name: 1,
                        },
                      },
                    },
                  },
                },
              },
            ].filter((t) => t.type.connectOrCreate.where.name !== ""),
          },

          abilities: {
            create: [
              {
                isHidden: false,
                ability: {
                  connectOrCreate: {
                    where: { name: p["Ability I"] },
                    create: { name: p["Ability I"] },
                  },
                },
              },
              {
                isHidden: false,
                ability: {
                  connectOrCreate: {
                    where: { name: p["Ability II"] },
                    create: { name: p["Ability II"] },
                  },
                },
              },
              {
                isHidden: true,
                ability: {
                  connectOrCreate: {
                    where: { name: p["Hidden Ability"] },
                    create: { name: p["Hidden Ability"] },
                  },
                },
              },
            ].filter((a) => a.ability.connectOrCreate.where.name !== ""),
          },
        },
      })
      .then(({ id }) => console.log(id));
  }

  for (const p of forms) {
    await prisma.pokemon
      .create({
        data: {
          kind: "POKEMON",
          nationalDexId: p.Nat,
          name: p.Pokemon,
          hp: p.HP,
          attack: p.Atk,
          defense: p.Def,
          specialAttack: p.SpA,
          specialDefense: p.SpD,
          speed: p.Spe,
          generationIntroducedIn: {
            connectOrCreate: {
              where: { name: genById(p.Nat) },
              create: {
                name: genById(p.Nat),
              },
            },
          },
          evWorth: p["EV Worth"],
          gender: p.Gender,
          evolve: p.Evolve,

          imageUrl: `/sprites/${("000" + p.Nat).slice(-4)}_01.png`,

          types: {
            create: [
              {
                type: {
                  connectOrCreate: {
                    where: { name: p["Type I"] },
                    create: {
                      name: p["Type I"],
                      generationIntroduced: {
                        connect: {
                          name: 1,
                        },
                      },
                    },
                  },
                },
              },
              {
                type: {
                  connectOrCreate: {
                    where: { name: p["Type II"] },
                    create: {
                      name: p["Type II"],
                      generationIntroduced: {
                        connect: {
                          name: 1,
                        },
                      },
                    },
                  },
                },
              },
            ].filter((t) => t.type.connectOrCreate.where.name !== ""),
          },

          abilities: {
            create: [
              {
                isHidden: false,
                ability: {
                  connectOrCreate: {
                    where: { name: p["Ability I"] },
                    create: { name: p["Ability I"] },
                  },
                },
              },
              {
                isHidden: false,
                ability: {
                  connectOrCreate: {
                    where: { name: p["Ability II"] },
                    create: { name: p["Ability II"] },
                  },
                },
              },
              {
                isHidden: true,
                ability: {
                  connectOrCreate: {
                    where: { name: p["Hidden Ability"] },
                    create: { name: p["Hidden Ability"] },
                  },
                },
              },
            ].filter((a) => a.ability.connectOrCreate.where.name !== ""),
          },
        },
      })
      .then(({ id }) => console.log(id));
  }

  await prisma.pokemon.updateMany({
    where: {
      name: {
        startsWith: "Mega ",
      },
    },
    data: {
      generationId: (await prisma.generation.findUnique({
        where: { name: 6 },
      }))!.id,
    },
  });

  await prisma.pokemon.updateMany({
    where: {
      name: {
        startsWith: "Primal ",
      },
    },
    data: {
      generationId: (await prisma.generation.findUnique({
        where: { name: 6 },
      }))!.id,
    },
  });

  await prisma.pokemon.updateMany({
    where: {
      name: {
        startsWith: "Alolan ",
      },
    },
    data: {
      generationId: (await prisma.generation.findUnique({
        where: { name: 7 },
      }))!.id,
    },
  });

  await prisma.pokemon.updateMany({
    where: {
      name: {
        startsWith: "Galarian ",
      },
    },
    data: {
      generationId: (await prisma.generation.findUnique({
        where: { name: 8 },
      }))!.id,
    },
  });

  await prisma.pokemon.updateMany({
    where: {
      name: {
        startsWith: "Hisuian ",
      },
    },
    data: {
      generationId: (await prisma.generation.findUnique({
        where: { name: 8 },
      }))!.id,
    },
  });

  await prisma.pokemon.updateMany({
    where: {
      name: {
        startsWith: "Paldean ",
      },
    },
    data: {
      generationId: (await prisma.generation.findUnique({
        where: { name: 9 },
      }))!.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
