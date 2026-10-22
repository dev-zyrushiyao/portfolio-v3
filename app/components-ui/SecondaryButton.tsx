"use client";

import Link from "next/link";
import React, { useRef } from "react";
import color from "../design-system/DesignSystem";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function SecondaryButton({ label }: { label: string }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(container.current, { opacity: 1 });

      const button = container.current?.querySelector("button");
      const expandingCircle =
        container.current?.querySelector(".expanding-circle");
      if (!expandingCircle || !button) return;

      gsap.set(expandingCircle, { scale: 0 });

      const hoverIn = gsap.to(expandingCircle, {
        paused: true,
        scale: 1,
        ease: "circ",
      });

      const hoverOut = gsap.to(expandingCircle, {
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
        className="w-40 h-13 rounded-4xl text-base border border-gray-300 relative overflow-clip cursor-pointer"
        style={{ backgroundColor: "white" }}
      >
        <span className="relative z-10">{label}</span>
        <div
          className="expanding-circle h-50 w-50 absolute top-1/2 left-1/2 -translate-1/2 origin-center rounded-full"
          style={{ backgroundColor: color.accent }}
        />
      </button>
    </div>
  );
}
