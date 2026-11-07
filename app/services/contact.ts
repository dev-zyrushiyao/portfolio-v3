"use server";

export type FormState = { success: boolean; message: string };
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export async function submitContact(formData: FormData): Promise<FormState> {
  //form data values
  const sender_name = formData.get("sender_name")?.toString().trim();
  const sender_email = formData.get("sender_email")?.toString().trim();
  const category_id = formData.get("category_id");
  const subject = formData.get("subject")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  const res = await fetch(
    "https://ylfbtnwzwdzqsmipjzuv.supabase.co/rest/v1/contact",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey as string,
        Authorization: `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({
        sender_name,
        sender_email,
        category_id,
        subject,
        message,
      }),
    },
  );

  if (!res.ok) {
    const errorData = await res.json();
    return {
      success: false,
      message: `Error sending message. Please try again later. (${errorData.message})`,
    } as FormState;
  }

  return {
    success: true,
    message: "Thank you! Your message has been sent successfully.",
  } as FormState;
}
