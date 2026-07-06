import Logout from "./Logout.tsx";
import Share from "./Share.tsx";

export interface LoggedInHeaderProps {
  seed: string;
}

export default function LoggedInHeader({ seed }: LoggedInHeaderProps) {
  return (
    <div className="flex">
      <a
        className="m-2 rounded bg-slate-700 p-2 hover:bg-slate-800"
        href="https://github.com/oxidalwave/shiny-grid"
      >
        <img height={48} width={48} alt="github" src="/icons/github.png" />
      </a>
      <div className="w-full p-2">
        <Share seed={seed} />
      </div>
      <div className="w-full p-2">
        <Logout />
      </div>
    </div>
  );
}