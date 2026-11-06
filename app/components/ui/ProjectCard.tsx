import React, { useRef } from "react";
import { ProjectProp } from "../../services/projects";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import color from "../../design-system/DesignSystem";
import Image from "next/image";
import defaultImage from "@/public/default_img.png";

interface ProjectCardProp {
  project: ProjectProp;
  onClick: (e?: React.MouseEvent) => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProp) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const card = container.current?.querySelector(".project-card");
      if (!card) return;

      card.addEventListener("mouseenter", (target) => {
        gsap.to(target.currentTarget, {
          backgroundColor: color.accent,
          duration: 0.3,
          ease: "none",
        });
      });

      card.addEventListener("mouseleave", (target) => {
        gsap.to(target.currentTarget, {
          backgroundColor: "#f3f4f6",
          ease: "none",
        });
      });
    },
    { scope: container },
  );

  return (
    <div ref={container}>
      <div
        className="project-card lg:h-150  w-100 border rounded-2xl bg-[#f3f4f6] border-gray-400 p-10 flex flex-col gap-5 cursor-pointer"
        onClick={onClick}
      >
        <div className="image-wrapper rounded-xl overflow-hidden h-50 w-full  bg-gray-300 border border-gray-300 relative">
          <Image
            src={!project.image_url ? defaultImage : project.image_url}
            alt="frontend project"
            sizes="(max-width: 768px) 100vw, 50vw"
            fill
            className="object-cover"
            loading="eager"
          ></Image>
        </div>
        <div className="project-information flex flex-col gap-5 ">
          <h5 className="project-title wrap-break-word">{project.title}RAT</h5>
          <p className="project-description lg:line-clamp-5 hidden">
            {project.description_desktop}
          </p>
          <p className="project-description lg:hidden line-clamp-3">
            {project.description_mobile}
          </p>
        </div>
      </div>
    </div>
  );
}
