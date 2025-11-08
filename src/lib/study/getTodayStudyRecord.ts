import getToday from "@/utils/getToday";
import { prisma } from "../prisma";

export default async function getOrCreateTodayStudyRecord(userId: string) {
  const today = getToday();
  const record = await prisma.studyRecord.upsert({
    where: {
      userId_Date: {
        userId,
        Date: today,
      },
    },
    update: {},
    create: {
      userId: userId,
      Date: today,
      minutes: 0,
    },
  });

  return record;
}
