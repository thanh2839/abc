import * as React from "react";
import { SearchBarProps } from "./types";

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder, iconSrc }) => (
  <form className="flex overflow-hidden gap-5 justify-between py-2 pr-2 pl-5 mt-12 max-w-full text-lg font-medium bg-white rounded-xl text-stone-900 text-opacity-50 w-[449px] max-md:mt-10">
    <label htmlFor="searchInput" className="sr-only">Search plants</label>
    <input
      type="search"
      id="searchInput"
      className="my-auto bg-transparent border-none outline-none w-full"
      placeholder={placeholder}
      aria-label={placeholder}
    />
    <img
      loading="lazy"
      src={iconSrc}
      alt=""
      className="object-contain shrink-0 w-12 rounded-xl aspect-square"
    />
  </form>
);