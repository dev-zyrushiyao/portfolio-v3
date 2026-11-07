import { BlogProp } from "@/app/services/blog";
import { formattDate } from "@/app/services/utils";
import React from "react";

export default function BlogContent({ blogPost }: { blogPost: BlogProp }) {
  return (
    <article className="wrapper bg-gray-200 p-20 flex flex-col gap-10 wrap-break-word">
      <div className="content-title flex lg:flex-row flex-col justify-between items-start gap-5">
        <h1>{blogPost.title}</h1>
        <p>{formattDate(blogPost.created_at)}</p>
      </div>
      <div
        className="content-details"
        dangerouslySetInnerHTML={{ __html: blogPost.context }}
      />
    </article>
  );
}
