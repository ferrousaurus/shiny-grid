import Login from "./Login.tsx";

export default function LoggedOutHeader() {
  return (
    <div className="flex">
      <a
        className="rounded p-2 m-2 bg-slate-700 hover:bg-slate-800"
        href="https://github.com/oxidalwave/shiny-grid"
      >
        <img height={28} width={28} alt="github" src="/icons/github.png" />
      </a>
      <div className="p-2 w-full">
        <Login />
      </div>
    </div>
  );
}