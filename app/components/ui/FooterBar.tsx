import React from "react";
import color from "../../design-system/DesignSystem";
import Logo from "../svg/Logo";
import LogoSolo from "../svg/LogoSolo";

type Link = { title: string; link: string };
type FooterElem = { section: string; content: Link[] };

const footerElem: FooterElem[] = [
  {
    section: "Contact",
    content: [
      { title: "Email", link: "mailto:zyrushiyao@gmail.com" },
      { title: "Linkedin", link: "https://www.linkedin.com/in/zyrus-hiyao/" },
    ],
  },
  {
    section: "Links",
    content: [
      { title: "Github", link: "https://github.com/dev-zyrushiyao" },
      {
        title: "Behance",
        link: "https://www.behance.net/gallery/246885791/UIUX-Case-Study-CWD-Web-Mobile-Design-Concept",
      },
      {
        title: "Portfolio V1",
        link: "https://dev-zyrushiyao.github.io/project-portfolio/",
      },
    ],
  },
];

export default function FooterBar() {
  return (
    <footer
      className="flex md:flex-row flex-col gap-10 justify-evenly p-10 overflow-clip relative"
      style={{
        backgroundColor: `${color.primary}`,
        color: `white`,
      }}
    >
      <div className="logo-wrapper h-auto w-[20vw] lg:absolute bottom-0 left-0 z-10 opacity-50">
        <LogoSolo />
      </div>
      {footerElem.map((elem) => {
        return (
          <div
            key={elem.section}
            className="contact-section flex flex-col gap-2"
          >
            <div className="title border-b-2 border-b-gray-400">
              <h6 className="text-2xl font-semibold">{elem.section}</h6>
            </div>

            <ul className="flex flex-col text-xl gap-2">
              {elem.content.map((cont) => {
                return (
                  <li key={cont.title}>
                    <a href={cont.link}>{cont.title}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </footer>
  );
}
