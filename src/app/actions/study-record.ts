"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const saveStudy = async (minutes: number) => {
  const session = await getServerSession(authOptions);
  const today = new Date();

  // 時間を０にする
  today.setHours(0, 0, 0, 0);

  if (!session) {
    return;
  }

  await prisma.studyRecord.upsert({
    where: {
      userId_Date: {
        userId: session.user.id,
        Date: today,
      },
    },
    update: {
      minutes: { increment: minutes },
    },
    create: {
      userId: session?.user.id,
      minutes: minutes,
      Date: today,
    },

  });

  // const nowTotalTime = await prisma.userStatus.findFirst({
  //   where:{
  //     userId:session?.user.id,
  //   },
  //   select:{
  //     totalStudy:true
  //   }
  // })

  await prisma.userStatus.update({
    where:{
      userId:session?.user.id,
    },
    data:{
      totalStudy:{increment:minutes}
    }
  })
};
