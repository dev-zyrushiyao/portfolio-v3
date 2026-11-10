export function formattDate(blogDate: string) {
  const date = new Date(blogDate).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return date;
}
export function formattBlogListDate(blogDate: string) {
  const newDate = new Date(blogDate).toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
  });

  return newDate;
}

export function getBlogTime(blogDate: string) {
  const timePosted = new Date(blogDate).toLocaleTimeString("en-PH", {
    hour: "numeric",
    minute: "2-digit",
  });

  return timePosted;
}
