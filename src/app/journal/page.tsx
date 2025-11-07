import Journal from "@/components/journal/Journal";
import getJournalData from "../actions/journal/getJournalData";

export default async function JournalPage() {
  const data = await getJournalData();
  console.log(data?.totalStudy, "全部合計");
  console.log(data?.todayStudyRecord, "今日の合計");
  console.log(data?.thisWeekRecord, "今週");
  console.log(data?.thisMonthRecord, "今月");
  return <Journal />;
}
