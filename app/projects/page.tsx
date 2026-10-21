"use client";

import React, { useEffect, useRef, useState } from "react";

import { useGSAP } from "@gsap/react";

import CloseIcon from "../components-svg/CloseIcon";
import { addInitData, getProjects, ProjectProp } from "../services/projects";

import ProjectCard from "../components-ui/ProjectCard";
import ProjectModal from "../components-ui/ProjectModal";
import LoadingProjectCard from "../components-ui/LoadingProjectCard";

export default function Projects() {
  //state
  const [projects, setProjects] = useState<ProjectProp[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectProp | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //gsap
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      const data = await getProjects();

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setProjects(data);
      setIsLoading(false);
    }
    // async function addData() {
    //   const data = await addInitData();
    // }
    // addData();
    loadData();
  }, []);

  useGSAP(
    () => {
      if (isModalOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    },
    { scope: container, dependencies: [isModalOpen] },
  );

  function handleClickModal(): void {
    setIsModalOpen(!isModalOpen);
    setSelectedProject(null);
  }

  // loading state
  if (isLoading) {
    return (
      <div>
        <div className="h-[25vw] flex flex-col justify-center items-center bg-pink-200">
          <h2>Projects</h2>
        </div>
        <main>
          <div className="content flex flex-col gap-10 lg:p-20 p-10">
            <div className="border-b border-gray-400 relative">
              <h3>Personal Projects</h3>
              <div className="bg-amber-300 h-10 w-20 absolute inset-0 top-3 -left-5 -z-10 hidden lg:block"></div>
            </div>
            <div className="wrapper lg:flex-row flex flex-col items-center flex-wrap gap-10">
              {Array.from({ length: 4 }, (_, index) => {
                return <LoadingProjectCard key={index} />;
              })}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <div className="h-[25vw] flex flex-col justify-center items-center bg-pink-200">
        <h2>Projects</h2>
      </div>

      {isModalOpen && (
        <div
          className="modal-overlay h-dvh w-full bg-black/50 inset-0 z-50 fixed flex flex-col justify-center items-center"
          onClick={handleClickModal}
        >
          <div className="wrapper">
            <div className="modal-close relative">
              <button
                className="w-15 h-15 bg-red-300 border-2 border-gray-200 rounded-4xl absolute -translate-1/2 inset-0 left-full cursor-pointer"
                onClick={handleClickModal}
              >
                <div className=" flex flex-row justify-center">
                  <CloseIcon />
                </div>
              </button>
            </div>
            {selectedProject && (
              <ProjectModal selectedProject={selectedProject} />
            )}
          </div>
        </div>
      )}

      <main>
        <div className="content flex flex-col gap-10 lg:p-20 p-10">
          <div className="border-b border-gray-400 relative">
            <h3>Personal Projects</h3>
            <div className="bg-amber-300 h-10 w-20 absolute inset-0 top-3 -left-5 -z-10 hidden lg:block"></div>
          </div>

          <div
            ref={container}
            className="wrapper lg:flex-row flex flex-col items-center flex-wrap gap-10"
          >
            {!projects.length && <p>No data to display...</p>}

            {projects.map((data) => {
              return (
                <ProjectCard
                  key={data.id}
                  project={data}
                  onClick={() => {
                    setSelectedProject(data);
                    setIsModalOpen(true);
                  }}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
