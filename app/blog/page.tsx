"use client";

import React, { useEffect, useRef, useState } from "react";
import MiniBanner from "../components/ui/MiniBanner";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import color from "../design-system/DesignSystem";
import { BlogProp, getAllBlogs } from "../services/blog";

const defaultBannerBg: string = "#A7E074";
const defaultLabel: string = "Blog";

export default function Blog() {
  const [blogs, setBlogs] = React.useState<BlogProp[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      const res = await getAllBlogs();
      setBlogs(res);
    }
    fetchBlogs();
  }, []);

  //Map - returns Full year
  //Map is converted as Set to prevent duplicate years
  //Set is converted to Array to sort.
  const uniqueYears = Array.from(
    new Set(blogs.map((blog) => new Date(blog.created_at).getFullYear())),
  ).sort((a, b) => b - a);

  //animation state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const maxIndex = uniqueYears.length - 1;
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex === maxIndex;

  //filter the blog using uniqueYears(number format) and current Index
  //current index change it re-filter the blogs according to the year
  //sample data 2025 = [{blog} , {blog}]
  //sample data 2026 = [{blog} , {blog} , {blog}]
  const selectedYear = uniqueYears[currentIndex];
  const filteredYearBlogs = blogs.filter(
    (blog) => new Date(blog.created_at).getFullYear() === selectedYear,
  );

  //extracts the month of the filtered blog posts per year as Set then convert as Array to map in JSX
  // sample data of letterFormat [{January, March , June}]
  // sample data of numberFormat [{1, 3 , 6}]
  const monthEntryPerYear = {
    letterFormat: Array.from(
      new Set(
        filteredYearBlogs.map((fblog) => {
          return new Date(fblog.created_at).toLocaleString("en-PH", {
            month: "long",
          });
        }),
      ),
    ),
    numberFormat: Array.from(
      new Set(
        filteredYearBlogs.map((fblog) => {
          return new Date(fblog.created_at).getMonth() + 1;
        }),
      ),
    ),
  };

  //Approach is parallel index alignment
  //e sample value = 11 , 1 (Nov , January)
  //blogs filtered if a blog month entries is equal to e value returns an array
  //.map returns an array of filtered array of blog entries
  //sample data [november[{blog-1},{blog-2}], january[{blog-1}, {blog-2},{blog-3}]]
  //filteredMonthlyBlogs returns 2-D Array [[]]
  //loop map monthEntryPerYear in JSX then access the filteredMonthlyBlogs by the map index then use map filteredBlog to access its properties
  const filteredMonthlyBlogs = monthEntryPerYear.numberFormat.map((e) => {
    return filteredYearBlogs
      .filter((fblog) => {
        return new Date(fblog.created_at).getMonth() + 1 === e;
      })
      .reverse();
  });

  //separating blog per month logic
  // monthEntryPerYear.letterFormat.forEach((target, index) => {
  //   console.log("Month index: ", index);
  //   console.log(filteredMonthlyBlogs[index]); <-Loop to access its properties
  //   console.log("---------");
  // });

  const monthlyBlogGroups = monthEntryPerYear.letterFormat.map(
    (monthName, index) => {
      return { month: monthName, entries: filteredMonthlyBlogs[index] };
    },
  );

  //animation
  const container = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP(
    () => {
      if (blogs.length === 0) return;

      //FOUC
      gsap.set(container.current, { opacity: 1 });

      //year selector animation
      const yearSelector = gsap.utils.toArray<HTMLDivElement>(
        ".unique-year",
        container.current,
      );
      if (!yearSelector) return;

      // < YEAR > Tween animation
      gsap.to(yearSelector, {
        xPercent: currentIndex * -100,
        duration: 0.5,
        ease: "power1.inOut",
      });

      const blogWrapper = gsap.utils.toArray<HTMLLIElement>(
        ".blog-wrapper:not(:first-child)",
        container.current,
      );

      //initial setup: hides the rest of the blog entries except the first child of the month
      const blogEntries = blogWrapper
        .flatMap((list) => {
          return list.querySelector(".blog-entries");
        })
        .map((elem) => {
          return elem;
        });

      if (!blogWrapper || blogEntries) return;

      // set the rest of the blog entries as collapsed leaving the first child (latest month) uncollapsed
      gsap.set(blogEntries, {
        height: 0,
        autoAlpha: 0,
        transformOrigin: "0% 0%",
      });
    },
    { scope: container, dependencies: [blogs, currentIndex] },
  );

  function handlePrevYear() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  function handleNextYear() {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function handleClickBlogMonth(e: React.MouseEvent) {
    //context safe animation inject
    const context = contextSafe(() => {
      const blogWrapper = e.currentTarget.closest(".blog-wrapper");

      const blogEntries = blogWrapper?.querySelector(".blog-entries");
      if (!blogWrapper || !blogEntries) return;

      // Check the actual current height of .blog-entries element
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
              <div ref={container} className="blog-wrapper w-50 opacity-0">
                <div className="blog-year flex flex-row h-20 w-full gap-3 justify-center items-center">
                  <button
                    onClick={handlePrevYear}
                    disabled={isAtStart}
                    className="prev-year-btn text-3xl font-semibold cursor-pointer"
                  >
                    {"<"}
                  </button>
                  <div className="flex flex-row w-18 overflow-hidden">
                    {uniqueYears.map((year) => {
                      return (
                        <div key={year} className="unique-year">
                          <h6 className="font-sans font-normal">{year}</h6>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    onClick={handleNextYear}
                    disabled={isAtEnd}
                    className="next-year-btn text-3xl font-semibold cursor-pointer"
                  >
                    {">"}
                  </button>
                </div>
                <ul className="blog-list-date flex flex-col gap-5">
                  <li className="list-content">
                    {monthlyBlogGroups.map((group) => {
                      return (
                        <div key={group.month} className="blog-wrapper">
                          <div className="blog-month border-b border-b-gray-300 cursor-pointer">
                            <p
                              className="text-center text-base font-semibold "
                              onClick={handleClickBlogMonth}
                            >
                              {group.month}
                            </p>
                          </div>
                          <div className="blog-entries w-full flex flex-col p-3 overflow-hidden">
                            <ul className="flex flex-col gap-3 bg-green ">
                              {group.entries.map((blogEntry) => {
                                return (
                                  <li
                                    key={blogEntry.id}
                                    onMouseEnter={handleMouseEnterBlogDate}
                                    onMouseLeave={handleMouseLeaveBlogDate}
                                    className="text-sm text-center cursor-pointer"
                                  >
                                    {blogEntry.title}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                  </li>
                </ul>
              </div>
            </div>
            <div className="content-wrapper bg-amber-100 w-full h-500 p-20 flex flex-col gap-10">
              <div className="content-title flex flex-row justify-between items-end">
                <h2>MY TITLE</h2>
                <p>Date: Jan 1 , 2026</p>
              </div>
              <p className="content-details">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
                dolore, optio recusandae dicta consequatur dolorem numquam ullam
                magnam sit ea incidunt quas ut labore voluptatibus atque
                excepturi, dignissimos nostrum? Magni. Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Dolorem libero officiis
                assumenda eaque sint labore eos, numquam vel unde veniam? Lorem
                ipsum dolor sit, amet consectetur adipisicing elit. Soluta alias
                iste, numquam, ullam explicabo qui deserunt velit sunt provident
                ipsa dolores. Ex accusantium reiciendis voluptatum et
                consequuntur dignissimos laborum commodi! Vel qui est quisquam,
                nisi similique aliquid velit sit, natus tempore, vero ratione
                minus illo amet odio necessitatibus dolor eligendi! Est adipisci
                minus, repudiandae id debitis voluptates sint iusto suscipit!
                Provident iure voluptatum dolor. Minima quam aliquid
                praesentium, fuga unde reiciendis quia quibusdam aperiam,
                ducimus voluptatibus explicabo veniam quis deleniti labore
                laboriosam repellendus rem facilis natus neque provident, quos
                similique! Repudiandae vitae, reprehenderit amet ipsum
                consectetur tempora fuga maiores hic ex deleniti sint
                temporibus. Vero possimus tenetur libero excepturi rerum eveniet
                praesentium vel ab odio rem minima iusto, beatae non! Magni
                rerum vel id nostrum. Facere, assumenda fugiat modi explicabo
                nisi deleniti odit veritatis rem suscipit natus labore! Aliquam
                nulla autem atque excepturi a officia? Provident impedit dolore
                voluptates error! Vel, quibusdam. Amet earum ullam quis tempore
                repellendus reiciendis suscipit illo quidem facere quos aut quam
                ipsa necessitatibus, libero laudantium tenetur dolorem ducimus.
                Accusamus voluptatum officiis, aut eum ex fugit. Fuga amet
                numquam nesciunt sunt. Consectetur ab eligendi facere, odit ex
                rem ullam, modi possimus quam enim quod. Iure, ea. Quaerat
                quidem aspernatur consequatur repellat laboriosam cum,
                consectetur corporis pariatur. Sint autem non suscipit
                dignissimos repellendus eius facilis consectetur quos recusandae
                sapiente ullam inventore excepturi iusto enim, odit numquam
                blanditiis ipsum fugit maxime! Nobis earum consequatur vel nemo
                consequuntur repellendus. Corporis, possimus molestiae dolores,
                debitis est explicabo deserunt commodi non culpa rem aut
                eligendi magni harum ut optio aliquam provident nobis. Saepe
                obcaecati aliquam cumque qui quisquam iusto, ea consectetur.
                Voluptates quos laborum in sint dolore cupiditate assumenda sed
                quae labore ipsum minus ipsa harum, molestias eligendi deleniti
                voluptatem cumque eveniet dolorum officiis sit odit error
                voluptatum dicta aliquid. Minima! Eos, quo? Veritatis vitae
              </p>
              <div className="bg-gray-400 h-100 w-full"></div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel,
                reiciendis enim modi aliquam culpa reprehenderit facere amet
                officiis dignissimos voluptate doloremque et provident natus
                ratione quibusdam aliquid maiores corporis sunt quo impedit
                aperiam repellat tempore quasi fuga! Similique quos optio
                voluptatum expedita debitis enim fugit voluptatem atque omnis
                culpa repellendus numquam accusantium dolorum minus asperiores
                tempore, eligendi aut? Porro exercitationem totam, ab assumenda
                dolor commodi aperiam quisquam, laborum placeat velit veritatis
                explicabo modi non quia. Quas eligendi repellat quasi eos dolor
                sapiente eaque, facilis error. Corrupti aliquid pariatur
                assumenda ad dolores, ducimus reiciendis facere illum eligendi
                voluptatem dicta beatae ea?
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
