import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";

gsap.registerPlugin(SplitText);

export default function LoadingProjectCard() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      //FOUC
      gsap.set(container.current, { opacity: 1 });

      const paraElem = gsap.utils.toArray(".paragraph-wrapper > *");
      const loadingText = container.current?.querySelector(".loading-text");
      const heading = container.current?.querySelector(".heading");
      if (!paraElem || !loadingText || !heading) return;

      const split = SplitText.create(loadingText, { type: "chars" });

      gsap
        .timeline({ repeat: -1 })
        .from(paraElem, {
          duration: 1,
          scaleX: 0,
          stagger: 1,
          transformOrigin: "0% 0%",
        })
        .to(paraElem, {
          duration: 1,
          scaleX: 0,
          stagger: 1,
          transformOrigin: "100% 0%",
        });

      gsap
        .timeline({ repeat: -1 })
        .from(split.chars, { y: 200, stagger: 0.1, ease: "back(2)" })
        .to(
          split.chars,
          { y: -200, stagger: 0.1, ease: "back.in(2)" },
          "-=0.1",
        );

      gsap.to(heading, {
        duration: 5,
        repeat: -1,
        yoyo: true,
        backgroundColor: "#E0E0E0",
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="opacity-0">
      <div className="project-card lg:h-150 lg:w-100 w-80 border rounded-2xl border-gray-400 p-10 flex flex-col gap-5 bg-gray-400">
        <div className="image-wrapper rounded-xl overflow-hidden h-50 w-full bg-gray-300 border border-gray-300 relative">
          <div className="w-full h-full bg-gray-300 flex flex-col justify-center items-center select-none">
            <h5 className="loading-text">Loading</h5>
          </div>
        </div>
        <div className="project-information flex flex-col gap-5">
          <div className="heading bg-gray-500 h-10 w-full"></div>
          <div className="paragraph-wrapper flex flex-col gap-5">
            {Array.from({ length: 3 }, (_, index) => {
              return (
                <div key={index} className="lines bg-gray-800 h-5 w-full"></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
