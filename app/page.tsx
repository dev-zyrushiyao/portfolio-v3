"use client";

import Banner from "./components/svg/Banner";
import WebBg from "@/assets/background/background-web.png";
import Mushroom from "./components/svg/Mushroom";
import QuestionBox from "./components/svg/QuestionBox";
import LeafFace from "./components/svg/LeafFace";
import { useGSAP } from "@gsap/react";
import { JSX, useRef } from "react";
import gsap from "gsap";
import BlogIcon from "./components/svg/BlogIcon";
import ProjectIcon from "./components/svg/ProjectIcon";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import color from "./design-system/DesignSystem";

import Link from "next/link";

type Certificates = { title: string; certificateList: string[] };

const cert: Certificates[] = [
  {
    title: "UI/UX",
    certificateList: [
      "The No-Code Creative : Figma for Talents and Local Business (2026)",
      "UXPH Mini 2025: Manila Conference (2025)",
      "DTI Laguna x Google Certificate Program - Google UX Design[Coursera] (2025)",
    ],
  },
  {
    title: "Creative Coding Club",
    certificateList: [
      "GSAP Express",
      "GSAP ScrollTrigger Express",
      "GSAP Beyond The Basics",
      "SVG Animation With GSAP",
    ],
  },
  {
    title: "Other",
    certificateList: [
      "Software Development Online Part-Time Accelerated - JAVA [Coding Dojo](2023)",
      "Caregiving NC2 (Calamba Doctors' College) (2024)",
      "Analog System & Digital Console Mixing Master Class[Sound Tech Institute of the Philippines(2019)",
    ],
  },
];

const techStack: string[] = [
  "React",
  "Typescript",
  "GSAP",
  "Tailwind CSS",
  "Figma",
  "Flutter",
  "Supabase",
  "NextJs",
];

type OtherLinks = { title: string; link: string; icon: JSX.Element };

const otherLinks: OtherLinks[] = [
  { title: "Dev Blog", link: "/blog", icon: <BlogIcon /> },
  { title: "Projects", link: "/projects", icon: <ProjectIcon /> },
];

