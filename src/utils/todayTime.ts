export default function todayStudyTime(todayStudyMinutes: number) {
  const todayMinutes = todayStudyMinutes ?? 0;
  const totalHours = Math.floor(todayMinutes / 60);
  const restMinutes = todayMinutes % 60;

  return { todayMinutes, totalHours, restMinutes };
}
