"use server";

import { authOptions } from "@/lib/auth";
import saveStudyFunction from "@/lib/save/saveStudy";
import updateUserLevel from "@/lib/save/updateUserLevel";
import updateUserStautusFunction from "@/lib/save/updateUserStatus";
import getToday from "@/utils/getToday";
import { getServerSession } from "next-auth";

export const saveStudy = async (minutes: number) => {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const today = getToday();

  await saveStudyFunction({
    userId: session.user.id,
    today: today,
    minutes: minutes,
  });

  const updatedStatus = await updateUserStautusFunction(
    session.user.id,
    minutes
  );

  await updateUserLevel(session.user.id, updatedStatus?.totalStudy);
};
