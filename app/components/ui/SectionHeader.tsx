import React from "react";

export default function SectionHeader({label} : {label: string}) {
  return (
    <div className="section-header border-b border-gray-400 flex flex-row justify-between items-center bg-white p-5 z-0">
      <h3>{label}</h3>
    </div>
  );
}
