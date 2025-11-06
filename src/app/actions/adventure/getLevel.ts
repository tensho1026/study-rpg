"use server";

import { authOptions } from "@/lib/auth";
import { getUserLevel } from "@/lib/common/getUserLevel";
import { getServerSession } from "next-auth";

export async function getLevel() {
  const session = await getServerSession(authOptions);
  if (!session) return;
  return await getUserLevel(session.user.id);
}
