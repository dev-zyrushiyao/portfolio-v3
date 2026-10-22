import supabase from "./supabase";

export type CategoryProp = { id: number; category_type: string };

export async function getCategory(): Promise<CategoryProp[]> {
  "use cache";
  const { data, error } = await supabase
    .from("category")
    .select("id, category_type");

  if (error) {
    console.log("Error: ", error);
    return [];
  }

  return (data as CategoryProp[]) || [];
}
