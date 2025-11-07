"use server";

import { authOptions } from "@/lib/auth";
import getOrCreateTodayStudyRecord from "@/lib/study/getTodayStudyRecord";
import { getOrCreateUserStatusFunction } from "@/lib/common/getUserStatus";
import { getServerSession } from "next-auth";

export const getHomeData = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const userId = session.user.id;

  const [userStatus, todayStudyRecord] = await Promise.all([
    getOrCreateUserStatusFunction(userId),
    getOrCreateTodayStudyRecord(userId),
  ]);

  return { userStatus, todayStudyRecord };
};
