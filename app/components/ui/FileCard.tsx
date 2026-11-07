import { FileProp } from "@/app/services/file";
import Image from "next/image";
import React from "react";
import defaultImage from "@/public/default_img.png";
import PrimaryButton from "./PrimaryButton";

interface FileCardProp {
  file: FileProp;
}

export default function FileCard({ file }: FileCardProp) {
  function handleDownload(file: FileProp) {
    // 1. Create a Blob with the data and data type
    const blob = new Blob([file.link], {
      type: file.type,
    });

    // 2. Generate a unique, temporary URL pointing to the Blob object
    const url = URL.createObjectURL(blob);

    // 3. Create a hidden <a> element
    const link = document.createElement("a");
    link.href = url;
    link.download = `${file.title}.${file.type === "svg+xml" ? "svg" : file.type}`; // Sets the target file name

    // 4. Temporarily append to DOM and programmatically click it to trigger the download
    document.body.appendChild(link);
    link.click();

    // 5. Clean up by removing the link and revoking the object URL to free memory
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div
      key={file.id}
      className="file-card border border-gray-300 rounded-lg bg-gray-100 min-w-65 max-w-80 w-100 flex flex-col items-center p-5 z-0"
    >
      <div className="file-image h-50 w-full bg-gray-300 rounded-sm relative">
        <Image
          src={file.link === null ? defaultImage : file.link}
          alt="file photo"
          fill
          loading="eager"
          className="object-contain p-10"
        />
      </div>
      <div className="h-50 w-full flex flex-col justify-evenly">
        <div>
          <h5>{file.title}</h5>
          <p>Filetype: {file.type}</p>
        </div>

        <div className="text-center">
          <PrimaryButton
            label="Download"
            type="button"
            onClick={() => {
              handleDownload(file);
            }}
          />
        </div>
      </div>
    </div>
  );
}
