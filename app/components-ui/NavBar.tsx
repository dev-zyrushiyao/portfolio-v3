"use client";

import React, { useRef } from "react";
import Logo from "../components-svg/Logo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LineBottom from "../components-svg/LineBottom";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import HamburgerMenu from "../components-svg/HamburgerMenu";
import Link from "next/link";

type NavLink = { title: string; link: string };

const navMenu: NavLink[] = [
  { title: "Projects", link: "/projects" },
  { title: "Files", link: "/files" },
  { title: "Blog", link: "/blog" },
  { title: "Contact", link: "/contact" },
];
const defaultBg: string = "#FE0002";
const defaultFontColor: string = "#FFFFFF";

gsap.registerPlugin(DrawSVGPlugin);

export default function NavBar() {
  const container = useRef<HTMLDivElement>(null);

  const ulRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      //FUOC
      gsap.set(container.current, { opacity: 1 });

      // set the default color of Nav
      gsap.set("nav", {
        backgroundColor: defaultBg,
        color: defaultFontColor,
      });

      gsap.set(".mobile-menu", {
        backgroundColor: "#6A0400",
        color: defaultFontColor,
      });

      const listItem = ulRef.current?.querySelectorAll("li");
      const lines = ulRef.current?.querySelectorAll(".nav-line > svg line");
      if (!listItem || !lines) return;

      listItem.forEach((item, index) => {
        const lineTween = gsap.fromTo(
          lines[index],
          {
            drawSVG: "0% 0%",
            stroke: "#FFD987",
          },
          { duration: 0.3, drawSVG: true, paused: true },
        );

        item.addEventListener("mouseenter", () => {
          lineTween.play();
        });

        item.addEventListener("mouseleave", () => {
          lineTween.reverse();
        });
      });

      const hamburgerElem = container.current?.querySelector(
        ".hamburger-wrapper svg",
      );
      if (!hamburgerElem) return;
      const hamburgerPath = hamburgerElem.querySelectorAll(":scope > path");
      const hamburgerMenu = container.current?.querySelector(".mobile-menu");
      if (!hamburgerPath || !hamburgerMenu) return;

      //hover line animation
      const hamburgerTl = gsap
        .timeline({ paused: true })
        .fromTo(hamburgerMenu, { xPercent: 0 }, { xPercent: -100 });
      hamburgerPath.forEach((path, index) => {
        switch (index) {
          case 0:
            {
              hamburgerTl.to(
                path,
                {
                  transformOrigin: "0% 0%",
                  rotate: 45,
                },
                "<",
              );
            }
            break;
          case 1:
            hamburgerTl
              .to(path, { drawSVG: "50% 50%" }, "<")
              .to(path, { transformOrigin: "50% 50%", scale: 0 }, "<");
            break;
          case 2: {
            hamburgerTl.to(
              path,
              {
                transformOrigin: "0% 0%",
                rotate: -45,
              },
              "<",
            );
          }
        }
      });

      hamburgerElem.addEventListener("click", () => {
        if (hamburgerTl.progress() === 1) {
          hamburgerTl.reverse();
        } else {
          hamburgerTl.play();
        }
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="relative overflow-x-clip opacity-0">
      <nav className="h-20 w-full bg-black flex flex-row items-center p-8 border border-gray-500">
        <div className="w-full">
          <div className="logo-wrapper h-fit w-fit ">
            <Link href={"/"}>
              <Logo />
            </Link>
          </div>
        </div>

        {/*nav content: mobile and tablet */}
        <div className="mobile-nav block lg:hidden">
          <div className="hamburger-wrapper cursor-pointer">
            <HamburgerMenu strokeProp="white" />
          </div>
        </div>

        {/*nav content: desktop */}
        <div className="desktop-nav hidden lg:block ">
          <ul
            ref={ulRef}
            className="flex flex-row gap-10 justify-center items-center font-san text-xl"
          >
            {navMenu.map((menu) => {
              return (
                <li
                  key={menu.title}
                  className="w-30 text-center relative cursor-pointer"
                >
                  <div className="flex flex-col gap-2">
                    <Link href={menu.link}>{menu.title}</Link>
                  </div>
                  <div className="nav-line absolute top-7 bottom-0 inset-x-0 h-full w-full">
                    <LineBottom />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      <div>
        <div className="mobile-menu h-dvh w-[30vh] absolute top-20 left-full z-10 bg-green-200 lg:invisible block">
          <ul className="h-150 flex flex-col justify-center items-center gap-20">
            {navMenu.map((menu) => {
              return (
                <li key={menu.title} className="text-white text-2xl">
                  <Link href={menu.link}>{menu.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
