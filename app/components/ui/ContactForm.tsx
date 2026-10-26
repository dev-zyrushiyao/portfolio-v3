"use client";

import React, { useActionState } from "react";
import PrimaryButton from "./PrimaryButton";
import { CategoryProp } from "../../services/category";
import { submitContact } from "../../services/contact";

type ContactFormProps = { categoryMenu: CategoryProp[] };

export default function ContactForm({ categoryMenu }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(submitContact, {
    success: false,
    message: "",
  });

  return (
    <div className=" w-150 flex flex-col items-center">
      <div className="message-wrapper h-10 w-full">
        {state.message && (
          <p
            className={`font-semibold text-center ${state.success ? "text-green-600" : "text-red-600"}`}
          >
            {state.message}
          </p>
        )}
      </div>
      <form action={formAction} className="w-100 flex flex-col gap-5">
        <div className="name-section flex flex-col">
          <label htmlFor="name-input" className="text-base font-semibold">
            Name
          </label>
          <input
            required
            type="text"
            name="sender_name"
            id="name-input"
            className="border border-gray-400 rounded-sm p-2"
          />
        </div>
        <div className="email-section flex flex-col">
          <label htmlFor="email-input" className="text-base font-semibold">
            Email
          </label>
          <input
            required
            type="email"
            name="sender_email"
            id="email-input"
            className="border border-gray-400 rounded-sm p-2"
          />
        </div>
        <div className="category-section flex flex-col">
          <label htmlFor="category-input" className="text-base font-semibold">
            Category
          </label>

          <select
            name="category_id"
            id="category-input"
            className="border border-gray-400 rounded-sm p-2"
          >
            {categoryMenu.map((menu) => {
              return (
                <option key={menu.id} value={menu.id}>
                  {menu.category_type}
                </option>
              );
            })}
          </select>
        </div>
        <div className="subject-section flex flex-col">
          <label htmlFor="subject-input" className="text-base font-semibold">
            Subject
          </label>
          <input
            required
            type="text"
            name="subject"
            id="subject-input"
            className="border border-gray-400 rounded-sm p-2"
          />
        </div>
        <div className="message-section flex flex-col">
          <label htmlFor="message-input" className="text-base font-semibold">
            Message
          </label>

          <textarea
            required
            name="message"
            id="message-input"
            placeholder="Type your message here.."
            minLength={10}
            maxLength={1000}
            cols={30}
            className="border border-gray-400 rounded-sm p-2 h-50"
          ></textarea>
        </div>
        <div className="flex flex-row justify-center">
          <PrimaryButton
            type="submit"
            label={isPending ? "Sending..." : "Submit"}
            disabled={isPending}
          />
        </div>
      </form>
    </div>
  );
}
