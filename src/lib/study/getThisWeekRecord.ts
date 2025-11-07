import getToday from "@/utils/getToday";
import { startOfWeek, endOfWeek } from "date-fns";
import { prisma } from "../prisma";

export default async function getThisWeekRecord(userId: string) {
  const today = getToday();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // 月曜始まり
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

  const thisWeekRecord = await prisma.studyRecord.findMany({
    where: {
      userId: userId,
      updatedAt: {
        gte: weekStart,
        lt: weekEnd,
      },
    },
  });

  return thisWeekRecord;
}
