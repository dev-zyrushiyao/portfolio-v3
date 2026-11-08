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

const defaultBannerBg: string = "#A7E074";
const defaultLabel: string = "Blog";

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogProp[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogProp | null>(null);
  const [randomizeBlogs, setRandomizeBlogs] = useState<BlogProp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBlogs() {
      const res = await getAllBlogs();
      setBlogs(res);
      setSelectedBlog(res.at(-1) || null);

      //shuffled and get 5 items
      const shuffled = [...res].sort(() => Math.random() - 0.5).slice(0, 5);
      setRandomizeBlogs(shuffled);

      //waiting time 0.7s
      new Promise(() => {
        setTimeout(() => {
          setLoading(false);
        }, 700);
      });
    }

    fetchBlogs();
  }, []);

  const container = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    if (loading) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1001px)", () => {
      const wrapper = container.current?.querySelector(".wrapper");
      const blogList = container.current?.querySelector(".blog-list");
      const blogContent = container.current?.querySelector(".blog-content");
      if (!wrapper || !blogContent) return;

      ScrollTrigger.create({
        trigger: blogContent,
        start: "top 10%",
        end: "bottom 33%",
        pin: blogList,
      });
    });
  }, [loading]);

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
  }

  return (
    <div>
      <MiniBanner backgroundColorProp={defaultBannerBg} label={defaultLabel} />
      <main>
        <div className="content flex flex-col lg:gap-10 gap-3  lg:p-20 p-5">
          <SectionHeader label="Dev Blog" />

          {blogs.length === 0 ? (
            <div className="h-100 flex flex-col justify-center items-center">
              <h5 className="text-gray-400">No Blogs found...</h5>
            </div>
          ) : (
            <div
              ref={container}
              className="flex flex-col lg:gap-20 gap-10 overflow-hidden"
            >
              {/* Blog section */}
              <div className="wrapper flex flex-col lg:flex-row lg:gap-10 gap-5">
                <div className="blog-list min-w-60 w-fit lg:block hidden">
                  <BlogList blogs={blogs} setSelectedBlog={setSelectedBlog} />
                </div>

                <div className="blog-content w-full h-fit min-w-50 flex-1">
                  {selectedBlog && <BlogContent blogPost={selectedBlog} />}
                </div>
              </div>
              {/* other blogs */}
              <div className="flex flex-col gap-3">
                <h6>Other blogs:</h6>
                <div
                  className={`blog-cards flex flex-row gap-5 ${randomizeBlogs.length !== 0 && "overflow-x-scroll"} py-5`}
                >
                  {randomizeBlogs.map((rblog) => {
                    return (
                      <BlogCard
                        key={rblog.id}
                        onClick={() => handleClickBlog(rblog)}
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
