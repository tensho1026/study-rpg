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

  const [userStatus, todayRecord, weekRecord, monthRecord] = await Promise.all([
    getOrCreateUserStatusFunction(userId),
    getOrCreateTodayStudyRecord(userId),
    getThisWeekRecord(userId),
    getThisMonthRecord(userId),
  ]);

  return {
    totalStudy: userStatus.totalStudy,
    todayStudyRecord: todayRecord.minutes,
    thisWeekRecord: weekRecord,
    thisMonthRecord: monthRecord,
  };
}
