import { BlogProp } from "@/app/services/blog";
import { formattDate } from "@/app/services/utils";
import React from "react";

export default function BlogContent({ blogPost }: { blogPost: BlogProp }) {
  return (
    <article
      id="blog-comp-wrapper"
      className="w-full min-h-300  h-full bg-gray-200 lg:p-20 md:p-10 p-5 flex flex-col gap-10 wrap-break-word"
    >
      <div className="content-title flex flex-col justify-between items-start gap-5">
        <h1 className="w-full">{blogPost.title}</h1>
        <span className="flex flex-col items-start">
          <p>Post Date: {formattDate(blogPost.created_at)}</p>
          {blogPost.updated_at && (
            <p>updated at: {formattDate(blogPost.updated_at)}</p>
          )}
        </span>
      </div>
      <div
        className="content-details  [&_a]:text-blue-600 [&_a]:underline [&_ul]:list-disc  lg:[&_ul]:text-base [&_ul]:text-sm [&_ol]:list-decimal lg:[&_ol]:text-base [&_ol]:text-sm [&_ul]:pl-5 [&_ol]:pl-5 [&_p]:pb-3.5"
        dangerouslySetInnerHTML={{ __html: blogPost.context }}
      />
    </article>
  );
}
