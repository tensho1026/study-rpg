"use server";
import { authOptions } from "@/lib/auth";
import createGuild from "@/lib/guild/createGuild";
import createUserGuildStatus from "@/lib/guild/createUserGuildStatus";
import { getServerSession } from "next-auth";

export default async function createGuildAction(
  name: string,
  description: string
) {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const userId = session.user.id;
  const guildId = await createGuild(name, description, userId);
  await createUserGuildStatus(userId, guildId);

  return guildId
}
