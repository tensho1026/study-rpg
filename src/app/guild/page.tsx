import { redirect } from "next/navigation";
import getUserGuild from "../actions/guild/getUserGuild";

export default async function GuildIndex() {
  const guild = await getUserGuild();

  if (!guild) {
    redirect("/guild/setup");
  }

  redirect(`/guild/${guild.id}`);
}
