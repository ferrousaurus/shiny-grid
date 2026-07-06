import { createFileRoute, redirect } from "@tanstack/react-router";
import { defaultSeed } from "../lib/defaultSeed.ts";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const seed = defaultSeed();
    throw redirect({ to: "/$seed", params: { seed } });
  },
  component: () => null,
});
