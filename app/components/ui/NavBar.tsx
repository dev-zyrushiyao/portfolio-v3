"use client";

import React, { useRef } from "react";
import Logo from "../svg/Logo";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LineBottom from "../svg/LineBottom";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import HamburgerMenu from "../svg/HamburgerMenu";
import Link from "next/link";
import color from "@/app/design-system/DesignSystem";

type NavLink = { title: string; link: string };

const navMenu: NavLink[] = [
  { title: "Home", link: "/" },
  { title: "Projects", link: "/projects" },
  { title: "Files", link: "/files" },
  { title: "Blog", link: "/blog" },
  { title: "Contact", link: "/contact" },
];
const defaultBg: string = color.primary;
const defaultFontColor: string = "#FFFFFF";

gsap.registerPlugin(DrawSVGPlugin);

export default function NavBar() {
  const container = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const hamburgerTlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      //container has relative to prevent the mobileMenu overflowing
      //FUOC
      gsap.set(container.current, { opacity: 1 });

      const navBar = container.current?.querySelector("nav");
      if (!navBar) return;

      // set the default color of Nav
      gsap.set(navBar, {
        backgroundColor: defaultBg,
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
      const mobileMenu = container.current?.querySelector(".mobile-menu");
      const blackCover = container.current?.querySelector(".black-cover");
      if (!hamburgerPath || !mobileMenu || !blackCover) return;

      gsap.set(mobileMenu, {
        backgroundColor: "#6A0400",
        color: defaultFontColor,
        left: "100%",
      });

      //toggle hamburger & mobile menu animation
      hamburgerTlRef.current = gsap.timeline({ paused: true });
      hamburgerTlRef.current
        .to(mobileMenu, { xPercent: -100 })
        .fromTo(blackCover, { autoAlpha: 0 }, { autoAlpha: 1 }, "<");

      //additional animation - SVG hamburger
      hamburgerPath.forEach((path, index) => {
        switch (index) {
          case 0:
            {
              hamburgerTlRef.current?.to(
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
            hamburgerTlRef.current
              ?.to(path, { drawSVG: "50% 50%" }, "<")
              .to(path, { transformOrigin: "50% 50%", scale: 0 }, "<");
            break;
          case 2: {
            hamburgerTlRef.current?.to(
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
        if (hamburgerTlRef.current?.progress() === 1) {
          hamburgerTlRef.current?.reverse();
        } else {
          hamburgerTlRef.current?.play();
        }
      });
    },
    { scope: container },
  );

  function closeMobileMenu(): void {
    hamburgerTlRef.current?.reverse();
  }

  return (
    <div ref={container} className=" overflow-x-clip opacity-0 relative">
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
                    <Link href={menu.link} className="text-white">
                      {menu.title}
                      <div className="nav-line absolute top-7 bottom-0 inset-x-0 h-full w-full">
                        <LineBottom />
                      </div>
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      <div className="nav-mobile-wrap overflow-x-clip">
        <div
          className="black-cover bg-black/50 h-full w-full fixed opacity-0"
          onClick={closeMobileMenu}
        ></div>
        <div className="mobile-menu h-dvh w-[30vh] absolute top-20 lg:invisible block bg-[#6A0400]">
          <ul className="h-full flex flex-col justify-start py-40 items-center gap-10">
            {navMenu.map((menu) => {
              return (
                <li
                  key={menu.title}
                  className="text-white text-2xl"
                  onClick={closeMobileMenu}
                >
                  <Link href={menu.link} className="text-white">
                    <h6 className="font-sans font-normal">{menu.title}</h6>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
