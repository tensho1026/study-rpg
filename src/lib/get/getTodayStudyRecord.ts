import getToday from "@/utils/getToday";
import { prisma } from "../prisma";

async function getTodayStudyRecord(userId: string) {
  const today = getToday();

  return await prisma.studyRecord.findFirst({
    where: {
      userId: userId,
      Date: today,
    },
  });
}

export default async function getOrCreateTodayStudyRecord(userId: string) {
  const today = getToday();
  let record = await getTodayStudyRecord(userId);
  if (!record) {
    record = await prisma.studyRecord.create({
      data: {
        userId: userId,
        Date: today,
        minutes: 0,
      },
    });
  }
  return record;
}
