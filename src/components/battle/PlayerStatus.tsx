import { Button } from "../ui/button";
import { Card } from "../ui/card";
import HpBar from "./HpBar";

type UserStatus = {
  name: string;
  hp: number;
  maxHp: number;
  handleAttack: () => void;
};

type Props = {
  userStatus: UserStatus;
};

function PlayerStatus({ userStatus }: Props) {
  return (
    <Card className="space-y-4 bg-slate-900/80 border-2 border-slate-700 p-4 rounded-sm">
      <h2 className="text-sm font-bold tracking-wider text-cyan-300">PLAYER</h2>
      <div className="rounded-sm border border-slate-700 bg-slate-950/60 p-2">
        <div className="flex justify-between text-xs text-slate-200">
          <span>{userStatus?.name}</span>
          <span>HP</span>
        </div>
        <HpBar
          current={userStatus?.hp ?? 0}
          max={userStatus?.maxHp ?? 0}
          color="bg-cyan-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="secondary"
          className="border-2 border-slate-600 bg-amber-400 hover:bg-amber-500 font-bold text-slate-900"
          onClick={userStatus?.handleAttack}
        >
          たたかう
        </Button>
        {/* <Button
          variant="outline"
          className="border-2 border-slate-600 text-slate-200 hover:bg-slate-700"
        >
          まもる
        </Button> */}
        {/* <Button
          variant="outline"
          className="border-2 border-slate-600 text-slate-200 hover:bg-slate-700"
        >
          スキル
        </Button> */}
        <Button
          variant="outline"
          className="border-2 border-slate-600 text-slate-200 hover:bg-slate-700"
        >
          アイテム
        </Button>
      </div>
    </Card>
  );
}

export default PlayerStatus;
