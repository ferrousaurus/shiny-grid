import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { Toaster } from "react-hot-toast";
import { MantineProvider, createTheme } from "@mantine/core";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: { queries: { staleTime: 5000 } },
    }),
  );

  const [theme] = useState(createTheme({}));

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>{children}</MantineProvider>
      <Toaster />
    </QueryClientProvider>
  );
}
