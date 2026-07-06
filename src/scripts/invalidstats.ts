import { prisma } from "../server/db.ts";

async function main() {
  const types = await prisma.type.findMany();

  for (const t of types) {
    const highHp = await prisma.pokemon.count({
      where: {
        hp: {
          gte: 120,
        },
        types: {
          some: {
            type: { id: t.id },
          },
        },
      },
    });

    if (highHp === 0) {
      console.log(`High HP with ${t.name} Type: 0`);
    }

    const lowHp = await prisma.pokemon.count({
      where: {
        hp: {
          lte: 80,
        },
        types: {
          some: {
            type: { id: t.id },
          },
        },
      },
    });

    if (lowHp === 0) {
      console.log(`Low HP with ${t.name} Type: 0`);
    }

    const highAttack = await prisma.pokemon.count({
      where: {
        attack: {
          gte: 120,
        },
        types: {
          some: {
            type: { id: t.id },
          },
        },
      },
    });

    if (highAttack === 0) {
      console.log(`High Attack with ${t.name} Type: 0`);
    }

    const lowAttack = await prisma.pokemon.count({
      where: {
        attack: {
          lte: 80,
        },
        types: {
          some: {
            type: { id: t.id },
          },
        },
      },
    });

    if (lowAttack === 0) {
      console.log(`Low Attack with ${t.name} Type: 0`);
    }

    const highDefense = await prisma.pokemon.count({
      where: {
        defense: {
          gte: 120,
        },
        types: {
          some: {
            type: { id: t.id },
          },
        },
      },
    });

    if (highDefense === 0) {
      console.log(`High Defense with ${t.name} Type: 0`);
    }

    const lowDefense = await prisma.pokemon.count({
      where: {
        defense: {
          lte: 80,
        },
        types: {
          some: {
            type: { id: t.id },
          },
        },
      },
    });

    if (lowDefense === 0) {
      console.log(`Low Defense with ${t.name} Type: 0`);
    }
    const highSpecialAttack = await prisma.pokemon.count({
      where: {
        specialAttack: {
          gte: 120,
        },
        types: {
          some: {
            type: { id: t.id },
          },
        },
      },
    });

    if (highSpecialAttack === 0) {
      console.log(`High Special Attack with ${t.name} Type: 0`);
    }

    const lowSpecialAttack = await prisma.pokemon.count({
      where: {
        specialAttack: {
          lte: 80,
        },
        types: {
          some: {
            type: { id: t.id },
          },
        },
      },
    });

    if (lowSpecialAttack === 0) {
      console.log(`Low Special Attack with ${t.name} Type: 0`);
    }

    const highSpecialDefense = await prisma.pokemon.count({
      where: {
        specialDefense: {
          gte: 120,
        },
        types: {
          some: {
            type: { id: t.id },
          },
        },
      },
    });

    if (highSpecialDefense === 0) {
      console.log(`High Special Defense with ${t.name} Type: 0`);
    }

    const lowSpecialDefense = await prisma.pokemon.count({
      where: {
        specialDefense: {
          lte: 80,
        },
        types: {
          some: {
            type: { id: t.id },
          },
        },
      },
    });

    if (lowSpecialDefense === 0) {
      console.log(`Low Special Defense with ${t.name} Type: 0`);
    }

    const highSpeed = await prisma.pokemon.count({
      where: {
        speed: {
          gte: 120,
        },
        types: {
          some: {
            type: { id: t.id },
          },
        },
      },
    });

    if (highSpeed === 0) {
      console.log(`High Speed with ${t.name} Type: 0`);
    }

    const lowSpeed = await prisma.pokemon.count({
      where: {
        speed: {
          lte: 80,
        },
        types: {
          some: {
            type: { id: t.id },
          },
        },
      },
    });

    if (lowSpeed === 0) {
      console.log(`Low Speed with ${t.name} Type: 0`);
    }
  }
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
