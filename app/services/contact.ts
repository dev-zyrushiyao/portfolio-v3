"use server";

import supabase from "./supabase";
export type FormResult = { success: boolean; message: string };

export async function submitContact(
  prevState: FormResult,
  formData: FormData,
): Promise<FormResult> {
  const sender_name = formData.get("sender_name")?.toString().trim();
  const sender_email = formData.get("sender_email")?.toString().trim();
  const category_id = formData.get("category_id");
  const subject = formData.get("subject")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  const { error } = await supabase
    .from("contact")
    .insert([{ sender_name, sender_email, category_id, subject, message }]);

  if (error) {
    console.log("Supabase Insert Error:", error.message, error.details);
    return {
      success: false,
      message: "Failed to send message. Please try again.",
    } as FormResult;
  }

  return {
    success: true,
    message: "Thank you! Your message has been sent successfully.",
  } as FormResult;
}
