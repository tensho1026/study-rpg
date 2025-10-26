import { prisma } from "../prisma";

type Props = {
  userId: string;
  today: Date;
};
export default async function getNowTodayStudyRecord({ userId, today }: Props) {
  let todayminutes = await prisma.studyRecord.findFirst({
    where: {
      userId: userId,
      Date: today,
    },
    select: {
      minutes: true,
    },
  });

  if (!todayminutes) {
    todayminutes = await prisma.studyRecord.create({
      data: {
        userId: userId,
        Date: today,
      },
      select: {
        minutes: true,
      },
    });
  }

  return todayminutes?.minutes;
}
