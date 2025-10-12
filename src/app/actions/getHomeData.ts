"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const getHomeData = async () => {
  const session = await getServerSession(authOptions);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (!session) return;

  let userStatus = await prisma.userStatus.findFirst({
    where: { userId: session?.user.id },
  });

  if (!userStatus && session) {
    userStatus = await prisma.userStatus.create({
      data: {
        userId: session?.user.id,
      },
    });
  }

  let todayStudyRecord = await prisma.studyRecord.findFirst({
    where: {
      userId: session?.user.id,
      Date: today,
    },
  });
  if (!todayStudyRecord) {
    todayStudyRecord = await prisma.studyRecord.create({
      data: {
        userId: session?.user.id,
        Date: today,
        minutes: 0,
      },
    });
  }
  return { userStatus, todayStudyRecord };
};
