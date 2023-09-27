import { BillboardInterface } from "../utils/types/types";
// Server Component
const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

export default async function getBillboard(billboardId: string) {
  try {
    const res = await fetch(`${URL}/${billboardId}`);
    const billboard: BillboardInterface = await res.json();
    return billboard;
  } catch (error) {
    console.log("Error fetchingBillboard");
  }
}
