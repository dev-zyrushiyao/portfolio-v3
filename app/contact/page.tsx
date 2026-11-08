import React, { Suspense } from "react";
import MiniBanner from "../components/ui/MiniBanner";
import { CategoryProp, getCategory } from "../services/category";
import ContactForm from "../components/ui/ContactForm";

import Loading from "./Loading";
import SectionHeader from "../components/ui/SectionHeader";

const defaultBannerBg: string = "#FFC5D3";

async function CategoryDetails() {
  const categoryMenu: CategoryProp[] = await getCategory();

  return <ContactForm categoryMenu={categoryMenu} />;
}

export default function Contact() {
  return (
    <div>
      <MiniBanner backgroundColorProp={defaultBannerBg} label={"Contact"} />
      <main>
        <div className="content flex flex-col gap-10 lg:p-20 p-10">
          <SectionHeader label="Contact me" />
          <div className="form-wrapper w-full flex flex-col items-center">
            <Suspense fallback={<Loading />}>
              <CategoryDetails />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
