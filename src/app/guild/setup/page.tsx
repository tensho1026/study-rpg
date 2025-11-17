import getUserGuild from "@/app/actions/guild/getUserGuild";
import Setup from "@/components/guild/setup/Setup";
import { redirect } from "next/navigation";

export default async function SetupPage() {
  const guild = await getUserGuild();
  if (guild) {
    redirect(`/guild/${guild.id}`);
  }
  return <Setup />;
}
