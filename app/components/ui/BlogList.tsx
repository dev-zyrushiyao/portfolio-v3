import color from "@/app/design-system/DesignSystem";
import { BlogProp } from "@/app/services/blog";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";

interface BlogListProp {
  blogs: BlogProp[];
  setSelectedBlog: (value: React.SetStateAction<BlogProp | null>) => void;
}

export default function BlogList({ blogs, setSelectedBlog }: BlogListProp) {
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

  //e sample value = 11 , 1 (Nov , January)
  //blogs filtered if a blog month entries is equal to e value returns an array
  //.map returns an array of filtered array of blog entries
  //sample data [november[{blog-1},{blog-2}], january[{blog-1}, {blog-2},{blog-3}]]
  //filteredMonthlyBlogs returns 2-D Array [[]]
  //loop map monthEntryPerYear in JSX then access the filteredMonthlyBlogs by the map index then use map filteredBlog to access its properties
  const filteredMonthlyBlogs = monthEntryPerYear.numberFormat.map((e) => {
    return filteredYearBlogs.filter((fblog) => {
      return new Date(fblog.created_at).getMonth() + 1 === e;
    });
    // .reverse();
  });

  //separating blog per month logic
  // monthEntryPerYear.letterFormat.forEach((target, index) => {
  //   console.log("Month index: ", index);
  //   console.log(filteredMonthlyBlogs[index]); <-Loop to access its properties
  //   console.log("---------");
  // });

  //Approach is parallel index alignment
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

  function handleClickBlog(blog: BlogProp) {
    setSelectedBlog(blog);
  }

  return (
    <div className="blog-list h-fit border-2 border-gray-300 bg-gray-200 rounded-2xl p-5 hidden lg:block">
      <div ref={container} className="blog-wrapper lg:w-50 w-full opacity-0">
        <div className="blog-year flex flex-row h-20 w-full gap-3 justify-center items-center">
          <button
            onClick={handlePrevYear}
            disabled={isAtStart}
            className="prev-year-btn text-3xl font-semibold cursor-pointer"
          >
            {"<"}
          </button>
          <div className="flex flex-row lg:w-18 w-14 overflow-hidden">
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
        <ul className="blog-list-date flex flex-col gap-5  ">
          <li className="list-content">
            {monthlyBlogGroups.map((blogPost) => {
              return (
                <div key={blogPost.month} className="blog-wrapper">
                  <div className="blog-month border-b border-b-gray-300 cursor-pointer">
                    <p
                      className="text-center text-base font-semibold "
                      onClick={handleClickBlogMonth}
                    >
                      {blogPost.month}
                    </p>
                  </div>
                  <div className="blog-entries w-full flex flex-col p-3 overflow-hidden">
                    <ul className="flex flex-col gap-3 bg-green ">
                      {blogPost.entries.map((blog) => {
                        return (
                          <li
                            onClick={() => handleClickBlog(blog)}
                            key={blog.id}
                            onMouseEnter={handleMouseEnterBlogDate}
                            onMouseLeave={handleMouseLeaveBlogDate}
                            className="text-sm text-center cursor-pointer"
                          >
                            {blog.title}
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
  );
}
