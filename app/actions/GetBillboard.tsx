import { BillboardInterface } from "../utils/types/types";
// Server Component
const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

export default async function getBillboard(
  billboardId: string
): Promise<BillboardInterface> {
  const res = await fetch(`${URL}/${billboardId}`);
  return res.json();
}
