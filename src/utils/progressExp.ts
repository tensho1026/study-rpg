import { levelBorder } from "@/constant/levelBorder";
import { UserStatus } from "@/types/userStatus";

export default function progressExp(userStatus?: UserStatus | null): number {
  if (!userStatus) return 0;

  const { level: userLevel, exp: userExp } = userStatus;

  // 現在のレベル境界と次のレベル境界（レベル境界が存在しない場合は直前の値を使う）
  const currentLevelBorder = levelBorder[userLevel - 1] ?? 0;
  const nextLevelBorder = levelBorder[userLevel] ?? currentLevelBorder;

  if (nextLevelBorder === currentLevelBorder) return 100;

  // 必要経験値と現在の進捗
  const requiredExp = nextLevelBorder - currentLevelBorder;
  const gainedExp = userExp - currentLevelBorder;

  // 進捗率（%）
  const progressPercent = Number(((gainedExp / requiredExp) * 100).toFixed(0));

  return Math.max(0, Math.min(100, progressPercent));
}
