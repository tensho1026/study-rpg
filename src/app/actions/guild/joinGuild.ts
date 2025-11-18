"use server";

import { authOptions } from "@/lib/auth";
import joinGuildFunction from "@/lib/guild/joinGuild";
import { getServerSession } from "next-auth";

export default async function joinGuild(guildId: string) {
  const session = await getServerSession(authOptions);
  if (!session) return;
  await joinGuildFunction(session.user.id, guildId);
}
