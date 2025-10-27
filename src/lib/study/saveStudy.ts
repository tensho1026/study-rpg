import { prisma } from "../prisma";

type Props = {
  userId: string;
  today: Date;
  minutes: number;
};

export default async function saveStudyFunction({
  userId,
  today,
  minutes,
}: Props) {
  await prisma.studyRecord.upsert({
    where: {
      userId_Date: {
        userId: userId,
        Date: today,
      },
    },
    update: {
      minutes: { increment: minutes },
    },
    create: {
      userId: userId,
      minutes: minutes,
      Date: today,
    },
  });
}
