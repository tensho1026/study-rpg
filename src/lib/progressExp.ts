import { levelBorder } from "@/constant/levelBorder";
import { UserStatus } from "@/types/userStatus";

export default function progressExp(userStatus:UserStatus) {
  if (!userStatus) return;

  const { level: userLevel, exp: userExp } = userStatus;

  // 現在のレベル境界と次のレベル境界
  const currentLevelBorder = levelBorder[userLevel - 1];
  const nextLevelBorder = levelBorder[userLevel];

  // 必要経験値と現在の進捗
  const requiredExp = nextLevelBorder - currentLevelBorder;
  const gainedExp = userExp - currentLevelBorder;

  // 進捗率（%）
  const progressPercent = Number(((gainedExp / requiredExp) * 100).toFixed(0));
  console.log("必要経験値:", requiredExp);
  console.log("現在の進捗経験値:", gainedExp);
  console.log("進捗率:", progressPercent, "%");

  return progressPercent;
}
