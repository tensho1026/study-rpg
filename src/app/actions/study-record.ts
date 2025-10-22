"use server";

import { levelBorder } from "@/constant/levelBorder";
import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Coinbase from "next-auth/providers/coinbase";

export const saveStudy = async (minutes: number) => {
  const session = await getServerSession(authOptions);
  const today = new Date();

  // 時間を０にする
  today.setHours(0, 0, 0, 0);

  if (!session) {
    return;
  }

  // 勉強時間の保存
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

//  勉強時間、coin、経験値をuserstatusに保存
  const updatedStatus = await prisma.userStatus.update({
    where: {
      userId: session?.user.id,
    },
    data: {
      totalStudy: { increment: minutes },
      money: { increment: minutes },
      exp: { increment: minutes },
    },
    select: {
      totalStudy: true,
    },
  });

  // numberを必ず扱うようにしてundefinedを避ける
  const total = updatedStatus?.totalStudy ?? 0;

  // レベル計算
  const newLevel = levelBorder.filter((time) => total >= time).length - 1;

  // レベルの保存
  await prisma.userStatus.update({
    where: {
      userId: session?.user.id,
    },
    data: {
      level: newLevel,
    },
  });

  return newLevel;
};
