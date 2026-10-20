"use client";

import React, { useEffect, useRef, useState } from "react";
import sketchpadV3 from "@/assets/projects-img/project_gsap_sketchpad_v3.png";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import color from "../design-system/DesignSystem";
import CloseIcon from "../components-svg/CloseIcon";
import { addInitData, getProjects, Project } from "../services/projects";
import Link from "next/link";
import { prototype } from "events";
import PrimaryButton from "../components-ui/PrimaryButton";

export default function Projects() {
  //state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //gsap
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      const data = await getProjects();
      setProjects(data);
      setIsLoading(false);
    }
    async function addData() {
      const data = await addInitData();
    }
    addData();
    loadData();
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      if (isModalOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    },
    { scope: container, dependencies: [isModalOpen] },
  );

  function handleMouseEnter(target: React.MouseEvent): void {
    const context = contextSafe(() => {
      gsap.to(target.currentTarget, {
        backgroundColor: color.accent,
        duration: 0.3,
        ease: "none",
      });
    });

    context();
  }

  function handleMouseLeave(target: React.MouseEvent): void {
    const context = contextSafe(() => {
      gsap.to(target.currentTarget, {
        backgroundColor: "transparent",
        ease: "none",
      });
    });

    context();
  }

  function handleClickModal(): void {
    setIsModalOpen(!isModalOpen);
    setSelectedProject(null);
  }

  //loading state
  if (isLoading) {
    return (
      <div className="text-center py-10">Loading projects from Supabase...</div>
    );
  }

  return (
    <div>
      <div className="h-[25vw] flex flex-col justify-center items-center bg-pink-200">
        <h2>Projects</h2>
      </div>

      {isModalOpen && (
        <>
          <div
            className="modal h-dvh w-full bg-black/50 inset-0 z-50 fixed flex flex-col justify-center items-center"
            onClick={handleClickModal}
          >
            <div className="wrapper">
              <div className="modal-close relative">
                <button
                  className="w-15 h-15 bg-pink-300 rounded-4xl absolute -translate-1/2 inset-0 left-full cursor-pointer"
                  onClick={handleClickModal}
                >
                  <div className=" flex flex-row justify-center">
                    <CloseIcon />
                  </div>
                </button>
              </div>
              {selectedProject && (
                <div
                  key={selectedProject.title + `-modal}`}
                  className="modal-content lg:h-[80vh] lg:w-[50vw] h-[80vw] w-[80vw] rounded-3xl md:p-10 p-8 overflow-y-scroll bg-white"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                  <div className="wrapper">
                    <div className="image-wrapper rounded-xl lg:h-[40vh] h-[20vh] w-full bg-pink-200 border border-gray-300 overflow-hidden relative">
                      <Image
                        src={selectedProject.image_url}
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
                    <div className="modal-bottom-wrapper flex lg:flex-row flex-col">
                      <div className="modal-tech-stack flex flex-row gap-2 lg:w-1/2 w-full justify-start items-center ">
                        <ul className="flex flex-row flex-wrap text-sm gap-2">
                          {selectedProject.tags.map((tag) => {
                            console.log("tag", tag);
                            return (
                              <li key={tag.name}>
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
                      <div className="modal-project-link flex flex-row flex-wrap lg:justify-end justify-start gap-3 py-2  w-full bg-amber-300">
                        {selectedProject.demo_url && (
                          <Link href={selectedProject.demo_url} target="_blank">
                            <button className="w-fit h-fit p-5 border rounded-xl bg-amber-200 cursor-pointer">
                              Live Demo
                            </button>
                          </Link>
                        )}

                        {selectedProject.documentation_url && (
                          <Link
                            href={selectedProject.documentation_url}
                            target="_blank"
                          >
                            <button className="w-fit h-fit p-5 border rounded-xl bg-amber-200 cursor-pointer">
                              Documentation
                            </button>
                          </Link>
                        )}

                        {selectedProject.prototype_url && (
                          <Link
                            href={selectedProject.prototype_url}
                            target="_blank"
                          >
                            <button className="w-fit h-fit p-5 border rounded-xl bg-amber-200 cursor-pointer">
                              Prototype
                            </button>
                          </Link>
                        )}

                        {selectedProject.github_url && (
                          <Link
                            href={selectedProject.github_url}
                            target="_blank"
                          >
                            <button className="w-fit h-fit p-5 border rounded-xl bg-amber-200 cursor-pointer">
                              Github
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <main>
        <div className="content flex flex-col gap-10 lg:p-20 p-10">
          <div className="border-b border-gray-400 relative">
            <h3>Personal Projects</h3>
            <PrimaryButton label={"Press me"} />
            <div className="bg-amber-300 h-10 w-20 absolute inset-0 top-3 -left-5 -z-10 hidden lg:block"></div>
          </div>

          <div
            ref={container}
            className="wrapper lg:flex-row flex flex-col items-center flex-wrap gap-10"
          >
            {projects.map((data, index) => {
              return (
                <div
                  key={data.title + index}
                  className="project-card lg:h-150 lg:w-100 border rounded-2xl border-gray-400 p-10 flex flex-col gap-5 cursor-pointer"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    setIsModalOpen(!isModalOpen);
                    setSelectedProject(data);
                  }}
                >
                  <div className="image-wrapper rounded-xl overflow-hidden h-50 w-full bg-gray-300 border border-gray-300 relative">
                    <Image
                      src={data.image_url}
                      alt="frontend project"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      fill
                      className="object-cover"
                      loading="eager"
                    ></Image>
                  </div>
                  <div className="project-information flex flex-col gap-5">
                    <h5 className="project-title">{data.title}</h5>
                    <p className="project-description lg:line-clamp-5 hidden">
                      {data.description_desktop}
                    </p>
                    <p className="project-description lg:hidden line-clamp-3">
                      {data.description_mobile}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
