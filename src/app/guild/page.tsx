import { redirect } from "next/navigation";
import getUserGuild from "../actions/guild/getUserGuild";

export default async function GuildIndex() {
  const userGuildStatus = await getUserGuild();

  if (!userGuildStatus) {
    redirect("/guild/setup");
  }

  redirect(`/guild/${userGuildStatus.guildId}`);
}
