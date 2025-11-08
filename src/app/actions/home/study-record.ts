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
  const allowed = Math.min(Math.max(minutes, 0), 1440 - todayminutes);

  if (allowed <= 0) return;

  if (allowed > 0) {
    await saveStudyFunction({
      userId: session.user.id,
      today,
      minutes: allowed,
    });

    const updatedStatus = await updateUserStautusFunction(
      session.user.id,
      allowed
    );
    await updateUserLevel(session.user.id, updatedStatus?.totalStudy);
  }
};
