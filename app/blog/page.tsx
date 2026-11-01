"use client";

import React, { useEffect, useRef } from "react";
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
  }, [blogs]);

  //animation
  const container = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP(
    () => {
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
    },
    { scope: container },
  );

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
                  {blogs.map((blog, index) => {
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
                              {blog.title}
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
