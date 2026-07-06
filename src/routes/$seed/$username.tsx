import { createFileRoute } from "@tanstack/react-router";
import App from "../../components/App.tsx";
import Header from "../../components/Header/index.tsx";
import getDex from "../../lib/getDex.ts";
import { getAnswers } from "../../lib/getAnswers.ts";
import { getCategories } from "../../lib/categories.tsx";
import { getSession } from "../../lib/auth.functions.ts";
import { getGuessPercents } from "../../lib/functions/guess.ts";
import Spinner from "../../components/common/Spinner.tsx";

interface LoaderData {
  dex: Awaited<ReturnType<typeof getDex>>;
  answers: Awaited<ReturnType<typeof getAnswers>>;
  percents: { percent: number }[];
  categoryIds: ReturnType<typeof getCategories>;
}

export const Route = createFileRoute("/$seed/$username")({
  beforeLoad: async () => {
    const session = await getSession();
    return { session };
  },
  loader: async ({ params }): Promise<LoaderData> => {
    const { seed, username } = params;
    const [dexRes, answersRes] = await Promise.allSettled([getDex(), getAnswers({ data: { seed, username } })]);

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
  component: SharedPage,
});

function SharedPage() {
  const { seed, username } = Route.useParams();
  const { dex, answers, percents, categoryIds } = Route.useLoaderData();

  const percentMap = new Map(
    answers.map((a, i) => [`${a.categoryIndex}:${a.pokemonId}`, percents[i]?.percent ?? 0] as const),
  );

  return (
    <div className="p-2">
      <App
        header={<Header seed={seed} />}
        categoryIds={categoryIds}
        username={username}
        dex={dex}
        seed={seed}
        initialAnswers={answers}
        percents={percentMap}
      />
    </div>
  );
}
