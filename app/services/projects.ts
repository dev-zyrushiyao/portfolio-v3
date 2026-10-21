import supabase from "./supabase";

export interface ProjectProp {
  readonly id?: string;
  readonly title: string;
  readonly description_desktop: string;
  readonly description_mobile: string;
  readonly image_url: string;
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

export async function getProjects(): Promise<ProjectProp[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data as ProjectProp[];
}

export async function addInitData() {
  const { error } = await supabase.from("projects").insert({
    title: "Calamba Water District Mobile Application",
    description_desktop:
      "A comprehensive mobile application concept designed to modernize and streamline the customer experience for the Calamba Water District. This user-centered platform bridges the gap between utility providers and consumers by digitizing essential everyday services into an intuitive, highly accessible mobile interface. Developed using a scalable cross-platform frontend framework and robust state management, the application emphasizes clean code architecture, fluid navigation flows, and reliable performance across various mobile viewports, ensuring a polished and production-ready standard.",
    description_mobile:
      "A mobile application that handles bill payments, support tickets, and bill history. A personal project submitted to Calamba Water District",
    image_url:
      "https://ylfbtnwzwdzqsmipjzuv.supabase.co/storage/v1/object/public/project-images/project_cwd_app.png",
    demo_url:
      "https://dev-zyrushiyao.github.io/Calamba-Water-District-Mobile-App/#/getstarted",
    documentation_url:
      "https://www.behance.net/gallery/246885791/UIUX-Case-Study-CWD-Web-Mobile-Design-Concept",
    prototype_url: null,
    github_url:
      "https://github.com/dev-zyrushiyao/Calamba-Water-District-Mobile-App/tree/RIVERPOD-FrontEnd-UI",
    tags: [
      {
        name: "Flutter",
        icon_url:
          "https://ylfbtnwzwdzqsmipjzuv.supabase.co/storage/v1/object/public/techstack-image/flutter.png",
      },
      {
        name: "Figma",
        icon_url:
          "https://ylfbtnwzwdzqsmipjzuv.supabase.co/storage/v1/object/public/techstack-image/figma.png",
      },
      {
        name: "Material Design",
        icon_url:
          "https://ylfbtnwzwdzqsmipjzuv.supabase.co/storage/v1/object/public/techstack-image/material-design.png",
      },
      {
        name: "Riverpod",
        icon_url:
          "https://ylfbtnwzwdzqsmipjzuv.supabase.co/storage/v1/object/public/techstack-image/riverpod.png",
      },
    ],
  });

  if (error) {
    console.log("error inserting data", error);
    return false;
  }

  return true;
}
