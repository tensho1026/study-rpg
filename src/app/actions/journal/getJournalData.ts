"use server";

import { authOptions } from "@/lib/auth";
import { getOrCreateUserStatusFunction } from "@/lib/common/getUserStatus";
import getThisWeekRecord from "@/lib/study/getThisWeekRecord";
import getOrCreateTodayStudyRecord from "@/lib/study/getTodayStudyRecord";
import getThisMonthRecord from "@/utils/getThisMonth";
import { getServerSession } from "next-auth";

export default async function getJournalData() {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const userId = session.user.id;

  const totalStudy = (await getOrCreateUserStatusFunction(userId)).totalStudy;

  const todayStudyRecord = (await getOrCreateTodayStudyRecord(userId)).minutes;

  const thisWeekRecord = await getThisWeekRecord(userId);
  const thisMonthRecord = await getThisMonthRecord(userId);

  return { totalStudy, todayStudyRecord, thisWeekRecord, thisMonthRecord };
}
