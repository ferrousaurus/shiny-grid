import { authClient } from "../../lib/auth-client.ts";
import LoggedInHeader from "./LoggedInHeader.tsx";
import LoggedOutHeader from "./LoggedOutHeader.tsx";

export interface HeaderProps {
  seed: string;
}

export default function Header({ seed }: HeaderProps) {
  const session = authClient.useSession();

  return (
    <div className="p-2">
      {session.data ? <LoggedInHeader seed={seed} /> : <LoggedOutHeader />}
    </div>
  );
}