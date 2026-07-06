import { createFileRoute, redirect } from "@tanstack/react-router";
import App from "../components/App.tsx";
import Header from "../components/Header/index.tsx";
import getDex from "../lib/getDex.ts";
import { getAnswers } from "../lib/getAnswers.ts";
import { getCategories } from "../lib/categories.tsx";
import { getSession } from "../lib/auth.functions.ts";
import { getGuessPercents } from "../lib/functions/guess.ts";
import Spinner from "../components/common/Spinner.tsx";

interface LoaderData {
  dex: Awaited<ReturnType<typeof getDex>>;
  answers: Awaited<ReturnType<typeof getAnswers>>;
  percents: { percent: number }[];
  categoryIds: ReturnType<typeof getCategories>;
}

export const Route = createFileRoute("/$seed")({
  beforeLoad: async ({ params, location }) => {
    const session = await getSession();
    if (session && location.pathname === `/${params.seed}`) {
      throw redirect({
        to: "/$seed/$username",
        params: { seed: params.seed, username: session.user.name ?? "" },
      });
    }
    return { session };
  },
  loader: async ({ context, params }): Promise<LoaderData> => {
    const { seed } = params;
    const [dexRes, answersRes] = await Promise.allSettled([
      getDex(),
      getAnswers({ data: { seed, username: context.session?.user.name ?? "" } }),
    ]);

    const dex = dexRes.status === "fulfilled" ? dexRes.value : [];
    const answers = answersRes.status === "fulfilled" ? answersRes.value : [];

    const percents =
      answers.length > 0
        ? await getGuessPercents({
            data: {
              seed,
              answers: answers.map((a) => ({
                categoryIndex: a.categoryIndex,
                pokemonId: a.pokemonId,
              })),
            },
          })
        : [];

    const categoryIds = getCategories(seed);

    return { dex, answers, percents, categoryIds };
  },
  pendingComponent: () => (
    <div className="z-10 flex h-screen items-center justify-center bg-slate-700 bg-opacity-50">
      <Spinner />
    </div>
  ),
  component: SeedPage,
});

function SeedPage() {
  const { seed } = Route.useParams();
  const { dex, answers, percents, categoryIds } = Route.useLoaderData();

  // Build a lookup of percent by categoryIndex + pokemonId.
  const percentMap = new Map<string, number>();
  answers.forEach((a, i) => {
    percentMap.set(`${a.categoryIndex}:${a.pokemonId}`, percents[i]?.percent ?? 0);
  });

  return (
    <div className="p-2">
      <App
        header={<Header seed={seed} />}
        categoryIds={categoryIds}
        username={undefined}
        dex={dex}
        seed={seed}
        initialAnswers={answers}
        percents={percentMap}
      />
    </div>
  );
}
