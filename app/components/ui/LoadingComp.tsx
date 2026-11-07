import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";

gsap.registerPlugin(SplitText);

export default function LoadingComp() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const header = container.current?.querySelector("h5");
      if (!header) return;

      const split = SplitText.create(header, { type: "chars" });

      gsap
        .timeline({
          repeat: -1,
          repeatDelay: 0,
          defaults: { stagger: 0.1, duration: 0.3, ease: "power2.inOut" },
        })
        .to(split.chars, {
          y: 10,
        })
        .to(split.chars, { y: -10 }, "<=0.3")
        .to(split.chars, { y: 0 }, "<=0.3");
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="h-100 flex flex-col justify-center items-center"
    >
      <h5 className="text-gray-400">Loading...</h5>
    </div>
  );
}
