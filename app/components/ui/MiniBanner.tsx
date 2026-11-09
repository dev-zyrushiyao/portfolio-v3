import React from "react";

export default function MiniBanner({
  backgroundColorProp,
  label,
}: {
  label: string;
  backgroundColorProp: string;
}) {
  return (
    <div
      className={`h-[25vw] w-full flex flex-col justify-center items-center`}
      style={{ backgroundColor: backgroundColorProp }}
    >
      <h2>{label}</h2>
    </div>
  );
}
