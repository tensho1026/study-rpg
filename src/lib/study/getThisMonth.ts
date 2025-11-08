import { endOfMonth, startOfMonth } from "date-fns";

import { prisma } from "@/lib/prisma";
import getToday from "@/utils/getToday";

export default async function getThisMonthRecord(userId: string) {
  const today = getToday();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);

  const thisMonthRecord = await prisma.studyRecord.findMany({
    where: {
      userId: userId,
      Date: {
        gte: monthStart,
        lt: monthEnd,
      },
    },
  });

  return thisMonthRecord;
}
