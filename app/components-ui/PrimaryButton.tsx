import Link from "next/link";
import React, { useRef } from "react";
import color from "../design-system/DesignSystem";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function PrimaryButton({ label }: { label: string }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(container.current, { opacity: 1 });

      const button = container.current?.querySelector("button");
      const expandingBg = container.current?.querySelector(
        ".expanding-background",
      );
      if (!expandingBg || !button) return;

      gsap.set(expandingBg, { scale: 0 });

      const hoverIn = gsap.to(expandingBg, {
        paused: true,
        scale: 1,
        ease: "circ",
      });

      const hoverOut = gsap.to(expandingBg, {
        paused: true,
        scale: 0,
        ease: "circ",
      });

      button.addEventListener("mouseenter", () => {
        hoverIn.restart();
      });

      button.addEventListener("mouseleave", () => {
        hoverOut.restart();
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="opacity-0">
      <button
        className="w-40 h-13 rounded-4xl text-base relative overflow-clip"
        style={{ backgroundColor: color.accent }}
      >
        <span className="relative z-10">{label}</span>
        <div className="expanding-background bg-green-200 h-50 w-50 absolute top-1/2 left-1/2 -translate-1/2 origin-center rounded-full" />
      </button>
    </div>
  );
}
