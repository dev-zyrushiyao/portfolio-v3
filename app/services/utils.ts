export function formattDate(blogDate: string) {
  const date = new Date(blogDate).toLocaleDateString("en-PH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return date;
}
