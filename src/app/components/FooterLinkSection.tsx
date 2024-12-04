import * as React from "react";
import { FooterLinkProps } from "../types/FooterTypes";

export const FooterLinkSection: React.FC<FooterLinkProps> = ({ title, links }) => (
  <div className="flex flex-col whitespace-nowrap">
    <div className="font-bold text-stone-900">{title}</div>
    {links.map((link, index) => (
      <a
        key={index}
        href="#"
        className="mt-6 text-lg text-stone-900 text-opacity-50"
        tabIndex={0}
      >
        {link}
      </a>
    ))}
  </div>
);