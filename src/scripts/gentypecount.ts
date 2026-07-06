import { prisma } from "../server/db.ts";

async function main() {
  const gens = await prisma.generation.findMany();
  const types = await prisma.type.findMany();
  const genAndTypes = gens.flatMap((gen) => types.map((t) => ({ gen, type: t })));

  const genAndTypesAndCount = await Promise.all(
    genAndTypes.map(async ({ gen, type }) => ({
      gen,
      type,
      count: await prisma.pokemon.count({
        where: {
          generationIntroducedIn: {
            id: gen.id,
          },
          types: {
            some: {
              type: { id: type.id },
            },
          },
        },
      }),
    })),
  );

  console.log("Invalid Generation/Type combinations");
  for (const { gen, type } of genAndTypesAndCount.filter(({ count }) => count === 0)) {
    console.log(`Gen ${gen.name} with ${type.name} Type`);
  }
}

main()
  .then(prisma.$disconnect)
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    Deno.exit(1);
  });
