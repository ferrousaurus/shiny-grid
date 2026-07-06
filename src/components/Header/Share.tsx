import { authClient } from "../../lib/auth-client.ts";
import { toast } from "react-hot-toast";
import { Button } from "../ui/button.tsx";

export interface ShareProps {
  seed: string;
}

export default function Share({ seed }: ShareProps) {
  const session = authClient.useSession();

  function handleShare() {
    const baseUrl = import.meta.env.VITE_API_URL ?? "";
    void navigator.clipboard
      .writeText(`${baseUrl}/${seed}/${session.data?.user.name}`)
      .then(() => toast("A sharable link has been copied to your clipboard!"));
  }

  return (
    <Button className="w-full" onClick={handleShare}>
      Share your grid
    </Button>
  );
}