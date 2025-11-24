"use client";

import { BattleItem } from "@/types/battleItem";
import { BattleStatusType } from "@/types/battleStatus";
import { Enemy } from "@/types/enemy";
import { useRef, useState } from "react";
import { useBattleAnimation } from "./useBattleAnimation";
import { calcEnemyHp, calcHeal, calcPlayerHp } from "@/domain/battle/combat";
import saveRewards from "@/app/actions/battle/saveRewards";
import { DropDetail } from "@/types/dropItem";

export function useBattleEngine({
  userInfo,
  enemyData,
  dropItems,
  userAttackStatus,
  userDefenseStatus,
  items,
}: {
  userInfo: BattleStatusType | null;
  enemyData: Enemy | null;
  dropItems: {
    monsterDrop: DropDetail;
    normalDrop: DropDetail;
  };
  userAttackStatus: number;
  userDefenseStatus: number;
  items: BattleItem[];
}) {
  const [status, setStatus] = useState<BattleStatusType | null>(userInfo);
  const [enemy, setEnemy] = useState<Enemy | null>(enemyData);
  const [dropItem] = useState(dropItems);
  const [battleLog, setBattleLog] = useState<string>(`${enemy?.name}が現れた`);
  const [playerAttackAnim, setPlayerAttackAnim] = useState(false);
  const [enemyAttackAnim, setEnemyAttackAnim] = useState(false);
  const [defeat, setDefeat] = useState(false);
  const [victory, setVictory] = useState(false);
  const initialLevelRef = useRef<number>(userInfo?.level ?? 0);
  const [userLevel, setUserLevel] = useState<number>(initialLevelRef.current);
  const [userItems, setUserItems] = useState<BattleItem[] | null>(items ?? []);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const previousLevel = initialLevelRef.current;

  const { userAnimation, enemyAnimation } = useBattleAnimation(
    setPlayerAttackAnim,
    setEnemyAttackAnim
  );

  const switchUseItem = (item: BattleItem) => {
    switch (item.type) {
      case "heal":
        return healHp(item.healHp ?? 0);

      // ここから下は回復以外のアイテムが出たら追加する
      // case "attack":
      //   return ...
    }
  };

  const cleanup = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  const healHp = (amount: number) => {
    userAnimation();
    setBattleLog(`${status?.user.name}のHPが${amount}回復した`);
    setStatus((prev) => {
      if (!prev) return null;
      // ここで最大hpより回復しないようにしている
      const newHp = calcHeal(prev, amount);
      return { ...prev, hp: newHp };
    });
  };

  const userAttack = () => {
    if (!enemy) return;
    userAnimation();
    const newEnemyHp = calcEnemyHp(enemy, userAttackStatus);
    const updatedEnemy = { ...enemy, hp: newEnemyHp };

    setEnemy(updatedEnemy);
    setBattleLog(
      `${status?.user.name}の攻撃！敵の${enemy.name}に${userAttackStatus}の攻撃！`
    );
    return updatedEnemy;
  };

  const handleVictory = () => {
    if (!enemy) return;
    const id = setTimeout(async () => {
      setBattleLog("君の勝利だ！");
      setVictory(true);
      const newLevel = await saveRewards(
        dropItem.normalDrop.id,
        dropItem.monsterDrop.id,
        enemy.coin ?? 0,
        enemy.exp,
        status?.hp ?? 0
      );
      if (typeof newLevel === "number") {
        setUserLevel(newLevel);
      }
    }, 2000);

    timeouts.current.push(id);

    return;
  };

  const enemyAttack = () => {
    if (!enemy) return;
    enemyAnimation();
    setStatus((prevStatus) => {
      if (!prevStatus) return null;

      const newStatusHp = calcPlayerHp(
        prevStatus,
        enemy.attack,
        userDefenseStatus
      );
      const newStatus = { ...prevStatus, hp: newStatusHp };

      if (newStatus.hp <= 0) {
        // HPが0以下になった時点でのみ敗北判定
        handleDefeat();
      }

      const defenderName = prevStatus.user?.name ?? "";
      setBattleLog(
        `敵の${enemy.name}の攻撃！${defenderName}に${
          300 - userDefenseStatus
        }の攻撃！`
      );

      return newStatus;
    });
  };

  const handleDefeat = () => {
    const id = setTimeout(() => {
      setBattleLog("君の負けだ...");
      setDefeat(true);
    }, 3000);
    timeouts.current.push(id);
  };

  const handleAttack = async () => {
    if (!enemy) return;
    const updatedEnemy = userAttack();
    if (updatedEnemy!.hp <= 0) {
      handleVictory();
      return;
    }
    const id = setTimeout(() => {
      enemyAttack();
    }, 2000);
    timeouts.current.push(id);
  };

  const handleUseItem = async (item: BattleItem) => {
    if (!enemy) return;
    switchUseItem(item);
    const id = setTimeout(enemyAttack, 2000);
    timeouts.current.push(id);
  };

  return {
    status,
    enemy,
    battleLog,
    playerAttackAnim,
    enemyAttackAnim,
    victory,
    defeat,
    userLevel,
    userItems,
    cleanup,
    handleAttack,
    handleUseItem,
    previousLevel,
  };
}
