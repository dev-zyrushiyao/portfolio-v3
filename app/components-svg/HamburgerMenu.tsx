import React from "react";

interface HamburgerProps {
  strokeProp?: string;
}

export default function HamburgerMenu({
  strokeProp = "black",
}: HamburgerProps) {
  return (
    <svg
      width={23}
      height={17}
      viewBox="0 0 23 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="line-1"
        d="M1.5 1.5H21.5"
        strokeWidth={3}
        strokeLinecap="round"
        stroke={`${strokeProp}`}
      />
      <path
        className="line-2"
        d="M1.5 8.5H21.5"
        strokeWidth={3}
        strokeLinecap="round"
        stroke={`${strokeProp}`}
      />
      <path
        className="line-3"
        d="M1.5 15.5H21.5"
        strokeWidth={3}
        strokeLinecap="round"
        stroke={`${strokeProp}`}
      />
    </svg>
  );
}
