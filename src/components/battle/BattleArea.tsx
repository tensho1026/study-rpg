import { Enemy } from "@/types/enemy";
import BattleSprite from "./BattleSprite";

type Props = {
  enemy: Enemy | null
  enemyAttackAnim: boolean;
  playerAttackAnim: boolean;
  userName: string;
};

function BattleArea({
  enemy,
  enemyAttackAnim,
  playerAttackAnim,
  userName,
}: Props) {
  return (
    <section className="relative overflow-hidden rounded-md border-2 border-slate-700 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
      {/* ドット模様 */}
      <div className="absolute inset-0  opacity-10" />
      <div className="relative flex h-[300px] items-center justify-between">
        <div className="flex flex-col gap-10 pl-2 md:pl-6">
          {enemy ? (
            <div
              className={`relative transition-all duration-300 ${
                enemyAttackAnim
                  ? "translate-x-5 scale-110 drop-shadow-[0_0_18px_rgba(250,204,21,0.5)]"
                  : "translate-x-0"
              }`}
            >
              {enemyAttackAnim ? (
                <span className="pointer-events-none absolute -left-6 top-1/2 h-12 w-12 -translate-y-1/2 rotate-12 bg-[radial-gradient(circle,rgba(250,204,21,0.55),transparent_70%)] blur-md" />
              ) : null}
              <BattleSprite label={enemy.name} variant="enemy" />
            </div>
          ) : null}
        </div>
        <div className="flex w-full justify-end pr-2 md:pr-6">
          <div
            className={`relative transition-all duration-300 ${
              playerAttackAnim
                ? "-translate-x-5 scale-110 drop-shadow-[0_0_24px_rgba(56,189,248,0.55)]"
                : "translate-x-0"
            }`}
          >
            {playerAttackAnim ? (
              <span className="pointer-events-none absolute -right-8 top-1/2 h-12 w-16 -translate-y-1/2 rotate-[18deg] bg-[radial-gradient(circle,rgba(56,189,248,0.55),transparent_70%)] blur-lg" />
            ) : null}
            <BattleSprite label={userName ?? ""} variant="player" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BattleArea;
