export interface BlogProp {
  id: number;
  title: string;
  context: string;
  slug: string;
  except: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export async function getAllBlogs() {
  const res = await fetch(
    "https://ylfbtnwzwdzqsmipjzuv.supabase.co/rest/v1/blogs",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey as string,
        authorization: `Bearer ${supabaseKey}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data as BlogProp[];
}
