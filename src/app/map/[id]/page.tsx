import Map from "@/components/map/Map";
import getEnemy from "@/lib/battle/getEnemy";

type Props = {
  params: {
    id: string;
  };
};

export default async function MapPage({ params }: Props) {
  const { id } = params;
  console.log(id, "mapIDdddd");
  const enemy = await getEnemy("cave");
  console.log(enemy);
  return <Map />;
}