gsap.registerPlugin(DrawSVGPlugin);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      //FOUC
      gsap.set(container.current, { opacity: 1 });

      //desktop ST

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const otherWrapper = container.current?.querySelector(".other-wrapper");
        const otherSection =
          container.current?.querySelectorAll(".other-section");

        if (!otherWrapper || !otherSection) return;

        otherSection?.forEach((element) => {
          const innerBox = element.querySelector(".inner-box");
          const icon = element.querySelector(".other-label-icon svg path");

          const otherSectionTl = gsap
            .timeline({ paused: true })
            .to(innerBox, { yPercent: -100 })
            .to(element, { zIndex: 1 }, "<")
            .from(icon, { drawSVG: 0 }, "<");

          element.addEventListener("mouseenter", () => {
            otherSectionTl.play();
          });

          element.addEventListener("mouseleave", () => {
            otherSectionTl.reverse();
          });
        });
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className={`text-2xl min-h-dvh bg-contain opacity-0`}
      style={{ backgroundImage: `url(${WebBg.src})` }}
    >
      <div className="hero">
        <Banner />
      </div>
      <main>
        <div className="content flex flex-col gap-10 lg:p-20 p-10">
          {/* introduction */}
          <section className="border rounded-2xl overflow-clip">
            <div
              className={`section-title flex flex-row items-center gap-8 border-b p-5`}
              style={{
                backgroundColor: `${color.secondary}`,
                color: `white`,
                opacity: 0.8,
              }}
            >
              <div className="w-[clamp(50px,10vw,75px)] h-auto">
                <Mushroom />
              </div>
              <div>
                <h3>Introduction</h3>
                {/* <h5 style={{ color: color.accent }}>ᜉᜄ᜔ᜉᜉᜃᜒᜎᜎ</h5> */}
              </div>
            </div>
            <div
              className="section-description lg:px-20 lg:py-10 p-5"
              style={{
                backgroundColor: `${color.primary}`,
                color: `white`,
                opacity: 0.6,
              }}
            >
              <p className="lg:text-xl lg:block hidden">
                Hi, I’m Zyrus Hiyao, an aspiring UI/UX designer and frontend web
                developer based in the Philippines with a background in Computer
                Technology from STI College Calamba. I am building my skills in
                interactive, motion-driven web experiences that bridge clean
                code with intuitive design. Driven by a passion for animations,
                interactive visuals, music, guitar, and video games, I bring
                creativity, rhythmic precision, and technical problem-solving
                into every project I create.
              </p>
              <div className="lg:hidden text-sm flex flex-col gap-5">
                Hi, I’m Zyrus Hiyao UI/UX Designer & Frontend Developer |
                Philippines
                <ul>
                  <li>
                    <p>
                      <strong>Focus:</strong> Interactive, motion-driven web
                      experiences
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Background:</strong> Computer Technology (STI
                      College Calamba)
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Passions:</strong> Creative coding, UI design,
                      music, and gaming
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* techstack */}
          <section className="border rounded-2xl overflow-clip">
            <div
              className="section-title flex flex-row items-center gap-8 border-b p-5"
              style={{
                backgroundColor: `${color.secondary}`,
                color: `white`,
                opacity: 0.8,
              }}
            >
              <div className="w-[clamp(50px,10vw,75px)] h-auto">
                <QuestionBox />
              </div>
              <div>
                <h3>Techstack</h3>
                {/* <h5 style={{ color: color.accent }}>ᜆᜒᜃᜁᜐ᜔ᜆᜃ᜔</h5> */}
              </div>
            </div>
            <div
              className="section-description lg:px-20 lg:py-10 p-5"
              style={{
                backgroundColor: `${color.primary}`,
                color: `white`,
                opacity: 0.6,
              }}
            >
              <div>
                <ul className="lg:gap-10 lg:text-xl lg:flex-row text-sm list-disc flex flex-col">
                  {techStack.map((item) => {
                    return <li key={item}>{item}</li>;
                  })}
                </ul>
              </div>
            </div>
          </section>

          {/*certificates */}
          <section className="border rounded-2xl overflow-clip">
            <div
              className="section-title flex flex-row items-center gap-8 border-b p-5"
              style={{
                backgroundColor: `${color.secondary}`,
                color: `white`,
                opacity: 0.8,
              }}
            >
              <div className="w-[clamp(50px,10vw,75px)] h-auto">
                <LeafFace />
              </div>
              <div>
                <h3>Certificates</h3>
                {/* <h5 style={{ color: color.accent }}>ᜐᜒᜍ᜔ᜆᜒᜉᜒᜃᜐ᜔ᜌᜓᜈ᜔</h5> */}
              </div>
            </div>
            <div
              className="section-description lg:px-20 lg:py-10 lg:flex-row lg:gap-30 p-5 flex flex-col gap-5"
              style={{
                backgroundColor: `${color.primary}`,
                color: `white`,
                opacity: 0.6,
              }}
            >
              {cert.map((item) => {
                return (
                  <div
                    key={item.title}
                    className="flex-1 shrink-0 flex flex-col gap-5"
                  >
                    <div className="border-b border-gray-400">
                      <h6 className="text-xl font-semibold">{item.title}</h6>
                    </div>

                    <ul className="lg:text-xl text-sm list-disc flex flex-col">
                      {item.certificateList.map((certItem) => {
                        return <li key={certItem}>{certItem}</li>;
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          {/* dev blog and project */}
          <div className="other-wrapper flex flex-row justify-around">
            {otherLinks.map((element) => {
              return (
                <Link
                  key={element.title}
                  href={element.link}
                  className="text-black"
                >
                  <div className="other-section h-[clamp(100px,20vw,50vw)] w-[clamp(100px,20vw,40vw)] flex flex-col justify-center items-center bg-amber-200 relative overflow-clip cursor-pointer">
                    <div className="other-label relative inset-0 z-10 flex flex-col items-center">
                      <div className="other-label-icon h-[clamp(24px,5vw,60px)] w-[clamp(24px,5vw,60px)]">
                        {element.icon}
                      </div>
                      <div>
                        <h6 className="font-sans lg:text-2xl text-sm">
                          {element.title}
                        </h6>
                      </div>
                    </div>
                    <div className="inner-box bg-pink-300 h-[clamp(200px,20vw,50vw)] w-[clamp(200px,20vw,40vw)] top-full left-0 absolute"></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
