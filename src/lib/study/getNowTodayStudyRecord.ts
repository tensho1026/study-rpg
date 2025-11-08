import { prisma } from "../prisma";

type Props = {
  userId: string;
  today: Date;
};

export default async function getNowTodayStudyRecord({ userId, today }: Props) {
  const record = await prisma.studyRecord.upsert({
    where: {
      userId_Date: {
        userId,
        Date: today,
      },
    },
    update: {},
    create: {
      userId,
      Date: today,
      minutes: 0,
    },
    select: {
      minutes: true,
    },
  });

  return record.minutes;
}
