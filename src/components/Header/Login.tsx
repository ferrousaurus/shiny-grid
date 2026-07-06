import { authClient } from "../../lib/auth-client.ts";
import { Button } from "../ui/button.tsx";

export default function Login() {
  return (
    <Button
      className="w-full"
      onClick={() => void authClient.signIn.social({ provider: "discord" })}
    >
      Log In to share your grid
    </Button>
  );
}