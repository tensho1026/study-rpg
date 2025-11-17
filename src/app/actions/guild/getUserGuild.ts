"use server";
import { authOptions } from "@/lib/auth";
import getMyGuild from "@/lib/guild/getMyGuild";
import { getServerSession } from "next-auth";

export default async function getUserGuild() {
  const session = await getServerSession(authOptions);
  if (!session) return;

  return await getMyGuild(session.user.id);
}
