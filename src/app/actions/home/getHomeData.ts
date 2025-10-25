"use server";

import { authOptions } from "@/lib/auth";
import getOrCreateTodayStudyRecord from "@/lib/get/getTodayStudyRecord";
import { getOrCreateUserStatusFunction } from "@/lib/get/getUserStatus";
import { getServerSession } from "next-auth";

export const getHomeData = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const userStatus = getOrCreateUserStatusFunction(session.user.id);

  const todayStudyRecord = getOrCreateTodayStudyRecord(session.user.id);
  return { userStatus, todayStudyRecord };
};
