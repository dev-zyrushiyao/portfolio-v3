import React from "react";

export default function LineBottom({
  strokeWidthProps = 7,
}: {
  strokeWidthProps?: number;
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10">
      <line
        style={{
          fill: "none",
          stroke: "rgb(0, 0, 0)",
          strokeWidth: `${strokeWidthProps ?? 7}px`,
          strokeLinecap: "round",
        }}
        x1="9.451"
        y1="5"
        x2="90.549"
        y2="5"
      ></line>
    </svg>
  );
}
