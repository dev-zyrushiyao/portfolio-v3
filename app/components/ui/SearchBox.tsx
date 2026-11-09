import React from "react";
import { IoMdClose } from "react-icons/io";

type SearchBoxProp = {
  ref: React.RefObject<HTMLInputElement | null>;
  searchQuery: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
  handleDelete: () => void;
};

export default function SearchBox({
  ref,
  searchQuery,
  onChange,
  handleDelete,
}: SearchBoxProp) {
  return (
    <div className="border border-gray-400 p-2 lg:w-100 w-fit rounded-sm flex flex-row gap-2 items-center">
      <input
        ref={ref}
        className="search-input outline-none flex-1"
        type="text"
        placeholder="Search project"
        maxLength={40}
        value={searchQuery}
        onChange={onChange}
        autoFocus
      />
      <div className="clear-button cursor-pointer" onClick={handleDelete}>
        <IoMdClose fill="gray" />
      </div>
    </div>
  );
}
