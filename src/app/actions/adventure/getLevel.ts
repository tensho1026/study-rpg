"use server";

import { authOptions } from "@/lib/auth";
import { getUserLevel } from "@/lib/common/getUserLevel";
import { getServerSession } from "next-auth";

export async function getLevel() {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const level = await getUserLevel(session.user.id);

  return level;
}
