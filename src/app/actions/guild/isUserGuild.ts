import { authOptions } from "@/lib/auth";
import isUserInGuild from "@/lib/guild/isUserInGuild";
import { getServerSession } from "next-auth";

export default async function isUserGuild() {
  const session = await getServerSession(authOptions);
  if (!session) return;

  return await isUserInGuild(session.user.id);
}
