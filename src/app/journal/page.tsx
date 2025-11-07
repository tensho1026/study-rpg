import Journal from "@/components/journal/Journal";
import getJournalData from "../actions/journal/getJournalData";

export default async function JournalPage() {
  const data = await getJournalData();
  if (!data) return;
  return <Journal initialData={data} />;
}
