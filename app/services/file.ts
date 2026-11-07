export interface FileProp {
  id: string;
  created_At: string;
  title: string;
  type: string;
  category: string;
  link: string;
}

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export async function getFiles(): Promise<FileProp[]> {
  const url = "https://ylfbtnwzwdzqsmipjzuv.supabase.co/rest/v1/file";
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseKey as string,
      Authorization: `Bearer ${supabaseKey}`,
    },
  });

  if (!res.ok) {
    const errorData = (await res.json()) as { message: string };
    throw new Error(`Unable to fetch file data: ${errorData.message}`);
  }

  const data = await res.json();
  return data as FileProp[];
}
