import { BlogProp } from "@/app/services/blog";
import { formattDate } from "@/app/services/utils";
import React from "react";

interface BlogCardProp {
  randomizeBlog: BlogProp;
  onClick: () => void;
}
export default function BlogCard({ randomizeBlog, onClick }: BlogCardProp) {
  return (
    <div
      onClick={onClick}
      key={randomizeBlog.id}
      className="bg-gray-200  cursor-pointer p-10 rounded-xs h-100 w-100 shrink-0 flex flex-col justify-center items-center text-center"
    >
      <h5>
        {randomizeBlog.title.slice(0, 12)}
        {randomizeBlog.title.length > 12 && "..."}
      </h5>
      <p className="text-sm">{formattDate(randomizeBlog.created_at)}</p>
      <p>{"------------------"}</p>
      <p className="text-base line-clamp-5">{randomizeBlog.excerpt}</p>
    </div>
  );
}
