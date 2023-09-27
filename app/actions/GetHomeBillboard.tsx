import { HomeBillboardInterface } from "../utils/types/types";
// Server Component
const URL = `${process.env.NEXT_PUBLIC_API_URL}/home-billboard`;

export default async function getHomeBillboard(billboardId: string) {
  try {
    const res = await fetch(`${URL}/${billboardId}`);

    const homeBillboard: HomeBillboardInterface = await res.json();
    return homeBillboard;
  } catch (error) {
    console.log("Failed to fetch home billboard");
  }
}
