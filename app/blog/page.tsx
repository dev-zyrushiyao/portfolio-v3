"use client";

import React, { useEffect, useState } from "react";
import MiniBanner from "../components/ui/MiniBanner";

import { BlogProp, getAllBlogs } from "../services/blog";
import BlogContent from "../components/ui/BlogContent";

import BlogCard from "../components/ui/BlogCard";
import BlogList from "../components/ui/BlogList";
import LoadingComp from "../components/ui/LoadingComp";

const defaultBannerBg: string = "#A7E074";
const defaultLabel: string = "Blog";

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

  function handleClickBlog(blog: BlogProp) {
    setSelectedBlog(blog);
  }

  if (loading) {
    return (
      <div>
        <MiniBanner
          backgroundColorProp={defaultBannerBg}
          label={defaultLabel}
        />
        <main>
          <div className="content flex flex-col gap-10 lg:p-20 p-10">
            <div className="border-b border-gray-400 relative">
              <h3>Dev Blog</h3>
            </div>
            <LoadingComp />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <MiniBanner backgroundColorProp={defaultBannerBg} label={defaultLabel} />
      <main>
        <div className="content flex flex-col gap-10 lg:p-20 p-10">
          <div className="border-b border-gray-400 relative">
            <h3>Dev Blog</h3>
          </div>

          {blogs.length === 0 ? (
            <div className="h-100 flex flex-col justify-center items-center">
              <h5 className="text-gray-400">No Blogs found...</h5>
            </div>
          ) : (
            <div className="wrapper">
              {/* Blog section */}
              <div className="wrapper flex flex-col lg:flex-row gap-10">
                <BlogList blogs={blogs} setSelectedBlog={setSelectedBlog} />
                <div className="blog-content w-full h-auto">
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
