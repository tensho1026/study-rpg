export function formatMinutes(minutes: number) {
  if (!Number.isFinite(minutes)) {
    return "0時間 0分";
  }
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}時間 ${m}分`;
}
