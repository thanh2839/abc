import * as React from "react";
import { SocialIcon } from "../assets/SocialIcon";
import { FooterLinkSection } from "./FooterLinkSection";

const footerSections = [
  {
    title: "Information",
    links: ["About", "Product", "Blog"]
  },
  {
    title: "Company",
    links: ["Community", "Career", "Our story"]
  },
  {
    title: "Contact",
    links: ["Getting Started", "Pricing", "Resources"]
  }
];

const socialIcons = [
  { src: "https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/0d1ea3b379e296273d8fcb7ea1dae20357555b6a8bb784078ee246c2a46d83eb?apiKey=107937b03e68408b93e8f13d8a143773&", alt: "Social media icon 1" },
  { src: "https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/1ac348d6ec33106f2db0318f43d664584bc244ec1c0b2c1407e947f729e5c71d?apiKey=107937b03e68408b93e8f13d8a143773&", alt: "Social media icon 2" },
  { src: "https://cdn.builder.io/api/v1/image/assets/107937b03e68408b93e8f13d8a143773/5ecb88a6ccbdd77ce3109ef6228b64768714775f01e66885ce3587ef38713e45?apiKey=107937b03e68408b93e8f13d8a143773&", alt: "Social media icon 3" }
];

export const Footer: React.FC = () => {
  return (
    <footer className="flex overflow-hidden flex-col px-20 py-12 bg-slate-300 max-md:px-5" role="contentinfo">
      <div className="flex flex-wrap gap-5 justify-between self-center w-full max-w-[1248px] max-md:max-w-full">
        <div className="flex flex-col items-center">
          <div className="flex flex-col max-w-full text-lg w-[189px]">
            <div className="text-black">GREENMIND</div>
            <div className="mt-6 font-medium text-stone-900 text-opacity-50">
              We help you find your dream plant
            </div>
          </div>
          <div className="flex gap-6 items-center mt-6">
            {socialIcons.map((icon, index) => (
              <SocialIcon key={index} {...icon} />
            ))}
          </div>
        </div>
        <nav className="flex gap-10 items-start" aria-label="Footer navigation">
          {footerSections.map((section, index) => (
            <FooterLinkSection key={index} {...section} />
          ))}
        </nav>
      </div>
      <div className="self-start mt-24 text-lg font-medium text-stone-900 text-opacity-50 max-md:mt-10 max-md:max-w-full">
        2023 all Right Reserved Term of use GREENMIND
      </div>
    </footer>
  );
};