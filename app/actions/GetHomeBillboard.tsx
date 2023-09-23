import { HomeBillboardInterface } from "../utils/types/types";
// Server Component
const URL = `${process.env.NEXT_PUBLIC_API_URL}/home-billboard`;

export default async function getHomeBillboard(
  billboardId: string
): Promise<HomeBillboardInterface> {
  const res = await fetch(`${URL}/${billboardId}`);
  return res.json();
}
