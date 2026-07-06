import { type ReactNode } from "react";
import Providers from "./providers/Providers.tsx";

export default function Shell({ children }: { children: ReactNode }) {
  return (
    <main className="">
      <Providers>{children}</Providers>
    </main>
  );
}
