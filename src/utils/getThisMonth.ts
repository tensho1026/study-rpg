import { endOfMonth, startOfMonth } from "date-fns";
import getToday from "./getToday";
import { prisma } from "@/lib/prisma";

export default async function getThisMonthRecord(userId: string) {
  const today = getToday();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);

  const thisMonthRecord = await prisma.studyRecord.findMany({
    where: {
      userId: userId,
      updatedAt: {
        gte: monthStart,
        lt: monthEnd,
      },
    },
  });

  return thisMonthRecord;
}
