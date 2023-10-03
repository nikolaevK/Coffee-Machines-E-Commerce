import { ColorInterface } from "../utils/types/types";
// Server Component
const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

export default async function getColors() {
  try {
    const res = await fetch(URL);
    const colors: ColorInterface[] = await res.json();
    return colors;
  } catch (error) {
    console.log("Error inside getCategories");
  }
}
