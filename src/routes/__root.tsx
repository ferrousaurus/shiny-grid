import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import Providers from "../components/providers/Providers.tsx";
import appCss from "../styles/globals.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "Shiny Grid" },
      { name: "description", content: "Game for guessing" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/icons/pokeball.png" },
      { property: "og:url", content: "https://shiny-grid.oxidalwave.com" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className="bg-slate-900 font-pokemon text-white">
        <Providers>
          <Outlet />
        </Providers>
        <Scripts />
      </body>
    </html>
  );
}
