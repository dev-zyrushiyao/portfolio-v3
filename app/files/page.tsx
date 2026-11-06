import React from "react";
import MiniBanner from "../components/ui/MiniBanner";
import PrimaryButton from "../components/ui/PrimaryButton";

const defaultBannerBg: string = "#E2F0D9";
const defaultLabel: string = "Files";
export default function page() {
  return (
    <div>
      <MiniBanner backgroundColorProp={defaultBannerBg} label={defaultLabel} />
      <main>
        <div className="content flex flex-col gap-10 lg:p-20 p-10">
          <div className="border-b border-gray-400 relative">
            <h3>Downloadable files</h3>
          </div>
          <section className="section-resume">
            <h5>Personal</h5>
            <div className="card-wrapper flex flex-row gap-5 flex-wrap">
              <div className="file-card border  border-gray-300 rounded-sm bg-gray-100 min-w-65 max-w-80 flex flex-col items-center p-5">
                <div className="file-image h-50 w-full bg-gray-700"></div>
                <div className="h-50 w-full flex flex-col justify-around items-center">
                  <div>
                    <h5>Resume</h5>
                    <p>Filetype: SVG</p>
                  </div>
                  <PrimaryButton label="Download" type="button" />
                </div>
              </div>
              <div className="file-card border  border-gray-300 rounded-sm bg-gray-100 min-w-65 max-w-80 flex flex-col items-center p-5">
                <div className="file-image h-50 w-full bg-gray-700"></div>
                <div className="h-50 w-full flex flex-col justify-around items-center">
                  <div>
                    <h5>Portfolio Docs</h5>
                    <p>Filetype: SVG</p>
                  </div>
                  <PrimaryButton label="Download" type="button" />
                </div>
              </div>
            </div>
          </section>
          <section className="section-portfolio-assets">
            <h5>Portfolio Assets</h5>
            <div className="card-wrapper flex flex-row gap-5 flex-wrap">
              <div className="file-card border  border-gray-300 rounded-sm bg-gray-100 min-w-65 max-w-80 flex flex-col items-center p-5">
                <div className="file-image h-50 w-full bg-gray-700"></div>
                <div className="h-50 w-full flex flex-col justify-around items-center">
                  <div>
                    <h5>Resume</h5>
                    <p>Filetype: SVG</p>
                  </div>
                  <PrimaryButton label="Download" type="button" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
