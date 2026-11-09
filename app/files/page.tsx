"use client";

import React, { useEffect, useState } from "react";
import MiniBanner from "../components/ui/MiniBanner";
import { FileProp, getFiles } from "../services/file";
import FileCard from "../components/ui/FileCard";
import LoadingComp from "../components/ui/LoadingComp";
import SectionHeader from "../components/ui/SectionHeader";

const defaultBannerBg: string = "#E2F0D9";
const defaultLabel: string = "Files";
export default function FilesPage() {
  const [files, setFiles] = useState<FileProp[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchFiles() {
      const data = await getFiles();
      setFiles(data);

      //waiting time 0.7s
      new Promise(() => {
        setTimeout(() => {
          setLoading(false);
        }, 700);
      });
    }

    fetchFiles();
  }, []);

  if (loading) {
    return (
      <div>
        <MiniBanner
          backgroundColorProp={defaultBannerBg}
          label={defaultLabel}
        />
        <main>
          <div className="content flex flex-col gap-10 lg:p-20 p-10">
            <SectionHeader label="Downloadable Files" />
          </div>
          <LoadingComp />
        </main>
      </div>
    );
  }

  const personalFiles = files.filter((f) => {
    return f.category === "Personal";
  });

  const assetFiles = files.filter((f) => {
    return f.category === "Asset";
  });

  return (
    <div>
      <MiniBanner backgroundColorProp={defaultBannerBg} label={defaultLabel} />
      <main>
        <div className="content flex flex-col gap-10 lg:p-20 p-10">
          <SectionHeader label="Downloadable Files" />
          <section className="section-resume flex flex-col gap-5">
            <h4>Personal</h4>
            <div className="card-wrapper flex flex-row gap-5 flex-wrap">
              {personalFiles.map((file) => {
                return <FileCard key={file.id} file={file} />;
              })}
            </div>
          </section>
          <section className="section-portfolio-assets flex flex-col gap-5">
            <h4>Portfolio Assets</h4>
            <div className="card-wrapper flex flex-row gap-5 flex-wrap">
              {assetFiles.map((file) => {
                return <FileCard key={file.id} file={file} />;
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
