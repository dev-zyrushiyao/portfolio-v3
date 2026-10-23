"use client";

import React, { useRef, useState } from "react";
import MiniBanner from "../components/ui/MiniBanner";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import color from "../design-system/DesignSystem";

const defaultBannerBg: string = "#A7E074";
const defaultLabel: string = "Blog";

export default function Blog() {
  const container = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(() => {
    const blogList = gsap.utils.toArray<HTMLLIElement>(
      ".blog-list-date > li:not(:first-child)",
      container.current,
    );
    if (!blogList) return;

    //initial setup: hides the rest of the blog entries except the first child of the month
    const blogEntries = blogList
      .flatMap((list) => {
        return list.querySelector(".blog-entries");
      })
      .map((elem) => {
        return elem;
      });
    gsap.set(blogEntries, {
      height: 0,
      autoAlpha: 0,
      transformOrigin: "0% 0%",
    });
  }, {});

  function handleClickBlogMonth(e: React.MouseEvent) {
    //context safe animation inject
    const context = contextSafe(() => {
      const blogMonth = e.currentTarget.closest("li");

      const blogEntries = blogMonth?.querySelector(".blog-entries");
      if (!blogEntries) return;

      // Check the actual current height of this specific element
      const currentHeight = gsap.getProperty(blogEntries, "height");
      const isOpen = Number(currentHeight) > 0;

      //animation
      const listOpenTween = gsap.to(blogEntries, {
        paused: true,
        height: 0,
        autoAlpha: 0,
      });

      const listCloseTween = gsap.to(blogEntries, {
        paused: true,
        height: "auto",
        autoAlpha: 1,
      });

      if (isOpen) {
        listOpenTween.play();
      } else {
        listCloseTween.play();
      }
    });

    context();
  }

  function handleMouseEnterBlogDate(e: React.MouseEvent) {
    //context safe animation inject
    const context = contextSafe(() => {
      gsap.to(e.currentTarget, {
        duration: 0.2,
        color: color.secondary,
        fontWeight: "600",
      });
    });

    context();
  }

  function handleMouseLeaveBlogDate(e: React.MouseEvent) {
    //context safe animation inject
    const context = contextSafe(() => {
      gsap.to(e.currentTarget, {
        duration: 0.2,
        color: "black",
        fontWeight: "normal",
      });
    });

    context();
  }

  return (
    <div>
      <MiniBanner backgroundColorProp={defaultBannerBg} label={defaultLabel} />
      <main>
        <div className="content flex flex-col gap-10 lg:p-20 p-10">
          <div className="border-b border-gray-400 relative">
            <h3>Dev Blog</h3>
          </div>
          <div className="wrapper  flex flex-col lg:flex-row gap-10">
            <div className="blog-list h-fit border-2 border-gray-300 bg-gray-200 rounded-2xl p-5">
              <div ref={container} className="blog-wrapper w-50">
                <div className="blog-year flex flex-row h-20 w-full gap-3 justify-center items-center">
                  <button className="text-3xl font-semibold cursor-pointer">
                    {"<"}
                  </button>
                  <h6 className="font-sans font-normal">2026</h6>
                  <button className="text-3xl font-semibold cursor-pointer">
                    {">"}
                  </button>
                </div>

                <ul className="blog-list-date flex flex-col gap-5">
                  {Array.from({ length: 3 }, (_, index) => {
                    return (
                      <li key={index} className="list-content">
                        <div className="blog-month border-b border-b-gray-300 cursor-pointer">
                          <p
                            className="text-center text-base font-semibold "
                            onClick={handleClickBlogMonth}
                          >
                            June
                          </p>
                        </div>

                        <div className="blog-entries w-full flex flex-col p-3 overflow-hidden">
                          <ul className="flex flex-col gap-3 ">
                            <li
                              onMouseEnter={handleMouseEnterBlogDate}
                              onMouseLeave={handleMouseLeaveBlogDate}
                              className="text-sm text-center cursor-pointer"
                            >
                              06-09
                            </li>
                            <li className="text-sm text-center">06-20</li>
                            <li className="text-sm text-center">06-21</li>
                            <li className="text-sm text-center">06-24</li>
                          </ul>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="blog-content bg-pink-300 w-full h-200">test</div>
          </div>
        </div>
      </main>
    </div>
  );
}
