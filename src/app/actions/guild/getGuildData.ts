"use server";

import getGuildData from "@/lib/guild/getGuildDeta";

export default async function getGuildDataActions() {
  const guilds = await getGuildData();

  return guilds;
}
