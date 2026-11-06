import React from "react";
import { ProjectProp } from "../../services/projects";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import defaultImage from "@/public/default_img.png";

interface ProjectModalProp {
  selectedProject: ProjectProp;
}

export default function ProjectModal({ selectedProject }: ProjectModalProp) {
  return (
    <div
      className="modal-content lg:h-[80vh] lg:w-[50vw] h-[80vw] w-[80vw] rounded-3xl md:p-10 p-8 overflow-y-scroll bg-white"
      onClick={(e: React.MouseEvent) => {
        //stops the state from restarting
        //this prevent the closing of modal when a link has been clicked
        e.stopPropagation();
      }}
    >
      <div className="wrapper">
        <div className="image-wrapper rounded-xl lg:h-[40vh] h-[20vh] w-full bg-pink-200 border border-gray-300 overflow-hidden relative">
          <Image
            src={
              !selectedProject.image_url
                ? defaultImage
                : selectedProject.image_url
            }
            alt="frontend project"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="eager"
            className="object-cover"
          ></Image>
        </div>
        <div className="modal-details flex flex-col gap-5 py-5 border-b border-b-black">
          <div className="modal-title flex flex-row border-b border-gray-500">
            <div className="title-wrapper w-full">
              <h5 className="">{selectedProject.title}</h5>
            </div>
          </div>
          <div className="modal-description px-5">
            <p className="md:block hidden">
              {selectedProject.description_desktop}
            </p>
            <p className="md:hidden block">
              {selectedProject.description_mobile}
            </p>
          </div>
        </div>
        <div className="modal-bottom-wrapper flex lg:flex-row flex-col gap-2 py-5">
          <div className="modal-tech-stack flex flex-row gap-2 lg:w-1/2 w-full justify-start items-start ">
            <ul className="flex flex-row flex-wrap text-sm gap-2">
              {selectedProject.tags.map((tag) => {
                console.log("tag", tag);
                return (
                  <li key={tag.icon_url} className="relative">
                    <Image
                      src={tag.icon_url}
                      alt={tag.name}
                      width={24}
                      height={24}
                      loading="lazy"
                      title={tag.name}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="modal-project-link flex flex-row flex-wrap lg:justify-end justify-start gap-3 w-full">
            {selectedProject.demo_url && (
              <Link href={selectedProject.demo_url} target="_blank">
                <PrimaryButton label="Live Demo" type="button" />
              </Link>
            )}

            {selectedProject.documentation_url && (
              <Link href={selectedProject.documentation_url} target="_blank">
                <SecondaryButton label="Documentation" />
              </Link>
            )}

            {selectedProject.prototype_url && (
              <Link href={selectedProject.prototype_url} target="_blank">
                <SecondaryButton label="Prototype" />
              </Link>
            )}

            {selectedProject.github_url && (
              <Link href={selectedProject.github_url} target="_blank">
                <SecondaryButton label="Github" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
