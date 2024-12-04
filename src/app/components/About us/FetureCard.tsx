import * as React from "react";

export interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <article className="flex flex-col items-center min-w-[240px] w-[400px]">
      <div className="flex flex-col items-center font-bold text-black">
        <img
          loading="lazy"
          src={icon}
          alt={`${title} feature icon`}
          className="object-contain w-24 aspect-square"
        />
        <h2 className="mt-6">{title}</h2>
      </div>
      <p className="mt-3 font-medium text-center text-stone-900 text-opacity-50">
        {description}
      </p>
    </article>
  );
}