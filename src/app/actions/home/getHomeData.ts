"use server";

import { authOptions } from "@/lib/auth";
import getOrCreateTodayStudyRecord from "@/lib/study/getTodayStudyRecord";
import { getOrCreateUserStatusFunction } from "@/lib/common/getUserStatus";
import { getServerSession } from "next-auth";

export const getHomeData = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const userStatus = await getOrCreateUserStatusFunction(session.user.id);

  const todayStudyRecord = await getOrCreateTodayStudyRecord(session.user.id);
  return { userStatus, todayStudyRecord };
};
