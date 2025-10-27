"use server";

import { authOptions } from "@/lib/auth";
import getNowTodayStudyRecord from "@/lib/study/getNowTodayStudyRecord";
import saveStudyFunction from "@/lib/study/saveStudy";
import updateUserLevel from "@/lib/study/updateUserLevel";
import updateUserStautusFunction from "@/lib/study/updateUserStatus";
import getToday from "@/utils/getToday";
import { getServerSession } from "next-auth";

export const saveStudy = async (minutes: number) => {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const today = getToday();

  const todayminutes = await getNowTodayStudyRecord({
    userId: session.user.id,
    today: today,
  });

  if (todayminutes === undefined) return;

  // 勉強時間の合計が24時間に到達していない場合実行
  if (todayminutes + minutes <= 1440) {
    // 今日の勉強時間をtodayStudyRecordに保存
    await saveStudyFunction({
      userId: session.user.id,
      today: today,
      minutes: minutes,
    });

    // userStatusに保存
    const updatedStatus = await updateUserStautusFunction(
      session.user.id,
      minutes
    );

    // Level更新
    await updateUserLevel(session.user.id, updatedStatus?.totalStudy);
  } else {
    // 勉強時間の合計が24時間を超える場合のロジック
    const possibleMinutes = 1440 - todayminutes;
    await saveStudyFunction({
      userId: session.user.id,
      today: today,
      minutes: possibleMinutes,
    });

    const updatedStatus = await updateUserStautusFunction(
      session.user.id,
      possibleMinutes
    );

    await updateUserLevel(session.user.id, updatedStatus?.totalStudy);
  }
};
