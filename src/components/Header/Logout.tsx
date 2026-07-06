import { authClient } from "../../lib/auth-client.ts";
import { Button } from "../ui/button.tsx";

export default function Logout() {
  return (
    <Button className="w-full" onClick={() => void authClient.signOut()}>
      Log Out
    </Button>
  );
}