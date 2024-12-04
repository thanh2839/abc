import * as React from "react";
import { SocialIconProps } from "../types/FooterTypes";

export const SocialIcon: React.FC<SocialIconProps> = ({ src, alt }) => (
  <img
    loading="lazy"
    src={src}
    alt={alt}
    className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square"
  />
);