import React from "react";
import MiniBanner from "../components-ui/MiniBanner";
import { CategoryProp, getCategory } from "../services/category";
import ContactForm from "../components-ui/ContactForm";

const defaultBannerBg: string = "#FFC5D3";
const defaultLabel: string = "Contact";

export default async function page() {
  const categoryMenu: CategoryProp[] = await getCategory();

  return (
    <div>
      <MiniBanner backgroundColorProp={defaultBannerBg} label={defaultLabel} />
      <main>
        <div className="content flex flex-col gap-10 lg:p-20 p-10">
          <div className="border-b border-gray-400 relative">
            <h3>{defaultLabel}</h3>
          </div>
          <div className="form-wrapper w-full flex flex-col items-center">
            <ContactForm categoryMenu={categoryMenu} />
          </div>
        </div>
      </main>
    </div>
  );
}
