"use server";

import getGuildByid from "@/lib/guild/getGuildById";

export default async function getGuildByIdAction(id: string) {
  return await getGuildByid(id);
}
