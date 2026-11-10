"use client";

import React, { useEffect, useRef, useState } from "react";
import MiniBanner from "../components/ui/MiniBanner";

import { BlogProp, getAllBlogs } from "../services/blog";
import BlogContent from "../components/ui/BlogContent";

import BlogCard from "../components/ui/BlogCard";
import BlogList from "../components/ui/BlogList";
import LoadingComp from "../components/ui/LoadingComp";
import SectionHeader from "../components/ui/SectionHeader";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { refresh } from "next/cache";

const defaultBannerBg: string = "#A7E074";
const defaultLabel: string = "Blog";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogProp[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogProp | null>(null);
  const [randomizeBlogs, setRandomizeBlogs] = useState<BlogProp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //mobile prev / next state
  const [viewingIndex, setViewingIndex] = useState<number>(0);

  useEffect(() => {
    async function fetchBlogs() {
      const res = await getAllBlogs();
      setBlogs(res.reverse());
      setSelectedBlog(res[res.length - 1]);
      setViewingIndex(res.length - 1);

      //shuffled and get 5 items
      const shuffled = [...res].sort(() => Math.random() - 0.5).slice(0, 5);
      setRandomizeBlogs(shuffled);

      // waiting time 0.7s
      new Promise(() => {
        setTimeout(() => {
          setLoading(false);
        }, 700);
      });

      setLoading(false);
    }

    fetchBlogs();
  }, []);

  const container = useRef<HTMLDivElement | null>(null);
  useGSAP(
    () => {
      if (loading) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1001px)", () => {
        const wrapper = container.current?.querySelector(".wrapper");
        const blogList = container.current?.querySelector(".blog-list");
        const blogContent = container.current?.querySelector(".blog-content");
        if (!wrapper || !blogContent) return;

        //ST Init
        ScrollTrigger.create({
          trigger: blogContent,
          start: "top 10%",
          end: "bottom 40%",
          pin: blogList,
          anticipatePin: 1,
          markers: true,
        });
      });
    },
    { scope: container, dependencies: [loading] },
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1001px)", () => {
        if (!selectedBlog || loading) return;

        console.log("test");

        async function refreshScrollArea() {
          await setTimeout(() => {
            ScrollTrigger.refresh();
          }, 100);

          //GSAP ScrollTo: targeting #blog-title-header of the component <BlogContent/> from the Blog Page
          const blogCompWrapper =
            container.current?.querySelector("#blog-comp-wrapper");
          if (!blogCompWrapper) return;
          gsap.to(window, {
            duration: 0.3,
            scrollTo: { y: 200, autoKill: true },
            ease: "none",
          });
        }

        refreshScrollArea();
      });

      // re-render component of <BlogContent/> that uses selectedBlog as prop
      // re-render the Blog Page and refresh its scrollTrigger
      // re-render of <BlogContent/> and Blog page simultaneously will fail to update the ScrollTrigger to get the latest scroll area
      // refresh scroll trigger has an offset of 0.1s to update after the <BlogContent/> re-renders

      //alternative to setTimeOut
      // requestAnimationFrame(() => {
      //   ScrollTrigger.refresh();
      // });
    },
    { scope: container, dependencies: [selectedBlog] },
  );

  if (loading) {
    return (
      <div>
        <MiniBanner
          backgroundColorProp={defaultBannerBg}
          label={defaultLabel}
        />
        <main>
          <div className="content flex flex-col gap-10 lg:p-20 p-10">
            <SectionHeader label="Dev Blog" />
            <LoadingComp />
          </div>
        </main>
      </div>
    );
  }

  function handleClickBlog(blog: BlogProp) {
    setSelectedBlog(blog);

    const targetIndex = blogs.indexOf(blog);
    setViewingIndex(targetIndex);
  }

  return (
    <div>
      <MiniBanner backgroundColorProp={defaultBannerBg} label={defaultLabel} />
      <main>
        <div className="content flex flex-col lg:gap-10 gap-3 lg:p-20 p-5">
          {/* <SectionHeader label="Dev Blog" /> */}
          <div className="section-header border-b border-gray-400 flex flex-row justify-between items-center bg-white p-5 z-0">
            <h3>Dev Blog</h3>
            <div className="flex flex-row lg:gap-20 gap-10 uppercase">
              <button
                disabled={viewingIndex <= 0}
                type="button"
                className="disabled:text-gray-400 disabled:cursor-default cursor-pointer  text-black "
                onClick={() => {
                  const nextIndex = viewingIndex - 1;
                  setViewingIndex((prev) => prev - 1);
                  setSelectedBlog(blogs[nextIndex]);
                }}
              >
                {"< Prev"}
              </button>

              <button
                disabled={viewingIndex >= blogs.length - 1}
                type="button"
                className="disabled:text-gray-400 disabled:cursor-default cursor-pointer text-black"
                onClick={() => {
                  const nextIndex = viewingIndex + 1;
                  setViewingIndex((prev) => prev + 1);
                  setSelectedBlog(blogs[nextIndex]);
                }}
              >
                {"Next >"}
              </button>
            </div>
          </div>

          {blogs.length === 0 ? (
            <div className="h-100 flex flex-col justify-center items-center">
              <h5 className="text-gray-400">No Blogs found...</h5>
            </div>
          ) : (
            <div
              ref={container}
              className="flex flex-col lg:gap-20 gap-10 overflow-hidden relative"
            >
              {/* Blog section */}
              <div className="wrapper flex flex-col lg:flex-row lg:gap-10 gap-5">
                <div className="blog-list h-fit min-w-60 w-fit lg:block hidden">
                  <BlogList blogs={blogs} setSelectedBlog={setSelectedBlog} />
                </div>

                <div className="blog-content w-full h-auto  flex-1  bg-amber-300 min-w-50">
                  {selectedBlog && <BlogContent blogPost={selectedBlog} />}
                </div>
              </div>
              {/* other blogs */}
              <div className="flex flex-col gap-3 ">
                <h6>Other blogs:</h6>
                <div
                  className={`blog-cards flex flex-row gap-5 ${randomizeBlogs.length !== 0 && "overflow-x-scroll"} py-5`}
                >
                  {randomizeBlogs.map((rblog) => {
                    return (
                      <BlogCard
                        key={rblog.id}
                        onClick={async () => {
                          handleClickBlog(rblog);
                        }}
                        randomizeBlog={rblog}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
