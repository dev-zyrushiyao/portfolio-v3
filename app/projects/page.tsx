"use client";

import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import CloseIcon from "../components/svg/CloseIcon";
import { getProjects, ProjectProp } from "../services/projects";
import ProjectCard from "../components/ui/ProjectCard";
import ProjectModal from "../components/ui/ProjectModal";
import LoadingProjectCard from "../components/ui/LoadingProjectCard";
import MiniBanner from "../components/ui/MiniBanner";
import { IoMdClose } from "react-icons/io";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "../components/ui/SectionHeader";

const defaultBannerBg: string = "#BFE2F2";
const defaultLabel: string = "Projects";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  //state
  const [projects, setProjects] = useState<ProjectProp[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectProp | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      const data = await getProjects();

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setProjects(data);
      setIsLoading(false);
    }

    loadData();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);

  //state - pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  //sets the page count - pagination
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  //input search state
  const [searchQuery, setSearchQuery] = useState<string>("");

  //sliced projects - pagination
  const filteredProjects = projects.filter((value) =>
    value.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  //pre-coded - pagination
  const getPaginationPages = (current: number, total: number) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
    if (current >= total - 3)
      return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  function handleClickModal(): void {
    setIsModalOpen(!isModalOpen);
    setSelectedProject(null);
  }

  //gsap
  const container = useRef<HTMLDivElement | null>(null);
  useGSAP(
    () => {
      //return when the page is not loading , re-run useGsap when the isLoading state change
      //this is to prevent contentHeader not found during initial load
      if (isLoading) return;

      const content = container.current?.querySelector(".content");
      const contentHeader = container.current?.querySelector(".content-header");
      const wrapper = container.current?.querySelector(".wrapper");
      const projectWrapper =
        container.current?.querySelector(".project-wrapper");
      if (!content || !contentHeader || !projectWrapper || !wrapper) return;

      console.log("useGsap triggered");

      ScrollTrigger.create({
        trigger: projectWrapper,
        pin: wrapper,
        markers: true,
        start: "220px 50%",
        end: "bottom 50%",
        invalidateOnRefresh: true, //re-calculates scrollable area when ScrollTrigger.refresh() or update() is triggered.
      });
    },
    { scope: container, dependencies: [isLoading] },
  );

  useGSAP(
    () => {
      //updates the Global- ScrollTrigger when filtered project changes
      ScrollTrigger.refresh();
    },
    {
      scope: container,
      dependencies: [filteredProjects.length],
    },
  );

  // loading state
  if (isLoading) {
    return (
      <div>
        <MiniBanner
          backgroundColorProp={defaultBannerBg}
          label={defaultLabel}
        />
        <main>
          <div className="content flex flex-col gap-10 lg:p-20 p-10">
            <SectionHeader label="Personal Projects" />
            <div className="wrapper lg:flex-row flex flex-col justify-center items-center flex-wrap gap-10">
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
      <MiniBanner backgroundColorProp={defaultBannerBg} label={defaultLabel} />
      <main ref={container}>
        <div className="content flex flex-col">
          <div className="wrapper bg-amber-300 z-10">
            <div className="box-spacer bg-amber-300 h-20 w-full"></div>
            <div className="content-header border-b border-gray-400 flex flex-row justify-between items-center bg-green-300 py-5 px-25 ">
              <h3>Personal Projects</h3>
              <div className="flex flex-row gap-5 justify-center">
                <button
                  disabled={currentPage === 1}
                  className="border border-gray-500 p-5 cursor-pointer"
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  {"Prev"}
                </button>
                {getPaginationPages(currentPage, totalPages).map(
                  (page, index) =>
                    page === "..." ? (
                      <span
                        key={`dots-${index}`}
                        className="px-3 py-2 text-gray-400"
                      >
                        ...
                      </span>
                    ) : (
                      // number - pages buttons
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page as number)}
                        className={`border border-gray-500 p-5 cursor-pointer ${
                          currentPage === page ? "bg-gray-300 font-bold" : ""
                        }`}
                      >
                        {page}
                      </button>
                    ),
                )}
                <button
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="border border-gray-500 p-5 cursor-pointer"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  {"Next"}
                </button>
              </div>
              <div className="border border-gray-400 p-2 w-100 rounded-sm flex flex-row gap-2 items-center">
                <input
                  className="outline-none flex-1"
                  type="text"
                  placeholder="Search project"
                  maxLength={40}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.currentTarget.value)}
                />
                <div
                  className="clear-button cursor-pointer"
                  onClick={() => setSearchQuery("")}
                >
                  <IoMdClose fill="gray" />
                </div>
              </div>
            </div>
          </div>

          <div className="project-wrapper  lg:flex-row flex flex-col justify-center items-center flex-wrap gap-10 p-5">
            {projects.length === 0 && <p>No data to display...</p>}

            {currentProjects.length === 0 && (
              <div className="h-100 flex flex-col justify-center items-center text-2xl text-gray-500">
                No records found
              </div>
            )}

            {currentProjects.map((proj) => {
              return (
                <ProjectCard
                  key={proj.id}
                  project={proj}
                  onClick={() => {
                    setSelectedProject(proj);
                    setIsModalOpen(true);
                  }}
                />
              );
            })}
          </div>
        </div>
      </main>

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
    </div>
  );
}
