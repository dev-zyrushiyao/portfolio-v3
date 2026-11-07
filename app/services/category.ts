// "use cache";
// "use server";
import supabase from "./supabase/supabase";

export type CategoryProp = { id: number; category_type: string };
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export async function getCategory(): Promise<CategoryProp[] | []> {
  "use cache";

  const res = await fetch(
    `https://ylfbtnwzwdzqsmipjzuv.supabase.co/rest/v1/category`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey as string,
        Authorization: `Bearer ${supabaseKey}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch categories: ${res.status} ${res.statusText}`,
    );
  }

  const data = await res.json();
  return (data as CategoryProp[]) || [];
}
