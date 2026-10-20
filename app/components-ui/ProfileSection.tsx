import React, { ComponentType, JSX } from "react";

interface ProfileSectionProps {
  titleProp: string;
  subtitleProp: string;
  SectionSVGProp: ComponentType;
}

export default function ProfileSection({
  titleProp,
  subtitleProp,
  SectionSVGProp,
}: ProfileSectionProps) {
  return (
    <section className="border rounded-2xl overflow-clip bg-white">
      <div className="section-titleProp flex flex-row items-center gap-8 bg-gray-300 border-b p-5">
        <div className="w-[clamp(50px,10vw,75px)] h-auto">
          <SectionSVGProp />
        </div>
        <div>
          <h3 className="text-[clamp(24px,5vw,50px)] lg:font-semibold">
            {titleProp}
          </h3>
          <h5 className="lg:text-2xl text-sm font-semibold">{subtitleProp}</h5>
        </div>
      </div>
      <div className="section-description lg:px-20 lg:py-10 p-5">
        <p className="lg:text-xl lg:block hidden">
          Hi, I’m Zyrus Hiyao, an aspiring UI/UX designer and frontend web
          developer based in the Philippines with a background in Computer
          Technology from STI College Calamba. I am building my skills in
          interactive, motion-driven web experiences that bridge clean code with
          intuitive design. Driven by a passion for animations, interactive
          visuals, music, guitar, and video games, I bring creativity, rhythmic
          precision, and technical problem-solving into every project I create.
        </p>
        <div className="lg:hidden text-sm flex flex-col items-center gap-5">
          Hi, I’m Zyrus Hiyao UI/UX Designer & Frontend Developer | Philippines
          <ul>
            <li>
              <p>
                <strong>Focus:</strong> Interactive, motion-driven web
                experiences
              </p>
              <p>
                <strong>Background:</strong> Computer Technology (STI College
                Calamba)
              </p>
              <p>
                <strong>Passions:</strong> Creative coding, UI design, music,
                and gaming
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
