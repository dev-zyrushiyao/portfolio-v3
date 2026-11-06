

export interface ProjectProp {
  readonly id?: string;
  readonly title: string;
  readonly description_desktop: string;
  readonly description_mobile: string;
  readonly image_url: string | null;
  readonly demo_url: string;
  readonly documentation_url: string;
  readonly prototype_url: string;
  readonly github_url: string;
  readonly tags: {
    name: string;
    icon_url: string;
  }[];
  readonly created_at?: string;
  readonly updated_at?: string;
}

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export async function getProjects(): Promise<ProjectProp[]> {
  //decensding order by created_at
  const res = await fetch(
    `https://ylfbtnwzwdzqsmipjzuv.supabase.co/rest/v1/projects?order=created_at.desc`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey as string,
      },
    },
  );

  const data = await res.json();
  return data as ProjectProp[];
}
