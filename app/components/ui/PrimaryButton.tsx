"use client";

import React, { useRef } from "react";
import color from "../../design-system/DesignSystem";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function PrimaryButton({
  label,
  type,
  disabled,
  onClick,
}: {
  label: string;
  type: "button" | "reset" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(container.current, { opacity: 1 });

      const button = container.current?.querySelector("button");
      const expandingCircle =
        container.current?.querySelector(".expanding-circle");
      if (!expandingCircle || !button) return;

      const mm = gsap.matchMedia();
      //desktop ST
      mm.add("(min-width: 1022px)", () => {
        gsap.set(expandingCircle, { scale: 0, opacity: 1 });

        const hover = gsap.to(expandingCircle, {
          paused: true,
          scale: 1,
          ease: "linear",
          duration: 0.2,
        });

        button.addEventListener("mouseenter", () => {
          hover.play();
        });

        button.addEventListener("mouseleave", () => {
          hover.reverse();
        });
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="opacity-0">
      <button
        type={type}
        disabled={disabled}
        className="w-40 h-13 rounded-4xl text-base border border-gray-300 relative overflow-clip cursor-pointer"
        style={{ backgroundColor: color.accent }}
        {...(onClick && { onClick: onClick })}
      >
        <span className="relative z-10">{label}</span>
        <div className="expanding-circle bg-pink-300 h-50 w-50 absolute top-1/2 left-1/2 -translate-1/2 origin-center rounded-full opacity-0" />
      </button>
    </div>
  );
}
